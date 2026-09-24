import { HOW_IT_WORKS } from './data';

export function HowItWorks() {
  const finalIndex = HOW_IT_WORKS.length - 1;

  return (
    <section className="border-y border-[var(--dc-hairline)] bg-[var(--dc-surface)] py-12 sm:py-14 lg:py-16" aria-labelledby="home-how-heading">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="dc-eyebrow text-[13px] font-bold tracking-[0.06em] uppercase">How it works</p>
          <h2
            id="home-how-heading"
            className="dc-heading-glow mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] xs:text-[28px] sm:text-[32px]"
          >
            From enquiry to placement support
          </h2>
        </div>

        {/* Mobile / tablet — swipeable step cards */}
        <ol
          aria-label="Enrolment steps"
          // Scroll container: focusable so keyboard users can scroll it with the arrow keys.
          tabIndex={0}
          className="mt-8 -mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mt-10 lg:hidden"
        >
          {HOW_IT_WORKS.map((step, index) => (
            <li
              key={step.title}
              className="dc-panel flex w-[min(78vw,280px)] shrink-0 flex-col rounded-[20px] p-5"
            >
              <StepNode step={step} index={index} isFinal={index === finalIndex} />
              <h3 className="mt-4 font-display text-[16px] font-extrabold text-[var(--dc-ink)]">{step.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--dc-ink-muted)]">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-center text-[11px] font-semibold tracking-[0.04em] text-[var(--dc-ink-muted)] uppercase lg:hidden">
          Swipe to see all {HOW_IT_WORKS.length} steps
        </p>

        {/* Desktop — node rail */}
        <div className="relative mt-10 hidden lg:block">
          <span
            aria-hidden="true"
            className="absolute inset-x-[8%] top-6 z-0 h-px bg-[var(--dc-hairline)]"
          />
          <ol aria-label="Enrolment steps" className="relative z-10 grid grid-cols-5 gap-x-4">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.title} className="flex flex-col items-center text-center">
                <StepNode step={step} index={index} isFinal={index === finalIndex} />
                <h3 className="mt-4 font-display text-[15px] font-extrabold text-[var(--dc-ink)]">{step.title}</h3>
                <p className="mt-1.5 max-w-[20ch] text-[13px] leading-relaxed text-[var(--dc-ink-muted)]">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StepNode({
  step,
  index,
  isFinal,
}: {
  step: (typeof HOW_IT_WORKS)[number];
  index: number;
  isFinal: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        'relative grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-[var(--dc-card)]',
        isFinal ? 'border-[var(--dc-accent-soft)] text-[var(--dc-accent-soft)]' : 'border-[var(--dc-hairline)] text-[var(--dc-accent-soft)]',
      ].join(' ')}
    >
      <step.icon className="h-5 w-5" strokeWidth={1.75} />
      <span
        className={[
          'absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-extrabold',
          isFinal ? 'bg-[var(--dc-accent)] text-white' : 'border border-[var(--dc-hairline)] bg-[var(--dc-surface)] text-[var(--dc-ink-muted)]',
        ].join(' ')}
      >
        {index + 1}
      </span>
    </span>
  );
}
