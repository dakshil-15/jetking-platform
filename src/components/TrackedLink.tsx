'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';
import { track, type EventName } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';

export function TrackedLink({
  href,
  event,
  props,
  className,
  children,
}: {
  href: string;
  event: EventName;
  props?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: ReactNode;
}) {
  const { classification } = usePersona();

  return (
    <Link
      href={href as Route}
      className={className}
      onClick={() =>
        track(event, {
          ...props,
          href,
          persona: classification.persona,
          confidence: classification.confidence,
          rules_version: classification.version,
        })
      }
    >
      {children}
    </Link>
  );
}
