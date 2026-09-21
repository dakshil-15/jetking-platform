import { NextResponse } from 'next/server';
import { loadLocationTree } from '@/lib/chatbot/locations';

export const runtime = 'nodejs';

/**
 * State → city → centre tree for the sign-up dropdowns. Public reference data (the same
 * names and slugs the centres pages already publish), so it is cacheable: a few minutes
 * at the edge means the dropdowns cost almost nothing per visitor.
 */
export async function GET() {
  const tree = await loadLocationTree();
  return NextResponse.json(tree, {
    headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=3600' },
  });
}
