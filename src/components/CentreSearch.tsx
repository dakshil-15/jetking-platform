'use client';

import { useId, useMemo, useState } from 'react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';
import { Field, Input } from './ui';

export function CentreSearch({
  cities,
}: {
  cities: Array<{ slug: string; name: string; state: string }>;
}) {
  const [q, setQ] = useState('');
  const { classification } = usePersona();
  const id = useId();

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return cities;
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.state.toLowerCase().includes(needle) ||
        c.slug.includes(needle),
    );
  }, [cities, q]);

  return (
    <div>
      <div className="max-w-md">
        <Field label="Search cities" htmlFor={id}>
          <Input
            id={id}
            type="search"
            value={q}
            onChange={(e) => {
              const value = e.target.value;
              setQ(value);
              if (value.trim().length >= 2) {
                track('centre_searched', {
                  query: value.trim(),
                  persona: classification.persona,
                });
              }
            }}
            placeholder="e.g. Mumbai"
          />
        </Field>
      </div>

      <p aria-live="polite" className="numeral mt-3 text-sm text-foreground-muted">
        Showing {filtered.length} of {cities.length} cities
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {filtered.map((city) => (
          <li key={city.slug}>
            <a
              href={`/centres/${city.slug}`}
              className="inline-flex rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground"
            >
              {city.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
