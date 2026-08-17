import { ArrowDown } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import type { HomeData } from '../data';
import { ActionRail } from './ActionRail';
import { HeroPortrait } from './HeroPortrait';
import { buildFigures } from '../figures';
import { ImpactPanel } from './ImpactPanel';
import { JourneyChooser } from './JourneyChooser';
import { WatchVideo } from '../WatchVideo';

/**
 * Homepage lead v1 — "Journey Lead".
 *
 * Responsive across the full layout scale:
 *   default / xs / sm / md  → stacked (HTML mobile branch)
 *   lg+                     → 3-col grid (copy · portrait · chooser)
 *   xl+                     → action rail fixed on the right (above Ask Jetking)
 *   2xl                     → design-native 1536 proportions
 *   3xl / 4xl               → wider frame, larger type & gaps
 */
export function HomeV1({ data }: { data: HomeData }) {
  const { counts, trust, variants } = data;

  const defaultVariant = variants.find((v) => v.id === 'default') ?? variants[0];
  const impact = buildFigures({ ...counts, trust });

  return (
    <section className="home-v1 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="v1-bloom pointer-events-none absolute top-[-80px] left-[10%] h-[520px] w-[520px] rounded-full xs:top-[-100px] xs:h-[640px] xs:w-[640px] md:left-1/4 lg:top-[-120px] lg:h-[900px] lg:w-[900px]"
      />
      <div
        aria-hidden="true"
        className="v1-dots pointer-events-none absolute right-6 bottom-32 hidden h-[180px] w-[180px] opacity-50 xl:bottom-48 xl:right-10 xl:block xl:h-[260px] xl:w-[260px] 3xl:right-16"
      />

      <div className="shell relative py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-12 2xl:py-10 3xl:py-12">
        <div
          className={[
            'grid items-start gap-8',
            'xs:gap-9 sm:gap-10 md:gap-12',
            /* lg+: copy | portrait | chooser — rail is fixed at xl, not a grid column */
            'lg:grid-cols-[minmax(0,300px)_minmax(0,260px)_minmax(0,1fr)] lg:gap-6',
            'xl:grid-cols-[minmax(0,320px)_minmax(0,290px)_minmax(0,1fr)] xl:gap-6',
            '2xl:grid-cols-[minmax(0,348px)_minmax(0,318px)_minmax(0,560px)] 2xl:gap-7',
            '3xl:grid-cols-[minmax(0,380px)_minmax(0,340px)_minmax(0,600px)] 3xl:gap-10',
            '4xl:grid-cols-[minmax(0,420px)_minmax(0,360px)_minmax(0,640px)] 4xl:gap-12',
          ].join(' ')}
        >
          {/* Copy column */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-[var(--v1-ink-secondary)] uppercase xs:text-[12px] sm:text-[12.5px]">
              India&rsquo;s Leading IT Education Network
            </p>

            <h1
              className={[
                'mt-4 font-display leading-[1.04] font-extrabold tracking-[-0.035em] text-[var(--v1-ink)]',
                'text-[40px] xs:mt-5 xs:text-[46px]',
                'sm:text-[52px] md:mt-6 md:text-[56px]',
                'lg:mt-7 lg:text-[56px]',
                'xl:text-[64px]',
                '2xl:text-[72px] 2xl:leading-[1.06]',
                '3xl:text-[76px] 4xl:text-[84px]',
              ].join(' ')}
            >
              Learn.
              <br />
              Network.
              <br />
              <span className="text-[var(--v1-accent)]">Get Hired.</span>
            </h1>

            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.65] text-[var(--v1-ink-secondary)] xs:mt-6 xs:text-[15.5px] sm:max-w-[290px] sm:text-[16px] sm:leading-[1.7] lg:mt-8 lg:text-[16.5px] 3xl:max-w-[32ch] 3xl:text-[17px]">
              Industry-relevant training, real-world projects and placement support that build
              your future.
            </p>

            <div className="mt-6 xs:mt-7 sm:mt-8 lg:mt-10">
              <WatchVideo video={defaultVariant?.video} />
            </div>

            <div
              aria-hidden="true"
              className="mt-14 hidden flex-col items-center gap-3 2xl:mt-16 2xl:flex 2xl:w-[110px]"
            >
              <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-bold tracking-[0.22em] text-[var(--v1-ink-muted)]">
                SCROLL
              </span>
              <span className="h-[7px] w-[7px] rounded-full bg-[var(--v1-accent)]" />
              <span className="h-24 w-px bg-[linear-gradient(to_bottom,#b9b9c6,#14141f)]" />
              <ArrowDown className="-mt-2 h-4 w-4 text-[var(--v1-ink)]" strokeWidth={1.75} />
            </div>
          </div>

          {/* Portrait column */}
          <div className="mx-auto w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[420px] md:max-w-[460px] lg:mx-0 lg:max-w-none">
            <HeroPortrait src={data.heroImage} alt={`${siteConfig.name} learners at a centre`} />
          </div>

          {/* Chooser column */}
          <div>
            <h2 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-[var(--v1-ink)] xs:text-[23px] sm:text-[25px] md:text-[27px] 3xl:text-[30px]">
              Where are you in your journey?
            </h2>
            <p className="mt-2.5 text-[14px] text-[var(--v1-ink-muted)] xs:mt-3 xs:text-[15px] sm:text-[15.5px]">
              Tap an option and we&rsquo;ll show you what&rsquo;s relevant.
            </p>
            <span
              aria-hidden="true"
              className="mt-3 block h-[3px] w-7 rounded-full bg-[var(--v1-accent)] xs:mt-4"
            />

            <div className="mt-4 xs:mt-5">
              <JourneyChooser />
            </div>
          </div>

          <ActionRail className="lg:col-span-3" />
        </div>
      </div>

      <ImpactPanel figures={impact} />
    </section>
  );
}
