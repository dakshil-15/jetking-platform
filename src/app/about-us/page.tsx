import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import {
  Breadcrumbs,
  ButtonLink,
  JsonLd,
  Section,
  SectionHead,
  type Crumb,
} from '@/components/ui';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata(
  {
    title: `About ${siteConfig.name} — 79 Years of IT Education`,
    description:
      'Jetking is India\'s foremost computer networking and IT training institute with 79 years of legacy, 100+ centres and placement support for students across India.',
  },
  '/about-us',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
];

const VALUES = [
  'Quality',
  'Trust',
  'Self-motivation',
  'Innovation',
  'Hands-on learning',
  'Equanimity',
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/* Masthead */}
      <section className="border-b border-border">
        <div className="shell py-14 lg:py-20">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 max-w-3xl">
            <p className="label-mono text-jk-600">Since 1947</p>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              A 79-year legacy moulding the innovators of the future
            </h1>
            <p className="lede mt-6">
              India&rsquo;s foremost IT training institute, committed to creating better outcomes
              for students, franchise partners, recruiters and investors.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <Section>
        <SectionHead
          eyebrow="Our Purpose"
          title="Vision and mission"
          lede="Driven by a commitment to transform lives through IT education and employment generation."
        />
        <div className="mt-12 grid gap-8 border-t border-border sm:grid-cols-2">
          <div className="pt-7">
            <h3 className="text-lg font-semibold">Our vision</h3>
            <p className="mt-3 text-base text-foreground-secondary">
              To provide economic independence to 10 million people in India and overseas.
            </p>
          </div>
          <div className="pt-7">
            <h3 className="text-lg font-semibold">Our mission</h3>
            <p className="mt-3 text-base text-foreground-secondary">
              To become a world-class engine for employment generation through an efficient
              partnership network.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="sunken">
        <SectionHead
          eyebrow="What drives us"
          title="Our core values"
          lede="These principles guide every decision we make and shape how we work with students, partners, and communities."
        />
        <ul className="mt-12 flex flex-wrap gap-3">
          {VALUES.map((value) => (
            <li
              key={value}
              className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground-secondary"
            >
              {value}
            </li>
          ))}
        </ul>
      </Section>

      {/* Teaching Methodology */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHead
            eyebrow="Our Approach"
            title="SmartLabPlus teaching"
            lede="A proven methodology that combines practical learning with real-world industry standards."
          />
          <div>
            <p className="text-base text-foreground-secondary">
              Practical, scenario-based learning with one computer per student, certified faculty
              and placement coordination from day one — the methodology that has trained over 12
              lakh students across 100+ centres.
            </p>
            <p className="mt-6 text-sm text-foreground-muted">
              Every programme emphasises hands-on learning, industry-relevant skills, and direct
              employer connections. This approach ensures that students graduate job-ready and
              equipped for real-world challenges.
            </p>
            <ButtonLink href="/courses" className="mt-8">
              Explore programmes
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Scale & Reach */}
      <Section tone="inverse">
        <SectionHead
          eyebrow="By the numbers"
          title="Our reach and impact"
          lede="79 years of continuous growth and education excellence across India."
          align="center"
        />
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <p className="numeral text-4xl font-bold text-foreground">79</p>
            <p className="mt-2 text-base font-semibold text-foreground">Years</p>
            <p className="mt-1 text-sm text-foreground-secondary">of IT education excellence</p>
          </div>
          <div className="text-center">
            <p className="numeral text-4xl font-bold text-foreground">100+</p>
            <p className="mt-2 text-base font-semibold text-foreground">Centres</p>
            <p className="mt-1 text-sm text-foreground-secondary">across India</p>
          </div>
          <div className="text-center">
            <p className="numeral text-4xl font-bold text-foreground">12L+</p>
            <p className="mt-2 text-base font-semibold text-foreground">Students</p>
            <p className="mt-1 text-sm text-foreground-secondary">trained and placed</p>
          </div>
        </dl>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/enquiry" tone="secondary" size="lg">
            Get to know a centre near you
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
