/**
 * Builds the local semantic index the /api/chat route retrieves from.
 *
 *   node scripts/build-index.mjs           # dry run — stats + samples
 *   node scripts/build-index.mjs --embed   # embed and write the index
 *
 * Supersedes build-embeddings.mjs, which only emitted four coarse types
 * (course / faq / centre / chunk) while the route weights ten facets
 * (fees, eligibility, curriculum, duration, placement, overview, …). Those
 * weights were dead code: the facets they boost barely existed in the index.
 *
 * Four sources are merged:
 *   1. Every facet of every structured record in jetking-kb.json
 *   2. Page prose, grouped by heading so a passage is a coherent answer
 *      rather than an isolated list fragment
 *   3. Real content already embedded from the jetking.com scrape, whose
 *      source file is not on this machine — vectors are reused so nothing
 *      is lost, minus the blog listing pages (see KEEP_BLOG below)
 *   4. Manually provided knowledge — text/FAQs, documents, and fetched URLs
 *      collected by scripts/ingest-manual-knowledge.mts from data/manual-
 *      knowledge/ into src/content/manual-knowledge.json
 */
import { readFileSync, writeFileSync } from 'node:fs';

const KB = new URL('../src/content/jetking-kb.json', import.meta.url);
const WEBSITE = new URL('../src/content/website-corpus.json', import.meta.url);
const MANUAL = new URL('../src/content/manual-knowledge.json', import.meta.url);
const OUT = new URL('../src/content/jetking-embeddings.json', import.meta.url);
const MODEL = process.env.JK_EMBED_MODEL ?? 'Xenova/paraphrase-multilingual-MiniLM-L12-v2';
const DIM = Number(process.env.JK_EMBED_DIM ?? 384);
const BATCH = Number(process.env.JK_EMBED_BATCH ?? 64);
const MAX_TEXT = 1400;

/**
 * `\s+` also matches `\n`, so a plain "collapse all whitespace" pass silently
 * eats the title/body newline every `${item.title}\n${item.text}` join below
 * inserts — every source that carries that separator (about/franchise/
 * placement/professional/parent/student/explore, and course rows straight
 * from the CMS) loses it on every rebuild, leaving splitTitleBody() in
 * format-passage.ts with nothing to split on. Collapses horizontal
 * whitespace only, then folds any run of newlines down to exactly one.
 */
const clean = (s) =>
  (s || '')
    .replace(/​/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n+ */g, '\n')
    .trim();

/* -------------------------------------------------------------------------- */
/* Item collection                                                             */
/* -------------------------------------------------------------------------- */

const items = [];
const seen = new Set();

/** Deduped on normalised text, so KB and scrape restating a fact costs one row. */
function push(type, text, meta = {}) {
  const t = clean(text);
  if (t.length < 40) return;

  const key = t.slice(0, 140).toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);

  items.push({ type, text: t.slice(0, MAX_TEXT), ...meta });
}

const kb = JSON.parse(readFileSync(KB, 'utf8'));
const pageById = new Map(kb.pages.map((p) => [p.id, p]));

/* --- 1. Structured records, one item per answerable facet ----------------- */

for (const c of kb.courses) {
  const at = { path: c.path, title: c.name };

  push(
    'overview',
    `${c.name}\n${c.summary} It is a ${c.durationLabel} ${c.category} programme.`,
    at,
  );

  if (c.fees) {
    // Fee questions are the most common and were the most starved facet (2 rows
    // across the whole index). Every course now carries its own.
    push(
      'fees',
      `Fees for ${c.name}\nCourse fee: ${c.fees}. Payment: ${c.payment || 'talk to a counsellor'}. ` +
        `${c.name} runs for ${c.durationLabel}.`,
      at,
    );
  }
  if (c.eligibility) {
    push('eligibility', `Eligibility for ${c.name}\nWho can join: ${c.eligibility}`, at);
  }
  if (c.durationLabel) {
    push(
      'duration',
      `How long is ${c.name}?\n${c.name} is a ${c.durationLabel} ${c.category} programme at Jetking.`,
      at,
    );
  }
  if (c.topics.length) {
    push('curriculum', `What you will study in ${c.name}\n${c.topics.join('. ')}.`, at);
  }
  if (c.outcomes.length) {
    push('placement', `Career outcomes after ${c.name}\n${c.outcomes.join('. ')}.`, at);
  }
  if (c.highlights.length || c.certifications.length) {
    push('course', `${c.name}\n${[...c.highlights, ...c.certifications].join('. ')}.`, at);
  }
}

