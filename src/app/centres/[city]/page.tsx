import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { centrePath } from '@/lib/centre-path';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import {
  Breadcrumbs,
  IndexRow,
  JsonLd,
  Section,
  type Crumb,
} from '@/components/ui';
import { AdaptiveNudge } from '@/persona/AdaptiveSlot';
import { CentreDetail } from '@/components/CentreDetail';
import type { City } from '@/lib/content/types';

/**
 * City or centre page — `/centres/{segment}`.
 *
 * The live jetking.com site uses flat centre URLs (`/centres/ameerpet`). City
 * landing pages (`/centres/mumbai`) use the same segment shape. Resolution order:
 * city slug first, then centre slug.
 */

export async function generateStaticParams() {
  const [cities, centres] = await Promise.all([content.listCities(), content.listCentres()]);
  const citySlugs = cities.map((city) => ({ city: city.slug }));
  const centreSlugs = centres
    .filter((centre) => !cities.some((city) => city.slug === centre.slug))
    .map((centre) => ({ city: centre.slug }));
  return [...citySlugs, ...centreSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: segment } = await params;

  const city = await content.getCity(segment);
  if (city) return buildMetadata(city.seo, `/centres/${city.slug}`);

  const centre = await content.getCentreBySlug(segment);
  if (!centre) return {};

  return buildMetadata(centre.seo, centrePath(centre.slug));
}

export default async function CentresSegmentPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: segment } = await params;

  const city = await content.getCity(segment);
  if (city) return <CityPageContent city={city} />;

  const centre = await content.getCentreBySlug(segment);
  if (!centre) notFound();

  const [parentCity, courses, cityCentres] = await Promise.all([
    content.getCity(centre.citySlug),
    content.listCourses(),
    content.listCentres({ citySlug: centre.citySlug }),
  ]);
  if (!parentCity) notFound();

  return (
    <CentreDetail
      centre={centre}
      city={parentCity}
      courses={courses}
      siblingCentres={cityCentres}
      canonicalPath={centrePath(centre.slug)}
    />
  );
}

async function CityPageContent({ city }: { city: City }) {
  const [cityCentres, courses] = await Promise.all([
    content.listCentres({ citySlug: city.slug }),
    content.listCourses(),
  ]);

  const offeredSlugs = new Set(cityCentres.flatMap((c) => c.coursesOffered));
  const offeredCourses = courses.filter((c) => offeredSlugs.has(c.slug));

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Centres', path: '/centres' },
    { name: city.name, path: `/centres/${city.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <section className="border-b border-border">
        <div className="shell py-12 lg:py-16">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 max-w-3xl">
            <p className="label-mono text-jk-600">{city.state}</p>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              IT courses in {city.name}
            </h1>
            <p className="lede mt-6">{city.intro}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-2xl">
          <AdaptiveNudge
            id="city-nudge"
            reserve="standard"
            variants={{
              student: {
                headline: `Starting after 12th in ${city.name}?`,
                body: 'The BCA degree track runs at centres here.',
                ctaLabel: 'See the degree',
                ctaHref: '/courses',
              },
              professional: {
                headline: 'Studying alongside work?',
                body: `Ask which ${city.name} centres run evening batches.`,
                ctaLabel: 'Ask a counsellor',
                ctaHref: '/enquiry',
              },
              parent: {
                headline: 'Want to visit a centre before deciding?',
                body: 'A counsellor can arrange a centre visit.',
                ctaLabel: 'Arrange a visit',
                ctaHref: '/enquiry',
              },
              franchise: {
                headline: `Interested in a centre in ${city.name}?`,
                ctaLabel: 'Franchise enquiry',
                ctaHref: '/franchise',
              },
            }}
          />
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <section>
            <div className="flex items-baseline justify-between gap-4 rule-bottom">
              <h2 className="text-2xl sm:text-3xl">Centres in {city.name}</h2>
              <span className="label-mono numeral">{cityCentres.length}</span>
            </div>
            <ul>
              {cityCentres.map((centre) => (
                <IndexRow
                  key={centre.slug}
                  href={centrePath(centre.slug)}
                  title={centre.name}
                  meta={`${centre.locality} · ${centre.pincode}`}
                />
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-baseline justify-between gap-4 rule-bottom">
              <h2 className="text-2xl sm:text-3xl">Programmes available here</h2>
              <span className="label-mono numeral">{offeredCourses.length}</span>
            </div>
            <ul>
              {offeredCourses.map((course) => (
                <IndexRow
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  title={course.shortTitle}
                  trailing={course.duration}
                  numeric
                />
              ))}
            </ul>
          </section>
        </div>
      </Section>
    </>
  );
}
