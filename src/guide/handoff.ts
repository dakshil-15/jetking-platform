import type { PersonaId } from '@/persona/types';
import type { HandoffReason } from './types';
import { siteConfig } from '@/lib/site';

/**
 * Counsellor handoff — DEVELOPMENT-PLAN §5.3.
 *
 * Builds a structured lead payload from the Guide conversation so the enquiry
 * form and WhatsApp deep-link carry persona, summary, course interest, and city.
 * The existing enquiry → State/Centre routing is preserved; we only enrich it.
 */

export const GUIDE_HANDOFF_KEY = 'jk_guide_handoff';

export interface GuideHandoffPayload {
  persona: PersonaId;
  reason: HandoffReason | 'user-requested';
  summary: string;
  courseSlug?: string;
  citySlug?: string;
  lastQuestion?: string;
  createdAt: string;
}

export function buildHandoffPayload(input: {
  persona: PersonaId;
  reason: HandoffReason | 'user-requested';
  turns: Array<{ role: 'user' | 'guide'; text: string }>;
  courseSlug?: string;
  citySlug?: string;
}): GuideHandoffPayload {
  const userTurns = input.turns.filter((t) => t.role === 'user').map((t) => t.text);
  const lastQuestion = userTurns[userTurns.length - 1];
  const summaryParts = [
    `Persona: ${input.persona}`,
    `Handoff reason: ${input.reason}`,
    userTurns.length
      ? `Visitor asked:\n${userTurns.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
      : 'Visitor opened counsellor handoff without questions.',
  ];
  if (input.courseSlug) summaryParts.push(`Course interest: ${input.courseSlug}`);
  if (input.citySlug) summaryParts.push(`City: ${input.citySlug}`);

  return {
    persona: input.persona,
    reason: input.reason,
    summary: summaryParts.join('\n\n'),
    courseSlug: input.courseSlug,
    citySlug: input.citySlug,
    lastQuestion,
    createdAt: new Date().toISOString(),
  };
}

/** Persist handoff for the enquiry form to pick up on the same device. */
export function storeHandoff(payload: GuideHandoffPayload): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(GUIDE_HANDOFF_KEY, JSON.stringify(payload));
  } catch {
    // private mode / quota — enquiry still works without context
  }
}

export function readHandoff(): GuideHandoffPayload | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(GUIDE_HANDOFF_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GuideHandoffPayload;
  } catch {
    return null;
  }
}

export function clearHandoff(): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.removeItem(GUIDE_HANDOFF_KEY);
  } catch {
    /* ignore */
  }
}

/** Enquiry URL with query params as a fallback when sessionStorage is empty. */
export function enquiryHandoffHref(payload: GuideHandoffPayload): string {
  const params = new URLSearchParams();
  params.set('from', 'guide');
  if (payload.courseSlug) params.set('course', payload.courseSlug);
  if (payload.citySlug) params.set('city', payload.citySlug);
  params.set('reason', payload.reason);
  return `/enquiry?${params.toString()}`;
}

/** WhatsApp click-to-chat with pre-filled counsellor context. */
export function whatsappHandoffUrl(payload: GuideHandoffPayload): string | null {
  const number = siteConfig.whatsappNumber;
  if (!number) return null;
  const text = [
    'Hi Jetking — I was chatting with the website Guide and would like to speak to a counsellor.',
    '',
    payload.summary.slice(0, 800),
  ].join('\n');
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
