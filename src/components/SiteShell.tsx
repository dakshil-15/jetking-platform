'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Public chrome gate.
 *
 *   · /admin — no header, footer, or Guide
 *   · /, /v2, /student, /professional, /franchise — no footer (persona landings
 *     match the mocks without a site footer; nav lives in the header menu and on-page CTAs)
 */
export function SiteChrome({
  children,
  slot = 'default',
}: {
  children: ReactNode;
  slot?: 'default' | 'footer';
}) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/chatbot')) return null;
  if (
    slot === 'footer' &&
    (pathname === '/' ||
      pathname === '/v2' ||
      pathname === '/student' ||
      pathname === '/professional' ||
      pathname === '/franchise')
  ) {
    return null;
  }
  return <>{children}</>;
}
