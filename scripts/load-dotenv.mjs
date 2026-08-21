/**
 * Loads .env.local into process.env, synchronously, as an import side effect.
 *
 * `next dev`/`next build` do this automatically; a plain `node`/`tsx`
 * invocation does not. Must be imported *first*, before anything that reads
 * process.env at module-evaluation time (e.g. `@/lib/content`'s
 * `resolveSource()`, which runs the instant it's imported) — ES module
 * static imports evaluate in declaration order, so this only works if it is
 * the first import in the entry script.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

try {
  const raw = readFileSync(resolve(HERE, '../.env.local'), 'utf8');
  for (const line of raw.split('\n')) {
    const match = /^\s*([\w.-]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, '$2');
  }
} catch {
  // No .env.local — fine, env vars come from the shell instead.
}
