import { revalidatePath } from 'next/cache';
import { invalidateCorpus } from '@/guide/corpus';
import { invalidateIndex } from '@/guide/retrieve';

/**
 * Called after Admin CMS publish. Invalidates ISR surfaces and Guide corpus caches.
 */
export async function publishContent(opts?: { paths?: string[] }): Promise<void> {
  invalidateCorpus();
  invalidateIndex();

  const paths = opts?.paths ?? ['/', '/courses', '/centres', '/blog', '/faq', '/placements', '/admin'];
  for (const p of paths) {
    try {
      revalidatePath(p);
    } catch {
      // ignore outside request context
    }
  }
}
