import type { AnswerBlock, AnswerIntent, AnswerPage } from '@/features/knowledge/types/answer';

/**
 * Keeps an answer tight and on-topic — only what the question asked for.
 *
 * Two problems this solves:
 *  1. Off-topic padding — a centre question shouldn't return courses, a fees
 *     question shouldn't dump a grid of loosely-matched programmes.
 *  2. Weak-match noise — the composer ranks by relevance, so we keep only the
 *     top few items per block and drop the long tail (e.g. a gaming course
 *     surfacing under a cyber-security query).
 *
 * `general` and any unmapped intent keep all blocks (but still get trimmed).
 */
const ALLOWED: Partial<Record<AnswerIntent, ReadonlyArray<AnswerBlock['type']>>> = {
  course: ['facts', 'courses', 'faqs'],
  fees: ['facts', 'faqs'],
  eligibility: ['facts', 'faqs'],
  centres: ['centres'],
  contact: ['contact', 'centres'],
  placement: ['stats', 'faqs'],
  about: ['prose', 'stats'],
};

/** Cap items within a block so weakly-matched extras don't pad the answer. */
function trimBlock(block: AnswerBlock): AnswerBlock {
  switch (block.type) {
    case 'courses':
      return { ...block, courses: block.courses.slice(0, 2) };
    case 'faqs':
      return { ...block, faqs: block.faqs.slice(0, 2) };
    case 'prose':
      return { ...block, paragraphs: block.paragraphs.slice(0, 2) };
    case 'centres':
      return { ...block, centres: block.centres.slice(0, 6) };
    default:
      return block;
  }
}

export function scopedBlocks(page: AnswerPage): AnswerBlock[] {
  const allow = ALLOWED[page.intent];
  const filtered = allow ? page.blocks.filter((block) => allow.includes(block.type)) : page.blocks;
  // Never strip the answer down to nothing — fall back to the full set.
  const kept = filtered.length ? filtered : page.blocks;

  // When the answer already shows a specific course's key details, the
  // "matching programmes" grid is redundant — and its weaker matches (e.g. a
  // gaming course under a cyber-security question) are exactly the wrong,
  // unnecessary detail we don't want. Drop it.
  const hasFocusDetails = kept.some((block) => block.type === 'facts');
  const deduped = hasFocusDetails ? kept.filter((block) => block.type !== 'courses') : kept;

  return deduped.map(trimBlock);
}

export function scopedAnswer(page: AnswerPage): AnswerPage {
  return { ...page, blocks: scopedBlocks(page) };
}
