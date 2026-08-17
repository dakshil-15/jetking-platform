import { NextResponse } from 'next/server';
import { publishContent } from '@/lib/cms/publish';

/**
 * Admin CMS / CI webhook → ISR revalidation.
 * Authorize with Bearer REVALIDATE_SECRET when set.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  let paths: string[] | undefined;
  try {
    const body = (await req.json()) as { paths?: string[] };
    paths = body.paths;
  } catch {
    // empty body is fine
  }

  await publishContent({ paths });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
