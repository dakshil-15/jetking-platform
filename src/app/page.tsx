import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { content } from '@/lib/content';
import { loadHomeData } from '@/components/home/data';
import { HomeV2 } from '@/components/home/v2/HomeV2';
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
 * The homepage — "Future-Ready".
 *
 * `HomeV2` is the hero lead (persona hexagons, quick actions). `HomeSections` (v3/) is
 * everything below it — trust figures, programmes, differentiators, career paths,
 * centres, credibility logos, success stories, the enrolment journey, a blog teaser and
 * a final CTA — ending in the site's normal footer (see `FooterChrome`; `/` is no
 * longer excluded from it).
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
      {/*
       * `ActionRail` inside `HomeV2` (Find Center / Call / Book Counselling) is
       * `position: fixed`, vertically centred on the *viewport* — fine when the hero
       * was the whole page, but with a full section stack and footer below it now,
       * an uncontained `fixed` element stays pinned over all of it for the entire
       * scroll. `[transform:translateZ(0)]` gives this wrapper its own containing
       * block for fixed-position descendants (any of transform/filter/will-change
       * does this per spec), so the rail is positioned — and, combined with
       * `overflow-hidden`, clipped — relative to this wrapper's own box instead of
       * the viewport. It now scrolls away with the hero instead of floating over
       * every section below it, with no gutter needed elsewhere on the page.
       */}
      <div className="relative overflow-hidden [transform:translateZ(0)]">
        <HomeV2 data={data} enquiryCentres={enquiryCentres} />
      </div>
      <HomeSections data={data} enquiryCentres={enquiryCentres} />
    </>
  );
}
