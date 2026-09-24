import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import { CAREER_PATHS, HUE_VARS, type CareerPath } from './data';

function CareerCard({ path }: { path: CareerPath }) {
  const { accent, tint } = HUE_VARS[path.hue];

  return (
    <Link
      href={path.href as Route}
      className="group/career flex h-full flex-col rounded-[22px] border border-[var(--dc-hairline)] bg-[var(--dc-card)] p-5 shadow-[var(--dc-shadow)] transition-[box-shadow,transform] duration-200 hover:shadow-[var(--dc-shadow-hover)] hover:-translate-y-0.5 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1 ring-[color-mix(in_srgb,var(--dc-hairline)_80%,transparent)]"
          style={{ background: tint, color: accent }}
        >
          <path.icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <h3 className="min-w-0 flex-1 font-display text-[16px] leading-snug font-extrabold tracking-[-0.01em] text-[var(--dc-ink)] sm:text-[17px]">
          {path.title}
        </h3>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-[var(--dc-ink-muted)]">{path.detail}</p>

      <ul className="mt-4 flex flex-1 flex-col gap-0 border-t border-[var(--dc-hairline)]/60 pt-1">
        {path.skills.map((skill) => (
          <li
            key={skill}
            className="flex items-start gap-2.5 border-b border-[var(--dc-hairline)]/40 py-2.5 last:border-b-0"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg"
              style={{ background: tint, color: accent }}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1 text-[12.5px] leading-snug font-semibold text-[var(--dc-ink-secondary)] sm:text-[13px]">
              {skill}
            </span>
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center justify-between gap-3 border-t border-[var(--dc-hairline)] pt-4 text-[14px] font-bold">
        <span style={{ color: accent }}>See programmes</span>
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 group-hover/career:translate-x-0.5"
          style={{ background: accent }}
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </span>
    </Link>
  );
}

export function CareerPaths() {
  return (
    <section className="py-12 sm:py-14 lg:py-16" aria-labelledby="home-careers-heading">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="dc-eyebrow text-[13px] font-bold tracking-[0.06em] uppercase">Career paths</p>
          <h2
            id="home-careers-heading"
            className="dc-heading-glow mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] xs:text-[28px] sm:text-[32px]"
          >
            Pick the role, then the programme that gets you there
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[15px]">
            Four IT roles Jetking&rsquo;s curriculum is built around — each links to the programmes that teach it.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_PATHS.map((path) => (
            <li key={path.title} className="min-w-0">
              <CareerCard path={path} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
