import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { loadHomeData } from '@/components/home/data';
import { HomeV1 } from '@/components/home/v1/HomeV1';

/**
 * Homepage lead v1, "Journey Lead" — the alternate index page.
 *
 * `noindex` with a canonical back to `/`: this is the homepage's job under a second
 * URL, and two crawlable copies of the site's highest-authority page competing for
 * the same query is precisely the duplication the migration is guarding against. It
 * is absent from sitemap.ts for the same reason — a noindex URL in the sitemap is a
 * contradictory signal — and disallowed in robots.ts so no crawl budget is spent
 * discovering it.
 *
 * Promote it by swapping the import and element in src/app/page.tsx with the ones
 * here, and moving the noindex block the other way.
 */
export const metadata: Metadata = buildMetadata(
  {
    title: `Homepage v1 — ${siteConfig.name}`,
    description: 'Alternate homepage lead, kept for side-by-side comparison.',
    canonicalPath: '/',
    noindex: true,
  },
  '/v2',
);

export default async function HomeV1AltPage() {
  const data = await loadHomeData();

  return (
    <>
      <ScrollDepthTracker />
      <HomeV1 data={data} />
    </>
  );
}
