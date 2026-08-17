import type { AcquisitionChannel } from './channel';
import type { Classification, SignalHit } from './types';

/**
 * Signed persona cookie.
 *
 * Signed, not encrypted: the contents are not secret (the visitor may inspect what
 * the site inferred — that is a feature), but they must not be forgeable, because
 * the classification drives what content is surfaced.
 *
 * Uses Web Crypto only, so this runs unchanged in the Edge runtime, in Node, and in
 * tests — no hosting-platform dependency.
 */

export const PERSONA_COOKIE = 'jk_persona';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Trimmed cookie payload — the full signal trail stays client-side. */
export interface PersonaCookiePayload {
  p: Classification['persona'];
  c: number;
  v: string;
  t: string;
  /** Acquisition channel: organic_search | paid_search | social | … */
  ch?: AcquisitionChannel;
  /** Signal ids + weights only; `detail` strings are dropped to stay well under 4KB. */
  s: Array<{ i: string; p: SignalHit['persona']; w: number; o: SignalHit['source'] }>;
}

function getSecret(): string {
  const secret = process.env.PERSONA_COOKIE_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('PERSONA_COOKIE_SECRET must be set in production.');
    }
    return 'dev-only-insecure-secret';
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return toBase64Url(new Uint8Array(sig));
}

/** Constant-time comparison — a fast-exit compare here leaks signature bytes. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function encodePersonaCookie(classification: Classification): Promise<string> {
  const payload: PersonaCookiePayload = {
    p: classification.persona,
    c: classification.confidence,
    v: classification.version,
    t: classification.classifiedAt,
    ch: classification.acquisitionChannel,
    s: classification.signals.map((s) => ({ i: s.id, p: s.persona, w: s.weight, o: s.source })),
  };
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = await hmac(body);
  return `${body}.${sig}`;
}

export async function decodePersonaCookie(value: string | undefined): Promise<PersonaCookiePayload | null> {
  if (!value) return null;

  const separator = value.lastIndexOf('.');
  if (separator <= 0) return null;

  const body = value.slice(0, separator);
  const sig = value.slice(separator + 1);

  let expected: string;
  try {
    expected = await hmac(body);
  } catch {
    return null;
  }
  if (!timingSafeEqual(sig, expected)) return null;

  try {
    const decoded: unknown = JSON.parse(new TextDecoder().decode(fromBase64Url(body)));
    if (typeof decoded !== 'object' || decoded === null) return null;
    const payload = decoded as PersonaCookiePayload;
    if (typeof payload.p !== 'string' || typeof payload.c !== 'number') return null;
    if (!Array.isArray(payload.s)) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Rehydrate signal hits from the cookie. `detail` is regenerated as a placeholder. */
export function payloadToSignals(payload: PersonaCookiePayload): SignalHit[] {
  return payload.s.map((s) => ({
    id: s.i,
    persona: s.p,
    weight: s.w,
    detail: `Carried over from a previous visit (${s.i})`,
    source: s.o,
  }));
}
