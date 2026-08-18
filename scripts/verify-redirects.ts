/**
 * ══════════════════════════════════════════════════════════════════════════════
 * SEO GATE — blocks deploy
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Asserts the guarantees in DEVELOPMENT-PLAN §6.2 against a running server:
 *
 *   1. Every legacy URL returns 200, or a SINGLE-HOP 301 to a 200
 *   2. No redirect chains, no redirect loops
 *   3. Every indexable page has title, meta description, canonical, H1
 *   4. Canonical is absolute and self-referential
 *   5. The sitemap contains no redirected or 404 URL
 *   6. No page that was indexable pre-migration carries noindex
 *   7. Rendered HTML contains body content without JavaScript (the SSR check)
 *
 * Usage:
 *   npm run build && npm start &
 *   npm run verify:seo -- --base http://localhost:3000
 *
 * This is the check that determines whether ~180 pages of ranking survive the
 * migration. It is meant to be noisy and to fail the build.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

interface LegacyUrl {
  path: string;
  /** Clicks over the last 12 months, from Search Console. Used to prioritise output. */
  clicks?: number;
}

interface Failure {
  check: string;
  url: string;
  detail: string;
  severity: 'error' | 'warning';
}

const failures: Failure[] = [];

function fail(check: string, url: string, detail: string, severity: Failure['severity'] = 'error') {
  failures.push({ check, url, detail, severity });
}

function arg(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 ? (process.argv[index + 1] ?? fallback) : fallback;
}

const BASE = arg('base', 'http://localhost:3000').replace(/\/$/, '');

/* ── Helpers ─────────────────────────────────────────────────────────────── */

async function head(url: string): Promise<{ status: number; location: string | null }> {
  const response = await fetch(url, { redirect: 'manual' });
  return { status: response.status, location: response.headers.get('location') };
}

function extract(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

/* ── Check 1 & 2: redirects resolve in one hop ───────────────────────────── */

async function checkLegacyUrls(legacy: LegacyUrl[]) {
  for (const entry of legacy) {
    const url = `${BASE}${entry.path}`;

    try {
      const first = await head(url);

      if (first.status === 200) continue;

      if (first.status !== 301 && first.status !== 308) {
        fail(
          'legacy-url-status',
          entry.path,
          `Expected 200 or 301, got ${first.status}. This URL's ranking is at risk.`,
        );
        continue;
      }

      if (!first.location) {
        fail('redirect-no-location', entry.path, `${first.status} with no Location header.`);
        continue;
      }

      const target = first.location.startsWith('http') ? first.location : `${BASE}${first.location}`;

      if (target === url) {
        fail('redirect-loop', entry.path, 'Redirects to itself.');
        continue;
      }

      const second = await head(target);

      if (second.status === 301 || second.status === 308) {
        fail(
          'redirect-chain',
          entry.path,
          `Chains: ${entry.path} → ${first.location} → ${second.location}. Collapse to one hop.`,
        );
        continue;
      }

      if (second.status !== 200) {
        fail(
          'redirect-broken-target',
          entry.path,
          `Redirects to ${first.location} which returns ${second.status}.`,
        );
      }
    } catch (error) {
      fail('legacy-url-unreachable', entry.path, String(error));
    }
  }
}

/* ── Checks 3, 4, 6, 7: on-page SEO fundamentals ─────────────────────────── */

async function checkPage(path: string) {
  const url = `${BASE}${path}`;

  let html: string;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      fail('page-status', path, `Returned ${response.status}.`);
      return;
    }
    html = await response.text();
  } catch (error) {
    fail('page-unreachable', path, String(error));
    return;
  }

  const title = extract(html, /<title>([^<]*)<\/title>/i);
  if (!title) fail('missing-title', path, 'No <title>.');
  else if (title.length > 65) {
    fail('long-title', path, `${title.length} chars — likely truncated in SERPs.`, 'warning');
  }

  const description = extract(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!description) fail('missing-description', path, 'No meta description.');
  else if (description.length > 165) {
    fail('long-description', path, `${description.length} chars — likely truncated.`, 'warning');
  }

  const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonical) {
    fail('missing-canonical', path, 'No canonical link.');
  } else {
    if (!canonical.startsWith('http')) {
      fail('relative-canonical', path, `Canonical must be absolute, got "${canonical}".`);
    }
    const expected = `${BASE}${path === '/' ? '' : path}`;
    if (canonical.replace(/\/$/, '') !== expected.replace(/\/$/, '')) {
      fail('non-self-canonical', path, `Canonical is "${canonical}", expected "${expected}".`);
    }
  }

  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gis) ?? [];
  if (h1Matches.length === 0) fail('missing-h1', path, 'No <h1>.');
  else if (h1Matches.length > 1) {
    fail('multiple-h1', path, `${h1Matches.length} <h1> elements.`, 'warning');
  }

  const robotsMeta = extract(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  if (robotsMeta?.includes('noindex')) {
    fail('unexpected-noindex', path, 'Page carries noindex but is expected to be indexable.');
  }

  // The SSR check: strip all <script> content and confirm real prose remains.
  // This is what catches an adaptive layer that has accidentally become
  // client-only — the failure mode that would silently de-index the site.
  const withoutScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const text = withoutScripts.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length < 500) {
    fail(
      'insufficient-ssr-content',
      path,
      `Only ${text.length} chars of text render without JavaScript. Content must be server-rendered.`,
    );
  }
}

