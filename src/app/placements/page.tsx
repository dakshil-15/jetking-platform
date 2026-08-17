import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import {
  Breadcrumbs,
  ButtonLink,
  JsonLd,
  Section,
  SectionHead,
  Stat,
  type Crumb,
} from '@/components/ui';
import { Disclosure } from '@/components/Disclosure';
import { FeeDepthTracker } from './FeeDepthTracker';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Placement Support at Jetking — What It Includes',
    description:
      'What Jetking placement support covers: interview preparation, profile building and employer introductions. Written for students and parents evaluating the programme.',
  },
  '/placements',
);

const INCLUDES = [
  {
    title: 'Interview preparation',
    body: 'Mock interviews, technical question practice, and feedback on how you explain what you have built.',
  },
  {
    title: 'Profile building',
    body: 'Help turning coursework and projects into a profile an employer can actually assess.',
  },
  {
    title: 'Employer introductions',
    body: 'Introductions to hiring employers in your region through the centre’s relationships.',
  },
];

export default async function PlacementsPage() {
  const faqs = await content.listFaqs();
  const relevant = faqs.filter((f) => f.topic === 'placement' || f.topic === 'fees');

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Placements', path: '/placements' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <FeeDepthTracker />

      {/* ── Masthead ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="shell py-14 lg:py-20">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 max-w-3xl">
            <p className="label-mono text-jk-600">Outcomes</p>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              Placement support, described honestly
            </h1>
            <p className="lede mt-6">
              Placement support is real work that Jetking does on a learner&rsquo;s behalf.
              It is not a guarantee, and any institute that offers you one is telling you
              something it cannot control.
            </p>
          </div>
        </div>
      </section>

      {/* ── What it includes ─────────────────────────────────────────────── */}
      <Section>
        <SectionHead eyebrow="What it includes" title="Three things, done properly" />
        <ol className="mt-12 grid gap-x-10 gap-y-8 border-t border-border sm:grid-cols-3">
          {INCLUDES.map((item, index) => (
            <li key={item.title} className="border-t border-transparent pt-7 sm:border-t-0">
              <span className="label-mono numeral">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-xl">{item.title}</h3>
              <p className="mt-3 text-base text-foreground-secondary">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── The honest part ──────────────────────────────────────────────── */}
      <Section tone="inverse">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            eyebrow="Being straight with you"
            title="What we will not claim"
            lede="Outcomes depend on the programme, the centre, the local employer market and — most of all — the individual learner. A counsellor can tell you what the centre you are considering has actually achieved."
          />
          <div>
            <dl className="grid gap-8 sm:grid-cols-2">
              <Stat value="0" label="Guaranteed placements" note="We do not offer them" />
              <Stat value="0" label="Guaranteed salaries" note="Nobody can promise this" />
            </dl>
            <div className="mt-10">
              <ButtonLink href="/enquiry" tone="secondary" size="lg">
                Ask about a specific centre
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Questions ────────────────────────────────────────────────────── */}
      {relevant.length ? (
        <Section>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <SectionHead eyebrow="Questions" title="Placement and fees" />
            <div>
              {relevant.map((faq) => (
                <Disclosure key={faq.id} tone="flush" summary={faq.question}>
                  <p className="measure text-base">{faq.answer}</p>
                </Disclosure>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}
