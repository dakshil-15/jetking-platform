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
 * The homepage — "Future-Ready".
 *
 * The page is the lead and nothing else. No FAQ schema is emitted, because there is
 * no FAQ on the page to describe. Unlike every other route, this one has no footer
 * (see FooterChrome) — the hero is a full-viewport design meant to end at the fold —
 * so its course, city and company links reach crawlers via sitemap.xml instead.
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
