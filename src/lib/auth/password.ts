import 'server-only';

/**
 * PBKDF2-SHA256 password hashing via Web Crypto (`crypto.subtle`) — the same
 * API `admin/actions.ts` already uses for session HMACs, so this adds no new
 * dependency (no bcrypt/argon2 package) for what's still a small internal
 * staff tool, not a public-signup surface.
 */

const ITERATIONS = 210_000; // OWASP's 2023 minimum for PBKDF2-SHA256
const KEY_LENGTH_BITS = 256;

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<ArrayBuffer> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    keyMaterial,
    KEY_LENGTH_BITS,
  );
}

/** Stored format: `pbkdf2$<iterations>$<salt-hex>$<hash-hex>` — the iteration
 *  count travels with the hash so it can be raised later without breaking
 *  already-stored passwords. */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const derived = await derive(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toHex(salt)}$${toHex(derived)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const [, iterationsRaw, saltHex, expectedHex] = parts;
  const iterations = Number(iterationsRaw);
  if (!Number.isFinite(iterations) || iterations <= 0 || !saltHex || !expectedHex) return false;

  const derived = await derive(password, fromHex(saltHex), iterations);
  const actualHex = toHex(derived);

  if (actualHex.length !== expectedHex.length) return false;
  let diff = 0;
  for (let i = 0; i < actualHex.length; i++) diff |= actualHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  return diff === 0;
}
