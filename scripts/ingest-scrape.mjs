/**
 * Deep-segregate the jetking_scrape corpus into the local knowledge base.
 *
 * Two extraction passes per page:
 *   1. Heading pairs — the scrape stores content as label → answer heading
 *      pairs ("What are the fees?" → "…"). Each pair becomes a precisely typed
 *      item: faq / fees / eligibility / curriculum / placement / overview.
 *   2. Body chunks — the remaining page text, boilerplate-stripped, tagged by
 *      page kind (course / blog / centre / info) for broad coverage.
 *
 * Plus the existing structured records (courses / FAQs / centres) from the KB.
 * Output → src/content/jetking-embeddings.json.
 *
 * Dry run (default): prints stats + samples. Embed + write: pass --embed
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SCRAPE = 'C:/Users/user/OneDrive/Desktop/Leena/jetking_scrape/data/pages.jsonl';
const KB = new URL('../src/content/jetking-kb.json', import.meta.url);
const OUT = new URL('../src/content/jetking-embeddings.json', import.meta.url);
const MODEL = process.env.JK_EMBED_MODEL ?? 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
const DIM = Number(process.env.JK_EMBED_DIM ?? 384);

const clean = (s) =>
  (s || '')
    .replace(/\u200b/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

function kindOf(url) {
  const p = (url || '')
    .replace(/^https?:\/\/(www\.)?jetking\.com/i, '')
    .replace(/[#?].*$/, '')
    .replace(/\/+$/, '')
    .toLowerCase();
  if (p === '') return 'home';
  if (p.startsWith('/centres')) return 'centre';
  if (/(course|diploma|masters|-in-|\bmca\b|\bbca\b|certification)/.test(p)) return 'course';
  if (p.includes('blog')) return 'blog';
  if (/(about|why-jetking|placement|recruit|franchise|contact|career|award)/.test(p)) return 'info';
  if (p.includes('faq')) return 'faq';
  return 'page';
}

const NAV_LABEL =
  /^(enquire now|contact us|important links|why jetking|home|about us|courses|locations|blogs?|events?|student corner|apply now|book|download)/i;
const SECTION_LABEL =
  /^(overview|eligibilit|entry requirement|who (can|should)|qualification|fees?\b|cost|payment|scholarship|curriculum|module|syllabus|what (you|will|i).{0,20}(learn|study)|topics|program structure|career|placement|job|salary|recruit|duration|how long|why (learn|choose)|about )/i;

const isLabel = (s) =>
  s.length >= 3 && s.length <= 90 && (s.endsWith('?') || SECTION_LABEL.test(s));
// A real answer is prose — several lowercase words. Blog titles (Title Case)
// and nav labels are rejected, so they don't become fake FAQs.
const isContent = (s) =>
  s.length > 40 &&
  !s.endsWith('?') &&
  !NAV_LABEL.test(s) &&
  (s.match(/\b[a-z]{3,}\b/g) || []).length >= 4;

/** Topic of a section/question label → the bucket the answer belongs in. */
function topicOfLabel(label) {
  const s = label.toLowerCase();
  if (/eligib|entry requirement|who (can|should)|qualification|10\+2|graduate|documents/.test(s))
    return 'eligibility';
  if (/fee|cost|emi|payment|scholarship|installment|price/.test(s)) return 'fees';
  if (
    /curriculum|module|syllabus|topics|what (you|will|i).{0,20}(learn|study)|program structure/.test(
      s,
    )
  )
    return 'curriculum';
  if (/career|placement|\bjob|salary|package|recruit|hiring|compan/.test(s)) return 'placement';
  if (/duration|how long/.test(s)) return 'duration';
  if (label.endsWith('?')) return 'faq';
  return 'overview';
}

const pages = readFileSync(SCRAPE, 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l));

// Data-driven boilerplate for the body pass.
const df = new Map();
const pageLines = pages.map((p) => {
  const lines = [...new Set((p.text || '').split('\n').map(clean).filter(Boolean))];
  for (const ln of lines) df.set(ln, (df.get(ln) ?? 0) + 1);
  return lines;
});
const BOILER_DF = Math.max(8, pages.length * 0.12);
const isBoiler = (ln) =>
  df.get(ln) >= BOILER_DF ||
  ln.length < 25 ||
  /^[\w &/-]{1,22}:?$/.test(ln) ||
  /^(enquire now|select (state|center)|fill the|name|email|phone|state|center)\b/i.test(ln);

