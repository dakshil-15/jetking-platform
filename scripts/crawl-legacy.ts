/**
 * ══════════════════════════════════════════════════════════════════════════════
 * LEGACY SITE INVENTORY — Week 1
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Produces `data/legacy-urls.json`: the complete list of URLs on the existing
 * Jetking site, with the on-page SEO metadata each one currently carries.
 *
 * This file is the foundation of the entire migration guarantee. `build-redirects.ts`
 * consumes it to generate the redirect map, and `verify-redirects.ts` asserts against
 * it to prove nothing was stranded. Until it exists, the SEO gate is incomplete and
 * says so.
 *
 * Usage:
 *   npx tsx scripts/crawl-legacy.ts --base https://www.jetking.com
 *   npx tsx scripts/crawl-legacy.ts --base https://www.jetking.com --max 500 --delay 400
 *
 * Politeness: this crawls a live production site, so it is deliberately serial with a
 * delay between requests. It is not a load test. Run it against the client's own site
 * with their knowledge, and keep --delay at or above the default.
 *
 * Coverage note: a crawl only finds what is linked. Orphan pages that still rank must
 * be added from Search Console ("Pages" → export) and the XML sitemap. This script
 * reads the sitemap automatically; the Search Console export has to be merged in by
 * hand, and `--report` prints what to look for.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

interface LegacyUrl {
  path: string;
  status: number;
  title: string | null;
  description: string | null;
  h1: string | null;
  canonical: string | null;
  noindex: boolean;
  /** Bytes of text content — a proxy for "is this a real page or a stub". */
  textLength: number;
  /** Populated by hand from a Search Console export. Drives migration priority. */
  clicks?: number;
  discoveredVia: 'sitemap' | 'link';
}

function arg(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 ? (process.argv[index + 1] ?? fallback) : fallback;
}

const BASE = arg('base', '').replace(/\/$/, '');
const MAX_PAGES = Number(arg('max', '2000'));
const DELAY_MS = Number(arg('delay', '300'));
const OUT = join(process.cwd(), 'data', 'legacy-urls.json');

if (!BASE) {
  console.error(
    'Usage: npx tsx scripts/crawl-legacy.ts --base https://www.example.com [--max 2000] [--delay 300]',
  );
  process.exit(1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function extract(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

/** Strip query strings and fragments; keep trailing-slash normalisation consistent. */
function normalisePath(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    if (url.origin !== new URL(base).origin) return null;

    // Skip assets and non-HTML endpoints.
    if (/\.(jpg|jpeg|png|gif|svg|webp|avif|css|js|pdf|zip|ico|woff2?|mp4|xml)$/i.test(url.pathname)) {
      return null;
    }

    let path = url.pathname;
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path;
  } catch {
    return null;
  }
}

async function readSitemap(): Promise<string[]> {
  const paths: string[] = [];
  const queue = [`${BASE}/sitemap.xml`];
  const seen = new Set<string>();

  while (queue.length) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);

    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const xml = await response.text();

      // A sitemap index points at more sitemaps; follow one level of nesting.
      const isIndex = /<sitemapindex/i.test(xml);
      for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
        const loc = match[1];
        if (!loc) continue;
        if (isIndex) {
          queue.push(loc.trim());
        } else {
          const path = normalisePath(loc.trim(), BASE);
          if (path) paths.push(path);
        }
      }
    } catch {
      // No sitemap, or unreachable. The link crawl still runs.
    }
  }

  return [...new Set(paths)];
}

