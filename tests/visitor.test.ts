import { describe, expect, it } from 'vitest';
import { isValidVisitorId, mintVisitorId, resolveVisitorId } from '@/persona/visitor';

describe('visitor identity', () => {
  it('mints JK_ ids with a stable shape', () => {
    const id = mintVisitorId();
    expect(id.startsWith('JK_')).toBe(true);
    expect(isValidVisitorId(id)).toBe(true);
  });

  it('rejects malformed ids', () => {
    expect(isValidVisitorId('abc123')).toBe(false);
    expect(isValidVisitorId('JK_')).toBe(false);
    expect(isValidVisitorId('JK_!!!')).toBe(false);
  });

  it('reuses a valid existing cookie value', () => {
    const existing = mintVisitorId();
    const resolved = resolveVisitorId(existing);
    expect(resolved.id).toBe(existing);
    expect(resolved.minted).toBe(false);
  });

  it('mints when the cookie is missing or invalid', () => {
    const resolved = resolveVisitorId(undefined);
    expect(resolved.minted).toBe(true);
    expect(isValidVisitorId(resolved.id)).toBe(true);

    const bad = resolveVisitorId('not-an-id');
    expect(bad.minted).toBe(true);
    expect(isValidVisitorId(bad.id)).toBe(true);
  });
});