for (const ce of kb.centres) {
  const branches = ce.locations.map((l) => `${l.name}${l.locality ? ` (${l.locality})` : ''}`);
  // The city is repeated deliberately — "centre in Kolkata" must match this row
  // ahead of any course page that merely mentions the city once.
  push(
    'centre',
    `Jetking centre in ${ce.city}\n${ce.summary} ` +
      `Jetking ${ce.city} branches: ${branches.length ? branches.join('; ') : `Jetking ${ce.city}`}. ` +
      `Courses available in ${ce.city}: ${ce.programmes.slice(0, 10).join(', ')}.`,
    // `city` is the entity key the retriever boosts on. Every "Jetking centre
    // in X" row is near-identical prose, so their embeddings are nearly
    // identical and the city token alone cannot separate them.
    { path: ce.path, title: `Jetking ${ce.city}`, city: ce.city },
  );
}

for (const f of kb.faqs) {
  push('faq', `${f.question}\n${f.answer}`, {
    path: f.path,
    title: f.scope ? `${f.scope} — FAQ` : 'Jetking FAQ',
  });
}

/* --- 2. Page prose, grouped by heading ------------------------------------ */

/** Maps a heading to the facet it answers; mirrors the route's weighting. */
function topicOf(heading, section) {
  const s = (heading || '').toLowerCase();
  if (/eligib|entry requirement|who (can|should)|qualification|10\+2|documents/.test(s))
    return 'eligibility';
  if (/fee|cost|emi|payment|scholarship|installment|price/.test(s)) return 'fees';
  if (/curriculum|module|syllabus|topics|what you will study|program structure/.test(s))
    return 'curriculum';
  if (/career|placement|\bjob|salary|package|recruit|hiring|compan/.test(s)) return 'placement';
  if (/duration|how long/.test(s)) return 'duration';
  if (s.endsWith('?')) return 'faq';

  return (
    {
      'course-detail': 'course',
      courses: 'course',
      'centre-detail': 'centre',
      centres: 'centre',
      about: 'info',
      audience: 'info',
      enquiry: 'info',
      home: 'home',
    }[section] ?? 'page'
  );
}

// Grouping turns 4,032 fragments — most of them single list items like
// "Ip Addressing" — into coherent passages that can stand as an answer.
const groups = new Map();
for (const ch of kb.chunks) {
  const key = `${ch.pageId}::${ch.heading ?? ''}`;
  let g = groups.get(key);
  if (!g) {
    g = { pageId: ch.pageId, heading: ch.heading, texts: [] };
    groups.set(key, g);
  }
  g.texts.push(ch.text);
}

for (const g of groups.values()) {
  const page = pageById.get(g.pageId);
  if (!page) continue;

  const body = [...new Set(g.texts)].join('. ');
  const head = g.heading ? `${g.heading} — ${page.title}` : page.title;
  push(topicOf(g.heading, page.section), `${head}\n${body}`, {
    path: page.path,
    title: page.title,
  });
}

const kbCount = items.length;

// Every row above is regenerated fresh from jetking-kb.json on every run —
// tag it so section 5 can drop the *prior* run's copy instead of reusing it
// verbatim. Without this, editing a fact in a course/centre/faq record (e.g.
// fixing a wrong salary figure) left the old wording as a permanent extra
// row: dedup is keyed on the first 140 chars of text, so a changed fact gets
// a new key and the stale one never gets superseded, just piles up forever —
// the same staleness class already fixed for website/manual rows below.
for (let i = 0; i < kbCount; i++) items[i].source = 'kb';

/* --- 3. Current merged website ContentSource -------------------------------- */

