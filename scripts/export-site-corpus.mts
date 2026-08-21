/**
 * Exports every record exposed by the website ContentSource into a compact
 * retrieval corpus for Jetking AI.
 *
 * This is the bridge between the website CMS/fixtures and the chatbot. It
 * intentionally uses the same ContentSource as the pages, so switching
 * CONTENT_SOURCE from local to admin changes both surfaces together.
 */
import './load-dotenv.mjs';

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCorpus } from '@/guide/corpus';
import type { ChunkType } from '@/guide/types';
import { content } from '@/lib/content';
import { ABOUT_HERO, ACHIEVEMENTS, LEADERS, LEGACY_STATS, PURPOSE, TIMELINE, VALUES } from '@/components/about/data';
import {
  PLACED_CANDIDATES,
  PLACEMENT_DISCLAIMER,
  PROCESS_STEPS,
  STUDENT_BENEFITS,
  TESTIMONIALS as PLACEMENT_TESTIMONIALS,
} from '@/components/placements/data';
import {
  COURSES as FRANCHISE_COURSES,
  FRANCHISE_INVESTMENT,
  JUMP_START,
  LAUNCH_STEPS,
  MARKET_STATS,
  WHY_STATS as FRANCHISE_WHY_STATS,
} from '@/components/franchise/data';

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

/**
 * The About and Placements pages carry real, verified Jetking copy (company
 * history, leadership, published placement records) that lives only in their
 * component data files — not behind the `content` ContentSource, so
 * `buildCorpus()` never sees it and the chatbot has been answering "who
 * founded Jetking" / "which companies recruit from Jetking" from stray blog
 * mentions instead of this source-of-truth data. Folded in by hand here
 * rather than promoting About/Placements into a full ContentSource type:
 * this is static company copy, not admin-editable records.
 */
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const earlyTimeline = TIMELINE.filter((m) => Number(m.year) < 2010);
const recentTimeline = TIMELINE.filter((m) => Number(m.year) >= 2010);
const milestoneText = (m: { year: string; title: string; body?: string }) =>
  `${m.year}: ${m.title}${m.body ? ` — ${m.body}` : ''}`;

// build-index.mjs's section-3 merge prepends `${item.title}\n` to every
// website.items row itself (matching how buildCorpus()'s chunks are plain
// body text with no title line) — so `text` below must NOT repeat the title,
// or the embedded passage ends up with it duplicated ("About Jetking About
// Jetking …"), diluting the vector.
const aboutItems = [
  {
    id: 'about-overview',
    type: 'about',
    title: 'About Jetking',
    path: '/about-us',
    text:
      `${ABOUT_HERO.lede} ` +
      `${PURPOSE.map((p) => `${p.title}: ${p.body}`).join(' ')} ` +
      `Values: ${VALUES.join(', ')}. ` +
      `${LEGACY_STATS.map((s) => `${s.value} ${s.label}`).join(', ')}.`,
    source: 'website-content-source' as const,
  },
  ...LEADERS.map((leader) => ({
    id: `about-leader-${slugify(leader.name)}`,
    type: 'about',
    title: leader.name,
    path: '/about-us',
    text: `${leader.role}\n${leader.bio.join(' ')}`,
    source: 'website-content-source' as const,
  })),
  {
    // A dedicated, single-fact item: earlyTimeline below folds this founding
    // fact in among eight other 1947-2008 milestones, which dilutes the
    // embedding enough that "who founded Jetking?" fails to surface it (a
    // franchise FAQ ranked above it in testing) — the same "one focused
    // passage per fact" lesson build-index.mjs already applies to fees/
    // eligibility/duration rows.
    id: 'about-founder',
    type: 'about',
    title: 'Who founded Jetking',
    path: '/about-us',
    text: `Jetking's founder — ${TIMELINE[0]!.year}: ${TIMELINE[0]!.title}. ${TIMELINE[0]!.body ?? ''}`,
    source: 'website-content-source' as const,
  },
  {
    id: 'about-history-founding',
    type: 'about',
    title: "Jetking's founding and early history",
    path: '/about-us',
    text: earlyTimeline.map(milestoneText).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'about-history-recent',
    type: 'about',
    title: "Jetking's recent milestones",
    path: '/about-us',
    text: recentTimeline.map(milestoneText).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'about-achievements',
    type: 'about',
    title: 'Jetking awards and achievements',
    path: '/about-us',
    text: ACHIEVEMENTS.map((a) => `${a.title}: ${a.body}`).join(' '),
    source: 'website-content-source' as const,
  },
];

