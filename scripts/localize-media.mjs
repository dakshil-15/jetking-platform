#!/usr/bin/env node
/**
 * Download every ClickFunnels image the content still points at into public/media (as webp) and
 * rewrite the references to /media/<id>.webp.
 *
 * Why: the migrated blog and centre content came with images hosted on ClickFunnels. The site now
 * serves all of them itself. data/cms/store.json is not tracked in git, so after a fresh
 * `npm run migrate:blog` (which writes the original remote URLs) run this once to localise again:
 *
 *   npm run localize:media
 *
 * Safe to re-run: images already in public/media are not downloaded twice, and references that are
 * already local are left alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'media');
const TARGETS = ['data/cms/store.json', 'src/lib/content/fixtures/locations.ts', 'src/content/website-corpus.json'];
const URL_RE = /https:\/\/(?:images|statics)\.(?:myclickfunnels|clickfunnels)\.com\/[^"'\s)\\]*/g;
const WRAPPED = /^https:\/\/images\.clickfunnels\.com\/cdn-cgi\/image\/[^/]+\/(https:\/\/statics\.myclickfunnels\.com\/.+)$/;

const originalOf = (url) => (url.match(WRAPPED)?.[1] ?? url);
const nameOf = (url) => originalOf(url).split('?')[0].split('/').pop().replace(/\.[a-z0-9]*$/i, '');

const files = TARGETS.filter((f) => fs.existsSync(path.join(ROOT, f)));
const texts = new Map(files.map((f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]));
const originals = new Set();
for (const text of texts.values()) for (const m of text.matchAll(URL_RE)) originals.add(originalOf(m[0]));

if (originals.size === 0) {
  console.log('Nothing to localise: no ClickFunnels image URLs found.');
  process.exit(0);
}

fs.mkdirSync(OUT, { recursive: true });
const localOf = new Map();
const failed = [];
const queue = [...originals];

async function fetchOne(url) {
  const name = nameOf(url);
  const file = path.join(OUT, `${name}.webp`);
  if (!fs.existsSync(file)) {
    let buf;
    for (let attempt = 0; attempt < 3 && !buf; attempt++) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(90_000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        buf = Buffer.from(await res.arrayBuffer());
      } catch {
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
    if (!buf) return failed.push(url);
    const meta = await sharp(buf, { animated: true }).metadata();
    const animated = (meta.pages ?? 1) > 1;
    const image = animated
      ? sharp(buf, { animated: true })
      : sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true });
    fs.writeFileSync(file, await image.webp({ quality: meta.format === 'jpeg' ? 78 : 82 }).toBuffer());
  }
  localOf.set(url, `/media/${name}.webp`);
}

await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) await fetchOne(queue.shift());
  }),
);

let rewritten = 0;
for (const [file, text] of texts) {
  const next = text.replace(URL_RE, (u) => {
    const local = localOf.get(originalOf(u));
    if (!local) return u;
    rewritten++;
    return local;
  });
  fs.writeFileSync(path.join(ROOT, file), next);
}

console.log(`Localised ${localOf.size} images, rewrote ${rewritten} references.`);
if (failed.length) {
  console.warn(`${failed.length} could not be downloaded and were left as remote URLs:`);
  for (const u of failed) console.warn('  ' + u);
  process.exitCode = 1;
}