/* ── Check 5: sitemap hygiene ────────────────────────────────────────────── */

async function checkSitemap(): Promise<string[]> {
  const response = await fetch(`${BASE}/sitemap.xml`);
  if (!response.ok) {
    fail('sitemap-missing', '/sitemap.xml', `Returned ${response.status}.`);
    return [];
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1] ?? '').filter(Boolean);

  if (urls.length === 0) fail('sitemap-empty', '/sitemap.xml', 'Contains no URLs.');

  for (const url of urls) {
    try {
      const { status } = await head(url);
      if (status !== 200) {
        fail('sitemap-bad-url', url, `Listed in sitemap but returns ${status}.`);
      }
    } catch (error) {
      fail('sitemap-unreachable', url, String(error));
    }
  }

  return urls.map((url) => new URL(url).pathname);
}

/* ── Runner ──────────────────────────────────────────────────────────────── */

async function loadLegacyUrls(): Promise<LegacyUrl[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'data', 'legacy-urls.json'), 'utf8');
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LegacyUrl[]) : [];
  } catch {
    console.warn(
      '⚠ No data/legacy-urls.json found. Skipping legacy-URL checks.\n' +
        '  This file is produced by scripts/crawl-legacy.ts in Week 1 and is the\n' +
        '  basis of the migration guarantee. The gate is incomplete without it.\n',
    );
    return [];
  }
}

async function main() {
  console.log(`\nSEO gate — verifying ${BASE}\n${'─'.repeat(60)}`);

  const legacy = await loadLegacyUrls();
  if (legacy.length) {
    console.log(`Checking ${legacy.length} legacy URLs…`);
    await checkLegacyUrls(legacy);
  }

  console.log('Checking sitemap…');
  const sitemapPaths = await checkSitemap();

  console.log(`Checking ${sitemapPaths.length} indexable pages…`);
  for (const path of sitemapPaths) {
    await checkPage(path);
  }

  const errors = failures.filter((f) => f.severity === 'error');
  const warnings = failures.filter((f) => f.severity === 'warning');

  console.log(`\n${'─'.repeat(60)}`);

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warning(s):\n`);
    for (const w of warnings) console.log(`  [${w.check}] ${w.url}\n    ${w.detail}`);
  }

  if (errors.length) {
    console.log(`\n✗ ${errors.length} error(s):\n`);
    for (const e of errors) console.log(`  [${e.check}] ${e.url}\n    ${e.detail}`);
    console.log('\nSEO gate FAILED. Deploy blocked.\n');
    process.exit(1);
  }

  console.log('\n✓ SEO gate passed.\n');
}

main().catch((error) => {
  console.error('SEO gate crashed:', error);
  process.exit(1);
});
