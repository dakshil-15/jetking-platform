import { NextResponse } from 'next/server';
import { z } from 'zod';
import { clientKey, createRateLimiter } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Enquiry intake.
 *
 * The existing Jetking flow — enquiry → State/Centre routing → counsellor — is
 * PRESERVED, not rebuilt (DEVELOPMENT-PLAN §5.3, risk R6). This handler validates,
 * enriches with persona context, and forwards to the existing CRM endpoint.
 *
 * Until the CRM integration details are supplied, submissions are logged rather than
 * dropped. Losing a lead is the single worst failure this site can have, so the
 * no-CRM path must still succeed from the visitor's perspective and leave a durable
 * server-side record to reconcile.
 */

const EnquirySchema = z.object({
  name: z.string().min(2).max(120),
  phone: z
    .string()
    .min(10)
    .max(20)
    .regex(/^[\d\s+()-]+$/, 'Phone may contain digits and + ( ) - only'),
  email: z.email().max(200).optional().or(z.literal('')),
  city: z.string().max(120).optional(),
  courseSlug: z.string().max(120).optional(),
  message: z.string().max(2000).optional(),
  /** Context attached by the client so counsellors see how the lead arrived. */
  persona: z.enum(['student', 'professional', 'parent', 'franchise', 'unknown']).default('unknown'),
  confidence: z.number().min(0).max(1).default(0),
  source: z.string().max(200).default('website'),
  /** Guide conversation summary when the lead came from the AI Guide handoff. */
  guideSummary: z.string().max(4000).optional(),
  guideReason: z.string().max(80).optional(),
  /**
   * Anonymous first-party visitor ID (`JK_…`). CRM should store this so a later
   * mobile/email match can reconnect browsing history to the lead.
   */
  visitorId: z
    .string()
    .regex(/^JK_[A-Za-z0-9]{6,16}$/)
    .optional(),
  /** Journey stage from the adaptive profile (discover → admit). */
  journeyStage: z.enum(['discover', 'explore', 'compare', 'counsel', 'admit']).optional(),
  /** Locked or inferred career/topic intent label. */
  intent: z.string().max(120).optional(),
});

/**
 * Looser than the Guide's limit — a genuine visitor may legitimately submit two or
 * three enquiries (different courses, a correction) — but tight enough that this
 * public endpoint cannot be used to flood counsellors with junk leads.
 */
const limiter = createRateLimiter({ windowMs: 10 * 60_000, max: 5 });

export async function POST(request: Request) {
  const limit = await limiter.check(clientKey(request));

  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this connection. Please try again shortly.' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter || 600) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Please check the form and try again.',
        fields: parsed.error.issues.map((i) => i.path.join('.')),
      },
      { status: 400 },
    );
  }

  const enquiry = {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  };

  const endpoint = process.env.CRM_ENDPOINT;

  if (!endpoint) {
    // No CRM wired yet. Log with a distinctive marker so these are greppable and
    // reconcilable once the integration lands.
    console.warn('[enquiry:unrouted]', JSON.stringify(enquiry));
    return NextResponse.json({ ok: true, routed: false });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(process.env.CRM_API_KEY ? { authorization: `Bearer ${process.env.CRM_API_KEY}` } : {}),
      },
      body: JSON.stringify(enquiry),
    });

    if (!response.ok) throw new Error(`CRM returned ${response.status}`);

    return NextResponse.json({ ok: true, routed: true });
  } catch (error) {
    // The visitor must not be told to re-submit — we have their details, and a
    // duplicate submission is worse than a delayed hand-off. Log loudly instead.
    console.error('[enquiry:crm-failed]', JSON.stringify(enquiry), error);
    return NextResponse.json({ ok: true, routed: false });
  }
}
