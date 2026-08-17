import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { WelcomeBack } from '@/persona/WelcomeBack';
import type { HomeData } from '../data';
import { WatchVideo } from '../WatchVideo';
import { ActionRail } from '../v1/ActionRail';
import { ActionBar } from './ActionBar';
import { JourneyHexes } from './JourneyHexes';

/**
 * Homepage lead v2 — "Future-Ready".
 *
 * The floating ActionRail (Find Center / Call / Book Counselling) matches v1.
 * Ask Jetking lives on the global Guide launcher.
 */
export function HomeV2({ data }: { data: HomeData }) {
  const { counts, variants } = data;

  const defaultVariant = variants.find((v) => v.id === 'default') ?? variants[0];

  return (
    <section
      className={[
        'home-v2 home-v2-themeable relative flex flex-col overflow-hidden',
        /* Fill the viewport below the sticky header (72 → 80 → 88 → 96). */
        'min-h-[calc(100dvh-72px)]',
        'xs:min-h-[calc(100dvh-80px)]',
        'sm:min-h-[calc(100dvh-88px)]',
        '2xl:min-h-[calc(100dvh-96px)]',
      ].join(' ')}
    >
      <div className="shell relative flex flex-1 flex-col py-8 xs:py-10 sm:py-12 md:py-14 lg:py-12 xl:py-10 2xl:py-8 3xl:py-10">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div
          className={[
            'grid flex-1 items-center gap-8',
            'xs:gap-9 sm:gap-10 md:gap-12',
            /* Stacked up to 1200px. From 1200px the hero is two-column — heading left,
               honeycomb right in the banner's first part — with a compact left column and
               NO rail gutter (the rail stays inline below until 2xl). That keeps the hexes
               ~240px so labels never clip. At 2xl the column widens, the rail goes fixed,
               and the hero reserves its gutter. */
            'lg:gap-8',
            'lg2:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg2:gap-6 lg2:pr-[130px]',
            '2xl:grid-cols-[minmax(0,470px)_minmax(0,1fr)] 2xl:gap-6 2xl:pr-[160px]',
            '3xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] 3xl:gap-10',
            '4xl:grid-cols-[minmax(0,560px)_minmax(0,1fr)] 4xl:gap-12',
          ].join(' ')}
        >
          <div className="flex h-full flex-col justify-center">
            <p className="v2-eyebrow-glow text-[11px] font-bold tracking-[0.16em] text-[var(--v2-eyebrow)] uppercase xs:text-[12px] sm:text-[13px] sm:tracking-[0.18em]">
              India&rsquo;s Leading IT Education Network
            </p>

            <h1
              className={[
                'v2-heading-glow mt-4 font-display leading-[1.08] font-extrabold tracking-[-0.035em] text-[var(--v2-ink)]',
                'text-[36px] xs:mt-5 xs:text-[40px]',
                'sm:text-[44px] md:text-[48px]',
                'lg:mt-6 lg:text-[48px]',
                /* Two-column from 1200: heading stays large; the hexes and their label
                   text shrink instead (see JourneyHexes) so both read clearly. */
                'lg2:text-[46px]',
                '2xl:text-[58px]',
                '3xl:text-[62px] 4xl:text-[68px]',
              ].join(' ')}
            >
              Future-Ready
              <br />
              Careers Start
              <br />
              at{' '}
              <span className="v2-accent-glow text-[var(--v2-accent)]">{siteConfig.name}</span>
            </h1>

            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.6] text-[var(--v2-ink-secondary)] xs:mt-6 xs:text-[15.5px] sm:text-[16px] lg:text-[17px] 3xl:text-[18px]">
              Industry-relevant training. Real-world projects.
              <br className="hidden sm:inline" /> Placement support that delivers.
            </p>

            <div className="mt-6 flex flex-col items-start gap-5 xs:mt-7 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5 lg:mt-8 2xl:mt-[34px]">
              <Link
                href={'/courses' as Route}
                className="v2-cta-glow group/explore inline-flex min-h-12 items-center gap-5 rounded-full py-3.5 pr-5 pl-6 text-[15px] font-bold text-white transition-[background-color,box-shadow] duration-200 sm:gap-6 sm:py-4 sm:pr-5.5 sm:pl-7 sm:text-[16px]"
              >
                Explore Courses
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/explore:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>

              <WatchVideo video={defaultVariant?.video} variant="inline" />
            </div>
          </div>

          {/* Chooser occupies the former banner slot */}
          <div className="v2-hero-stage relative flex h-full flex-col items-center justify-center text-center">
            <WelcomeBack className="mb-5 w-full max-w-xl text-left xs:mb-6" />

            <h2 className="v2-heading-glow font-display text-[22px] font-extrabold tracking-[-0.02em] text-[var(--v2-ink)] xs:text-[23px] sm:text-[26px] md:text-[28px] 3xl:text-[30px]">
              What brings you here today?
            </h2>
            <p className="mt-2.5 text-[14px] text-[var(--v2-ink-muted)] xs:mt-3 xs:text-[15px] sm:text-[15.5px]">
              Choose one option. We&rsquo;ll personalize your experience.
            </p>

            <div className="mt-5 w-full xs:mt-6 lg:mt-6 xl:mt-7">
              <JourneyHexes />
            </div>
          </div>
        </div>

        {/* ── Action bar ───────────────────────────────────────────────── */}
        <div className="mt-8 shrink-0 xs:mt-10 lg:mt-12 3xl:mt-14">
          <ActionBar centres={counts.centres} />
        </div>

        {/* Same quick-action rail as v1 — inline while stacked, fixed vertical on the
            right from lg2 (1200px) where the hero becomes two-column. */}
        <div className="mt-8 xs:mt-9 lg2:mt-0">
          <ActionRail source="home-v2-rail" />
        </div>
      </div>
    </section>
  );
}
