import { tokenize, tokenizeQuery } from '@/features/knowledge/lib/tokenize';

/**
 * Okapi BM25 over an in-memory corpus.
 *
 * The knowledge base is a few thousand short documents, so a full inverted
 * index is unnecessary — scoring is linear over candidate documents drawn from
 * a term→document postings map, which is both simpler and fast enough to run
 * on every keystroke.
 */

const K1 = 1.5;
const B = 0.75;

export interface IndexField {
  text: string;
  /** Term-frequency multiplier. Titles should outweigh body copy. */
  boost: number;
}

interface IndexedDocument {
  id: string;
  length: number;
  frequencies: Map<string, number>;
}

export interface ScoredHit {
  id: string;
  score: number;
  /**
   * Fraction of the query's distinct terms this document contains (0..1).
   *
   * Score alone cannot separate "capital of France" from a real question:
   * BM25 rewards a single rare-term overlap, so one incidental match can look
   * strong. Coverage says how much of the question was actually addressed,
   * which is what makes a confidence gate possible without embeddings.
   */
  coverage: number;
}

export class Bm25Index {
  private readonly documents = new Map<string, IndexedDocument>();
  private readonly postings = new Map<string, Set<string>>();
  private totalLength = 0;

  add(id: string, fields: readonly IndexField[]): void {
    const frequencies = new Map<string, number>();
    let length = 0;

    for (const field of fields) {
      for (const term of tokenize(field.text)) {
        frequencies.set(term, (frequencies.get(term) ?? 0) + field.boost);
        length += field.boost;

        let posting = this.postings.get(term);
        if (!posting) {
          posting = new Set();
          this.postings.set(term, posting);
        }
        posting.add(id);
      }
    }

    if (length === 0) return;

    this.documents.set(id, { id, length, frequencies });
    this.totalLength += length;
  }

  private idf(term: string): number {
    const documentFrequency = this.postings.get(term)?.size ?? 0;
    if (documentFrequency === 0) return 0;

    const total = this.documents.size;
    // Add-one form keeps the value positive for terms present in most documents.
    return Math.log(1 + (total - documentFrequency + 0.5) / (documentFrequency + 0.5));
  }

  search(query: string, limit = 10): ScoredHit[] {
    const terms = tokenizeQuery(query);
    if (terms.length === 0 || this.documents.size === 0) return [];

    const averageLength = this.totalLength / this.documents.size;

    // Only documents containing at least one query term can score above zero.
    const candidates = new Set<string>();
    for (const term of terms) {
      for (const id of this.postings.get(term) ?? []) candidates.add(id);
    }

    const hits: ScoredHit[] = [];

    for (const id of candidates) {
      const document = this.documents.get(id);
      if (!document) continue;

      let score = 0;
      let matched = 0;

      for (const term of terms) {
        const frequency = document.frequencies.get(term);
        if (!frequency) continue;
        matched++;

        const normalisation = 1 - B + (B * document.length) / averageLength;
        score += this.idf(term) * ((frequency * (K1 + 1)) / (frequency + K1 * normalisation));
      }

      if (score > 0) hits.push({ id, score, coverage: matched / terms.length });
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  get size(): number {
    return this.documents.size;
  }
}
