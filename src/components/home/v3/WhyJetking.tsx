import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { HUE_VARS, WHY_JETKING } from './data';

export function WhyJetking() {
  return (
    <section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-why-heading">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="dc-eyebrow text-[13px] font-bold tracking-[0.06em] uppercase">Why Jetking</p>
            <h2
              id="home-why-heading"
              className="dc-heading-glow mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] xs:text-[28px] sm:text-[32px]"
            >
              What decades of IT training actually built
            </h2>
          </div>
          <Link
            href={'/about-us' as Route}
            className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-[var(--dc-accent-soft)]"
          >
            Our story
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {WHY_JETKING.map((item) => {
            const { accent, tint } = HUE_VARS[item.hue];
            return (
              <li key={item.title}>
                <article className="flex h-full flex-col gap-3.5 rounded-[22px] border border-[var(--dc-hairline)] bg-[var(--dc-card)] p-5 shadow-[var(--dc-shadow)] transition-[box-shadow,transform] duration-200 hover:shadow-[var(--dc-shadow-hover)] hover:-translate-y-0.5 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1 ring-[color-mix(in_srgb,var(--dc-hairline)_80%,transparent)]"
                    style={{ background: tint, color: accent }}
                  >
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-extrabold text-[var(--dc-ink)] sm:text-[16px]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--dc-ink-muted)]">
                      {item.detail}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
