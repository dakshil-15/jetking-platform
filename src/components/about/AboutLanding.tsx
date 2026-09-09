import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import {
  Award,
  Building2,
  Handshake,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Breadcrumbs, type Crumb } from '@/components/ui';
import {
  ABOUT_HERO,
  ACHIEVEMENTS,
  DIRECTORS,
  INDEPENDENT_DIRECTOR,
  LEGACY_STATS,
  MANAGEMENT_TEAM,
  PARTNERSHIPS,
  PURPOSE,
  VALUES,
  type Leader,
} from './data';
import { AboutTimeline } from './AboutTimeline';
import { LeaderAvatar } from './LeaderAvatar';
import { LeaderDetailModal } from './LeaderDetailModal';

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
];

const STAT_ICONS = [Award, Users, Building2, ShieldCheck] as const;

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <li data-reveal>
      <article className="dc-card-shell h-full">
        <div className="dc-card flex h-full flex-col p-5 sm:p-6">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[var(--dc-surface)] ring-1 ring-[var(--dc-hairline)] sm:h-32 sm:w-32">
            <LeaderAvatar leader={leader} />
          </div>
          <div className="mt-5 flex flex-1 flex-col text-center">
            <h3 className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] sm:text-[20px]">
              {leader.name}
            </h3>
            <p className="mt-1 text-[13px] font-bold text-[var(--dc-accent-soft)]">{leader.role}</p>
            {leader.bio ? <LeaderDetailModal leader={leader} /> : null}
          </div>
        </div>
      </article>
    </li>
  );
}

