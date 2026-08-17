/**
 * Collision-resistant identifier for client-created entities.
 *
 * Uses `crypto.randomUUID` where available and falls back to a timestamp +
 * random suffix, which keeps ids sortable-ish in environments without it.
 */
export function createId(prefix?: string): string {
  const raw =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  return prefix ? `${prefix}_${raw}` : raw;
}