const seen = new Set();
const items = [];
const push = (type, text) => {
  const t = clean(text);
  if (t.length < 60) return;
  const key = `${type}:${t.slice(0, 110).toLowerCase()}`;
  if (seen.has(key)) return;
  seen.add(key);
  items.push({ type, text: t });
};

pages.forEach((p, i) => {
  const kind = kindOf(p.url);
  const title = clean(p.title || '');
  const heads = (p.headings || []).map((h) => clean(h.text)).filter(Boolean);

  // Pass 1 — heading pairs (label → answer), precisely typed. Skipped for blog
  // pages, whose "?" headings are article titles in a listing, not Q&A.
  let pairCount = 0;
  if (kind !== 'blog') {
    for (let j = 0; j < heads.length - 1;) {
      const label = heads[j];
      const content = heads[j + 1];
      if (isLabel(label) && isContent(content)) {
        push(topicOfLabel(label), `${label}\n${content}`);
        pairCount++;
        j += 2;
      } else {
        j += 1;
      }
    }
  }

  // Course overview from the meta description (concise, human summary).
  if (kind === 'course' && p.meta_description) {
    push('overview', `${title}\n${clean(p.meta_description)}`);
  }

  // Pass 2 — body chunks for coverage. Skip for course/info pages that already
  // yielded rich pairs (avoids duplicating what the pairs captured).
  if (!((kind === 'course' || kind === 'info') && pairCount >= 3)) {
    const content = pageLines[i].filter((ln) => !isBoiler(ln));
    let buf = [];
    let len = 0;
    const flush = () => {
      const body = buf.join('\n').trim();
      buf = [];
      len = 0;
      if (body.length >= 80) push(kind, title ? `${title}\n${body}` : body);
    };
    for (const ln of content) {
      buf.push(ln);
      len += ln.length + 1;
      if (len >= 600) flush();
    }
    flush();
  }
});

// Existing structured records.
const kb = JSON.parse(readFileSync(KB, 'utf8'));
for (const c of kb.courses)
  push('course', [c.name, c.summary, (c.topics || []).join(', ')].filter(Boolean).join('. '));
for (const f of kb.faqs) push('faq', `${f.question}\n${f.answer}`);
for (const ce of kb.centres) push('centre', [ce.city, ce.summary].filter(Boolean).join('. '));

const dist = {};
for (const it of items) dist[it.type] = (dist[it.type] || 0) + 1;
console.log(`pages: ${pages.length}  →  ${items.length} segregated items`);
console.log('by type:', JSON.stringify(dist, null, 0));
console.log('\n--- samples ---');
for (const t of ['faq', 'fees', 'eligibility', 'curriculum', 'placement']) {
  const s = items.find((x) => x.type === t);
  if (s) console.log(`[${t}] ${s.text.replace(/\n/g, ' ¶ ').slice(0, 180)}`);
}

if (!process.argv.includes('--embed')) {
  console.log('\n(dry run — pass --embed to build the index)');
  process.exit(0);
}

const { pipeline } = await import('@xenova/transformers');
console.log(`\nEmbedding ${items.length} items …`);
const extract = await pipeline('feature-extraction', MODEL, { quantized: true });
const vectors = new Float32Array(items.length * DIM);
const B = 64;
for (let i = 0; i < items.length; i += B) {
  const out = await extract(
    items.slice(i, i + B).map((x) => x.text),
    { pooling: 'mean', normalize: true },
  );
  vectors.set(out.data, i * DIM);
  process.stdout.write(`\r  ${Math.min(i + B, items.length)}/${items.length}`);
}
process.stdout.write('\n');
writeFileSync(
  OUT,
  JSON.stringify({
    model: MODEL,
    dim: DIM,
    count: items.length,
    items,
    vectors: Buffer.from(vectors.buffer).toString('base64'),
  }),
);
console.log(`Wrote ${items.length} embeddings → src/content/jetking-embeddings.json`);
