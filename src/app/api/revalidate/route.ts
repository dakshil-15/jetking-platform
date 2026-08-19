import { NextResponse } from 'next/server';
import { publishContent } from '@/lib/cms/publish';
import { clientKey, createRateLimiter } from '@/lib/rate-limit';

/**
 * Admin CMS / CI webhook → ISR revalidation.
 * Authorize with Bearer REVALIDATE_SECRET — required in production; fails closed
 * rather than silently accepting every caller when the secret is unset.
 */
const limiter = createRateLimiter({ windowMs: 60_000, max: 10 });
const MAX_PATHS = 50;

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Revalidate is not configured.' }, { status: 503 });
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
      { error: 'Too many revalidate requests.' },
      { status: 429, headers: { 'retry-after': String(limit.retryAfter || 60) } },
    );
  }

  let paths: string[] | undefined;
  try {
    const body = (await req.json()) as { paths?: string[] };
    paths = Array.isArray(body.paths) ? body.paths.slice(0, MAX_PATHS) : undefined;
  } catch {
    // empty body is fine
  }

  await publishContent({ paths });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
