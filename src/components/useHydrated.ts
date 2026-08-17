'use client';

import { useSyncExternalStore } from 'react';

/**
 * `false` on the server and during hydration, `true` from the first commit onward.
 *
 * This is the mount flag every component that renders a portal, reads `document`,
 * or renders browser-only chrome needs. It exists as a hook rather than the usual
 * `useState(false)` + `useEffect(() => setMounted(true))` pair because that pattern
 * sets state synchronously inside an effect — a cascading render that React's
 * `set-state-in-effect` rule (enabled in this project) correctly rejects.
 *
 * `useSyncExternalStore` gets the same result in one render: React calls the
 * server snapshot while hydrating and the client snapshot afterwards. The store
 * never changes, so `subscribe` is a no-op and nothing ever re-subscribes.
 */
const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, getClientSnapshot, getServerSnapshot);
}