let websiteCount = 0;
try {
  const website = JSON.parse(readFileSync(WEBSITE, 'utf8'));
  for (const item of website.items ?? []) {
    const before = items.length;
    push(item.type, `${item.title}\n${item.text}`, {
      path: item.path,
      title: item.title,
      source: 'website-content-source',
    });
    if (items.length > before) websiteCount++;

    // Website course records arrive as one canonical CMS paragraph. Create a
    // dedicated duration facet so a similarly named legacy course cannot win
    // a precise "how long" question merely because it has an older facet row.
    if (item.type === 'course') {
      const duration = /\bDuration:\s*([^.]+)\./i.exec(item.text)?.[1]?.trim();
      if (duration) {
        const facetBefore = items.length;
        push('duration', `How long is ${item.title}?\n${item.title} runs for ${duration}.`, {
          path: item.path,
          title: item.title,
          source: 'website-content-source',
        });
        if (items.length > facetBefore) websiteCount++;
      }
    }
  }
} catch {
  console.warn('(website corpus missing — run npm run export:chatbot-content)');
}

/* --- 4. Manually provided knowledge (text/FAQs, documents, URLs) ---------- */

let manualCount = 0;
try {
  const manual = JSON.parse(readFileSync(MANUAL, 'utf8'));
  for (const item of manual.items ?? []) {
    const before = items.length;
    push('manual', `${item.title}\n${item.text}`, { title: item.title, source: item.source });
    if (items.length > before) manualCount++;
  }
} catch {
  console.warn('(no manual knowledge — run npm run ingest:manual-knowledge if you have any)');
}

/* --- 5. Reuse what was embedded from the jetking.com scrape --------------- */

/**
 * Blog rows are listing-page navigation: a run of article *titles* with no
 * article body. They are keyword-dense and answer-free, so they outrank real
 * content on "fees", "after 12th" and "how long" while answering none of it.
 * Genuine prose is kept; title-soup is dropped.
 */
function KEEP_BLOG(text) {
  const lines = text.split('\n').filter(Boolean);
  const sentences = (text.match(/[.!?]\s/g) || []).length;
  const avgLine = text.length / Math.max(lines.length, 1);
  return sentences >= 3 && avgLine >= 80;
}

/**
 * Legal boilerplate — privacy policy, enrolment terms, refund clauses.
 *
 * Never the right answer to a prospective student, but dense with brand and
 * domain terms, so it wins keyword-ish queries: an Enrolment T&C clause was
 * outranking the placement-guarantee FAQ on "does Jetking guarantee placement?".
 */
const LEGAL_BOILERPLATE = /privacy policy|terms and conditions|refund polic|cancellation polic/i;

let prior = { items: [], vectors: null, dim: DIM };
try {
  const raw = JSON.parse(readFileSync(OUT, 'utf8'));
  const buf = Buffer.from(raw.vectors, 'base64');
  prior = {
    items: raw.items,
    vectors: new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4),
    dim: raw.dim,
  };
} catch {
  console.log('(no existing index — everything will be embedded fresh)');
}

let droppedBlog = 0;
let droppedLegal = 0;
let droppedWebsite = 0;
let droppedManual = 0;
let droppedKb = 0;
const priorVectorByText = new Map();

prior.items.forEach((it, i) => {
  if (prior.vectors && prior.dim === DIM) {
    priorVectorByText.set(clean(it.text).slice(0, MAX_TEXT), i);
  }
  if (it.source === 'website-content-source') {
    droppedWebsite++;
    return;
  }
  // See the kbCount loop above: every jetking-kb.json-derived row is
  // re-pushed fresh in section 1/2 above, so the *prior* run's copy must not
  // be reused verbatim or an edited fact keeps its old wording forever
  // alongside the new one.
  if (it.source === 'kb') {
    droppedKb++;
    return;
  }
  // Manual knowledge is re-pushed fresh from src/content/manual-knowledge.json
  // every run (section 4) — reusing the *prior* snapshot here too would let a
  // removed/edited entry linger forever, the same staleness website-content-
  // source rows are already excluded above to avoid.
  if (it.type === 'manual') {
    droppedManual++;
    return;
  }
  if (it.type === 'blog' && !KEEP_BLOG(it.text)) {
    droppedBlog++;
    return;
  }
  if (LEGAL_BOILERPLATE.test(it.text)) {
    droppedLegal++;
    return;
  }
  push(it.type, it.text, {
    ...(it.path ? { path: it.path, title: it.title } : {}),
    ...(it.source ? { source: it.source } : {}),
  });
});