async function inspect(path: string, via: LegacyUrl['discoveredVia']): Promise<{
  record: LegacyUrl;
  links: string[];
}> {
  const url = `${BASE}${path}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = response.headers.get('content-type')?.includes('text/html')
      ? await response.text()
      : '';

    const robotsMeta = extract(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const links: string[] = [];
    for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
      const href = match[1];
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }
      const normalised = normalisePath(href, BASE);
      if (normalised) links.push(normalised);
    }

    return {
      record: {
        path,
        status: response.status,
        title: extract(html, /<title[^>]*>([^<]*)<\/title>/i),
        description: extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
        h1: extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, '').trim() ?? null,
        canonical: extract(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i),
        noindex: Boolean(robotsMeta?.includes('noindex')),
        textLength: text.length,
        discoveredVia: via,
      },
      links,
    };
  } catch (error) {
    console.warn(`  ! ${path} — ${String(error)}`);
    return {
      record: {
        path,
        status: 0,
        title: null,
        description: null,
        h1: null,
        canonical: null,
        noindex: false,
        textLength: 0,
        discoveredVia: via,
      },
      links: [],
    };
  }
}

async function main() {
  console.log(`\nCrawling ${BASE}\n${'─'.repeat(60)}`);

  const sitemapPaths = await readSitemap();
  console.log(`Sitemap: ${sitemapPaths.length} URLs`);

  const results = new Map<string, LegacyUrl>();
  const queued = new Set<string>(['/', ...sitemapPaths]);
  const fromSitemap = new Set(sitemapPaths);
  const queue = [...queued];

  while (queue.length && results.size < MAX_PAGES) {
    const path = queue.shift();
    if (!path || results.has(path)) continue;

    const { record, links } = await inspect(path, fromSitemap.has(path) ? 'sitemap' : 'link');
    results.set(path, record);

    for (const link of links) {
      if (!queued.has(link)) {
        queued.add(link);
        queue.push(link);
      }
    }

    if (results.size % 25 === 0) {
      console.log(`  ${results.size} crawled, ${queue.length} queued…`);
    }

    await sleep(DELAY_MS);
  }

  const records = [...results.values()].sort((a, b) => a.path.localeCompare(b.path));

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(records, null, 2)}\n`, 'utf8');

  // Stakeholder-friendly CSV (DEVELOPMENT-PLAN §6.1 asks for legacy-urls.csv)
  const csvPath = join(process.cwd(), 'data', 'legacy-urls.csv');
  const csvHeader = 'path,status,title,description,h1,canonical,noindex,textLength,clicks,discoveredVia';
  const csvRows = records.map((r) =>
    [
      r.path,
      r.status,
      csvEscape(r.title),
      csvEscape(r.description),
      csvEscape(r.h1),
      csvEscape(r.canonical),
      r.noindex,
      r.textLength,
      r.clicks ?? '',
      r.discoveredVia,
    ].join(','),
  );
  await writeFile(csvPath, `${[csvHeader, ...csvRows].join('\n')}\n`, 'utf8');

  // ── Report ──────────────────────────────────────────────────────────────
  const problems = {
    nonOk: records.filter((r) => r.status !== 200),
    noTitle: records.filter((r) => r.status === 200 && !r.title),
    noDescription: records.filter((r) => r.status === 200 && !r.description),
    noH1: records.filter((r) => r.status === 200 && !r.h1),
    noindex: records.filter((r) => r.noindex),
    thin: records.filter((r) => r.status === 200 && r.textLength < 500),
  };

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`✓ ${records.length} URLs written to data/legacy-urls.json`);
  console.log(`✓ CSV export written to data/legacy-urls.csv\n`);
  console.log('Existing-site health (informs migration scope):');
  console.log(`  non-200 responses     ${problems.nonOk.length}`);
  console.log(`  missing <title>       ${problems.noTitle.length}`);
  console.log(`  missing description   ${problems.noDescription.length}`);
  console.log(`  missing <h1>          ${problems.noH1.length}`);
  console.log(`  noindex               ${problems.noindex.length}`);
  console.log(`  thin (<500 chars)     ${problems.thin.length}`);

  if (results.size >= MAX_PAGES) {
    console.log(`\n⚠ Hit the --max limit of ${MAX_PAGES}. Re-run with a higher --max.`);
  }

  console.log(
    '\nNEXT: a crawl only finds linked pages. Export Search Console → Pages (last 12\n' +
      'months) and merge any URL that has impressions but is missing from this file —\n' +
      'orphan pages that still rank are exactly what a migration strands.\n' +
      'Add a `clicks` field to each record so build-redirects.ts can prioritise.\n',
  );
}

function csvEscape(value: string | null): string {
  if (value == null) return '';
  const needsQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

main().catch((error) => {
  console.error('Crawl failed:', error);
  process.exit(1);
});
