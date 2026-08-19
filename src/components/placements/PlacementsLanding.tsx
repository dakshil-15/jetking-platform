import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, BookOpenCheck, MessagesSquare, Users, Award, Briefcase } from 'lucide-react';
import { Breadcrumbs, type Crumb } from '@/components/ui';
import { Disclosure } from '@/components/Disclosure';
import type { Faq } from '@/lib/content/types';
import { PlacementsTestimonialSlider } from './PlacementsTestimonialSlider';
import {
  PLACEMENTS_HERO,
  PLACEMENT_DISCLAIMER,
  PROCESS_STEPS,
  STUDENT_BENEFITS,
  PLACED_CANDIDATES,
  TESTIMONIALS,
  PLACEMENTS_CONTACT,
} from './data';

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Placements', path: '/placements' },
];

const BENEFIT_ICONS = [BookOpenCheck, MessagesSquare, Users, Award] as const;

export function PlacementsLanding({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="dark-canvas pb-16 sm:pb-20 lg:pb-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="shell relative pt-6 sm:pt-8" data-reveal-skip>
        <Breadcrumbs trail={trail} />

        <div className="relative mt-5 sm:mt-6">
          <div className="dc-banner relative min-h-[min(78vw,420px)] overflow-hidden rounded-[24px] xs:min-h-[400px] xs:rounded-[28px] sm:min-h-[460px] sm:rounded-[32px] lg:min-h-[520px]">
            <Image
              src="/home/journey-professional-v2.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_28%]"
            />
            <div
              aria-hidden="true"
              className="dc-banner-wash pointer-events-none absolute inset-0"
            />

            <div className="relative z-[1] flex h-full min-h-[inherit] flex-col justify-end px-6 py-10 xs:px-8 xs:py-12 sm:justify-center sm:px-10 sm:py-14 lg:max-w-[62%] lg:px-12 lg:py-16 xl:px-14">
              <p className="dc-eyebrow label-mono">{PLACEMENTS_HERO.eyebrow}</p>

              <h1 className="dc-heading-glow mt-4 font-display text-[32px] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance text-[var(--dc-ink)] xs:text-[38px] sm:mt-5 sm:text-[44px] md:text-[48px] lg:text-[52px]">
                {PLACEMENTS_HERO.titleLead}{' '}
                <span className="dc-accent-glow">{PLACEMENTS_HERO.titleAccent}</span>
              </h1>

              <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] text-[var(--dc-ink-secondary)] xs:text-[15.5px] sm:mt-5 sm:text-[16px]">
                {PLACEMENTS_HERO.lede}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <Link
                  href={'/enquiry' as Route}
                  className="dc-cta inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-bold sm:h-14 sm:px-7 sm:text-base"
                >
                  Talk to a counsellor
                </Link>
                <a
                  href={PLACEMENTS_CONTACT.tel}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--dc-hairline-strong)] bg-[var(--dc-card)] px-6 text-sm font-bold text-[var(--dc-ink)] transition-colors hover:border-[var(--dc-accent-soft)] sm:h-14 sm:px-7 sm:text-base"
                >
                  Call {PLACEMENTS_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Honest disclaimer — load-bearing, not decorative ─────────────── */}
      <section className="shell relative mt-8 sm:mt-10">
        <div className="dc-panel rounded-[18px] px-5 py-5 sm:rounded-[20px] sm:px-6 sm:py-6">
          <p className="text-[13.5px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[14.5px]">
            {PLACEMENT_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-process">
        <p className="dc-eyebrow label-mono">How it works</p>
        <h2
          id="placements-process"
          className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px]"
        >
          Five steps from <span className="dc-accent-glow">classroom to offer</span>
        </h2>

        <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {PROCESS_STEPS.map((item) => (
            <li key={item.step}>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6">
                  <span className="numeral text-[13px] font-bold tracking-[0.14em] text-[var(--dc-accent-soft)]">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-[16px] font-extrabold tracking-[-0.01em] text-[var(--dc-ink)] sm:text-[17px]">
                    {item.title}
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Student benefits ─────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-benefits">
        <div className="dc-panel overflow-hidden rounded-[24px] px-6 py-10 xs:rounded-[28px] sm:px-10 sm:py-12">
          <p className="dc-eyebrow label-mono">What you build</p>
          <h2
            id="placements-benefits"
            className="dc-heading-glow mt-3 font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] xs:text-[28px] sm:text-[32px]"
          >
            What placement preparation covers
          </h2>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4 sm:gap-5">
            {STUDENT_BENEFITS.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index] ?? Award;
              return (
                <li key={benefit} className="text-center">
                  <span
                    aria-hidden="true"
                    className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[var(--dc-accent-tint)] text-[var(--dc-accent-soft)]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-3 text-[13.5px] font-semibold text-[var(--dc-ink)] sm:text-[14px]">
                    {benefit}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Placement record ─────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-record">
        <p className="dc-eyebrow label-mono">Placement record</p>
        <h2
          id="placements-record"
          className="dc-heading-glow mt-3 max-w-[24ch] font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px]"
        >
          A sample of learners <span className="dc-accent-glow">Jetking has placed</span>
        </h2>
        <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[16px]">
          Published placement records from Jetking centres — not an exhaustive list, and not a
          forecast of what any individual learner will be offered.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {PLACED_CANDIDATES.map((candidate) => (
            <li
              key={candidate.name}
              className="dc-panel flex items-center gap-3 rounded-[14px] px-4 py-3.5"
            >
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--dc-accent-tint)] text-[var(--dc-accent-soft)]"
              >
                <Briefcase className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                <span className="truncate text-[14px] font-semibold text-[var(--dc-ink)]">
                  {candidate.name}
                </span>
                <span className="shrink-0 text-[13px] font-bold text-[var(--dc-accent-soft)]">
                  {candidate.company}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-testimonials">
        <p className="dc-eyebrow label-mono">In their words</p>
        <h2
          id="placements-testimonials"
          className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px]"
        >
          What placed learners <span className="dc-accent-glow">say</span>
        </h2>

        <div className="mt-10 sm:mt-12">
          <PlacementsTestimonialSlider testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ── Questions ─────────────────────────────────────────────────────── */}
      {faqs.length ? (
        <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-faq">
          <p className="dc-eyebrow label-mono">Questions</p>
          <h2
            id="placements-faq"
            className="dc-heading-glow mt-3 font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] sm:text-[28px]"
          >
            Placement and fees
          </h2>
          <div className="mt-8 sm:mt-10">
            {faqs.map((faq) => (
              <Disclosure key={faq.id} tone="flush" summary={faq.question}>
                <p className="measure text-base">{faq.answer}</p>
              </Disclosure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Close CTA ─────────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="placements-cta">
        <div className="dc-panel overflow-hidden rounded-[24px] xs:rounded-[28px] sm:rounded-[32px]">
          <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-10 xl:px-12">
            <div className="max-w-2xl">
              <p className="dc-eyebrow label-mono">Next step</p>
              <h2
                id="placements-cta"
                className="dc-heading-glow mt-3 font-display text-[24px] font-extrabold tracking-[-0.025em] text-[var(--dc-ink)] xs:text-[26px] sm:text-[30px]"
              >
                Ask about a <span className="dc-accent-glow">specific centre</span>
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[15px]">
                A counsellor can tell you what your nearest centre has actually achieved — not a
                sitewide average.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={`mailto:${PLACEMENTS_CONTACT.email}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--dc-hairline-strong)] px-6 text-sm font-bold text-[var(--dc-ink)] transition-colors hover:border-[var(--dc-accent-soft)]"
              >
                {PLACEMENTS_CONTACT.email}
              </a>
              <Link
                href={'/enquiry' as Route}
                className="group/cta dc-cta inline-flex min-h-12 items-center justify-center gap-3 rounded-full py-3.5 pr-3 pl-7 text-[15px] font-bold sm:text-[16px]"
              >
                Talk to a counsellor
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
