import { createJSONStorage, type PersistStorage } from 'zustand/middleware';

/**
 * `localStorage` with batched writes.
 *
 * The chat store updates once per streamed token and once per keystroke in the
 * composer. Persisting synchronously on each of those would serialise the whole
 * conversation history hundreds of times a second and jank the main thread, so
 * writes are coalesced onto a trailing timer and flushed when the page is
 * hidden — the last point at which the browser guarantees us execution.
 */

const FLUSH_DELAY_MS = 400;

const pendingWrites = new Map<string, string | null>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let listenersAttached = false;

function flush(): void {
  if (flushTimer !== null) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  for (const [key, value] of pendingWrites) {
    try {
      if (value === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, value);
    } catch {
      // Quota exceeded or storage disabled — dropping the write is the only
      // sane recovery; the in-memory store stays authoritative for this session.
    }
  }

  pendingWrites.clear();
}

function scheduleFlush(): void {
  if (!listenersAttached) {
    // `pagehide` fires on bfcache navigations where `beforeunload` does not.
    window.addEventListener('pagehide', flush);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush();
    });
    listenersAttached = true;
  }

  if (flushTimer !== null) return;
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}

const debouncedLocalStorage = {
  getItem: (key: string): string | null => {
    // Reads must see writes that have not been flushed yet.
    const pending = pendingWrites.get(key);
    if (pending !== undefined) return pending;

    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    pendingWrites.set(key, value);
    scheduleFlush();
  },

  removeItem: (key: string): void => {
    pendingWrites.set(key, null);
    scheduleFlush();
  },
};

/**
 * Persist storage for a zustand store. Returns `undefined` on the server so
 * the middleware skips rehydration entirely during SSR.
 */
export function createBatchedStorage<T>(): PersistStorage<T> | undefined {
  return createJSONStorage<T>(() => {
    if (typeof window === 'undefined') {
      // createJSONStorage catches a throwing factory and yields `undefined`,
      // which disables persistence for that render instead of crashing.
      throw new Error('localStorage is unavailable during server rendering');
    }
    return debouncedLocalStorage;
  });
}
