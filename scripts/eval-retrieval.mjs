/**
 * Measures retrieval quality against the local embedding index.
 *
 *   npm run eval:retrieval
 *   npm run eval:retrieval -- --verbose   # also print the top hit per case
 *
 * Exercises the real `semanticSearch` the API route calls, so the score
 * reflects production ranking — fusion weights included — rather than a
 * reimplementation that can drift.
 *
 * Each case declares the facet type the answer should come from and words the
 * winning passage must contain. That turns "the answers feel better" into a
 * number we can regress against, which is the only way to tune retrieval
 * honestly.
 */
import { readFileSync } from 'node:fs';

import { semanticSearch } from '@/features/knowledge/lib/embeddings';

const INDEX = new URL('../src/content/jetking-embeddings.json', import.meta.url);
const VERBOSE = process.argv.includes('--verbose');

/** The gate the API route uses; below this it refuses to answer. */
const GATE = Number(process.env.JK_ANSWER_GATE ?? 0.42);

/**
 * `types`  — acceptable facet types for the winning hit
 * `must`   — at least one of these substrings must appear in the top-3 text
 * `reject` — true when the question is off-topic and SHOULD fall below the gate
 */
const CASES = [
  // Fees — the route weights `fees` at +0.14 but the index barely has any.
  {
    q: 'what are the fees for ethical hacking?',
    types: ['fees', 'overview', 'course'],
    must: ['fee', 'emi', 'counsellor', 'payment'],
  },
  {
    q: 'kitni fees hai cloud computing course ki?',
    types: ['fees', 'overview', 'course'],
    must: ['fee', 'emi', 'counsellor', 'payment'],
  },
  {
    q: 'is there an EMI option for the BCA?',
    types: ['fees', 'overview', 'course'],
    must: ['emi', 'installment', 'payment', 'fee'],
  },

  // Eligibility
  {
    q: 'who is eligible for the MCA in cloud computing?',
    types: ['eligibility', 'overview', 'course'],
    must: ['eligib', 'graduat', 'bca', '10+2'],
  },
  {
    q: 'can I join after 12th?',
    types: ['eligibility', 'overview', 'course', 'faq'],
    must: ['10+2', '12th', 'eligib', 'graduat'],
  },

  // Duration
  {
    q: 'how long is the gaming and metaverse course?',
    types: ['duration', 'overview', 'course'],
    must: ['year', 'month'],
  },
  {
    q: 'duration of ethical hacking specialist',
    types: ['duration', 'overview', 'course'],
    must: ['month', 'year'],
  },

  // Curriculum
  {
    q: 'what will I study in the data analyst course?',
    types: ['curriculum', 'course', 'overview'],
    must: ['sql', 'power bi', 'python', 'excel', 'analy'],
  },
  {
    q: 'syllabus for red hat linux certification',
    types: ['curriculum', 'course', 'overview'],
    must: ['linux', 'red hat', 'rhcsa', 'administra'],
  },

  // Placement
  {
    q: 'does jetking guarantee placement?',
    types: ['placement', 'faq', 'info', 'overview'],
    must: ['placement', 'job', 'guarantee', 'recruit'],
  },
  {
    q: 'which companies recruit from jetking?',
    types: ['placement', 'info', 'faq', 'blog'],
    must: ['recruit', 'compan', 'placement', 'hiring'],
  },

  // Centres
  { q: 'is there a jetking centre in kolkata?', types: ['centre'], must: ['kolkata'] },
  { q: 'nearest centre in ahmedabad', types: ['centre'], must: ['ahmedabad', 'maninagar'] },
  { q: 'jetking centre near borivali', types: ['centre'], must: ['borivali', 'mumbai'] },

  // Course discovery
  {
    q: 'which course is best for a cyber security job?',
    types: ['course', 'overview', 'curriculum', 'placement'],
    must: ['cyber', 'security'],
  },
  {
    q: 'do you teach ethical hacking?',
    types: ['course', 'overview', 'curriculum'],
    must: ['hacking', 'ceh'],
  },
  {
    q: 'i want to learn AWS cloud',
    types: ['course', 'overview', 'curriculum'],
    must: ['aws', 'cloud'],
  },

  // Current merged website ContentSource — these cases ensure the website and
  // chatbot cannot silently drift into separate knowledge products again.
  {
    q: 'how long is the cloud computing engineer with AI programme?',
    types: ['course', 'overview', 'duration'],
    must: ['12 months', 'cloud'],
    topMust: ['12 months', 'cloud'],
  },
  {
    q: 'which jetking course is for a complete beginner with no technical background?',
    types: ['course', 'faq', 'overview'],
    must: ['foundation', 'beginner', 'no prior technical'],
  },
  {
    q: 'can I study at jetking while working full time?',
    types: ['faq', 'course', 'info'],
    must: ['evening', 'weekend', 'working professional'],
  },
  {
    q: 'is there a jetking centre in hinjewadi?',
    types: ['centre'],
    must: ['hinjewadi', 'pune'],
  },
  {
    q: 'should I choose cyber security or cloud computing?',
    types: ['blog', 'course', 'overview'],
    must: ['cyber', 'cloud', 'networking'],
  },
  {
    q: 'what does jetking placement support include?',
    types: ['placement', 'faq', 'info'],
    must: ['interview', 'placement', 'hiring'],
  },

  // Off-topic — must be gated, not answered.
  { q: 'how do I bake sourdough bread?', reject: true },
  { q: 'what is the capital of France?', reject: true },
  { q: 'write me a python script to scrape twitter', reject: true },
];

