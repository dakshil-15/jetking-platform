/**
 * Crawls the Jetking website and writes a structured knowledge base to
 * `src/content/jetking-kb.json`.
 *
 *   npm run sync:content
 *
 * The crawl runs once, offline-first: the JSON is committed and the app never
 * fetches the site at build or request time.
 *
 * Point it at any origin with JK_ORIGIN, e.g.
 *   JK_ORIGIN=https://www.jetking.com npm run sync:content
 */

import { load, type CheerioAPI } from 'cheerio';
import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type {
  CentreRecord,
  Chunk,
  ContactRecord,
  CourseCategory,
  CourseRecord,
  FaqRecord,
  KnowledgeBase,
  PageSection,
  SourcePage,
  StatRecord,
} from '../src/features/knowledge/types/index.ts';

const ORIGIN = process.env['JK_ORIGIN'] ?? 'http://localhost:3000';
const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(HERE, '../src/content/jetking-kb.json');

const USER_AGENT = 'JetkingAssistantBot/1.0 (content sync for the Jetking site assistant)';

/** Local origins can be crawled hard; remote ones cannot. */
const IS_LOCAL = /localhost|127\.0\.0\.1/.test(ORIGIN);
const CONCURRENCY = Number(process.env['JK_CONCURRENCY'] ?? (IS_LOCAL ? 6 : 1));
const DELAY_MS = Number(process.env['JK_DELAY_MS'] ?? (IS_LOCAL ? 0 : 2500));
const TIMEOUT_MS = Number(process.env['JK_TIMEOUT_MS'] ?? 30_000);
const MAX_ATTEMPTS = Number(process.env['JK_MAX_ATTEMPTS'] ?? (IS_LOCAL ? 2 : 6));

/** Refuse to publish a crawl that lost more than this share of the last one. */
const REGRESSION_TOLERANCE = Number(process.env['JK_REGRESSION_TOLERANCE'] ?? 0.6);
const FORCE = process.argv.includes('--force');

const SEED_PATHS = [
  '/',
  '/courses',
  '/centres',
  '/explore',
  '/student',
  '/professional',
  '/parent',
  '/franchise',
  '/enquiry',
  '/about-us',
] as const;

/* -------------------------------------------------------------------------- */
/* Fetching                                                                    */
/* -------------------------------------------------------------------------- */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * On-disk response cache, keyed by URL.
 *
 * Makes re-runs cheap, and lets a crawl of a rate-limited remote origin make
 * forward progress across several attempts instead of restarting from zero.
 */
const CACHE_DIR = resolve(HERE, '../.cache/crawl');
const CACHE_TTL_MS = Number(process.env['JK_CACHE_TTL_MS'] ?? 24 * 60 * 60 * 1000);
const NO_CACHE = process.argv.includes('--no-cache') || IS_LOCAL;

function cachePath(url: string): string {
  return resolve(CACHE_DIR, `${createHash('sha1').update(url).digest('hex')}.html`);
}

async function readCache(url: string): Promise<string | null> {
  if (NO_CACHE) return null;
  try {
    const path = cachePath(url);
    const info = await stat(path);
    if (Date.now() - info.mtimeMs > CACHE_TTL_MS) return null;
    return await readFile(path, 'utf8');
  } catch {
    return null;
  }
}

async function writeCache(url: string, html: string): Promise<void> {
  if (NO_CACHE) return;
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachePath(url), html, 'utf8');
  } catch {
    // A cache miss next run is not worth failing the crawl over.
  }
}

async function fetchHtml(url: string, attempt = 1): Promise<string | null> {
  if (attempt === 1) {
    const cached = await readCache(url);
    if (cached) return cached;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'user-agent': USER_AGENT,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (response.ok) {
      const html = await response.text();
      await writeCache(url, html);
      return html;
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (retryable && attempt < MAX_ATTEMPTS) {
      const retryAfter = Number(response.headers.get('retry-after'));
      const waitMs =
        Number.isFinite(retryAfter) && retryAfter > 0
          ? retryAfter * 1000
          : Math.min(2 ** attempt * 1000, 60_000);

      console.warn(`  … ${response.status} ${new URL(url).pathname} — retry in ${waitMs / 1000}s`);
      await sleep(waitMs);
      return fetchHtml(url, attempt + 1);
    }

    console.warn(`  ! ${response.status} ${new URL(url).pathname}`);
    return null;
  } catch (error) {
    if (attempt < MAX_ATTEMPTS) {
      await sleep(2 ** attempt * 500);
      return fetchHtml(url, attempt + 1);
    }
    console.warn(`  ! failed ${url}: ${(error as Error).message}`);
    return null;
  }
}

/** Runs tasks through a fixed worker pool, preserving input order. */
async function mapPool<T, R>(items: readonly T[], worker: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    for (;;) {
      const index = cursor++;
      const item = items[index];
      if (item === undefined) return;
      results[index] = await worker(item);
      if (DELAY_MS) await sleep(DELAY_MS);
    }
  });

  await Promise.all(runners);
  return results;
}

