'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { MapPin, Phone, Search, X } from 'lucide-react';
import { track } from '@/lib/analytics';
import { centrePath } from '@/lib/centre-path';
import { usePersona } from '@/persona/PersonaProvider';
import { subscribeCentresSearch } from './CentresHeroSearch';

type CitySummary = { slug: string; name: string; state: string };
type CentreSummary = {
  slug: string;
  name: string;
  citySlug: string;
  addressLine: string;
  locality: string;
  state: string;
  pincode: string;
  phone?: string;
};

function matchesCity(city: CitySummary, needle: string): boolean {
  if (!needle) return true;
  return (
    city.name.toLowerCase().includes(needle) ||
    city.state.toLowerCase().includes(needle) ||
    city.slug.includes(needle)
  );
}

function matchesCentre(centre: CentreSummary, needle: string): boolean {
  if (!needle) return true;
  return (
    centre.name.toLowerCase().includes(needle) ||
    centre.locality.toLowerCase().includes(needle) ||
    centre.addressLine.toLowerCase().includes(needle) ||
    centre.pincode.includes(needle) ||
    centre.slug.includes(needle) ||
    (centre.phone?.toLowerCase().includes(needle) ?? false)
  );
}

function cityMatchesFilters(
  city: CitySummary,
  cityCentres: CentreSummary[],
  needle: string,
  activeState: string | null,
  activeCity: string | null,
): boolean {
  if (activeCity && city.slug !== activeCity) return false;
  if (activeState && city.state !== activeState) return false;
  if (!needle) return true;
  if (matchesCity(city, needle)) return true;
  return cityCentres.some((c) => matchesCentre(c, needle));
}

/**
 * Centres index — left filter sidebar + right results with full centre details.
 *
 * Search and sidebar filters only toggle `hidden` on already-rendered cards.
 * Every city and centre stays in the HTML for crawlers.
 */
