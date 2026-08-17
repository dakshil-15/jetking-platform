import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { loadHomeData } from '@/components/home/data';
import { HomeV2 } from '@/components/home/v2/HomeV2';

export const metadata: Metadata = buildMetadata(
  {
    title: `${siteConfig.name} — Cloud, Cyber Security & IT Courses`,
    description:
      'Degree, diploma and certification programmes in cloud computing, cyber security and IT infrastructure — taught at Jetking centres across India.',
  },
  '/',
);

/**
 * The homepage — lead v2, "Future-Ready".
 *
 * Two leads ship in the repo, one per imported design file (src/components/home).
 * v2 is live here; v1, "Journey Lead", is at /v2. Swapping them is a two-line
 * change: the import and the element below, plus the mirror of it in
 * src/app/v2/page.tsx. There is no env flag and no runtime branch, because a
 * homepage that renders differently depending on deploy configuration is a homepage
 * nobody can reason about.
 *
 * The page is the lead and nothing else. No FAQ schema is emitted, because there is
 * no FAQ on the page to describe — the site's course, city and company links reach
 * crawlers through the footer in the root layout, which renders on every route.
 */
export default async function HomePage() {
  const data = await loadHomeData();

  return (
    <>
      <ScrollDepthTracker />
      <HomeV2 data={data} />
    </>
  );
}
