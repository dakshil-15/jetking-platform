/**
 * Exports every record exposed by the website ContentSource into a compact
 * retrieval corpus for Jetking AI.
 *
 * This is the bridge between the website CMS/fixtures and the chatbot. It
 * intentionally uses the same ContentSource as the pages, so switching
 * CONTENT_SOURCE from local to admin changes both surfaces together.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCorpus } from '@/guide/corpus';
import type { ChunkType } from '@/guide/types';
import { content } from '@/lib/content';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(HERE, '../src/content/website-corpus.json');

const typeMap: Record<ChunkType, string> = {
  course: 'course',
  faq: 'faq',
  post: 'blog',
  news: 'blog',
  centre: 'centre',
  city: 'centre',
  policy: 'info',
  faculty: 'info',
  placement: 'placement',
};

const [chunks, courses, centres, cities] = await Promise.all([
  buildCorpus(),
  content.listCourses(),
  content.listCentres(),
  content.listCities(),
]);
const items = chunks.map((chunk) => ({
  id: chunk.id,
  type: typeMap[chunk.type],
  title: chunk.title,
  path: chunk.url,
  text: chunk.text,
  source: 'website-content-source' as const,
}));

await mkdir(dirname(OUTPUT), { recursive: true });
await writeFile(
  OUTPUT,
  `${JSON.stringify(
    {
      builtAt: new Date().toISOString(),
      contentSource: process.env['CONTENT_SOURCE'] ?? 'local',
      count: items.length,
      items,
      structured: { courses, centres, cities },
    },
    null,
    2,
  )}\n`,
  'utf8',
);

const byType = Object.groupBy(items, (item) => item.type);
const distribution = Object.fromEntries(
  Object.entries(byType).map(([type, rows]) => [type, rows?.length ?? 0]),
);

console.log(`Exported ${items.length} website records to src/content/website-corpus.json`);
console.log(`By type: ${JSON.stringify(distribution)}`);
