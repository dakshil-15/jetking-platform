import 'server-only';
import type { Retriever } from './types';
import { invalidateLexicalIndex, lexicalRetriever } from './retrieve-lexical';
import { hybridRetriever } from './vector';

export { lexicalRetriever } from './retrieve-lexical';
export { hybridRetriever, vectorRetriever, ingestCorpus } from './vector';

export function invalidateIndex(): void {
  invalidateLexicalIndex();
}

/**
 * Prefer hybrid BM25 + vector when OpenAI is configured; otherwise BM25 only
 * (keeps guardrail tests deterministic without network).
 */
export function getRetriever(): Retriever {
  if (process.env.OPENAI_API_KEY && process.env.GUIDE_RETRIEVER !== 'lexical') {
    return hybridRetriever;
  }
  return lexicalRetriever;
}

/**
 * Retrieval confidence gate for BM25 scores.
 * Hybrid RRF scores are typically much smaller — use a lower gate when hybrid.
 */
export const MIN_RETRIEVAL_SCORE = 1.2;
export const MIN_HYBRID_SCORE = 0.01;
