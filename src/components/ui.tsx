import Link from 'next/link';
import type { Route } from 'next';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Shared primitives — Editorial Premium.
 *
 * Every visual decision in here is documented in design-system/MASTER.md. The two
 * are a pair: a change to one without the other is how v1 of this project ended up
 * with a design system document that described a site nobody had built.
 */

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/* ── Layout ──────────────────────────────────────────────────────────────── */

export type SectionTone = 'default' | 'sunken' | 'inverse';

/**
 * `tone="inverse"` applies `.surface-inverse`, which re-points the semantic colour
 * variables at the dark end of the ramp. Children keep using `text-foreground` and
 * `border-border` unchanged — no component needs a dark-mode branch.
 */
export function Section({
  children,
  className,
  tone = 'default',
  bleed = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  /** Skip the `.shell` frame — for sections that manage their own grid. */
  bleed?: boolean;
}) {
  const tones: Record<SectionTone, string> = {
    default: 'bg-background',
    sunken: 'bg-surface',
    inverse: 'surface-inverse',
  };

  return (
    <section className={cx('section-y', tones[tone], className)}>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/**
 * `as` defaults to h2 because most section heads sit under a page h1. Listing pages
 * (/courses, /centres, /blog, /faq) whose section head IS the page title must pass
 * `as="h1"` — a page with no h1 is a real ranking defect, and the CI SEO gate fails
 * the build for it.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  align = 'left',
  as = 'h2',
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  /** Trailing action — sits opposite the title on wide viewports. */
  action?: ReactNode;
}) {
  const Heading = as;

  return (
    <div
      className={cx(
        'gap-6',
        action ? 'flex flex-col items-start justify-between md:flex-row md:items-end' : '',
      )}
    >
      <div className={cx('max-w-[42rem]', align === 'center' && 'mx-auto text-center')}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading
          className={cx(
            eyebrow ? 'mt-4' : '',
            as === 'h1'
              ? 'text-3xl sm:text-4xl lg:text-5xl'
              : 'text-2xl sm:text-3xl lg:text-4xl',
          )}
        >
          {title}
        </Heading>
        {lede ? <p className="lede mt-5">{lede}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  // `--accent-ink` is a semantic alias, not a `--color-*` theme token, so it has no
  // generated Tailwind utility — it is referenced directly. It resolves to jk-600 on
  // paper and jk-400 inside `.surface-inverse`.
  return <span className="label-mono block text-[var(--accent-ink)]">{children}</span>;
}

/** The 40×2px red rule that opens a major section. Decorative. */
export function Keyline({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cx('block h-0.5 w-10 bg-jk-500', className)} />;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */

export type ButtonTone = 'primary' | 'secondary' | 'ghost' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Exported so AdaptiveCta renders a visually identical button without duplicating
 * these classes. Two copies of button styling drift the moment the theme changes —
 * which is exactly what happened once already.
 *
 * The primary fill is jk-600, not the jk-500 brand red: white on jk-500 measures
 * 4.48:1 and fails WCAG AA. jk-600 measures 5.92:1 and still reads as Jetking red.
 */
export const buttonTones: Record<ButtonTone, string> = {
  primary:
    'bg-jk-600 text-white hover:bg-jk-500 hover:shadow-[var(--shadow-accent)] active:bg-jk-700',
  secondary:
    'bg-background text-foreground border border-border-medium hover:border-foreground hover:shadow-[var(--shadow-sm)]',
  ghost:
    'bg-transparent text-foreground border border-transparent hover:border-border-medium',
  text: 'bg-transparent text-foreground link-underline h-auto rounded-none px-0 hover:text-jk-600',
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-base',
};

export const buttonBase =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ease-[var(--ease-out-soft)] disabled:pointer-events-none disabled:opacity-45';

/** Kept as a single default so callers that only pass `tone` still get a size. */
export const buttonDefaultSize = buttonSizes.md;

export function ButtonLink({
  tone = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & { tone?: ButtonTone; size?: ButtonSize }) {
  return (
    <Link
      className={cx(buttonBase, tone !== 'text' && buttonSizes[size], buttonTones[tone], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  tone = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ComponentProps<'button'> & { tone?: ButtonTone; size?: ButtonSize }) {
  return (
    <button
      className={cx(buttonBase, tone !== 'text' && buttonSizes[size], buttonTones[tone], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/** Inline "read more" affordance — an arrow link, not a button. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: Route | string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href as Route}
      className={cx(
        'group/arrow inline-flex items-center gap-1.5 text-sm font-semibold text-jk-600',
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/arrow:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}

/* ── Surfaces ────────────────────────────────────────────────────────────── */

export function Card({
  children,
  className,
  as: Tag = 'div',
  interactive = false,
  padding = 'md',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li' | 'section';
  /** Adds the hover lift. Only for cards whose whole surface is a link. */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}) {
  const paddings = {
    none: '',
    sm: 'p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-7 sm:p-9',
  } as const;

  return (
    <Tag
      className={cx(
        'card group rounded-[var(--radius-card)]',
        interactive && 'card-interactive',
        paddings[padding],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'outline';
}) {
  const tones = {
    neutral: 'bg-surface text-foreground-secondary',
    accent: 'bg-jk-50 text-jk-700',
    outline: 'border border-border text-foreground-muted',
  } as const;

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-2xs font-semibold tracking-[0.06em] uppercase',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

/**
 * A figure and its label. Figures use tabular numerals so a row of stats aligns on
 * the digit rather than drifting — the detail that makes a stat row read as a data
 * table instead of as decoration.
 */
export function Stat({
  value,
  label,
  note,
}: {
  value: ReactNode;
  label: ReactNode;
  note?: ReactNode;
}) {
  return (
    <div className="rule-top">
      <p className="numeral font-display text-3xl font-bold text-foreground sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
      {note ? <p className="mt-1 text-sm text-foreground-muted">{note}</p> : null}
    </div>
  );
}

/**
 * A row in an index list: title, optional supporting line, optional right-aligned
 * figure, hairline underneath.
 *
 * This is the site's default way of presenting a set of links — courses at a centre,
 * centres in a city, related articles. Rows beat cards here because the values line
 * up in a column the eye can scan, and because a list of six cards is six boxes of
 * chrome around what is really six links.
 *
 * Always render inside a `<ul>` with `border-t border-border`, so the first row has a
 * rule above it and the set closes cleanly.
 */
export function IndexRow({
  href,
  title,
  meta,
  trailing,
  numeric,
}: {
  href: Route | string;
  title: ReactNode;
  /** Secondary line under the title. */
  meta?: ReactNode;
  /** Right-aligned value — duration, count, date. */
  trailing?: ReactNode;
  /** Renders `trailing` with tabular figures. */
  numeric?: boolean;
}) {
  return (
    <li>
      <Link
        href={href as Route}
        className="group/row flex items-baseline justify-between gap-6 border-b border-border py-4.5 transition-colors duration-200 hover:bg-surface"
      >
        <span className="min-w-0">
          <span className="block font-semibold text-foreground transition-colors group-hover/row:text-jk-600">
            {title}
          </span>
          {meta ? (
            <span className="mt-0.5 block text-sm text-foreground-muted">{meta}</span>
          ) : null}
        </span>
        {trailing ? (
          <span
            className={cx(
              'shrink-0 text-sm text-foreground-muted',
              numeric && 'numeral',
            )}
          >
            {trailing}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="shrink-0 text-jk-600 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/row:translate-x-1"
          >
            →
          </span>
        )}
      </Link>
    </li>
  );
}

/* ── Form controls ───────────────────────────────────────────────────────── */

/*
 * Re-exported from `./form`, which carries the `'use client'` boundary.
 *
 * They cannot live in this file: `Field` builds its `aria-describedby` wiring with
 * `createContext`, and a module-level `createContext()` call throws the moment a
 * Server Component imports it — which this module is, on every page that renders a
 * `Section` or a `JsonLd`. Re-exporting keeps `@/components/ui` the single import
 * surface for callers while the client boundary sits one file down.
 */
export { Field, fieldControl, Input, Select, Textarea } from './form';

/* ── Notices ─────────────────────────────────────────────────────────────── */

export function Notice({
  tone = 'neutral',
  title,
  children,
}: {
  tone?: 'neutral' | 'accent' | 'success';
  title?: ReactNode;
  children: ReactNode;
}) {
  const tones = {
    neutral: 'border-border bg-surface',
    accent: 'border-jk-200 bg-jk-50',
    success: 'border-growth-600/25 bg-growth-50',
  } as const;

  return (
    <div className={cx('rounded-[var(--radius-card)] border p-5', tones[tone])}>
      {title ? <p className="font-semibold text-foreground">{title}</p> : null}
      <div className={cx('text-sm text-foreground-secondary', Boolean(title) && 'mt-1.5')}>
        {children}
      </div>
    </div>
  );
}

/* ── Structured data ─────────────────────────────────────────────────────── */

/**
 * JSON-LD injection. Content is JSON-serialised from typed objects built in
 * lib/seo.ts, never from user or CMS free text, so there is no injection surface —
 * but `<` is escaped anyway as defence in depth against a `</script>` in a field.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/* ── Breadcrumbs ─────────────────────────────────────────────────────────── */

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-foreground-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, index) => {
          // Trails are assembled from real routes inside page components; the
          // typedRoutes union cannot see through an array, hence the cast here
          // rather than a generic that would infect every call site.
          const href = item.path as Route;
          const isLast = index === trail.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <span aria-hidden="true" className="text-foreground-disabled">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-foreground-secondary">
                  {item.name}
                </span>
              ) : (
                <Link href={href} className="link-underline hover:text-jk-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
