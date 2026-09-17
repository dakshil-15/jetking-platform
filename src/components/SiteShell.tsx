'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Public chrome gate.
 *
 *   · /admin, /chatbot — no header, footer, or Guide
 *
 * Everywhere else — including `/` — renders the header and Guide.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/chatbot')) return null;
  return <>{children}</>;
}

/**
 * Footer-specific chrome gate — same admin/chatbot exclusion as SiteChrome,
 * plus `/`: the homepage lead is a full-viewport hero (see HomeV2) designed
 * to end at the fold, not hand off into a footer.
 */
export function FooterChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/chatbot') || pathname === '/') {
    return null;
  }
  return <>{children}</>;
}
