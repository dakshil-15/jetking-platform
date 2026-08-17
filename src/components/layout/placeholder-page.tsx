'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/index';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { ROUTES } from '@/lib/config/routes';

interface PlaceholderPageProps {
  title: string;
  description: string;
  /**
   * A rendered icon element, not a component reference  server components
   * may pass elements across the boundary but never functions.
   */
  icon: ReactNode;
}

/**
 * Honest empty state for surfaces that exist in the navigation but carry no
 * functionality in this UI-only build.
 */
export function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader title={title} />

      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-line bg-surface text-ink-subtle">
          {icon}
        </span>

        <div className="max-w-sm">
          <h2 className="font-display text-2xl tracking-tight text-ink">{title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{description}</p>
        </div>

        <Button asChild variant="outline">
          <Link href={ROUTES.home()}>Back to chat</Link>
        </Button>
      </div>
    </div>
  );
}

