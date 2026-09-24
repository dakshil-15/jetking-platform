import { buildFigures } from '../figures';
import type { TrustSignal } from '@/lib/content/types';

/**
 * Figures strip — reuses `buildFigures()` (catalogue counts + at most one verified
 * trust signal), previously built but never wired into a homepage lead. See its own
 * doc comment: every number here is either derived from the live catalogue or a
 * verified signal, never a scale claim invented for the page.
 */
export function TrustStats({
  counts,
  trust,
}: {
  counts: { courses: number; centres: number; cities: number };
  trust: TrustSignal[];
}) {
  const figures = buildFigures({ ...counts, trust });

  return (
    <section className="border-y border-[var(--dc-hairline)] bg-[var(--dc-surface)] py-10 sm:py-12" aria-label="Jetking at a glance">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {figures.map((figure) => (
            <li
              key={figure.label}
              className="dc-panel flex items-start gap-3.5 rounded-[18px] p-5 sm:rounded-[20px] sm:p-6"
            >
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--dc-accent-soft)]/35 bg-[var(--dc-accent-tint)] text-[var(--dc-accent-soft)]"
              >
                <figure.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="numeral font-display text-[26px] leading-none font-extrabold text-[var(--dc-ink)] sm:text-[28px]">
                  {figure.value}
                </p>
                <p className="mt-2 text-[13px] leading-snug whitespace-pre-line text-[var(--dc-ink-secondary)]">
                  {figure.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