/* -------------------------------------------------------------------------- */
/* Report                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Source-authority per row type. Read at query time (embeddings.ts) as an
 * additive rank boost, never as a change to the raw cosine score — see that
 * file's AUTHORITY_WEIGHT comment. Blog/post rows are deliberately low: at
 * 127 posts against ~a few dozen structured records, unweighted volume alone
 * would otherwise let blog prose outrank the course/policy row that actually
 * answers the question.
 */
const AUTHORITY_BY_TYPE = {
  manual: 1.0,
  policy: 1.0,
  course: 0.95,
  centre: 0.95,
  fees: 0.95,
  eligibility: 0.95,
  duration: 0.95,
  curriculum: 0.95,
  placement: 0.95,
  faq: 0.9,
  overview: 0.9,
  about: 0.9,
  franchise: 0.9,
  city: 0.8,
  info: 0.8,
  home: 0.8,
  blog: 0.6,
  post: 0.6,
  news: 0.6,
  page: 0.65,
};
const DEFAULT_AUTHORITY = 0.7;

for (const it of items) {
  it.authority = AUTHORITY_BY_TYPE[it.type] ?? DEFAULT_AUTHORITY;
}

const dist = {};
for (const it of items) dist[it.type] = (dist[it.type] || 0) + 1;

console.log(`from knowledge base : ${kbCount} items`);
console.log(`from current website: ${websiteCount} items`);
console.log(`from manual knowledge: ${manualCount} items`);
console.log(
  `reused from scrape  : ${items.length - kbCount - websiteCount - manualCount} items ` +
    `(dropped ${droppedWebsite} replaced website rows, ${droppedManual} replaced manual rows, ` +
    `${droppedKb} replaced kb rows, ${droppedBlog} blog listing rows, ${droppedLegal} legal/policy rows)`,
);
console.log(`total               : ${items.length} items`);
console.log(`by type             : ${JSON.stringify(dist)}`);

const reusable = items.filter((it) => priorVectorByText.has(it.text)).length;
console.log(`vectors reusable    : ${reusable} · to embed: ${items.length - reusable}`);

console.log('\n--- samples ---');
for (const t of ['fees', 'eligibility', 'duration', 'curriculum', 'placement', 'centre']) {
  const s = items.find((x) => x.type === t);
  if (s) console.log(`[${t}] ${s.text.replace(/\n/g, ' ¶ ').slice(0, 150)}`);
}

if (!process.argv.includes('--embed')) {
  console.log('\n(dry run — pass --embed to build the index)');
  process.exit(0);
}

/* -------------------------------------------------------------------------- */
/* Embed                                                                       */
/* -------------------------------------------------------------------------- */

const { pipeline } = await import('@xenova/transformers');

const vectors = new Float32Array(items.length * DIM);
const todo = [];

items.forEach((it, i) => {
  const priorIndex = priorVectorByText.get(it.text);
  if (priorIndex !== undefined) {
    // Same model, same text — the old vector is still exactly correct.
    vectors.set(prior.vectors.subarray(priorIndex * DIM, priorIndex * DIM + DIM), i * DIM);
  } else {
    todo.push(i);
  }
});

console.log(`\nEmbedding ${todo.length} new items with ${MODEL} …`);
const extract = await pipeline('feature-extraction', MODEL, { quantized: true });

for (let b = 0; b < todo.length; b += BATCH) {
  const slice = todo.slice(b, b + BATCH);
  const out = await extract(
    slice.map((i) => items[i].text),
    { pooling: 'mean', normalize: true },
  );
  slice.forEach((itemIndex, k) => {
    vectors.set(out.data.subarray(k * DIM, k * DIM + DIM), itemIndex * DIM);
  });
  process.stdout.write(`\r  ${Math.min(b + BATCH, todo.length)}/${todo.length}`);
}
process.stdout.write('\n');

writeFileSync(
  OUT,
  JSON.stringify({
    model: MODEL,
    dim: DIM,
    count: items.length,
    builtAt: new Date().toISOString(),
    items,
    vectors: Buffer.from(vectors.buffer).toString('base64'),
  }),
);
console.log(`Wrote ${items.length} embeddings → src/content/jetking-embeddings.json`);
