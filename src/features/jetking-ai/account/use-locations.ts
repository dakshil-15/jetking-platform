'use client';

import { useEffect, useState } from 'react';

import type { LocationTree } from '@/lib/chatbot/types';

/** One request per page load, shared by every dialog that needs the lists; a failure is retried next time. */
let request: Promise<LocationTree> | null = null;

function fetchLocations(): Promise<LocationTree> {
  request ??= fetch('/api/locations')
    .then((r) => {
      if (!r.ok) throw new Error(`locations ${r.status}`);
      return r.json() as Promise<LocationTree>;
    })
    .catch((error) => {
      request = null;
      throw error;
    });
  return request;
}

/** The state → city → centre tree, or `null` while it loads (or if it could not be loaded). Fetches only when `enabled`. */
export function useLocations(enabled = true): LocationTree | null {
  const [tree, setTree] = useState<LocationTree | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    fetchLocations()
      .then((data) => {
        if (!cancelled) setTree(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return tree;
}

/**
 * Cascading State → City → Centre selection. Only the three raw choices are state; the
 * lists and the "is this still valid" checks are derived, so changing a state can never
 * leave a stale city behind and a city can never keep a centre from elsewhere.
 */
export function useLocationPicker(tree: LocationTree | null) {
  const [stateName, setStateName] = useState('');
  const [citySlug, setCitySlug] = useState('');
  const [centreSlug, setCentreSlug] = useState('');

  const states = tree?.states ?? [];
  const cities = states.find((s) => s.name === stateName)?.cities ?? [];
  const cityNode = cities.find((c) => c.slug === citySlug);
  const centres = cityNode?.centres ?? [];

  return {
    loading: tree === null,
    states,
    cities,
    centres,
    state: stateName,
    city: cityNode ? citySlug : '',
    centre: centres.some((c) => c.slug === centreSlug) ? centreSlug : '',
    setState(value: string) {
      setStateName(value);
      setCitySlug('');
      setCentreSlug('');
    },
    setCity(value: string) {
      setCitySlug(value);
      setCentreSlug('');
    },
    setCentre: setCentreSlug,
  };
}
