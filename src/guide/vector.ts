import { promises as fs } from 'node:fs';
import path from 'node:path';
import { buildCorpus } from './corpus';
import { cosineSimilarity, embedQuery, embedTexts } from './embeddings';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Chunk, RetrievedChunk, Retriever } from './types';
import { lexicalRetriever } from './retrieve-lexical';

/**
 * Vector document store — Supabase pgvector when configured, otherwise a local
 * JSON file under data/cms/embeddings.json for offline hybrid retrieval.
 */

interface StoredDoc {
  chunk: Chunk;
  embedding: number[];
}

const EMBEDDINGS_PATH = path.join(process.cwd(), 'data', 'cms', 'embeddings.json');

async function readLocalDocs(): Promise<StoredDoc[]> {
  try {
    const raw = await fs.readFile(EMBEDDINGS_PATH, 'utf8');
    return JSON.parse(raw) as StoredDoc[];
  } catch {
    return [];
  }
}

async function writeLocalDocs(docs: StoredDoc[]): Promise<void> {
  await fs.mkdir(path.dirname(EMBEDDINGS_PATH), { recursive: true });
  await fs.writeFile(EMBEDDINGS_PATH, JSON.stringify(docs), 'utf8');
}

/** Full re-ingest of the current content corpus. */
export async function ingestCorpus(): Promise<{ count: number; backend: string }> {
  const chunks = await buildCorpus();
  if (!process.env.OPENAI_API_KEY) {
    return { count: 0, backend: 'skipped-no-openai-key' };
  }

  const embeddings = await embedTexts(chunks.map((c) => `${c.title}\n${c.text}`));
  const docs: StoredDoc[] = chunks.map((chunk, i) => ({
    chunk,
    embedding: embeddings[i] ?? [],
  }));

  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    for (const doc of docs) {
      await supabase.from('documents').upsert({
        id: doc.chunk.id,
        type: doc.chunk.type,
        title: doc.chunk.title,
        url: doc.chunk.url,
        source_slug: doc.chunk.sourceSlug ?? null,
        content: doc.chunk.text,
        embedding: doc.embedding,
        updated_at: new Date().toISOString(),
      });
    }
    await writeLocalDocs(docs);
    return { count: docs.length, backend: 'supabase+local' };
  }

  await writeLocalDocs(docs);
  return { count: docs.length, backend: 'local' };
}

export const vectorRetriever: Retriever = {
  name: 'pgvector-or-local',

  async retrieve(query, opts) {
    const limit = opts?.limit ?? 5;
    if (!process.env.OPENAI_API_KEY) return [];

    const queryVec = await embedQuery(query);

    // Prefer live pgvector when Supabase is configured (multi-instance safe).
    const supabase = getSupabase();
    if (supabase && isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.rpc('match_documents', {
          query_embedding: queryVec,
          match_count: limit * 2,
          filter_types: opts?.types ?? null,
        });
        if (!error && Array.isArray(data) && data.length > 0) {
          return (data as Array<{
            id: string;
            type: Chunk['type'];
            title: string;
            url: string;
            source_slug: string | null;
            content: string;
            similarity: number;
          }>)
            .filter((row) => row.similarity > 0.2)
            .slice(0, limit)
            .map((row) => ({
              id: row.id,
              type: row.type,
              title: row.title,
              url: row.url,
              sourceSlug: row.source_slug ?? undefined,
              text: row.content,
              score: row.similarity,
            }));
        }
      } catch {
        // fall through to local JSON
      }
    }

    const docs = await readLocalDocs();
    if (docs.length === 0) return [];

    const scored: RetrievedChunk[] = [];
    for (const doc of docs) {
      if (opts?.types && !opts.types.includes(doc.chunk.type)) continue;
      const score = cosineSimilarity(queryVec, doc.embedding);
      if (score > 0.2) scored.push({ ...doc.chunk, score });
    }

    return scored.sort((a, b) => b.score - a.score).slice(0, limit);
  },
};

/**
 * Reciprocal rank fusion of BM25 + vector results.
 */
export function fuseResults(
  lexical: RetrievedChunk[],
  vector: RetrievedChunk[],
  limit: number,
): RetrievedChunk[] {
  const K = 60;
  const scores = new Map<string, { chunk: RetrievedChunk; score: number }>();

  lexical.forEach((chunk, i) => {
    const existing = scores.get(chunk.id);
    const add = 1 / (K + i + 1);
    if (existing) existing.score += add;
    else scores.set(chunk.id, { chunk, score: add });
  });

  vector.forEach((chunk, i) => {
    const existing = scores.get(chunk.id);
    const add = 1 / (K + i + 1);
    if (existing) existing.score += add;
    else scores.set(chunk.id, { chunk, score: add });
  });

  return [...scores.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk, score }) => ({ ...chunk, score }));
}

export const hybridRetriever: Retriever = {
  name: 'hybrid-bm25-vector',

  async retrieve(query, opts) {
    const limit = opts?.limit ?? 5;
    const [lex, vec] = await Promise.all([
      lexicalRetriever.retrieve(query, { ...opts, limit: limit * 2 }),
      vectorRetriever.retrieve(query, { ...opts, limit: limit * 2 }).catch(() => [] as RetrievedChunk[]),
    ]);

    if (vec.length === 0) return lex.slice(0, limit);
    if (lex.length === 0) return vec.slice(0, limit);
    return fuseResults(lex, vec, limit);
  },
};
