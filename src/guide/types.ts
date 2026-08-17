export type ChunkType =
  | 'course'
  | 'faq'
  | 'post'
  | 'news'
  | 'centre'
  | 'city'
  | 'policy'
  | 'faculty'
  | 'placement';

/** One retrievable unit of Jetking content. */
export interface Chunk {
  id: string;
  type: ChunkType;
  title: string;
  /** The text the model is allowed to ground on. */
  text: string;
  /** Where the visitor can verify this — every answer cites real URLs. */
  url: string;
  /** Source entity slug, used for post-generation entity verification. */
  sourceSlug?: string;
}

export interface RetrievedChunk extends Chunk {
  score: number;
}

/**
 * Retrieval contract.
 *
 * The local implementation is lexical (BM25-style). A pgvector implementation slots
 * in behind the same interface once the data infrastructure decision is made — the
 * route handler, guardrails and prompt do not change.
 */
export interface Retriever {
  readonly name: string;
  retrieve(query: string, opts?: { limit?: number; types?: ChunkType[] }): Promise<RetrievedChunk[]>;
}

export type GuideRole = 'user' | 'assistant';

export interface GuideMessage {
  role: GuideRole;
  content: string;
}

export type GuideOutcome =
  | { kind: 'answer'; text: string; citations: Array<{ title: string; url: string }> }
  /** Structured, deterministic response — never model-generated. Fees live here. */
  | { kind: 'structured'; text: string; component: 'fees' | 'centres'; payload: unknown }
  /** Refusal + counsellor handoff. A designed outcome, not a failure. */
  | { kind: 'handoff'; text: string; reason: HandoffReason };

export type HandoffReason =
  | 'out-of-scope'
  | 'no-grounding'
  | 'fee-specific'
  | 'placement-guarantee'
  | 'unsafe'
  | 'unavailable';
