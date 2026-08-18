/**
 * Strips absolute origins out of the committed knowledge base.
 *
 *   node scripts/migrate-paths.mjs
 *
 * The corpus is meant to be self-contained and portable: it should not record
 * the address of whichever machine crawled it. Every `url` becomes a
 * site-relative `path`, and the public origin is joined on at render time by
 * `siteHref()`. Idempotent — safe to re-run.
 *
 * Only metadata changes, so the embedding vectors stay valid and nothing needs
 * to be re-embedded.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const KB = new URL('../src/content/jetking-kb.json', import.meta.url);
const INDEX = new URL('../src/content/jetking-embeddings.json', import.meta.url);

/** Absolute URL (any origin) -> site-relative path. */
function toPath(value) {
  if (!value) return value;
  try {
    const u = new URL(value);
    return `${u.pathname}${u.search}${u.hash}` || '/';
  } catch {
    // Already relative.
    return value.startsWith('/') ? value : `/${value}`;
  }
}

/* -------------------------------------------------------------------------- */
/* Knowledge base                                                              */
/* -------------------------------------------------------------------------- */

const kb = JSON.parse(readFileSync(KB, 'utf8'));
let changed = 0;

const swap = (record) => {
  if (record.url === undefined) return;
  record.path = toPath(record.url);
  delete record.url;
  changed++;
};

for (const page of kb.pages) {
  // Pages already carry `path`; just drop the absolute twin.
  if (page.url !== undefined) {
    page.path = page.path || toPath(page.url);
    delete page.url;
    changed++;
  }
}
for (const list of [kb.courses, kb.centres, kb.faqs]) for (const record of list) swap(record);

if (kb.contact?.enquiryUrl !== undefined) {
  kb.contact.enquiryPath = toPath(kb.contact.enquiryUrl);
  delete kb.contact.enquiryUrl;
  changed++;
}

if (kb.origin !== undefined) {
  kb.crawledFrom = kb.origin;
  delete kb.origin;
  changed++;
}

writeFileSync(KB, `${JSON.stringify(kb, null, 2)}\n`);

/* -------------------------------------------------------------------------- */
/* Embedding index                                                             */
/* -------------------------------------------------------------------------- */

const index = JSON.parse(readFileSync(INDEX, 'utf8'));
let indexChanged = 0;

for (const item of index.items) {
  if (item.url === undefined) continue;
  item.path = toPath(item.url);
  delete item.url;
  indexChanged++;
}

writeFileSync(INDEX, JSON.stringify(index));

const leftover = (JSON.stringify(kb) + JSON.stringify(index)).match(/https?:\/\/localhost[^"]*/g);

console.log(`knowledge base : ${changed} fields converted`);
console.log(`embedding index: ${indexChanged} items converted`);
console.log(`localhost URLs remaining: ${leftover ? leftover.length : 0}`);
console.log(`crawledFrom (provenance): ${kb.crawledFrom ?? '—'}`);
