import type { Metadata } from 'next';
import { Suspense } from 'react';
import { content } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/ui';
import { EnquiryForm } from './EnquiryForm';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Enquire About a Jetking Course',
    description:
      'Send an enquiry and a Jetking counsellor will get in touch about courses, fees, centres and admissions.',
    // Thin, transactional, and duplicated in intent across the funnel — kept out of
    // the index deliberately. It is a conversion page, not a ranking page.
    noindex: true,
  },
  '/enquiry',
);

export default async function EnquiryPage() {
  const [courses, cities] = await Promise.all([content.listCourses(), content.listCities()]);

  return (
    <Section>
      <div className="mx-auto max-w-xl">
        <p className="label-mono text-jk-600">Enquiry</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Talk to a counsellor</h1>
        <p className="lede mt-5">
          Tell us a little about what you are looking for. A counsellor from your nearest
          centre will get in touch — usually within one working day.
        </p>

        <div className="mt-10">
          <Suspense fallback={<p className="text-sm text-foreground-muted">Loading form…</p>}>
            <EnquiryForm
              courses={courses.map((c) => ({ slug: c.slug, title: c.shortTitle }))}
              cities={cities.map((c) => ({ slug: c.slug, name: c.name }))}
            />
          </Suspense>
        </div>
      </div>
    </Section>
  );
}