/* -------------------------------------------------------------------------- */
/* Extraction                                                                  */
/* -------------------------------------------------------------------------- */

/** Breadcrumbs, nav labels and CTAs that share the DOM with real content. */
const BOILERPLATE =
  /^(home|courses|centres|company|explore|menu|search|enquire now|find a centre near you|apply now|all rights reserved|©)/i;

function clean(value: string): string {
  return value.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

function stripChrome($: CheerioAPI): void {
  $('script, style, noscript, svg, iframe, template, link').remove();
  $('nav, footer, header[role="banner"]').remove();
  // cheerio's .text() joins across <br> with no separator.
  $('br').replaceWith(' ');
}

function sectionFor(path: string): PageSection {
  if (path === '/' || path === '') return 'home';
  if (path === '/courses') return 'courses';
  if (path.startsWith('/courses/')) return 'course-detail';
  if (path === '/centres') return 'centres';
  if (path.startsWith('/centres/')) return 'centre-detail';
  if (/^\/(student|professional|parent|franchise|explore)$/.test(path)) return 'audience';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/enquiry')) return 'enquiry';
  return 'other';
}

interface ExtractedPage {
  page: SourcePage;
  chunks: Chunk[];
  links: string[];
  /** Definition-list pairs, e.g. Duration -> "2 months". */
  facts: Map<string, string>;
}

function extractPage(url: string, html: string, index: number): ExtractedPage {
  const $ = load(html);
  stripChrome($);

  const path = new URL(url).pathname.replace(/\/$/, '') || '/';
  const pageId = `p${index}`;

  const page: SourcePage = {
    id: pageId,
    path,
    title: clean($('title').first().text()) || path,
    description: clean($('meta[name="description"]').attr('content') ?? ''),
    section: sectionFor(path),
  };

  const chunks: Chunk[] = [];
  const seen = new Set<string>();
  let currentHeading: string | null = null;
  let counter = 0;

  const push = (text: string, kind: Chunk['kind']) => {
    if (!text || text.length < 12 || text.length > 1400) return;
    if (BOILERPLATE.test(text)) return;

    const key = `${kind}:${text.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);

    chunks.push({ id: `${pageId}c${counter++}`, pageId, heading: currentHeading, text, kind });
  };

  // Walking in document order keeps each chunk attached to the heading above
  // it, and keeps each FAQ question immediately before its answer.
  $('h1, h2, h3, h4, p, li, dt, dd, button').each((_, element) => {
    const tag = (element as { tagName?: string }).tagName?.toLowerCase() ?? '';
    const text = clean($(element).text());

    if (/^h[1-4]$/.test(tag)) {
      if (text && text.length <= 120 && !BOILERPLATE.test(text)) currentHeading = text;
      return;
    }

    if (tag === 'button') {
      // FAQ accordions render the question as the trigger button; every other
      // button on the page is a control and carries no content.
      if (text.endsWith('?') && text.length <= 160) push(text, 'faq');
      return;
    }

    push(text, tag === 'li' ? 'list' : tag === 'dt' || tag === 'dd' ? 'fact' : 'paragraph');
  });

  // Definition lists carry the structured facts (Duration, Eligibility, Fees…).
  const facts = new Map<string, string>();
  $('dl').each((_, list) => {
    const terms = $(list).find('dt');
    terms.each((_, term) => {
      const label = clean($(term).text());
      const value = clean($(term).next('dd').text());
      if (label && value && !facts.has(label)) facts.set(label, value);
    });
  });

  const links = [
    ...new Set(
      $('a[href]')
        .map((_, element) => $(element).attr('href') ?? '')
        .get()
        .map((href) => {
          try {
            return new URL(href, ORIGIN).toString();
          } catch {
            return '';
          }
        })
        .filter((href) => href.startsWith(ORIGIN)),
    ),
  ];

  return { page, chunks, links, facts };
}

/* -------------------------------------------------------------------------- */
/* Records                                                                     */
/* -------------------------------------------------------------------------- */

function parseDuration(text: string): { months: number | null; label: string } {
  const match = /(\d+(?:\.\d+)?)\s*(month|year)s?/i.exec(text);
  if (!match) return { months: null, label: clean(text) };

  const amount = Number(match[1]);
  const unit = (match[2] ?? '').toLowerCase();
  return {
    months: unit === 'year' ? amount * 12 : amount,
    label: `${match[1]} ${unit}${amount === 1 ? '' : 's'}`,
  };
}

function categoryFor(name: string, months: number | null): CourseCategory {
  if (/\b(bca|mca|b\.sc|degree)\b/i.test(name)) return 'degree';
  if (months !== null && months >= 12) return 'career';
  if (months !== null && months <= 2) return 'short';
  return 'certification';
}

/** List chunks that sit under a heading matching `pattern`. */
function listsUnder(chunks: readonly Chunk[], pattern: RegExp, limit = 8): string[] {
  return [
    ...new Set(
      chunks
        .filter((chunk) => chunk.kind === 'list' && chunk.heading && pattern.test(chunk.heading))
        .map((chunk) => chunk.text)
        .filter((text) => text.length > 6 && text.length < 160),
    ),
  ].slice(0, limit);
}

function extractCourse(extracted: ExtractedPage, html: string, index: number): CourseRecord | null {
  const $ = load(html);
  const name = clean($('h1').first().text());
  if (!name || name.length < 4) return null;

  const { facts, chunks, page } = extracted;
  const duration = parseDuration(facts.get('Duration') ?? '');

  return {
    id: `c${index}`,
    name,
    category: categoryFor(name, duration.months),
    durationMonths: duration.months,
    durationLabel: duration.label,
    path: page.path,
    summary: page.description,
    eligibility: facts.get('Eligibility') ?? '',
    fees: facts.get('Fees') ?? '',
    payment: facts.get('Payment') ?? '',
    topics: listsUnder(chunks, /what you will study|curriculum|syllabus|modules/i),
    highlights: listsUnder(chunks, /programme highlights|highlights|why choose/i),
    outcomes: listsUnder(chunks, /what you will be able to do|where this can take you|outcomes/i),
    certifications: listsUnder(chunks, /certification/i, 6),
  };
}

/** A centre entry renders as "Jetking Bhawanipore" + "Bhawanipore · 700020". */
const CENTRE_ITEM = /^(Jetking\s.+?)\s*·\s*(\d{5,6})\s*→?$/;
const PROGRAMME_ITEM = /^(.{4,60}?)((?:\d+(?:\.\d+)?)\s*(?:month|year)s?)$/i;

/**
 * Undoes the concatenation of adjacent inline elements.
 *
 * `.text()` joins the centre name and its locality with no separator, giving
 * "Jetking BhawaniporeBhawanipore". The locality is always a suffix of the
 * name, so the split point is where the tail also ends the head.
 */
function splitCentreName(blob: string): { name: string; locality: string } {
  for (let cut = blob.length - 1; cut > 8; cut--) {
    const head = blob.slice(0, cut);
    const tail = blob.slice(cut);
    if (tail.length >= 3 && head.endsWith(tail)) return { name: head, locality: tail };
  }
  return { name: blob, locality: '' };
}

/**
 * Builds a centre record.
 *
 * Two templates exist: city hubs ("Centres in Kolkata" + a list of branches)
 * and single-centre pages, which instead show a "Featured programmes" grid.
 * Programme names are recovered from the known course list when the page has
 * no parseable programme list of its own.
 */
function extractCentre(
  extracted: ExtractedPage,
  index: number,
  courses: readonly CourseRecord[],
): CentreRecord | null {
  const { page, chunks } = extracted;

  const city = clean(page.path.split('/').pop() ?? '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
  if (!city) return null;

  const locations: CentreRecord['locations'] = [];
  const programmes: string[] = [];

  for (const chunk of chunks) {
    if (chunk.kind !== 'list') continue;

    const centre = CENTRE_ITEM.exec(chunk.text);
    if (centre) {
      const { name, locality } = splitCentreName(clean(centre[1] ?? ''));
      locations.push({
        name,
        locality: [locality, centre[2]].filter(Boolean).join(' · '),
      });
      continue;
    }

    const programme = PROGRAMME_ITEM.exec(chunk.text);
    if (programme && chunk.heading && /programme/i.test(chunk.heading)) {
      programmes.push(clean(programme[1] ?? ''));
    }
  }

  if (programmes.length === 0) {
    // Single-centre template: recover programmes by matching the page text
    // against course names we already extracted.
    const haystack = chunks
      .map((chunk) => chunk.text)
      .join(' ')
      .toLowerCase();
    for (const course of courses) {
      if (haystack.includes(course.name.toLowerCase())) programmes.push(course.name);
    }
  }

  if (!page.description && locations.length === 0 && programmes.length === 0) return null;

  return {
    id: `ct${index}`,
    city,
    path: page.path,
    summary: page.description,
    locations,
    programmes: [...new Set(programmes)],
  };
}

/**
 * FAQ pairs.
 *
 * On this site a question is a list/paragraph chunk ending in "?" that sits
 * under a "Frequently asked questions" heading, followed by its answer.
 */
function extractFaqs(
  pages: readonly ExtractedPage[],
  courses: readonly CourseRecord[],
): FaqRecord[] {
  const faqs: FaqRecord[] = [];
  const seen = new Set<string>();

  for (const { page, chunks } of pages) {
    const courseName = courses.find((course) => course.path === page.path)?.name ?? null;

    chunks.forEach((chunk, index) => {
      if (chunk.kind !== 'faq') return;

      // The answer is the next substantial non-question chunk in document order.
      const answer = chunks
        .slice(index + 1, index + 4)
        .find((next) => next.kind !== 'faq' && next.text.length > 40);
      if (!answer) return;

      const key = chunk.text.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);

      faqs.push({
        id: `f${faqs.length}`,
        question: chunk.text,
        answer: answer.text,
        path: page.path,
        scope: courseName,
      });
    });
  }

  return faqs;
}

/** Headline numbers, e.g. "100%Job guarantee", "5000+Recruiter partners". */
const STAT_ITEM = /^([\d,]+[%+]?|\d+°)\s*([A-Za-z][A-Za-z ]{3,28})$/;

function extractStats(pages: readonly ExtractedPage[]): StatRecord[] {
  const stats: StatRecord[] = [];
  const seen = new Set<string>();

  for (const { chunks } of pages) {
    for (const chunk of chunks) {
      const match = STAT_ITEM.exec(chunk.text);
      if (!match) continue;

      const value = clean(match[1] ?? '');
      const label = clean(match[2] ?? '');
      const key = label.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      stats.push({ id: `s${stats.length}`, value, label });
      if (stats.length >= 8) return stats;
    }
  }

  return stats;
}

function extractContact(pages: readonly ExtractedPage[]): ContactRecord {
  const text = pages.flatMap((p) => p.chunks.map((c) => c.text)).join('\n');

  return {
    phone: /\b(?:\+91[\s-]?)?0?\d{10}\b/.exec(text)?.[0]?.trim() ?? '07666830000',
    email: /\b[\w.-]+@jetking\.com\b/i.exec(text)?.[0]?.toLowerCase() ?? 'info@jetking.com',
    address:
      /5th Floor[\s\S]{0,140}?\bIndia\b/i.exec(text)?.[0] ??
      'Jetking Infotrain Limited, Khar, Mumbai 400052, India',
    enquiryPath: '/enquiry',
  };
}

/* -------------------------------------------------------------------------- */
/* Write guard                                                                 */
/* -------------------------------------------------------------------------- */

async function readExisting(): Promise<KnowledgeBase | null> {
  try {
    return JSON.parse(await readFile(OUTPUT, 'utf8')) as KnowledgeBase;
  } catch {
    return null;
  }
}

/**
 * Refuses to overwrite a healthy knowledge base with a degraded one.
 *
 * A throttled or half-broken crawl still "succeeds" — it just returns almost
 * nothing. Without this check one bad run silently empties the committed file.
 */
function assertNotDegraded(next: KnowledgeBase, previous: KnowledgeBase | null): void {
  const problems: string[] = [];

  if (next.pages.length === 0) problems.push('crawl returned zero pages');
  if (next.courses.length === 0) problems.push('crawl returned zero courses');

  if (previous) {
    for (const key of ['pages', 'chunks', 'courses'] as const) {
      const before = previous[key]?.length ?? 0;
      const after = next[key].length;
      if (before > 0 && after < before * REGRESSION_TOLERANCE) {
        problems.push(`${key}: ${before} → ${after}`);
      }
    }
  }

  if (problems.length === 0) return;

  if (FORCE) {
    console.warn(`\n  ⚠ writing anyway (--force): ${problems.join('; ')}\n`);
    return;
  }

  throw new Error(
    [
      'Refusing to write a degraded knowledge base.',
      ...problems.map((problem) => `  · ${problem}`),
      '',
      'The existing file has been left untouched. Check that the site is running,',
      'then re-run. Use --force to override.',
    ].join('\n'),
  );
}

/* -------------------------------------------------------------------------- */
/* Main                                                                        */
/* -------------------------------------------------------------------------- */

async function crawl(
  urls: readonly string[],
  label: string,
): Promise<Array<{ url: string; html: string }>> {
  if (urls.length === 0) return [];

  console.log(`\n${label} (${urls.length})`);
  const fetched = await mapPool(urls, async (url) => {
    const html = await fetchHtml(url);
    if (!html) console.warn(`  ✗ ${new URL(url).pathname}`);
    return { url, html };
  });

  return fetched.flatMap(({ url, html }) => (html ? [{ url, html }] : []));
}

async function main(): Promise<void> {
  console.log(`Crawling ${ORIGIN}`);

  const seedUrls = SEED_PATHS.map((path) => new URL(path, ORIGIN).toString());
  const seeds = await crawl(seedUrls, 'Section pages');

  const pages: ExtractedPage[] = seeds.map(({ url, html }, i) => extractPage(url, html, i));

  const discovered = [...new Set(pages.flatMap((page) => page.links))]
    .filter((url) => /^\/(courses|centres)\/[^/]+$/.test(new URL(url).pathname))
    .filter((url) => !seedUrls.includes(url))
    .sort();

  const courseUrls = discovered.filter((url) => new URL(url).pathname.startsWith('/courses/'));
  const centreUrls = discovered.filter((url) => new URL(url).pathname.startsWith('/centres/'));

  const courseHtml = await crawl(courseUrls, 'Course pages');

  const courses: CourseRecord[] = [];
  for (const { url, html } of courseHtml) {
    const extracted = extractPage(url, html, pages.length);
    pages.push(extracted);
    const course = extractCourse(extracted, html, courses.length);
    if (course) courses.push(course);
  }

  const centreHtml = await crawl(centreUrls, 'Centre pages');
  const centrePages: ExtractedPage[] = [];

  for (const { url, html } of centreHtml) {
    const extracted = extractPage(url, html, pages.length);
    pages.push(extracted);
    centrePages.push(extracted);
  }

  // Centre pages cross-link to cities the section pages never mention, so one
  // extra pass is needed to reach the full network.
  const crawled = new Set(pages.map((page) => new URL(page.page.path, ORIGIN).toString()));
  const moreCentreUrls = [...new Set(centrePages.flatMap((page) => page.links))]
    .filter((url) => /^\/centres\/[^/]+$/.test(new URL(url).pathname))
    .filter((url) => !crawled.has(url))
    .sort();

  for (const { url, html } of await crawl(moreCentreUrls, 'Centre pages (second pass)')) {
    const extracted = extractPage(url, html, pages.length);
    pages.push(extracted);
    centrePages.push(extracted);
  }

  const centres: CentreRecord[] = [];
  for (const extracted of centrePages) {
    const centre = extractCentre(extracted, centres.length, courses);
    if (centre) centres.push(centre);
  }

  const knowledgeBase: KnowledgeBase = {
    crawledAt: new Date().toISOString(),
    crawledFrom: ORIGIN,
    pages: pages.map((page) => page.page),
    chunks: pages.flatMap((page) => page.chunks),
    courses,
    centres,
    faqs: extractFaqs(pages, courses),
    stats: extractStats(pages),
    contact: extractContact(pages),
  };

  assertNotDegraded(knowledgeBase, await readExisting());

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(knowledgeBase, null, 2)}\n`, 'utf8');

  const kb = knowledgeBase;
  console.log(
    [
      '',
      `  pages    ${kb.pages.length}`,
      `  chunks   ${kb.chunks.length}`,
      `  courses  ${kb.courses.length}`,
      `  centres  ${kb.centres.length}`,
      `  faqs     ${kb.faqs.length}`,
      `  stats    ${kb.stats.length}`,
      '',
      `  wrote ${OUTPUT} (${Math.round(Buffer.byteLength(JSON.stringify(kb)) / 1024)} KB)`,
      '',
    ].join('\n'),
  );
}

try {
  await main();
} catch (error) {
  console.error(`\n${(error as Error).message}\n`);
  process.exitCode = 1;
}
