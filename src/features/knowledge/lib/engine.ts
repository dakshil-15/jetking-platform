import { composeAnswer } from '@/features/knowledge/lib/answer';
import { buildIndex, type KnowledgeIndex } from '@/features/knowledge/lib/index-builder';
import type { KnowledgeBase } from '@/features/knowledge/types';
import type { AnswerPage } from '@/features/knowledge/types/answer';

/**
 * Lazily loads the crawled knowledge base and builds the retrieval index once
 * per session.
 *
 * The JSON is a few hundred KB, so it is imported dynamically — that keeps it
 * out of the initial bundle and off the critical path until the first question
 * is actually asked.
 */
let indexPromise: Promise<KnowledgeIndex> | null = null;

export function loadIndex(): Promise<KnowledgeIndex> {
  indexPromise ??= import('@/content/jetking-kb.json')
    .then((module) => buildIndex(module.default as unknown as KnowledgeBase))
    .catch((error: unknown) => {
      // Reset so a transient chunk-load failure can be retried.
      indexPromise = null;
      throw error;
    });

  return indexPromise;
}

/** True once the knowledge base has content to search. */
export async function hasKnowledge(): Promise<boolean> {
  try {
    const index = await loadIndex();
    return index.base.chunks.length > 0 || index.base.courses.length > 0;
  } catch {
    return false;
  }
}

export interface AnswerRequest {
  query: string;
  signal?: AbortSignal;
}

export class AnswerAbortedError extends Error {
  constructor() {
    super('Answer aborted');
    this.name = 'AnswerAbortedError';
  }
}

/** The knowledge base file exists but has no crawled content in it. */
export class KnowledgeEmptyError extends Error {
  constructor() {
    super('Knowledge base is empty');
    this.name = 'KnowledgeEmptyError';
  }
}

/**
 * Answers a question from the crawled content.
 *
 * Retrieval itself is synchronous and fast; the async boundary exists because
 * the index is built on first use, and because the caller needs a cancellation
 * point while that happens.
 */
export async function answerQuery({ query, signal }: AnswerRequest): Promise<AnswerPage> {
  const index = await loadIndex();

  if (signal?.aborted) throw new AnswerAbortedError();

  // Distinguish "nothing matched your question" from "no content was ever
  // synced" — they look identical to the user but need opposite fixes.
  if (index.base.chunks.length === 0 && index.base.courses.length === 0) {
    throw new KnowledgeEmptyError();
  }

  return composeAnswer(index, query);
}

/** Metadata for the "content last synced" line in the UI. */
export async function getCrawlInfo(): Promise<{ crawledAt: string; pages: number } | null> {
  try {
    const index = await loadIndex();
    return { crawledAt: index.base.crawledAt, pages: index.base.pages.length };
  } catch {
    return null;
  }
}
