'use client';

import Image from 'next/image';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import type { Course, CourseLevel } from '@/lib/content/types';
import { usePersona } from '@/persona/PersonaProvider';
import { useFlip } from '@/components/motion/flip';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { track } from '@/lib/analytics';

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * COURSE EXPLORER
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * A left filter sidebar + a grid of course cards, in the Future-Ready dark
 * language shared with the blog and centres index (`.dc-*` primitives).
 *
 * How this stays SEO-safe:
 *
 *   1. Client component, but Next still SERVER-RENDERS it: every course card and
 *      its link is in the initial HTML. The sidebar filters and the search only
 *      toggle `hidden` on already-rendered cards — they never conditionally
 *      render them away. With JavaScript off, the visitor gets the complete list.
 *
 *   2. Filter/search state lives in the URL via `history.replaceState`, NOT via
 *      router navigation. The page stays statically generated, a filtered view is
 *      still shareable, and the canonical stays `/courses` (set on the server), so
 *      faceted URLs cannot fragment the index.
 *
 *   3. Each card links straight to its own `/courses/[slug]` page — no in-place
 *      expansion — so the crawlable route structure is exactly the sitemap.
 */

const LEVELS: Array<{ id: CourseLevel | 'all'; label: string }> = [
  { id: 'all', label: 'All levels' },
  { id: 'degree', label: 'Degree' },
  { id: 'diploma', label: 'Diploma' },
  { id: 'certification', label: 'Certification' },
  { id: 'short', label: 'Short course' },
];

const COMMITMENTS = [
  { id: 'all', label: 'Any length' },
  { id: 'short', label: 'Under 6 months' },
  { id: 'medium', label: '6–12 months' },
  { id: 'long', label: 'Over a year' },
] as const;

type Commitment = (typeof COMMITMENTS)[number]['id'];

/** Parse "3 years" / "12 months" / "10 months" into months. */
function durationInMonths(duration: string): number {
  const value = Number(duration.match(/\d+/)?.[0] ?? 0);
  return /year/i.test(duration) ? value * 12 : value;
}

function matchesCommitment(course: Course, commitment: Commitment): boolean {
  if (commitment === 'all') return true;
  const months = durationInMonths(course.duration);
  if (commitment === 'short') return months < 6;
  if (commitment === 'medium') return months >= 6 && months <= 12;
  return months > 12;
}

function matchesQuery(course: Course, needle: string): boolean {
  if (!needle) return true;
  return (
    course.title.toLowerCase().includes(needle) ||
    course.level.toLowerCase().includes(needle) ||
    course.duration.toLowerCase().includes(needle) ||
    course.eligibility.toLowerCase().includes(needle) ||
    course.summary.toLowerCase().includes(needle)
  );
}

interface ViewState {
  level: CourseLevel | 'all';
  commitment: Commitment;
  query: string;
}

const DEFAULT_VIEW: ViewState = { level: 'all', commitment: 'all', query: '' };

function readViewFromUrl(): ViewState {
  const params = new URLSearchParams(window.location.search);
  const level = params.get('level');
  const commitment = params.get('length');
  const query = params.get('q');

  return {
    level: LEVELS.some((x) => x.id === level) ? (level as CourseLevel) : 'all',
    commitment: COMMITMENTS.some((x) => x.id === commitment)
      ? (commitment as Commitment)
      : 'all',
    query: typeof query === 'string' ? query : '',
  };
}

