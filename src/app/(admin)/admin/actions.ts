'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Route } from 'next';
import {
  deleteRecord,
  listCollection,
  resetCmsStoreFromFixtures,
  upsertRecord,
  type CmsCollection,
} from '@/lib/cms/store';
import { publishContent } from '@/lib/cms/publish';

const ADMIN_COOKIE = 'jk_admin_session';

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const session = jar.get(ADMIN_COOKIE)?.value;
  if (!session) return false;
  const expected = process.env.ADMIN_PASSWORD ?? 'changeme';
  return session === `ok:${expected}`;
}

export async function adminLogin(formData: FormData): Promise<void> {
  const password = String(formData.get('password') ?? '');
  const expected = process.env.ADMIN_PASSWORD ?? 'changeme';
  if (password !== expected) {
    redirect('/admin/login?error=1' as Route);
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, `ok:${expected}`, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
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
): Promise<{ ok: true } | { ok: false; error: string }> {
  await requireAdmin();
  try {
    const record = JSON.parse(json) as Record<string, unknown>;
    if (!record[idKey]) return { ok: false, error: `Missing ${idKey}` };
    if (!record.status) record.status = 'published';
    await upsertRecord(collection, record, idKey);
    await publishContent();
    void triggerIngest();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Save failed' };
  }
}

export async function removeCollectionItem(
  collection: CmsCollection,
  idKey: string,
  id: string,
): Promise<void> {
  await requireAdmin();
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
    });
  } catch {
    // best-effort
  }
}
