'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Route } from 'next';
import {
  DuplicateIdError,
  deleteRecord,
  listCollection,
  resetCmsStoreFromFixtures,
  upsertRecord,
  type CmsCollection,
} from '@/lib/cms/store';
import { publishContent } from '@/lib/cms/publish';
import { createRateLimiter } from '@/lib/rate-limit';
import { CMS_COLLECTIONS, validateCmsRecord } from '@/lib/cms/schemas';

/** `CmsCollection` is compile-time only — a raw call to this action (bypassing the
 *  generated client stub) could otherwise pass any string through to the store. */
function assertKnownCollection(collection: CmsCollection): void {
  if (!CMS_COLLECTIONS.includes(collection)) {
    throw new Error(`Unknown collection "${collection}".`);
  }
}

const ADMIN_COOKIE = 'jk_admin_session';
/** Matches the cookie's own maxAge below — both must agree or a still-fresh cookie
 *  could be rejected early, or a stale one accepted late. */
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

/**
 * The admin password doubles as the session-signing key: the cookie never carries
 * the password itself (unlike the previous `jk_admin_session=ok:<password>` scheme,
 * which handed the real credential to anyone who read the cookie). It stores only
 * an issued-at timestamp plus an HMAC over it, so a leaked cookie reveals nothing
 * reusable beyond its own expiry, and rotating ADMIN_PASSWORD instantly invalidates
 * every existing session.
 */
function adminPassword(): string {
  const value = process.env.ADMIN_PASSWORD;
  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_PASSWORD must be set in production.');
    }
    return 'changeme';
  }
  return value;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function signSession(issuedAt: number): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(adminPassword()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(String(issuedAt)));
  return `${issuedAt}.${toBase64Url(new Uint8Array(sig))}`;
}

/** Constant-time comparison — a fast-exit compare here leaks signature/password bytes. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Best-effort client identity for the login rate limiter (no Request object in a server action). */
async function loginKey(): Promise<string> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0]?.trim() ??
    h.get('x-real-ip') ??
    h.get('cf-connecting-ip') ??
    'anonymous'
  );
}

/** Deliberately tight — a real admin fails a password rarely; this is a brute-force brake. */
const loginLimiter = createRateLimiter({ windowMs: 10 * 60_000, max: 8 });

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get(ADMIN_COOKIE)?.value;
  if (!session) return false;

  const separator = session.indexOf('.');
  if (separator <= 0) return false;
  const issuedAt = Number(session.slice(0, separator));
  if (!Number.isFinite(issuedAt)) return false;
  if (Date.now() - issuedAt > SESSION_MAX_AGE_SECONDS * 1000) return false;

  let expected: string;
  try {
    expected = await signSession(issuedAt);
  } catch {
    return false;
  }
  return timingSafeEqual(session, expected);
}

export async function adminLogin(formData: FormData): Promise<void> {
  const limit = await loginLimiter.check(`admin-login:${await loginKey()}`);
  if (!limit.allowed) {
    redirect('/admin/login?error=rate_limited' as Route);
  }

  const password = String(formData.get('password') ?? '');
  if (!timingSafeEqual(password, adminPassword())) {
    redirect('/admin/login?error=1' as Route);
  }

  const issuedAt = Date.now();
  const session = await signSession(issuedAt);
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  redirect('/admin' as Route);
}

export async function adminLogout(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect('/admin/login' as Route);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) redirect('/admin/login' as Route);
}

export async function saveCollectionItem(
  collection: CmsCollection,
  idKey: string,
  json: string,
  /** The id this record was loaded under — pass when editing an existing row so
   *  changing the id field renames it instead of forking a duplicate. Omit for
   *  a genuinely new record. */
  previousId?: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  assertKnownCollection(collection);
  try {
    const record = JSON.parse(json) as Record<string, unknown>;
    if (!record[idKey]) return { ok: false, error: `Missing ${idKey}` };
    if (!record.status) record.status = 'published';

    // Validated for pass/fail only — the schema isn't a perfectly exhaustive
    // mirror of every field content/types.ts allows, and zod's default `strip`
    // mode would silently drop anything it doesn't recognize. The *original*
    // record is what gets saved.
    const validated = validateCmsRecord(collection, record);
    if (!validated.ok) return { ok: false, error: validated.error };

    await upsertRecord(collection, record, idKey, previousId);
    await publishContent();
    void triggerIngest();
    return { ok: true };
  } catch (e) {
    if (e instanceof DuplicateIdError) return { ok: false, error: e.message };
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' };
  }
}

export async function removeCollectionItem(
  collection: CmsCollection,
  idKey: string,
  id: string,
): Promise<void> {
  await requireAdmin();
  assertKnownCollection(collection);
  await deleteRecord(collection, idKey, id);
  await publishContent();
  void triggerIngest();
}

export async function seedCmsFromFixtures(): Promise<void> {
  await requireAdmin();
  await resetCmsStoreFromFixtures();
  await publishContent();
}

export async function getAdminCollection(collection: CmsCollection) {
  await requireAdmin();
  assertKnownCollection(collection);
  return listCollection(collection);
}

async function triggerIngest(): Promise<void> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const secret = process.env.REVALIDATE_SECRET;
  try {
    await fetch(`${base}/api/ingest`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(secret ? { authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({ reason: 'cms-publish' }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    // best-effort
  }
}
