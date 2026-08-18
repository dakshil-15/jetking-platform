/**
 * Smoke-tests the retrieval pipeline against the committed knowledge base.
 *
 *   node scripts/check-answers.mts ["a custom question"]
 *
 * Prints the composed answer for a set of representative questions so that
 * ranking and block-composition regressions are visible without a browser.
 */

import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { composeAnswer } from '../src/features/knowledge/lib/answer.ts';
import { buildIndex } from '../src/features/knowledge/lib/index-builder.ts';
import type { KnowledgeBase } from '../src/features/knowledge/types/index.ts';

const HERE = dirname(fileURLToPath(import.meta.url));

/** `--fixture` runs against the committed regression sample instead of the live crawl. */
const USE_FIXTURE = process.argv.includes('--fixture');
const KB_PATH = USE_FIXTURE
  ? resolve(HERE, 'fixtures/sample-kb.json')
  : resolve(HERE, '../src/content/jetking-kb.json');

const QUESTIONS = [
  'which course is best for a cybersecurity job?',
  'will I get a job after the course?',
  'how long is the gaming and metaverse course?',
  'what courses can I do after 12th?',
  'where are your centres and how do I contact you?',
  'tell me about jetking',
  'do you teach ethical hacking?',
  'what is the fee structure?',
  'how do I bake sourdough bread?',
];

const base = JSON.parse(await readFile(KB_PATH, 'utf8')) as KnowledgeBase;

console.log(
  `knowledge base: ${base.pages.length} pages · ${base.chunks.length} chunks · ` +
    `${base.courses.length} courses · ${base.faqs.length} faqs\n`,
);

if (base.chunks.length === 0) {
  console.error('Knowledge base is empty — run `npm run sync:content` first.');
  process.exit(1);
}

const index = buildIndex(base);
const custom = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const questions = custom.length ? custom : QUESTIONS;

for (const question of questions) {
  const answer = composeAnswer(index, question);

  console.log('─'.repeat(78));
  console.log(`Q  ${question}`);
  console.log(`   intent=${answer.intent}  confidence=${answer.confidence}`);
  console.log(`\n   ${answer.title}`);
  console.log(`   ${answer.lede.slice(0, 220)}${answer.lede.length > 220 ? '…' : ''}`);

  for (const block of answer.blocks) {
    switch (block.type) {
      case 'courses':
        console.log(
          `   [courses] ${block.heading}: ${block.courses.map((c) => c.name).join(' | ')}`,
        );
        break;
      case 'faqs':
        console.log(`   [faqs] ${block.faqs.map((f) => f.question).join(' | ')}`);
        break;
      case 'stats':
        console.log(`   [stats] ${block.stats.map((s) => `${s.value} ${s.label}`).join(' · ')}`);
        break;
      case 'facts':
        console.log(`   [facts] ${block.items.map((i) => `${i.label}=${i.value}`).join(' · ')}`);
        break;
      case 'centres':
        console.log(
          `   [centres] ${block.heading}: ${block.centres.map((c) => c.city).join(' | ')}`,
        );
        break;
      case 'contact':
        console.log(`   [contact] ${block.contact.phone} · ${block.contact.email}`);
        break;
      case 'prose':
        console.log(`   [prose] ${block.paragraphs.length} paragraph(s)`);
        break;
    }
  }

  console.log(`   sources: ${answer.sources.map((s) => s.path).join(', ') || '—'}`);
  console.log(`   next: ${answer.followUps.join(' / ')}`);
  console.log();
}
