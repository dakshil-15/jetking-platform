import { NextResponse } from 'next/server';
import { z } from 'zod';
import { answerQuestion } from '@/guide/answer';
import { HANDOFF_COPY } from '@/guide/guardrails';
import { clientKey, createRateLimiter } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RequestSchema = z.object({
  question: z.string().min(1).max(1000),
  persona: z.enum(['student', 'professional', 'parent', 'franchise', 'unknown']).default('unknown'),
});

/**
 * Every request here can cost an LLM call, so the limit is deliberately tight.
 * See lib/rate-limit.ts for the multi-instance constraint — it fails the boot in
 * production rather than silently under-limiting.
 */
const limiter = createRateLimiter({ windowMs: 60_000, max: 12 });

export async function POST(request: Request) {
  const limit = await limiter.check(clientKey(request));

  if (!limit.allowed) {
    return NextResponse.json(
      { outcome: { kind: 'handoff', reason: 'unavailable', text: HANDOFF_COPY.unavailable } },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter || 60) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = await answerQuestion(parsed.data);

  // Diagnostics are logged server-side, never returned — they reveal retrieval
  // internals and guardrail rule names.
  if (result.diagnostics.guardrail) {
    console.info('[guide]', {
      guardrail: result.diagnostics.guardrail,
      persona: parsed.data.persona,
      topScore: Number(result.diagnostics.topScore.toFixed(2)),
    });
  }

  return NextResponse.json({ outcome: result.outcome }, { headers: { 'cache-control': 'no-store' } });
}