const raw = JSON.parse(readFileSync(INDEX, 'utf8'));
const dist = {};
for (const it of raw.items) dist[it.type] = (dist[it.type] || 0) + 1;
console.log(`index: ${raw.items.length} items · dim ${raw.dim}`);
console.log(`by type: ${JSON.stringify(dist)}\n`);

/**
 * Mirrors the post-retrieval pooling in src/app/api/chat/route.ts: centre rows
 * are dropped unless the question is about a location, so a course question
 * cannot be answered with "here is our Pune branch". Kept in step with the
 * route by hand — if that filter changes, change it here too.
 */
const LOCATION_RE =
  /\b(cent(re|er)s?|near(est)?|location|address|branch|directions?|visit|where)\b/i;
const CITY_RE =
  /\b(mumbai|delhi|pune|bangalore|bengaluru|hyderabad|chennai|kolkata|ahmedabad|nagpur|thane|noida|gurgaon|gurugram|lucknow|kanpur|indore|bhopal|chandigarh|jammu|kochi|varanasi|prayagraj|vasai|borivali|dadar|vashi|shivajinagar|maninagar)\b/i;

function routePool(query, hits) {
  const isLocation = LOCATION_RE.test(query) || CITY_RE.test(query);
  const nonCentre = hits.filter((h) => h.type !== 'centre');
  const pool = isLocation || nonCentre.length === 0 ? hits : nonCentre;

  // The route re-sorts by score + a topic weight. Mirroring it matters: while
  // this step was missing, the eval passed a Kolkata query that the live API
  // answered with Kanpur, because the route's re-sort discarded the ranking
  // the eval had measured.
  const wantFees =
    /\b(fee|fees|cost|price|emi|installment|scholarship|payment|charges?|kitni|kitna)\b/i.test(
      query,
    );
  const wantEligibility =
    /\b(eligib|entry requirement|who can|who should|qualification|documents?|after (10th|12th|graduation)|10\+2)/i.test(
      query,
    );
  const wantCurriculum =
    /\b(curriculum|syllabus|module|topics?|what.{0,15}(learn|study|cover)|program structure)\b/i.test(
      query,
    );
  const wantPlacement =
    /\b(placement|placed|jobs?|salary|package|recruit|hiring|compan(y|ies)|career|scope)\b/i.test(
      query,
    );
  const wantDuration = /\b(duration|how long|months?|years?|kitne (mahine|saal))\b/i.test(query);
  const wantCourse =
    /\b(course|courses|diploma|masters|learn|training|program|certification|specialization)\b/i.test(
      query,
    );

  const weight = (t) => {
    if (t === 'centre') return isLocation ? 0.15 : 0;
    if (t === 'home') return -0.1;
    let w = 0;
    if (wantFees) w += t === 'fees' ? 0.14 : t === 'overview' || t === 'course' ? 0.05 : 0;
    if (wantEligibility) w += t === 'eligibility' ? 0.14 : 0;
    if (wantCurriculum) w += t === 'curriculum' ? 0.13 : t === 'course' ? 0.05 : 0;
    if (wantPlacement) w += t === 'placement' ? 0.13 : t === 'info' || t === 'blog' ? 0.05 : 0;
    if (wantDuration) w += t === 'duration' ? 0.14 : 0;
    if (wantCourse) w += t === 'course' || t === 'overview' || t === 'curriculum' ? 0.05 : 0;
    return w;
  };

  return [...pool].sort((a, b) => b.score + weight(b.type) - (a.score + weight(a.type)));
}

let pass = 0;
let lastMode = 'unknown';
const failures = [];

for (const c of CASES) {
  const raw = await semanticSearch(c.q, 8);
  lastMode = raw.mode;
  const topScore = raw.topScore;
  const hits = routePool(c.q, raw.hits).slice(0, 3);
  const top = hits[0];
  const blob = hits
    .map((h) => h.text)
    .join(' ')
    .toLowerCase();

  let ok;
  let why = '';

  if (c.reject) {
    // The route gates on the best dense score, so the eval must too.
    ok = topScore < GATE;
    if (!ok) why = `should be gated but scored ${topScore.toFixed(3)} [${top.type}]`;
  } else {
    const gated = topScore < GATE;
    const typeOk = c.types.includes(top.type);
    const mustOk = c.must.some((m) => blob.includes(m));
    const topBlob = top.text.toLowerCase();
    const topMustOk = !c.topMust || c.topMust.every((m) => topBlob.includes(m));
    ok = !gated && typeOk && mustOk && topMustOk;
    if (gated) why = `gated (${topScore.toFixed(3)}) — no answer given`;
    else if (!typeOk) why = `top type "${top.type}", wanted one of ${c.types.join('/')}`;
    else if (!mustOk) why = `top-3 text lacks any of: ${c.must.join(', ')}`;
    else if (!topMustOk) why = `top text lacks exact entity facts: ${c.topMust.join(', ')}`;
  }

  if (ok) pass++;
  else failures.push({ q: c.q, why });

  const mark = ok ? 'PASS' : 'FAIL';
  console.log(`${mark}  ${c.q}`);
  if (!ok) console.log(`      ↳ ${why}`);
  if (VERBOSE && top) {
    console.log(
      `      top [${top.type}] ${top.score.toFixed(3)} :: ${top.text.replace(/\n/g, ' ¶ ').slice(0, 130)}`,
    );
  }
}

const pct = Math.round((pass / CASES.length) * 100);
console.log(`
retrieval mode used: ${lastMode}`);
console.log(`\n${pass}/${CASES.length} passed  (${pct}%)`);
if (failures.length) {
  console.log('\nfailures:');
  for (const f of failures) console.log(`  · ${f.q}\n      ${f.why}`);
}