export function AboutLanding() {
  return (
    <div className="dark-canvas pb-16 sm:pb-20 lg:pb-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="shell relative pt-6 sm:pt-8" data-reveal-skip>
        <Breadcrumbs trail={trail} />

        <div className="relative mt-5 sm:mt-6">
          <div className="dc-banner relative min-h-[min(78vw,420px)] overflow-hidden rounded-[24px] xs:min-h-[400px] xs:rounded-[28px] sm:min-h-[460px] sm:rounded-[32px] lg:min-h-[520px]">
            <Image
              src="/home/journey-explore-v2.jpg"
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
              <p className="dc-eyebrow label-mono">{ABOUT_HERO.eyebrow}</p>

              <h1 className="dc-heading-glow mt-4 font-display text-[34px] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance text-[var(--dc-ink)] xs:text-[40px] sm:mt-5 sm:text-[48px] md:text-[52px] lg:text-[56px]">
                <span className="dc-accent-glow">{ABOUT_HERO.titleLead}</span>
                <span className="mt-1 block sm:mt-1.5">{ABOUT_HERO.titleAccent}</span>
              </h1>

              <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] text-[var(--dc-ink-secondary)] xs:text-[15.5px] sm:mt-5 sm:text-[16px]">
                {ABOUT_HERO.lede}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                <Link
                  href={'/centres' as Route}
                  className="dc-cta inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-bold sm:h-14 sm:px-7 sm:text-base"
                >
                  Find a centre
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Legacy stats ─────────────────────────────────────────────────── */}
      <section className="shell relative mt-8 sm:mt-10" aria-label="Legacy at a glance">
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {LEGACY_STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index] ?? Award;
            return (
              <div
                key={stat.label}
                className="dc-panel rounded-[20px] px-4 py-5 sm:rounded-[24px] sm:px-5 sm:py-6"
                data-reveal
              >
                <Icon
                  className="h-5 w-5 text-[var(--dc-accent-soft)]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="mt-3 block font-display text-[28px] leading-none font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] sm:text-[32px]">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[13px] font-semibold text-[var(--dc-ink-muted)]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* ── Purpose & values ─────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-purpose">
        <p className="dc-eyebrow label-mono">Purpose</p>
        <h2
          id="about-purpose"
          className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px] lg:text-[40px]"
        >
          Our purpose &amp;{' '}
          <span className="dc-accent-glow">values</span>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[16px]">
          What we aim for, how we work, and the standards we hold ourselves to.
        </p>

        <ol className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {PURPOSE.map((item, index) => (
            <li key={item.title} data-reveal>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6 lg:p-7">
                  <span className="numeral text-[13px] font-bold tracking-[0.14em] text-[var(--dc-accent-soft)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-[20px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] sm:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <ul className="mt-8 flex flex-wrap gap-2.5 sm:mt-10">
          {VALUES.map((value) => (
            <li
              key={value}
              className="rounded-full border border-[var(--dc-hairline)] bg-[var(--dc-card)] px-3.5 py-1.5 text-[12.5px] font-bold tracking-[0.04em] text-[var(--dc-ink-secondary)] uppercase"
            >
              {value}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Leadership ───────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-leaders">
        <p className="dc-eyebrow label-mono">Leadership</p>
        <h2
          id="about-leaders"
          className="dc-heading-glow mt-3 max-w-[20ch] font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px] lg:text-[40px]"
        >
          The leaders who drive our{' '}
          <span className="dc-accent-glow">growth</span>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[16px]">
          Learn from passionate instructors with expertise who believe in practical teaching
          methodologies.
        </p>

        <ul className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-4 lg:gap-6">
          {DIRECTORS.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </ul>

        <h3 className="mt-14 font-display text-[20px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] sm:mt-16 sm:text-[22px]">
          Management team
        </h3>
        <ul className="mt-8 grid gap-5 sm:mt-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {MANAGEMENT_TEAM.map((leader) => (
            <LeaderCard key={leader.name} leader={leader} />
          ))}
        </ul>

        <ul className="mt-5 grid gap-5 sm:max-w-xs">
          <LeaderCard leader={INDEPENDENT_DIRECTOR} />
        </ul>
      </section>

      {/* ── Legacy timeline ──────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-timeline">
        <p className="dc-eyebrow label-mono">History</p>
        <h2
          id="about-timeline"
          className="dc-heading-glow mt-3 max-w-[22ch] font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px] lg:text-[40px]"
        >
          A legacy that we take{' '}
          <span className="dc-accent-glow">pride in</span>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[16px]">
          Over the course of decades, we have achieved some glorious feats. Check out the
          timeline of how our journey unfolded.
        </p>

        {/*
          Alternating curved-branch timeline (styles in styles/about.css). The
          client component adds the GSAP scroll-scrubbed spine fill + per-milestone
          reveals; it collapses to a left-spine stack on phones.
        */}
        <AboutTimeline />
      </section>

      {/* ── Achievements ─────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-awards">
        <p className="dc-eyebrow label-mono">Recognition</p>
        <h2
          id="about-awards"
          className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px] lg:text-[40px]"
        >
          Our <span className="dc-accent-glow">achievements</span>
        </h2>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[16px]">
          Over the decades, we’ve accomplished remarkable milestones. Explore the timeline that
          showcases how our journey has evolved.
        </p>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {ACHIEVEMENTS.map((item) => (
            <li key={item.title} data-reveal>
              <article className="dc-panel flex h-full flex-col rounded-[20px] p-5 sm:rounded-[22px] sm:p-6">
                <div className="relative flex h-36 w-full items-center justify-center sm:h-40 lg:h-44">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    width={320}
                    height={320}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw"
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="mt-5 font-display text-[15px] font-extrabold tracking-[-0.015em] text-[var(--dc-ink)] sm:text-[16px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--dc-ink-muted)] sm:text-[13.5px]">
                  {item.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Partnerships ─────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-partnerships">
        <p className="dc-eyebrow label-mono">Alliances</p>
        <h2
          id="about-partnerships"
          className="dc-heading-glow mt-3 font-display text-[28px] font-extrabold tracking-[-0.03em] text-[var(--dc-ink)] xs:text-[32px] sm:text-[36px] lg:text-[40px]"
        >
          Our <span className="dc-accent-glow">partnerships</span>
        </h2>

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {PARTNERSHIPS.map((partner) => (
            <li key={partner.name} data-reveal>
              <article className="dc-card-shell h-full">
                <div className="dc-card flex h-full flex-col p-5 sm:p-6">
                  <Handshake
                    className="h-5 w-5 text-[var(--dc-accent-soft)]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-[16px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)]">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--dc-ink-secondary)]">
                    {partner.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Close CTA ────────────────────────────────────────────────────── */}
      <section className="shell relative mt-16 sm:mt-20 lg:mt-24" aria-labelledby="about-cta">
        <div className="dc-panel overflow-hidden rounded-[24px] xs:rounded-[28px] sm:rounded-[32px]">
          <div className="p-6 sm:p-8 lg:p-10 xl:px-12">
            <div className="max-w-2xl">
              <p className="dc-eyebrow label-mono">Next step</p>
              <h2
                id="about-cta"
                className="dc-heading-glow mt-3 font-display text-[24px] font-extrabold tracking-[-0.025em] text-[var(--dc-ink)] xs:text-[26px] sm:text-[30px]"
              >
                See Jetking <span className="dc-accent-glow">near you</span>
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[15px]">
                Visit a centre, speak with a counsellor, or explore programmes built around
                practical, job-ready skills.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {['Counselling', 'Centre visit', 'Programme fit'].map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-[13px] font-semibold text-[var(--dc-ink-muted)]"
                  >
                    <Sparkles
                      className="h-3.5 w-3.5 text-[var(--dc-accent-soft)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
