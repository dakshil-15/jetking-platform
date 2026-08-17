import type { Figure } from '../figures';
import { PromptCards } from './PromptCards';

/**
 * Impact panel — matches the Landing Replica mock:
 *   default → md  → stacked cards + rounded panel
 *   lg+           → dark circle clipped to an upper crescent, cards floating
 *                   over the left/right edges (mock: 780 disc, ~260px visible)
 */
export function ImpactPanel({ figures }: { figures: Figure[] }) {
  return (
    <section className="relative">
      <div className="px-[var(--gutter)] pb-8 xs:pb-10 md:pb-12 lg:hidden" aria-labelledby="v1-impact">
        <PromptCards />
        <div className="v1-impact mt-5 overflow-hidden rounded-[24px] px-5 py-8 text-center xs:mt-6 xs:rounded-[28px] xs:px-6 xs:py-10 sm:rounded-[32px] sm:px-10 sm:py-12 md:px-12 md:py-14">
          <ImpactCopy figures={figures} headingId="v1-impact" />
        </div>
      </div>

      <div
        className="v1-impact-band relative z-0 mt-[-28px] hidden overflow-hidden lg:block xl:mt-[-36px] 2xl:mt-[-48px]"
        aria-labelledby="v1-impact-desktop"
      >
        {/* White curved floor behind the crescent — mock's large white disc */}
        <div
          aria-hidden="true"
          className="v1-impact-floor pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 rounded-full bg-white shadow-[0_-1px_0_rgb(160_150_185/0.35)]"
        />

        {/* Soft white lift behind the arc (not over it) so the canvas fades cleanly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70%] bg-[linear-gradient(to_top,#ffffff_0%,rgb(255_255_255/0.9)_35%,transparent_100%)]"
        />

        <div className="v1-impact-arc v1-impact absolute top-0 left-1/2 z-[1] -translate-x-1/2 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[40%] top-[30%] h-[120%] w-[180%] rounded-full border-t border-[rgb(140_170_255/0.35)] bg-[radial-gradient(60%_40%_at_30%_10%,rgb(90_120_255/0.18),transparent_70%)]"
          />
          <div className="relative px-10 pt-5 text-center xl:px-12 xl:pt-5 2xl:px-[60px] 2xl:pt-5">
            <ImpactCopy figures={figures} headingId="v1-impact-desktop" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[42%] z-10 mx-auto flex max-w-[var(--container-xl)] items-start justify-between gap-6 px-[var(--gutter)] 2xl:max-w-[var(--container-2xl)] 3xl:max-w-[var(--container-3xl)] 4xl:max-w-[var(--container-4xl)]">
          <div className="pointer-events-auto w-[min(260px,34%)] xl:w-[min(280px,32%)] 2xl:w-[min(296px,32%)]">
            <PromptCards variant="success" />
          </div>
          <div className="pointer-events-auto w-[min(240px,32%)] xl:w-[min(250px,30%)] 2xl:w-[min(268px,30%)]">
            <PromptCards variant="guide" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactCopy({ figures, headingId }: { figures: Figure[]; headingId: string }) {
  return (
    <>
      <p className="text-[13px] font-bold tracking-[0.04em] text-[var(--v1-ink-secondary)] sm:text-sm">
        Our <span className="text-[var(--v1-accent)]">Impact</span>
      </p>
      <h2
        id={headingId}
        className="mt-2.5 font-display text-[24px] leading-[1.18] font-extrabold tracking-[-0.02em] text-white xs:text-[26px] sm:mt-3 sm:text-[30px] md:text-[34px] 2xl:mt-3.5 3xl:text-[38px]"
      >
        Real Numbers.
        <br />
        Real Results.
      </h2>
      <span
        aria-hidden="true"
        className="mx-auto mt-3.5 block h-[3px] w-[30px] rounded-full bg-[var(--v1-accent)] sm:mt-4 2xl:mt-[18px]"
      />

      <dl className="mx-auto mt-5 grid max-w-[640px] grid-cols-2 gap-x-5 gap-y-6 text-left xs:mt-6 xs:gap-x-6 xs:gap-y-7 sm:mt-[18px] lg:mt-[18px] lg:flex lg:max-w-none lg:justify-center lg:gap-6 xl:gap-7 2xl:gap-[34px]">
        {figures.map((figure) => (
          <div key={figure.label} className="flex items-start gap-2.5 xs:gap-3">
            <figure.icon
              className="mt-1 h-6 w-6 shrink-0 text-[var(--v1-ink)] xs:h-7 xs:w-7 lg:mt-1 lg:h-8 lg:w-8"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <dt className="sr-only">{figure.label}</dt>
              <dd>
                <span className="numeral block font-display text-[20px] leading-none font-extrabold text-white xs:text-[22px] sm:text-[26px] 3xl:text-[28px]">
                  {figure.value}
                </span>
                <span className="mt-1.5 block whitespace-pre-line text-[12px] leading-[1.35] text-[var(--v1-ink-muted)] xs:text-[12.5px]">
                  {figure.label}
                </span>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </>
  );
}