export function CourseExplorer({ courses }: { courses: Course[] }) {
  const { classification, hydrated } = usePersona();
  const inputId = useId();
  const [view, setView] = useState<ViewState>(DEFAULT_VIEW);
  const listRef = useRef<HTMLDivElement>(null);
  const { level, commitment, query } = view;

  /*
   * Restore a shared filtered URL — a genuine external-source sync, not derived
   * state: `window.location` does not exist during SSR, so reading it in a lazy
   * initialiser would cause a hydration mismatch. The one-time post-hydration
   * read is the correct and only safe option.
   */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setView(readViewFromUrl()), []);

  /*
   * The read above lands in state one render after mount — the reflect effect
   * below must not fire on that first render, or it writes `view`'s stale
   * DEFAULT_VIEW back into `history`, erasing whatever `?level=` a Link (e.g.
   * the homepage's "MCA & BCA degrees" callout) just navigated here with,
   * before the read effect's setState has had a chance to apply.
   */
  const skippedFirstSync = useRef(false);

  // ── Reflect state into the URL without navigating ─────────────────────────
  useEffect(() => {
    if (!skippedFirstSync.current) {
      skippedFirstSync.current = true;
      return;
    }
    if (!hydrated) return;
    const params = new URLSearchParams();
    if (level !== 'all') params.set('level', level);
    if (commitment !== 'all') params.set('length', commitment);
    const trimmed = query.trim();
    if (trimmed) params.set('q', trimmed);
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [level, commitment, query, hydrated]);

  // ── Ordering: persona relevance, then editorial order. Stable. ────────────
  const ordered = useMemo(() => {
    const persona = classification.persona;
    const canRank = hydrated && persona !== 'unknown' && classification.confidence >= 0.5;
    if (!canRank) return courses;
    return courses
      .map((course, index) => ({
        course,
        index,
        score: course.personaRelevance[persona] ?? 0,
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .map((entry) => entry.course);
  }, [courses, classification.persona, classification.confidence, hydrated]);

  // ── Facet counts (over the full set, like the centres sidebar) ────────────
  const levelCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const course of courses) map.set(course.level, (map.get(course.level) ?? 0) + 1);
    return map;
  }, [courses]);

  const commitmentCounts = useMemo(() => {
    const map = new Map<Commitment, number>();
    for (const option of COMMITMENTS) {
      map.set(
        option.id,
        courses.filter((course) => matchesCommitment(course, option.id)).length,
      );
    }
    return map;
  }, [courses]);

  const needle = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      new Set(
        ordered
          .filter(
            (course) =>
              (level === 'all' || course.level === level) &&
              matchesCommitment(course, commitment) &&
              matchesQuery(course, needle),
          )
          .map((course) => course.slug),
      ),
    [ordered, level, commitment, needle],
  );

  // Signature encodes arrangement + membership, so FLIP fires on any
  // reorganisation and not on unrelated renders.
  const signature = `${ordered.map((c) => c.slug).join(',')}|${[...visible].join(',')}`;
  useFlip(listRef, signature);

  const hasActiveFilters = level !== 'all' || commitment !== 'all' || needle !== '';

  function clearFilters() {
    setView(DEFAULT_VIEW);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-12">
      {/* ── Left: filter sidebar ─────────────────────────────────────────── */}
      <aside
        className="dc-panel flex flex-col self-start rounded-[20px] xs:rounded-[22px] lg:sticky lg:top-[6.5rem] lg:z-[2] lg:max-h-[calc(100vh-7.5rem)] xl:top-28"
        aria-label="Filter programmes"
      >
        {/* Pinned: title + search always visible while the lists scroll */}
        <div className="shrink-0 rounded-t-[20px] border-b border-[rgb(255_100_105/0.18)] bg-[var(--dc-card)] p-5 xs:rounded-t-[22px] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="label-mono">Filters</p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="-my-2 inline-block cursor-pointer py-2 text-[12px] font-bold text-[var(--dc-accent-soft)] transition-colors hover:text-[var(--dc-ink)]"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <label htmlFor={inputId} className="relative mt-5 block">
            <span className="sr-only">Search programmes</span>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--dc-ink-muted)]"
              strokeWidth={2.25}
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setView((v) => ({ ...v, query: e.target.value }))}
              placeholder="Search programmes..."
              autoComplete="off"
              className="dc-input w-full rounded-full py-2.5 pr-10 pl-10 text-[13.5px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setView((v) => ({ ...v, query: '' }))}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-[var(--dc-ink-muted)] transition-colors hover:bg-[var(--dc-accent-tint)] hover:text-[var(--dc-ink)]"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
              </button>
            ) : null}
          </label>
        </div>

        {/* Scrollable: level + commitment lists */}
        <div className="dc-filter-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <FilterGroup label="Level">
            {LEVELS.map((option) => (
              <FilterRow
                key={option.id}
                active={level === option.id}
                onClick={() => {
                  setView((v) => ({ ...v, level: option.id }));
                  track('nudge_clicked', { nudge_id: 'explorer-level', href: String(option.id) });
                }}
                label={option.label}
                count={option.id === 'all' ? courses.length : (levelCounts.get(option.id) ?? 0)}
              />
            ))}
          </FilterGroup>

          <FilterGroup label="Commitment" className="mt-6">
            {COMMITMENTS.map((option) => (
              <FilterRow
                key={option.id}
                active={commitment === option.id}
                onClick={() => setView((v) => ({ ...v, commitment: option.id }))}
                label={option.label}
                count={commitmentCounts.get(option.id) ?? 0}
              />
            ))}
          </FilterGroup>
        </div>
      </aside>

      {/* ── Right: results ───────────────────────────────────────────────── */}
      <div className="min-w-0">
        <p
          aria-live="polite"
          className="numeral text-[12px] font-bold tracking-[0.1em] text-[var(--dc-ink-muted)] uppercase"
        >
          {visible.size} {visible.size === 1 ? 'programme' : 'programmes'}
          {hasActiveFilters ? ' matching' : null}
        </p>

        <div
          ref={listRef}
          className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3"
        >
          {ordered.map((course) => {
            const isVisible = visible.has(course.slug);
            const levelLabel =
              LEVELS.find((l) => l.id === course.level)?.label ?? course.level;

            return (
              <article
                key={course.slug}
                data-flip-key={course.slug}
                /*
                  `hidden` keeps filtered-out courses in the DOM and in the
                  server-rendered HTML — they are only visually removed, so a
                  crawler and any visitor without JS still get every course link.
                */
                hidden={!isVisible}
                className="relative h-full"
              >
                <TransitionLink
                  href={`/courses/${course.slug}`}
                  onClick={() =>
                    track('course_viewed', { course_slug: course.slug, surface: 'explorer-card' })
                  }
                  className="dc-card-shell dc-card-interactive group/card block h-full"
                >
                  <div className="dc-card flex h-full flex-col overflow-hidden">
                    <div className="dc-card-media relative aspect-[16/10] overflow-hidden">
                      {course.heroImage ? (
                        <Image
                          src={course.heroImage.url}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 42vw, 90vw"
                          className="object-cover transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/card:scale-[1.04]"
                        />
                      ) : null}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(7_7_12/0.65)] via-transparent to-transparent"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="inline-flex rounded-full border border-[var(--dc-accent-border)] bg-[var(--dc-accent-tint)] px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-[var(--dc-accent-soft)] uppercase">
                        {levelLabel}
                      </span>
                      <span className="numeral text-[12.5px] font-semibold text-[var(--dc-ink-muted)]">
                        {course.duration}
                      </span>
                    </div>

                    <h2 className="mt-3.5 font-display text-[17px] leading-snug font-extrabold tracking-[-0.02em] text-balance text-[var(--dc-ink)] transition-colors group-hover/card:text-[var(--dc-accent-soft)] sm:text-[18px]">
                      {course.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-[var(--dc-ink-muted)]">
                      {course.eligibility}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <span className="text-[13.5px] font-bold text-[var(--dc-accent-soft)]">
                        View programme
                      </span>
                      <span
                        aria-hidden="true"
                        className="dc-cta grid h-10 w-10 shrink-0 place-items-center rounded-full"
                      >
                        <ArrowRight
                          className="h-[18px] w-[18px] transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/card:translate-x-0.5"
                          strokeWidth={2.25}
                        />
                      </span>
                    </div>
                    </div>
                  </div>
                </TransitionLink>
              </article>
            );
          })}
        </div>

        {visible.size === 0 ? (
          <div className="dc-panel mt-6 rounded-[20px] px-6 py-12 text-center sm:px-8">
            <p className="font-display text-[18px] font-extrabold text-[var(--dc-ink)]">
              No programme matches those filters
            </p>
            <p className="mt-2 text-[14px] text-[var(--dc-ink-secondary)]">
              Try a different level, length, or search term.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="-my-2 mt-5 inline-block cursor-pointer py-2 text-[14px] font-bold text-[var(--dc-accent-soft)] transition-colors hover:text-[var(--dc-ink)]"
            >
              Clear all filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ── Small parts ─────────────────────────────────────────────────────────── */

function FilterGroup({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--dc-ink-muted)] uppercase">
        {label}
      </p>
      <ul className="mt-2.5 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function FilterRow({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className="dc-filter-row text-[13.5px]"
      >
        <span className="truncate">{label}</span>
        <span className="numeral shrink-0 text-[11px] font-bold tracking-[0.06em] text-[var(--dc-ink-muted)]">
          {count}
        </span>
      </button>
    </li>
  );
}
