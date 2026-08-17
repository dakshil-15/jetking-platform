'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';

/** tel: / brochure links with analytics. */
export function TrackedAnchor({
  href,
  event,
  props,
  className,
  children,
}: {
  href: string;
  event: 'phone_clicked' | 'brochure_downloaded' | 'whatsapp_clicked';
  props?: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: ReactNode;
}) {
  const { classification } = usePersona();

  return (
    <a
      href={href}
      className={className}
      onClick={() =>
        track(event, {
          ...props,
          href,
          persona: classification.persona,
        })
      }
    >
      {children}
    </a>
  );
}
