import { NextResponse } from 'next/server';
import { ingestCorpus } from '@/guide/vector';
import { invalidateCorpus } from '@/guide/corpus';
import { invalidateIndex } from '@/guide/retrieve';

/**
 * Re-chunk + embed the published CMS corpus into pgvector / local embeddings store.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  invalidateCorpus();
  invalidateIndex();

  try {
    const result = await ingestCorpus();
    return NextResponse.json({ ok: true, ...result, at: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Ingest failed' },
      { status: 500 },
    );
  }
}
