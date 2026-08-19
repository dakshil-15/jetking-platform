import { NextResponse } from 'next/server';
import { ingestCorpus } from '@/guide/vector';
import { invalidateCorpus } from '@/guide/corpus';
import { invalidateIndex } from '@/guide/retrieve';
import { clientKey, createRateLimiter } from '@/lib/rate-limit';

/**
 * Re-chunk + embed the published CMS corpus into pgvector / local embeddings store.
 *
 * Every call re-embeds the full corpus via OpenAI when a key is configured — real
 * money per request — so this must fail closed without a secret, not silently allow
 * anyone through. `REVALIDATE_SECRET` unset in production is a startup-time mistake,
 * not a "public by default" one.
 */
const limiter = createRateLimiter({ windowMs: 60_000, max: 3 });

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Ingest is not configured.' }, { status: 503 });
    }
  } else {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const limit = await limiter.check(clientKey(req));
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many ingest requests.' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter || 60) } },
    );
  }

  invalidateCorpus();
  invalidateIndex();

  try {
    const result = await ingestCorpus();
    return NextResponse.json({ ok: true, ...result, at: new Date().toISOString() });
  } catch (e) {
    console.error('[ingest:failed]', e);
    return NextResponse.json({ ok: false, error: 'Ingest failed.' }, { status: 500 });
  }
}
