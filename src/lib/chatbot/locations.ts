import 'server-only';
import { content } from '@/lib/content';
import type { LocationTree } from './types';

/**
 * State → city → centre, straight from the content source, for the account sign-up
 * forms. One tree feeds both the dropdowns (via `/api/locations`) and the server-side
 * check that a submitted state/city/centre really belong together — so the profile
 * never stores a centre that isn't in that city, whatever a client sends.
 */
export async function loadLocationTree(): Promise<LocationTree> {
  const [cities, centres] = await Promise.all([content.listCities(), content.listCentres()]);

  const byState = new Map<string, LocationTree['states'][number]>();
  for (const city of [...cities].sort((a, b) => a.name.localeCompare(b.name))) {
    let state = byState.get(city.state);
    if (!state) {
      state = { name: city.state, cities: [] };
      byState.set(city.state, state);
    }
    state.cities.push({
      slug: city.slug,
      name: city.name,
      centres: centres
        .filter((c) => c.citySlug === city.slug)
        .map((c) => ({ slug: c.slug, name: c.name })),
    });
  }

  return { states: [...byState.values()].sort((a, b) => a.name.localeCompare(b.name)) };
}

/** `true` when `city` is in `state` and `centre` (if given) is in `city`. */
export function isConsistentLocation(
  tree: LocationTree,
  pick: { state: string; city: string; centre?: string },
): boolean {
  const city = tree.states.find((s) => s.name === pick.state)?.cities.find((c) => c.slug === pick.city);
  if (!city) return false;
  return !pick.centre || city.centres.some((c) => c.slug === pick.centre);
}
