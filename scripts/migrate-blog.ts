/**
 * Migrates legacy blog HTML into the Admin CMS store.
 *
 * Usage:
 *   npm run migrate:blog -- --base https://www.jetking.com
 *   npm run migrate:blog -- --base https://www.jetking.com --dry-run
 *   npm run migrate:blog -- --base https://www.jetking.com --from-sitemap --max 200
 *   npm run migrate:blog -- --base https://www.jetking.com --from-sitemap --only-missing --retries 4
 *   npm run migrate:blog -- --from-file data/legacy-blog-sample.html --slug sample-post
 *
 * Reads blog-like paths from data/legacy-urls.json (paths containing /blog/),
 * fetches each page, parses title/meta/H1/body into BodyBlock[], and upserts
 * via upsertRecord. Idempotent on slug.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { upsertRecord, readCmsStore } from '../src/lib/cms/store';
import type { BodyBlock, Post } from '../src/lib/content/types';
import type { PublishStatus } from '../src/lib/cms/types';

type MigratedPost = Post & { status: PublishStatus };

function arg(name: string, fallback = ''): string {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 ? (process.argv[index + 1] ?? fallback) : fallback;
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

const BASE = arg('base').replace(/\/$/, '');
const FROM_FILE = arg('from-file');
const FORCE_SLUG = arg('slug');
const DRY_RUN = hasFlag('dry-run');
const FROM_SITEMAP = hasFlag('from-sitemap');
const ONLY_MISSING = hasFlag('only-missing');
const PATHS_FROM_REPORT = arg('paths-from-report');
const DELAY_MS = Number(arg('delay', '400'));
const MAX = Number(arg('max', '50'));
const RETRIES = Number(arg('retries', '3'));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extract(html: string, pattern: RegExp): string | null {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function slugFromPath(path: string): string {
  const cleaned = path.replace(/\/+$/, '').replace(/\.html?$/i, '');
  const parts = cleaned.split('/').filter(Boolean);
  const last = parts[parts.length - 1] ?? 'untitled';
  return last
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function htmlToBlocks(html: string): BodyBlock[] {
  // Live legacy pages often contain multiple `<main>` / "content" containers,
  // where the first match can be empty (e.g. SSR shell only). Pick the candidate
  // with the most extracted plain text instead of trusting a single selector.
  const candidates = [
    extract(html, /<article[^>]*>([\s\S]*?)<\/article>/i),
    extract(html, /<main[^>]*>([\s\S]*?)<\/main>/i),
    extract(html, /<div[^>]+class="[^"]*(?:entry-content|post-content|content)[^"]*"[^>]*>([\s\S]*?)<\/div>/i),
    html,
  ].filter((c): c is string => Boolean(c));

  let article = html;
  let bestPlainLen = -1;
  for (const candidate of candidates) {
    const len = stripTags(candidate).length;
    if (len > bestPlainLen) {
      bestPlainLen = len;
      article = candidate;
    }
  }

  const blocks: BodyBlock[] = [];
  const chunkRe = /<(h([2-3])|p)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = chunkRe.exec(article)) !== null) {
    const tag = match[1]?.toLowerCase();
    const text = stripTags(match[3] ?? '');
    if (!text || text.length < 20) continue;
    if (tag === 'h2' || tag === 'h3') {
      blocks.push({ type: 'heading', level: tag === 'h2' ? 2 : 3, text });
    } else {
      blocks.push({ type: 'paragraph', text });
    }
  }

  if (blocks.length === 0) {
    const plain = stripTags(article).slice(0, 4000);
    if (plain.length > 40) {
      for (const para of plain.split(/(?<=\.)\s+/).filter((p) => p.length > 40).slice(0, 12)) {
        blocks.push({ type: 'paragraph', text: para });
      }
    }
  }

  return blocks;
}

function parsePost(html: string, legacyPath: string, slugOverride?: string): MigratedPost {
  const title =
    extract(html, /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i) ??
    extract(html, /<title[^>]*>([^<]+)<\/title>/i) ??
    extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ??
    'Untitled';
  const cleanTitle = stripTags(title).replace(/\s*[|\-–—]\s*Jetking.*$/i, '').trim();
  const description =
    extract(html, /<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ??
    extract(html, /<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) ??
    '';
  const h1 = stripTags(extract(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) ?? cleanTitle);
  const body = htmlToBlocks(html);
  const slug = slugOverride || slugFromPath(legacyPath);
  const excerpt = (description || body.find((b) => b.type === 'paragraph')?.text || cleanTitle).slice(
    0,
    280,
  );

  return {
    slug,
    title: cleanTitle || h1,
    excerpt,
    body,
    author: 'Jetking',
    publishedAt: new Date().toISOString(),
    category: 'Guidance',
    tags: [],
    personaRelevance: {},
    seo: {
      title: cleanTitle.slice(0, 60) || h1.slice(0, 60),
      description: excerpt.slice(0, 160),
    },
    legacyPath,
    kind: 'blog',
    status: 'published',
    updatedAt: new Date().toISOString(),
  };
}

async function loadBlogPaths(): Promise<string[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'data', 'legacy-urls.json'), 'utf8');
    const rows = JSON.parse(raw) as Array<{ path: string; status?: number }>;
    return rows
      .filter((r) => (r.status ?? 200) === 200)
      .map((r) => r.path)
      .filter((p) => /\/blog(\/|$)/i.test(p) && p !== '/blog' && p !== '/blog/')
      .slice(0, MAX);
  } catch {
    return [];
  }
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]?.trim()).filter(Boolean) as string[];
}

function normalisePath(path: string): string {
  // Keep parity with the crawl normalisation: trim trailing "/" except for "/" itself.
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

async function loadBlogPathsFromSitemap(base: string): Promise<string[]> {
  let firstXml = '';
  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    const firstRes = await fetch(`${base}/sitemap.xml`, {
      headers: { 'user-agent': 'JetkingMigrationBot/1.0 (+seo-migration)' },
    });

    if (firstRes.status === 429) {
      const retryAfter = firstRes.headers.get('retry-after');
      const retryAfterMs = retryAfter ? Math.max(0, Number(retryAfter) * 1000) : 0;
      const waitMs = retryAfterMs > 0 ? retryAfterMs : 60000;
      if (attempt === RETRIES) throw new Error('Failed to fetch sitemap.xml: HTTP 429');

      console.warn(`  ! HTTP 429 fetching sitemap.xml. Waiting ${waitMs}ms (attempt ${attempt + 1}/${RETRIES + 1})`);
      await sleep(waitMs);
      continue;
    }

    if (!firstRes.ok) throw new Error(`Failed to fetch sitemap.xml: HTTP ${firstRes.status}`);
    firstXml = await firstRes.text();
    break;
  }

  const isIndex = /<sitemapindex/i.test(firstXml);

  // One-level nesting only (same as scripts/crawl-legacy.ts).
  const sitemapLocs = isIndex ? extractLocs(firstXml) : [];
  const urlLocs = isIndex ? [] : extractLocs(firstXml);

  if (isIndex) {
    for (const loc of sitemapLocs) {
      try {
        let xml = '';
        for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
          const res = await fetch(loc, {
            headers: { 'user-agent': 'JetkingMigrationBot/1.0 (+seo-migration)' },
          });

          if (res.status === 429) {
            const retryAfter = res.headers.get('retry-after');
            const retryAfterMs = retryAfter ? Math.max(0, Number(retryAfter) * 1000) : 0;
            const waitMs = retryAfterMs > 0 ? retryAfterMs : 60000;
            if (attempt === RETRIES) break;
            await sleep(waitMs);
            continue;
          }

          if (!res.ok) break;
          xml = await res.text();
          break;
        }

        if (!xml) continue;
        urlLocs.push(...extractLocs(xml));
      } catch {
        // Skip unreachable sitemap parts.
      }
    }
  }

  const paths = urlLocs
    .map((loc) => {
      try {
        return new URL(loc).pathname;
      } catch {
        return null;
      }
    })
    .filter((p): p is string => Boolean(p))
    .map(normalisePath)
    .filter((p) => /\/blog(\/|$)/i.test(p) && p !== '/blog' && p !== '/blog/');

  return [...new Set(paths)].slice(0, MAX);
}

async function loadBlogPathsFromReport(reportFile: string): Promise<string[]> {
  const reportPath = reportFile ? join(process.cwd(), reportFile) : join(process.cwd(), 'data', 'blog-migration-report.json');
  const raw = await readFile(reportPath, 'utf8');
  const parsed: unknown = JSON.parse(raw);
  const report = (parsed as { report?: Array<{ path?: string }> }).report ?? [];

  return report
    .map((r) => r.path)
    .filter((p): p is string => typeof p === 'string' && p.length > 0)
    .slice(0, MAX);
}

async function main() {
  if (FROM_FILE) {
    const html = await readFile(FROM_FILE, 'utf8');
    const post = parsePost(html, `/blog/${FORCE_SLUG || 'imported'}.html`, FORCE_SLUG || undefined);
    if (DRY_RUN) {
      console.log(JSON.stringify(post, null, 2));
      return;
    }
    await upsertRecord('posts', post as unknown as Record<string, unknown>, 'slug');
    console.log(`✓ Upserted post ${post.slug} from ${FROM_FILE}`);
    return;
  }

  if (!BASE) {
    console.error(
      'Usage: npm run migrate:blog -- --base https://www.jetking.com [--dry-run] [--max 50]\n' +
        '   or: npm run migrate:blog -- --from-file path.html --slug my-slug',
    );
    process.exit(1);
  }

  let paths: string[] = [];
  if (PATHS_FROM_REPORT) {
    paths = await loadBlogPathsFromReport(PATHS_FROM_REPORT);
  } else {
    paths = FROM_SITEMAP ? await loadBlogPathsFromSitemap(BASE) : await loadBlogPaths();
  }
  if (paths.length === 0) {
    console.log('No /blog/ paths found. Run crawl:legacy first, or use --from-file / --from-sitemap.');
    const store = await readCmsStore();
    console.log(`CMS currently has ${store.posts.length} posts.`);
    return;
  }

  console.log(`Migrating up to ${paths.length} blog URLs from ${BASE}…`);
  let ok = 0;
  let failed = 0;
  const report: Array<{ path: string; slug?: string; error?: string }> = [];

  if (ONLY_MISSING && !FORCE_SLUG) {
    const store = await readCmsStore();
    const existing = new Set(
      store.posts
        .filter((p) => p.status === 'published')
        .map((p) => (p as unknown as Post).slug)
        .filter(Boolean),
    );
    paths = paths.filter((p) => {
      const slug = slugFromPath(p);
      return !existing.has(slug);
    });
    console.log(`Only-missing: ${paths.length} URL(s) remaining after skipping existing slugs.`);
  }

  for (const path of paths) {
    let attempts = 0;
    while (attempts <= RETRIES) {
      try {
        const res = await fetch(`${BASE}${path}`, {
          headers: { 'user-agent': 'JetkingMigrationBot/1.0 (+seo-migration)' },
          redirect: 'follow',
        });

        if (res.status === 429) {
          const retryAfter = res.headers.get('retry-after');
          const retryAfterMs = retryAfter ? Math.max(0, Number(retryAfter) * 1000) : 0;
          const waitMs = retryAfterMs > 0 ? retryAfterMs : 60000;

          if (attempts === RETRIES) {
            throw new Error(`HTTP 429`);
          }

          attempts += 1;
          console.warn(`  ! HTTP 429 for ${path}. Waiting ${waitMs}ms (attempt ${attempts}/${RETRIES})`);
          await sleep(waitMs);
          continue;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const post = parsePost(html, path);
        if (post.body.length === 0) throw new Error('No body blocks extracted');

        if (!DRY_RUN) {
          await upsertRecord('posts', post as unknown as Record<string, unknown>, 'slug');
        }

        ok += 1;
        report.push({ path, slug: post.slug });
        console.log(`  ✓ ${path} → ${post.slug} (${post.body.length} blocks)`);
        break;
      } catch (err) {
        attempts += 1;
        const message = err instanceof Error ? err.message : String(err);
        if (attempts > RETRIES) {
          failed += 1;
          report.push({ path, error: message });
          console.warn(`  ✗ ${path}: ${message}`);
          break;
        }
        // Transient errors: back off slightly and try again.
        console.warn(`  ! ${path}: ${message} (retry ${attempts}/${RETRIES})`);
        await sleep(DELAY_MS);
      }
    }
    // Base pacing between successful/failed URLs.
    await sleep(DELAY_MS);
  }

  await mkdir(join(process.cwd(), 'data'), { recursive: true });
  await writeFile(
    join(process.cwd(), 'data', 'blog-migration-report.json'),
    `${JSON.stringify({ base: BASE, dryRun: DRY_RUN, ok, failed, report }, null, 2)}\n`,
  );

  console.log(`\nDone. ${ok} migrated, ${failed} failed. Report: data/blog-migration-report.json`);
  if (DRY_RUN) console.log('(dry-run — CMS store not written)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
