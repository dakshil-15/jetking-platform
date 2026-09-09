import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, type LucideIcon } from 'lucide-react';

/**
 * Dashboard widgets in the TailAdmin pattern (icon-badge stat cards, a bar
 * chart, a donut) — hand-rolled SVG rather than a charting dependency, since
 * these are two static, non-interactive charts. Every number here is real,
 * computed from the actual CMS store / leads table: there's no time-series
 * data anywhere in this app, so unlike the reference's "+20% last month"
 * pills, a stat card either shows a real derived figure (e.g. "3 drafts") or
 * no badge at all — never a fabricated trend.
 *
 * `href` on a stat card or bar row is what makes these "actionable" rather
 * than purely informative — a card is a shortcut to the record list it's
 * summarizing, not a dead end you have to re-navigate from the sidebar.
 */

function StatCardBody({
  Icon,
  label,
  value,
  badge,
  badgeClass,
  linkable,
}: {
  Icon: LucideIcon;
  label: string;
  value: string | number;
  badge?: string;
  badgeClass: string;
  linkable: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-[var(--admin-radius)] bg-[var(--accent-soft)]">
          <Icon aria-hidden="true" className="h-5 w-5 text-[var(--accent)]" />
        </div>
        {linkable ? (
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100"
          />
        ) : null}
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="numeral font-display text-3xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-sm font-medium text-foreground-secondary">{label}</p>
        </div>
        {badge ? (
          <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${badgeClass}`}>{badge}</span>
        ) : null}
      </div>
    </>
  );
}

export function StatCard({
  icon,
  label,
  value,
  badge,
  badgeTone = 'neutral',
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  badge?: string;
  badgeTone?: 'good' | 'warn' | 'neutral';
  /** Where clicking the card should go — omit for a purely aggregate figure
   *  (e.g. total content across every collection) with no single destination. */
  href?: Route;
}) {
  const badgeClass =
    badgeTone === 'good'
      ? 'bg-[var(--color-growth-50)] text-[var(--color-growth-600)]'
      : badgeTone === 'warn'
        ? 'bg-[var(--color-signal-50)] text-[var(--color-signal-600)]'
        : 'bg-surface text-foreground-secondary';

  if (href) {
    return (
      <Link
        href={href}
        className="group rounded-[var(--radius-card)] border border-border bg-background p-5 transition-colors hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-xs)]"
      >
        <StatCardBody Icon={icon} label={label} value={value} badge={badge} badgeClass={badgeClass} linkable />
      </Link>
    );
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-background p-5">
      <StatCardBody Icon={icon} label={label} value={value} badge={badge} badgeClass={badgeClass} linkable={false} />
    </div>
  );
}

export function BarChartCard({
  title,
  description,
  bars,
}: {
  title: string;
  description: string;
  bars: Array<{ label: string; value: number; href?: Route }>;
}) {
  const max = Math.max(...bars.map((b) => b.value), 1);

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-background p-5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-xs text-foreground-muted">{description}</p>
      <div className="mt-5 flex flex-col gap-1">
        {bars.map((bar) => {
          const row = (
            <>
              <span className="w-40 shrink-0 text-xs leading-tight text-foreground-secondary group-hover:text-foreground">
                {bar.label}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-[var(--accent)]"
                  style={{ width: `${Math.max((bar.value / max) * 100, bar.value > 0 ? 4 : 0)}%` }}
                />
              </div>
              <span className="numeral w-6 shrink-0 text-right text-xs font-semibold text-foreground">
                {bar.value}
              </span>
            </>
          );
          return bar.href ? (
            <Link
              key={bar.label}
              href={bar.href}
              className="group -mx-2 flex items-center gap-3 rounded-[var(--admin-radius)] px-2 py-1.5 transition-colors hover:bg-surface"
            >
              {row}
            </Link>
          ) : (
            <div key={bar.label} className="flex items-center gap-3 px-2 py-1.5">
              {row}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DonutChartCard({
  title,
  description,
  segments,
}: {
  title: string;
  description: string;
  segments: Array<{ label: string; value: number; color: string }>;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = 60;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-background p-5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 text-xs text-foreground-muted">{description}</p>

      <div className="mt-4 flex items-center gap-6">
        <div className="relative h-36 w-36 shrink-0">
          <svg aria-hidden="true" viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-surface)" strokeWidth={strokeWidth} />
            {total > 0
              ? segments.map((seg) => {
                  if (seg.value === 0) return null;
                  const fraction = seg.value / total;
                  const dash = fraction * circumference;
                  const circle = (
                    <circle
                      key={seg.label}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                    />
                  );
                  offset += dash;
                  return circle;
                })
              : null}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="numeral font-display text-2xl font-bold text-foreground">{total}</p>
              <p className="text-[11px] text-foreground-muted">total</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-foreground-secondary">{seg.label}</span>
              <span className="numeral ml-auto font-semibold text-foreground">
                {total > 0 ? Math.round((seg.value / total) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
