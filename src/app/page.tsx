import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { content } from '@/lib/content';
import { loadHomeData } from '@/components/home/data';
import { Hero } from '@/components/home/v3/Hero';
import { HomeSections } from '@/components/home/v3/HomeSections';

export const metadata: Metadata = buildMetadata(
  {
    title: `${siteConfig.name} — Cloud, Cyber Security & IT Courses`,
    description:
      'Degree, diploma and certification programmes in cloud computing, cyber security and IT infrastructure — taught at Jetking centres across India.',
  },
  '/',
);

/**
 * The homepage.
 *
 * `Hero` (v3/) is the lead: headline, CTAs, photo and summary bar. `HomeSections` (v3/) is
 * everything below it, ending in the site's normal footer (see `FooterChrome`).
 */
export default async function HomePage() {
  const [data, centres] = await Promise.all([loadHomeData(), content.listCentres()]);
  const enquiryCentres = centres.map((c) => ({
    slug: c.slug,
    name: c.name,
    citySlug: c.citySlug,
    state: c.state,
  }));

  return (
    <>
      <ScrollDepthTracker />
      <Hero centres={enquiryCentres} />
      <HomeSections data={data} enquiryCentres={enquiryCentres} />
    </>
  );
}
