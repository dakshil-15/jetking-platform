/**
 * Turns everything in data/manual-knowledge/ (plain text/FAQ entries, dropped
 * documents, and fetched URLs) into src/content/manual-knowledge.json — a
 * fourth source scripts/build-index.mjs merges into the retrieval index
 * alongside the site crawl, the CMS export, and the reused legacy scrape.
 *
 *   npm run ingest:manual-knowledge
 *
 * Every source is optional and every item is best-effort: one bad file or
 * unreachable URL logs a warning and is skipped rather than failing the run,
 * matching build-index.mjs's own "degrade, don't crash" handling of a
 * missing website-corpus.json.
 */
import { load, type CheerioAPI } from 'cheerio';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = resolve(HERE, '../data/manual-knowledge');
const ENTRIES_PATH = resolve(SOURCE_DIR, 'entries.json');
const URLS_PATH = resolve(SOURCE_DIR, 'urls.txt');
const DOCUMENTS_DIR = resolve(SOURCE_DIR, 'documents');
const OUT = resolve(HERE, '../src/content/manual-knowledge.json');

const USER_AGENT = 'JetkingAssistantBot/1.0 (manual knowledge ingest)';
const FETCH_TIMEOUT_MS = 15_000;

interface ManualItem {
  title: string;
  text: string;
  source: string;
}

function clean(value: string): string {
  return value.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
}

/* -------------------------------------------------------------------------- */
/* 1. Plain text / FAQ entries                                                */
/* -------------------------------------------------------------------------- */

async function loadEntries(): Promise<ManualItem[]> {
  let raw: string;
  try {
    raw = await readFile(ENTRIES_PATH, 'utf8');
  } catch {
    return [];
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn(`[entries.json] invalid JSON, skipping: ${(error as Error).message}`);
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const items: ManualItem[] = [];
  parsed.forEach((entry, i) => {
    const title = typeof entry?.title === 'string' ? clean(entry.title) : '';
    const text = typeof entry?.text === 'string' ? clean(entry.text) : '';
    if (!text) {
      console.warn(`[entries.json] entry ${i} has no text, skipping`);
      return;
    }
    items.push({ title: title || `Manual note ${i + 1}`, text, source: 'entries.json' });
  });
  return items;
}

/* -------------------------------------------------------------------------- */
/* 2. Documents (.pdf / .docx / .txt / .md)                                   */
/* -------------------------------------------------------------------------- */

async function extractDocument(path: string): Promise<string | null> {
  const ext = extname(path).toLowerCase();

  if (ext === '.txt' || ext === '.md') {
    return readFile(path, 'utf8');
  }

  if (ext === '.pdf') {
    const { PDFParse } = await import('pdf-parse');
    const buffer = await readFile(path);
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }

  if (ext === '.docx') {
    const mammoth = (await import('mammoth')).default;
    const result = await mammoth.extractRawText({ path });
    return result.value;
  }

  return null;
}

async function loadDocuments(): Promise<ManualItem[]> {
  let files: string[];
  try {
    files = await readdir(DOCUMENTS_DIR);
  } catch {
    return [];
  }

  const items: ManualItem[] = [];
  for (const file of files) {
    if (file.startsWith('.')) continue; // .gitkeep etc.
    const path = resolve(DOCUMENTS_DIR, file);
    try {
      const text = await extractDocument(path);
      if (text === null) {
        console.warn(`[documents/${file}] unsupported extension, skipping`);
        continue;
      }
      const cleaned = clean(text);
      if (!cleaned) {
        console.warn(`[documents/${file}] extracted no text, skipping`);
        continue;
      }
      const title = file.replace(extname(file), '').replace(/[-_]+/g, ' ').trim();
      items.push({ title, text: cleaned, source: `documents/${file}` });
    } catch (error) {
      console.warn(`[documents/${file}] failed to extract: ${(error as Error).message}`);
    }
  }
  return items;
}

/* -------------------------------------------------------------------------- */
/* 3. URLs                                                                     */
/* -------------------------------------------------------------------------- */

function stripChrome($: CheerioAPI): void {
  $('script, style, noscript, svg, iframe, template, link').remove();
  $('nav, footer, header[role="banner"]').remove();
  $('br').replaceWith(' ');
}

async function loadUrls(): Promise<ManualItem[]> {
  let raw: string;
  try {
    raw = await readFile(URLS_PATH, 'utf8');
  } catch {
    return [];
  }

  const urls = raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));

  const items: ManualItem[] = [];
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': USER_AGENT },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      if (!response.ok) {
        console.warn(`[${url}] HTTP ${response.status}, skipping`);
        continue;
      }
      const html = await response.text();
      const $ = load(html);
      stripChrome($);
      const title = clean($('title').first().text()) || url;
      const text = clean($('body').text());
      if (!text) {
        console.warn(`[${url}] no readable text found, skipping`);
        continue;
      }
      items.push({ title, text, source: url });
    } catch (error) {
      console.warn(`[${url}] fetch failed: ${(error as Error).message}`);
    }
  }
  return items;
}

/* -------------------------------------------------------------------------- */
/* Merge + write                                                              */
/* -------------------------------------------------------------------------- */

const [entries, documents, urls] = await Promise.all([loadEntries(), loadDocuments(), loadUrls()]);
const items = [...entries, ...documents, ...urls];

await writeFile(
  OUT,
  JSON.stringify({ generatedAt: new Date().toISOString(), items }, null, 2) + '\n',
);

console.log(
  `Ingested ${items.length} manual item(s): ${entries.length} entries, ${documents.length} documents, ${urls.length} URLs -> src/content/manual-knowledge.json`,
);