const placementItems = [
  {
    id: 'placement-records',
    type: 'placement',
    title: 'Jetking placement records — companies that hired students',
    path: '/placements',
    text: `Students placed at companies including: ${PLACED_CANDIDATES.map((c) => `${c.name} at ${c.company}`).join(', ')}.`,
    source: 'website-content-source' as const,
  },
  {
    id: 'placement-testimonials',
    type: 'placement',
    title: 'Jetking alumni placement testimonials',
    path: '/placements',
    text: PLACEMENT_TESTIMONIALS.map((t) => `${t.name}, ${t.role}: "${t.quote}"`).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'placement-process',
    type: 'placement',
    title: 'How Jetking placement support works',
    path: '/placements',
    text:
      `Process: ${PROCESS_STEPS.map((s) => `${s.step}. ${s.title}`).join(', ')}. ` +
      `What students gain: ${STUDENT_BENEFITS.join(', ')}. ${PLACEMENT_DISCLAIMER}`,
    source: 'website-content-source' as const,
  },
];

// The franchise page (src/components/franchise/FranchiseLandingLight.tsx)
// carries real operational facts — support pillars, the launch process,
// market-opportunity stats, investment bands — that live only in that page
// component, outside the ContentSource `buildCorpus()` reads from. Same gap
// as About/Placements: a prospective franchisee asking the chatbot "what
// support does Jetking give franchise partners" had nothing to draw on.
const franchiseItems = [
  {
    id: 'franchise-why-stats',
    type: 'franchise',
    title: 'Why partner with Jetking — franchise track record',
    path: '/franchise',
    text: FRANCHISE_WHY_STATS.map((s) => `${s.value} ${s.label}`).join(', '),
    source: 'website-content-source' as const,
  },
  {
    id: 'franchise-support',
    type: 'franchise',
    title: 'Franchise partner support from Jetking',
    path: '/franchise',
    text: JUMP_START.map((s) => `${s.title}: ${s.detail}`).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'franchise-launch-process',
    type: 'franchise',
    title: 'Jetking franchise launch process',
    path: '/franchise',
    text: LAUNCH_STEPS.map((s) => `${s.step}. ${s.title}: ${s.body}`).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'franchise-market-opportunity',
    type: 'franchise',
    title: 'IT training market opportunity for Jetking franchisees',
    path: '/franchise',
    text: MARKET_STATS.map((s) => `${s.value} — ${s.label}`).join('. '),
    source: 'website-content-source' as const,
  },
  {
    id: 'franchise-course-categories',
    type: 'franchise',
    title: 'Course categories offered at Jetking franchise centres',
    path: '/franchise',
    text: FRANCHISE_COURSES.map((c) => `${c.title}: ${c.body}`).join(' '),
    source: 'website-content-source' as const,
  },
  {
    id: 'franchise-investment',
    type: 'franchise',
    title: 'Jetking franchise investment and contact',
    path: '/franchise',
    text: `Investment capacity bands: ${FRANCHISE_INVESTMENT.capacityBands.join(', ')}. Franchise enquiries: ${FRANCHISE_INVESTMENT.contactEmail}.`,
    source: 'website-content-source' as const,
  },
];

items.push(...aboutItems, ...placementItems, ...franchiseItems);

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
