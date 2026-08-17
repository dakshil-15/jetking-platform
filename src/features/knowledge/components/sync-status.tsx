'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getCrawlInfo } from '@/features/knowledge/lib/engine';
import { SITE } from '@/lib/config/site';
import { formatRelativeTime } from '@/lib/utils';

interface CrawlInfo {
  crawledAt: string;
  pages: number;
  empty: boolean;
}

/**
 * Shows when the knowledge base was last synced, and warns loudly when it is
 * empty — otherwise an unsynced install looks like an assistant that simply
 * cannot answer anything.
 */
export function SyncStatus() {
  const [info, setInfo] = useState<CrawlInfo | null>(null);

  useEffect(() => {
    let cancelled = false;

    void getCrawlInfo().then((result) => {
      if (cancelled || !result) return;
      setInfo({ ...result, empty: result.pages === 0 });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!info) return null;

  if (info.empty) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-danger-500/25 bg-danger-500/5 px-3.5 py-3">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger-500" />
        <p className="text-sm leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">No content synced yet.</span> Run{' '}
          <code className="rounded border border-line bg-surface-sunken px-1.5 py-0.5 font-mono text-[0.8125rem]">
            npm run sync:content
          </code>{' '}
          to crawl {SITE.sourceLabel} and build the knowledge base.
        </p>
      </div>
    );
  }

  return (
    <p className="flex items-center justify-center gap-1.5 text-xs text-ink-subtle">
      <RefreshCw className="size-3" />
      {info.pages} pages from {SITE.sourceLabel}, synced{' '}
      {formatRelativeTime(new Date(info.crawledAt).getTime())}
    </p>
  );
}
