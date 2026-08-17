import { buildCorpus } from './corpus';
import type { Chunk, RetrievedChunk, Retriever } from './types';

/**
 * Lexical retriever (BM25) — always available, no infra dependency.
 * Used alone in tests/offline, and as half of hybrid retrieval.
 */

const STOPWORDS = new Set([
  'a','an','and','are','as','at','be','but','by','can','do','does','for','from','how','i','if','in','is','it','its',
  'me','my','of','on','or','that','the','their','them','then','there','these','they','this','to','was','what','when',
  'where','which','who','why','will','with','you','your','am','have','has','need','want','get','got','would','should',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s+#-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

interface IndexedChunk {
  chunk: Chunk;
  terms: Map<string, number>;
  length: number;
}

interface Index {
  docs: IndexedChunk[];
  df: Map<string, number>;
  avgLength: number;
}

let indexCache: Index | null = null;

async function getIndex(): Promise<Index> {
  if (indexCache) return indexCache;

  const chunks = await buildCorpus();
  const docs: IndexedChunk[] = chunks.map((chunk) => {
    const tokens = tokenize(`${chunk.title} ${chunk.title} ${chunk.text}`);
    const terms = new Map<string, number>();
    for (const token of tokens) terms.set(token, (terms.get(token) ?? 0) + 1);
    return { chunk, terms, length: tokens.length };
  });

  const df = new Map<string, number>();
  for (const doc of docs) {
    for (const term of doc.terms.keys()) df.set(term, (df.get(term) ?? 0) + 1);
  }

  const avgLength = docs.length ? docs.reduce((sum, d) => sum + d.length, 0) / docs.length : 1;

  indexCache = { docs, df, avgLength };
  return indexCache;
}

export function invalidateLexicalIndex(): void {
  indexCache = null;
}

const K1 = 1.5;
const B = 0.75;

export const lexicalRetriever: Retriever = {
  name: 'lexical-bm25',

  async retrieve(query, opts) {
    const limit = opts?.limit ?? 6;
    const index = await getIndex();
    const queryTerms = tokenize(query);
    if (queryTerms.length === 0) return [];

    const N = index.docs.length;
    const scored: RetrievedChunk[] = [];

    for (const doc of index.docs) {
      if (opts?.types && !opts.types.includes(doc.chunk.type)) continue;

      let score = 0;
      for (const term of queryTerms) {
        const tf = doc.terms.get(term);
        if (!tf) continue;
        const df = index.df.get(term) ?? 0;
        const idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
        const norm = tf * (K1 + 1);
        const denom = tf + K1 * (1 - B + (B * doc.length) / index.avgLength);
        score += idf * (norm / denom);
      }

      if (score > 0) scored.push({ ...doc.chunk, score });
    }

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
  },
};
