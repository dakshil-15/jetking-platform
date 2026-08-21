'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reactive `matchMedia`. Returns `false` on the server so markup rendered
 * during SSR matches the client's first paint.
 *
 * The subscribe function is memoized per `query` — passing a freshly-constructed
 * function every render makes `useSyncExternalStore` tear down and re-add the
 * `matchMedia` listener on every render of every component that calls this
 * (cleanup was always paired correctly, so it wasn't a leak, just churn).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tailwind's `md` breakpoint, expressed as "is this a small screen". */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
