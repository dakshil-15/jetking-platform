'use client';

import { useSyncExternalStore } from 'react';

function subscribe(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  };
}

/**
 * Reactive `matchMedia`. Returns `false` on the server so markup rendered
 * during SSR matches the client's first paint.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tailwind's `md` breakpoint, expressed as "is this a small screen". */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
