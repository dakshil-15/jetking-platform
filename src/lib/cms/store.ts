import { promises as fs } from 'node:fs';
import path from 'node:path';
import type {
  Centre,
  City,
  Course,
  Faculty,
  Faq,
  HomepageVariant,
  PersonaRule,
  PlacementPage,
  Policy,
  Post,
  TrustSignal,
} from '@/lib/content/types';
import { courses as seedCourses } from '@/lib/content/fixtures/courses';
import { centres as seedCentres, cities as seedCities } from '@/lib/content/fixtures/locations';
import { posts as seedPosts } from '@/lib/content/fixtures/posts';
import { faqs as seedFaqs } from '@/lib/content/fixtures/faqs';
import { trustSignals as seedTrust } from '@/lib/content/fixtures/trust';
import {
  faculty as seedFaculty,
  homepageVariants as seedVariants,
  personaRules as seedRules,
  placements as seedPlacements,
  policies as seedPolicies,
} from '@/lib/content/fixtures/kb';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { CmsCollection, PublishStatus } from '@/lib/cms/types';

export type { CmsCollection, PublishStatus } from '@/lib/cms/types';

type WithStatus<T> = T & { status: PublishStatus };

export interface CmsStore {
  courses: WithStatus<Course>[];
  cities: WithStatus<City>[];
  centres: WithStatus<Centre>[];
  posts: WithStatus<Post>[];
  faqs: WithStatus<Faq>[];
  policies: WithStatus<Policy>[];
  faculty: WithStatus<Faculty>[];
  placements: WithStatus<PlacementPage>[];
  trust_signals: WithStatus<TrustSignal>[];
  homepage_variants: WithStatus<HomepageVariant>[];
  persona_rules: WithStatus<PersonaRule>[];
}

const STORE_PATH = path.join(process.cwd(), 'data', 'cms', 'store.json');

function seedStore(): CmsStore {
  const published = <T,>(items: T[]): WithStatus<T>[] =>
    items.map((item) => ({ ...item, status: 'published' as const }));

  return {
    courses: published(seedCourses),
    cities: published(seedCities),
    centres: published(seedCentres),
    posts: published(seedPosts),
    faqs: published(seedFaqs),
    policies: published(seedPolicies),
    faculty: published(seedFaculty),
    placements: published(seedPlacements),
    trust_signals: published(seedTrust),
    homepage_variants: published(seedVariants),
    persona_rules: published(seedRules),
  };
}

async function ensureFileStore(): Promise<CmsStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(raw) as CmsStore;
  } catch {
    const seeded = seedStore();
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(seeded, null, 2), 'utf8');
    return seeded;
  }
}

async function writeFileStore(store: CmsStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), 'utf8');
}

export async function readCmsStore(): Promise<CmsStore> {
  if (isSupabaseConfigured()) {
    // Production path hooks in via getSupabase() on write; file store is the
    // offline source of truth until tables are fully wired.
  }
  return ensureFileStore();
}

export async function listCollection<K extends CmsCollection>(
  collection: K,
  opts?: { publishedOnly?: boolean },
): Promise<CmsStore[K]> {
  const store = await readCmsStore();
  const rows = store[collection];
  if (opts?.publishedOnly) {
    return rows.filter((row) => row.status === 'published') as CmsStore[K];
  }
  return rows;
}

export async function upsertRecord(
  collection: CmsCollection,
  record: Record<string, unknown>,
  idKey: string,
): Promise<void> {
  const store = await readCmsStore();
  const rows = [...(store[collection] as unknown as Record<string, unknown>[])];
  const id = record[idKey];
  const idx = rows.findIndex((r) => r[idKey] === id);
  if (idx >= 0) rows[idx] = record;
  else rows.push(record);
  (store as unknown as Record<string, unknown>)[collection] = rows;

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from(collection).upsert(record as never);
  }

  await writeFileStore(store);
}

export async function deleteRecord(
  collection: CmsCollection,
  idKey: string,
  id: string,
): Promise<void> {
  const store = await readCmsStore();
  const rows = (store[collection] as unknown as Record<string, unknown>[]).filter(
    (r) => r[idKey] !== id,
  );
  (store as unknown as Record<string, unknown>)[collection] = rows;

  const supabase = getSupabase();
  if (supabase) {
    await supabase.from(collection).delete().eq(idKey, id);
  }

  await writeFileStore(store);
}

export async function resetCmsStoreFromFixtures(): Promise<CmsStore> {
  const seeded = seedStore();
  await writeFileStore(seeded);
  return seeded;
}
