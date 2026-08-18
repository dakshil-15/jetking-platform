/**
 * Precompute local semantic embeddings for the Jetking knowledge base.
 *
 * Runs offline in Node using a multilingual sentence model (the same one the
 * retrieval route uses at query time). One-time step — re-run after the KB is
 * re-crawled. Output: src/content/jetking-embeddings.json
 */
import { readFileSync, writeFileSync } from 'node:fs';

import { pipeline } from '@xenova/transformers';

const MODEL = process.env.JK_EMBED_MODEL ?? 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
const DIM = Number(process.env.JK_EMBED_DIM ?? 384);
const BATCH = Number(process.env.JK_EMBED_BATCH ?? 64);

const kbUrl = new URL('../src/content/jetking-kb.json', import.meta.url);
const outUrl = new URL('../src/content/jetking-embeddings.json', import.meta.url);
const kb = JSON.parse(readFileSync(kbUrl, 'utf8'));

/** One row per retrievable unit: what we embed and can hand back as context. */
const items = [];
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

for (const c of kb.courses) {
  const text = [c.name, c.summary, (c.topics || []).join(', '), (c.outcomes || []).join('. ')]
    .map(clean)
    .filter(Boolean)
    .join('. ');
  if (text) items.push({ type: 'course', text });
}
for (const f of kb.faqs) {
  const text = `${clean(f.question)} ${clean(f.answer)}`.trim();
  if (text) items.push({ type: 'faq', text });
}
for (const ce of kb.centres) {
  const text = [ce.city, ce.summary, (ce.programmes || []).slice(0, 6).join(', ')]
    .map(clean)
    .filter(Boolean)
    .join('. ');
  if (text) items.push({ type: 'centre', text });
}
for (const ch of kb.chunks) {
  if (ch.kind === 'paragraph' && ch.text && ch.text.length >= 70) {
    items.push({ type: 'chunk', text: clean(ch.text) });
  }
}

console.log(`Embedding ${items.length} items with ${MODEL} …`);
const extract = await pipeline('feature-extraction', MODEL, { quantized: true });

const vectors = new Float32Array(items.length * DIM);
for (let i = 0; i < items.length; i += BATCH) {
  const batch = items.slice(i, i + BATCH).map((x) => x.text);
  const out = await extract(batch, { pooling: 'mean', normalize: true });
  vectors.set(out.data, i * DIM);
  process.stdout.write(`\r  ${Math.min(i + BATCH, items.length)}/${items.length}`);
}
process.stdout.write('\n');

const payload = {
  model: MODEL,
  dim: DIM,
  count: items.length,
  items,
  vectors: Buffer.from(vectors.buffer).toString('base64'),
};
writeFileSync(outUrl, JSON.stringify(payload));
console.log(`Wrote ${items.length} embeddings → src/content/jetking-embeddings.json`);