export function CentresIndex({
  cities,
  centres,
  initialQuery = '',
}: {
  cities: CitySummary[];
  centres: CentreSummary[];
  initialQuery?: string;
}) {
  const inputId = useId();
  const { classification, hydrated } = usePersona();
  const [query, setQuery] = useState(initialQuery);
  const [activeState, setActiveState] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const trackedRef = useRef('');

  useEffect(() => {
    if (!hydrated) return;
    const params = new URLSearchParams(window.location.search);
    const trimmed = query.trim();
    if (trimmed) params.set('q', trimmed);
    else params.delete('q');
    const qs = params.toString();
    const next = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', next);
  }, [query, hydrated]);

  useEffect(() => subscribeCentresSearch((next) => setQuery(next)), []);

  const needle = query.trim().toLowerCase();

  const states = useMemo(() => {
    const map = new Map<string, number>();
    for (const city of cities) {
      const count = centres.filter((c) => c.citySlug === city.slug).length;
      map.set(city.state, (map.get(city.state) ?? 0) + count);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [cities, centres]);

  const sidebarCities = useMemo(() => {
    return cities.filter((city) => {
      if (activeState && city.state !== activeState) return false;
      const cityCentres = centres.filter((c) => c.citySlug === city.slug);
      if (!needle) return true;
      return matchesCity(city, needle) || cityCentres.some((c) => matchesCentre(c, needle));
    });
  }, [cities, centres, activeState, needle]);

  const visibleCentreCount = useMemo(() => {
    return cities.reduce((total, city) => {
      const cityCentres = centres.filter((c) => c.citySlug === city.slug);
      if (!cityMatchesFilters(city, cityCentres, needle, activeState, activeCity)) return total;
      return (
        total +
        cityCentres.filter(
          (c) => !needle || matchesCentre(c, needle) || matchesCity(city, needle),
        ).length
      );
    }, 0);
  }, [cities, centres, needle, activeState, activeCity]);

  function onSearchChange(value: string) {
    setQuery(value);
    const trimmed = value.trim();
    if (trimmed.length >= 2 && trimmed !== trackedRef.current) {
      trackedRef.current = trimmed;
      track('centre_searched', {
        query: trimmed,
        persona: classification.persona,
      });
    }
  }

  function clearFilters() {
    setActiveState(null);
    setActiveCity(null);
    onSearchChange('');
  }

  const hasActiveFilters = Boolean(activeState || activeCity || needle);

  return (
    <section
      id="centres-index"
      className="shell scroll-mt-24 pt-4 pb-14 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20"
      aria-labelledby="centres-index-heading"
    >
      <div className="max-w-2xl">
        <p className="text-[12px] font-bold tracking-[0.14em] text-[var(--centres-ink-muted)] uppercase">
          Browse by city
        </p>
        <h2
          id="centres-index-heading"
          className="mt-2 font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--centres-ink)] xs:text-[26px] sm:text-[28px] lg:text-[30px]"
        >
          Centres across India
        </h2>
      </div>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-12">
        {/* ── Left: filters ─────────────────────────────────────────────── */}
        <aside
          className="centres-card flex flex-col self-start rounded-[20px] xs:rounded-[22px] lg:sticky lg:top-[6.5rem] lg:z-[2] lg:max-h-[calc(100vh-7.5rem)] xl:top-28"
          aria-label="Filter centres"
        >
          {/* Pinned: title + search always visible while lists scroll */}
          <div className="centres-filter-sticky shrink-0 rounded-t-[20px] border-b border-[rgb(255_100_105/0.18)] p-5 xs:rounded-t-[22px] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-bold tracking-[0.14em] text-[var(--centres-ink-muted)] uppercase">
                Filters
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[12px] font-bold text-[var(--centres-accent-soft)] transition-colors hover:text-[var(--centres-ink)]"
                >
                  Clear all
                </button>
              ) : null}
            </div>

            <label htmlFor={inputId} className="relative mt-5 block">
              <span className="sr-only">Search centres</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--centres-ink-muted)]"
                strokeWidth={2.25}
                aria-hidden="true"
              />
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search cities, states..."
                autoComplete="off"
                className="w-full rounded-full border border-[rgb(255_100_105/0.25)] bg-[rgb(7_7_12/0.85)] py-2.5 pr-10 pl-10 text-[13.5px] text-[var(--centres-ink)] shadow-[0_0_0_1px_rgb(7_7_12/0.4)] placeholder:text-[var(--centres-ink-muted)] transition-[border-color] duration-200 outline-none focus:border-[var(--centres-accent-soft)]/70"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2.5 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[var(--centres-ink-muted)] transition-colors hover:bg-[var(--centres-accent-tint)] hover:text-[var(--centres-ink)]"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden="true" />
                </button>
              ) : null}
            </label>
          </div>

          {/* Scrollable: state + city lists */}
          <div className="centres-filter-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            <div>
              <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--centres-ink-muted)] uppercase">
                State
              </p>
              <ul className="mt-2.5 flex flex-col gap-1">
                <li>
                  <FilterButton
                    active={!activeState}
                    onClick={() => {
                      setActiveState(null);
                      setActiveCity(null);
                    }}
                    label="All states"
                    count={centres.length}
                  />
                </li>
                {states.map(([state, count]) => (
                  <li key={state}>
                    <FilterButton
                      active={activeState === state}
                      onClick={() => {
                        setActiveState(state);
                        setActiveCity(null);
                      }}
                      label={state}
                      count={count}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--centres-ink-muted)] uppercase">
                City
              </p>
              <ul className="mt-2.5 flex flex-col gap-1 pr-0.5">
                <li>
                  <FilterButton
                    active={!activeCity}
                    onClick={() => setActiveCity(null)}
                    label="All cities"
                    count={
                      activeState
                        ? centres.filter((c) => {
                            const city = cities.find((ct) => ct.slug === c.citySlug);
                            return city?.state === activeState;
                          }).length
                        : centres.length
                    }
                  />
                </li>
                {sidebarCities.map((city) => {
                  const cityCount = centres.filter((c) => c.citySlug === city.slug).length;
                  return (
                    <li key={city.slug}>
                      <FilterButton
                        active={activeCity === city.slug}
                        onClick={() => setActiveCity(city.slug)}
                        label={city.name}
                        count={cityCount}
                        icon={MapPin}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* ── Right: full centre details ─────────────────────────────────── */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p
              aria-live="polite"
              className="numeral text-[12px] font-bold tracking-[0.1em] text-[var(--centres-ink-muted)] uppercase"
            >
              {visibleCentreCount} {visibleCentreCount === 1 ? 'centre' : 'centres'}
              {hasActiveFilters ? ' matching' : null}
            </p>
            {activeCity ? (
              <p className="text-[13px] text-[var(--centres-ink-secondary)]">
                Showing{' '}
                <span className="font-bold text-[var(--centres-ink)]">
                  {cities.find((c) => c.slug === activeCity)?.name}
                </span>
              </p>
            ) : activeState ? (
              <p className="text-[13px] text-[var(--centres-ink-secondary)]">
                Showing <span className="font-bold text-[var(--centres-ink)]">{activeState}</span>
              </p>
            ) : null}
          </div>

          <div className="mt-5 space-y-5 sm:mt-6">
            {cities.map((city) => {
              const cityCentres = centres.filter((c) => c.citySlug === city.slug);
              const cityVisible = cityMatchesFilters(
                city,
                cityCentres,
                needle,
                activeState,
                activeCity,
              );

              return (
                <section
                  key={city.slug}
                  id={`city-${city.slug}`}
                  className={cityVisible ? 'scroll-mt-28 space-y-4' : 'hidden'}
                  aria-labelledby={`city-heading-${city.slug}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-1">
                    <h3
                      id={`city-heading-${city.slug}`}
                      className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-[var(--centres-ink)] sm:text-[20px]"
                    >
                      {city.name}
                    </h3>
                    <span className="text-[11px] font-bold tracking-[0.08em] text-[var(--centres-ink-muted)] uppercase">
                      {city.state} · {cityCentres.length}{' '}
                      {cityCentres.length === 1 ? 'centre' : 'centres'}
                    </span>
                  </div>

                  <ul
                    className={
                      cityCentres.length > 1
                        ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5'
                        : 'grid grid-cols-1 gap-4'
                    }
                  >
                    {cityCentres.map((centre) => {
                      const centreVisible =
                        !needle || matchesCentre(centre, needle) || matchesCity(city, needle);
                      const telHref = centre.phone
                        ? `tel:${centre.phone.replace(/[^\d+]/g, '').split('/')[0]}`
                        : null;

                      return (
                        <li
                          key={centre.slug}
                          id={`centre-${centre.slug}`}
                          className={
                            centreVisible
                              ? 'centres-card flex h-full flex-col scroll-mt-28 rounded-[20px] p-5 xs:rounded-[22px] sm:p-6'
                              : 'hidden'
                          }
                        >
                          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-x-4 sm:gap-y-2">
                            <div className="min-w-0">
                              <h4 className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-[var(--centres-ink)] sm:text-[18px] lg:text-[20px]">
                                <Link
                                  href={centrePath(centre.slug) as Route}
                                  className="transition-colors hover:text-[var(--centres-accent-soft)]"
                                >
                                  {centre.name}
                                </Link>
                              </h4>
                              <p className="mt-1 text-[13px] font-semibold text-[var(--centres-accent-soft)]">
                                {centre.locality}, {city.name}
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-wrap items-center gap-2">
                              <Link
                                href={centrePath(centre.slug) as Route}
                                className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/20 px-3.5 py-2 text-[12.5px] font-bold text-[var(--centres-ink)] transition-colors hover:border-white/40 hover:bg-white/5 sm:px-4 sm:text-[13px]"
                              >
                                View details
                              </Link>
                              <Link
                                href={`/enquiry?centre=${centre.slug}` as Route}
                                className="inline-flex min-h-10 items-center justify-center rounded-full bg-[var(--centres-accent)] px-3.5 py-2 text-[12.5px] font-bold text-white transition-colors hover:bg-jk-700 sm:px-4 sm:text-[13px]"
                              >
                                Enquire
                              </Link>
                            </div>
                          </div>

                          <address className="mt-4 flex-1 text-[13.5px] leading-relaxed text-[var(--centres-ink-secondary)] not-italic sm:text-[14px]">
                            {centre.addressLine}
                            <br />
                            {centre.locality}, {city.name}
                            <br />
                            {centre.state} {centre.pincode}
                          </address>

                          {centre.phone ? (
                            <p className="mt-3 flex flex-wrap items-center gap-2 text-[14px]">
                              <Phone
                                className="h-3.5 w-3.5 text-[var(--centres-accent-soft)]"
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                              <span className="text-[12px] font-bold tracking-[0.08em] text-[var(--centres-ink-muted)] uppercase">
                                Phone
                              </span>
                              {telHref ? (
                                <a
                                  href={telHref}
                                  className="numeral font-semibold text-[var(--centres-ink)] transition-colors hover:text-[var(--centres-accent-soft)]"
                                  onClick={() =>
                                    track('phone_clicked', { centre_slug: centre.slug })
                                  }
                                >
                                  {centre.phone}
                                </a>
                              ) : (
                                <span className="numeral font-semibold text-[var(--centres-ink)]">
                                  {centre.phone}
                                </span>
                              )}
                            </p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          {visibleCentreCount === 0 ? (
            <div className="centres-card mt-5 rounded-[20px] px-6 py-12 text-center sm:px-8">
              <p className="font-display text-[18px] font-extrabold text-[var(--centres-ink)]">
                No centres match your filters
              </p>
              <p className="mt-2 text-[14px] text-[var(--centres-ink-secondary)]">
                Try a different city, state, or search term.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-[14px] font-bold text-[var(--centres-accent-soft)] transition-colors hover:text-[var(--centres-ink)]"
              >
                Clear all filters
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon?: typeof MapPin;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'centres-filter-btn flex w-full items-center justify-between gap-3 rounded-[12px] px-3 py-2.5 text-left text-[13.5px] font-semibold transition-[background-color,border-color,color] duration-200',
        active
          ? 'border border-[var(--centres-accent-soft)]/55 bg-[var(--centres-accent-tint)] text-[var(--centres-ink)]'
          : 'border border-transparent text-[var(--centres-ink-secondary)] hover:border-[rgb(255_100_105/0.2)] hover:bg-[rgb(255_100_105/0.06)] hover:text-[var(--centres-ink)]',
      ].join(' ')}
    >
      <span className="flex min-w-0 items-center gap-2">
        {Icon ? (
          <Icon
            className={[
              'h-3.5 w-3.5 shrink-0',
              active ? 'text-[var(--centres-accent-soft)]' : 'text-[var(--centres-ink-muted)]',
            ].join(' ')}
            strokeWidth={2}
            aria-hidden="true"
          />
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      <span className="numeral shrink-0 text-[11px] font-bold tracking-[0.06em] text-[var(--centres-ink-muted)]">
        {count}
      </span>
    </button>
  );
}
