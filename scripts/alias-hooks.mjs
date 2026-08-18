import { existsSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Module resolution hook that teaches Node the `@/*` path alias and the
 * extensionless imports the app uses.
 *
 * Next.js and tsc understand `paths` from tsconfig; plain Node does not. This
 * lets scripts/ import and exercise real application modules instead of
 * duplicating their logic.
 */

const SRC_DIR = resolvePath(dirname(fileURLToPath(import.meta.url)), '../src');

/** Extensionless specifiers resolve to `<path>.ts` or `<path>/index.ts`. */
function withExtension(absolutePath) {
  const candidates = [
    absolutePath,
    `${absolutePath}.ts`,
    `${absolutePath}.tsx`,
    `${absolutePath}/index.ts`,
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? absolutePath;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const target = withExtension(resolvePath(SRC_DIR, specifier.slice(2)));
    return nextResolve(pathToFileURL(target).href, context);
  }

  // Relative imports inside aliased modules also arrive extensionless.
  if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL) {
    const parentDir = dirname(fileURLToPath(context.parentURL));
    const target = withExtension(resolvePath(parentDir, specifier));
    if (existsSync(target)) return nextResolve(pathToFileURL(target).href, context);
  }

  return nextResolve(specifier, context);
}
