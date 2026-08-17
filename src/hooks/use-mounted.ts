'use client';

import { useSyncExternalStore } from 'react';

/** Never fires — mount state changes exactly once, at hydration. */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` during SSR and the first client render, `true` afterwards.
 *
 * Guards UI whose output depends on browser-only state (persisted stores,
 * `matchMedia`, locale formatting) and would otherwise hydrate-mismatch.
 *
 * Implemented with `useSyncExternalStore` rather than an effect so the value
 * flips as part of hydration instead of triggering a second render pass.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
