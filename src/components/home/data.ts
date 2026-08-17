import 'server-only';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { content } from '@/lib/content';
import type { HomepageVariant, TrustSignal } from '@/lib/content/types';

/**
 * One content read, shared by both homepage leads.
 *
 * The homepage is now the lead and nothing else — no programme index, no city
 * list, no articles, no FAQ. So this loads only what a lead can actually show:
 * catalogue counts for the figures, verified trust signals, and the CMS variant
 * that supplies the hero image and video.
 *
 * Counts, not records. The leads never iterate the catalogue, so shipping the
 * whole of it into the render tree would be waste.
 */
export interface HomeData {
  counts: { courses: number; centres: number; cities: number };
  /** Verified signals only — unverified claims never leave the content source. */
  trust: TrustSignal[];
  variants: HomepageVariant[];
  /** Resolved lead photograph, or `undefined` to render the labelled frame. */
  heroImage?: string;
}

/**
 * Where a lead's imagery comes from.
 *
 * The CMS wins: whatever `banner.imageUrl` the default homepage variant carries is
 * what ships in the portrait slot. Otherwise we fall back to files dropped under
 * `public/home/`, so swapping artwork is a file copy rather than a code change —
 * which matters because the person with the photograph is not usually the person
 * with the repo.
 *
 * Resolved once at module scope: `public/` is fixed for the lifetime of a build,
 * so there is nothing to re-check per request.
 */
const IMAGE_EXTENSIONS = ['avif', 'webp', 'jpg', 'jpeg', 'png'] as const;

function droppedImage(basename: string): string | undefined {
  for (const ext of IMAGE_EXTENSIONS) {
    if (existsSync(join(process.cwd(), 'public', 'home', `${basename}.${ext}`))) {
      return `/home/${basename}.${ext}`;
    }
  }
  return undefined;
}

const heroPortrait = droppedImage('hero');

export async function loadHomeData(): Promise<HomeData> {
  const [courses, cities, centres, trust, variants] = await Promise.all([
    content.listCourses(),
    content.listCities(),
    content.listCentres(),
    content.listTrustSignals(),
    content.listHomepageVariants(),
  ]);

  const defaultVariant = variants.find((v) => v.id === 'default') ?? variants[0];

  return {
    counts: { courses: courses.length, centres: centres.length, cities: cities.length },
    trust,
    variants,
    heroImage: defaultVariant?.banner?.imageUrl ?? heroPortrait,
  };
}
