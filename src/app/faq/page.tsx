import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import { Breadcrumbs, JsonLd, Section, SectionHead, type Crumb } from '@/components/ui';
import { Disclosure } from '@/components/Disclosure';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Frequently Asked Questions | Jetking',
    description:
      'Answers about Jetking admissions, eligibility, fees policy, course durations, centres and placement support.',
  },
  '/faq',
);

const TOPIC_LABELS: Record<string, string> = {
  admissions: 'Admissions',
  courses: 'Courses',
  fees: 'Fees',
  placement: 'Placement',
  centres: 'Centres',
  franchise: 'Franchise',
};

export default async function FaqPage() {
  const faqs = await content.listFaqs();
  const topics = [...new Set(faqs.map((f) => f.topic))];

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <>
      <JsonLd data={[faqSchema(faqs), breadcrumbSchema(trail)]} />

      <Section>
        <Breadcrumbs trail={trail} />
        <div className="mt-8">
          <SectionHead
            eyebrow="FAQ"
            title="Questions people ask us most"
            as="h1"
            lede="These answers are also what the Jetking Guide draws on — it answers from this content, not from general knowledge."
          />
        </div>

        {/*
          Answers are revealed on interaction but never conditionally rendered —
          Disclosure collapses with height, so the full Q&A is still in the HTML and
          still backs the FAQPage structured data emitted above.
        */}
        <div className="mt-16 space-y-16">
          {topics.map((topic) => {
            const topicFaqs = faqs.filter((f) => f.topic === topic);
            return (
              <section key={topic} className="grid gap-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
                <div>
                  <h2 className="text-2xl sm:text-3xl">{TOPIC_LABELS[topic] ?? topic}</h2>
                  <p className="label-mono numeral mt-2">
                    {topicFaqs.length} {topicFaqs.length === 1 ? 'question' : 'questions'}
                  </p>
                </div>
                <div className="border-t border-border">
                  {topicFaqs.map((faq) => (
                    <Disclosure key={faq.id} tone="flush" summary={faq.question}>
                      <p className="measure text-base">{faq.answer}</p>
                    </Disclosure>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}
