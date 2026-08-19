'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Public chrome gate.
 *
 *   · /admin, /chatbot — no header, footer, or Guide
 *
 * The site footer itself is not rendered anywhere (see layout.tsx) — nav lives
 * in the header menu and on-page CTAs instead.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin') || pathname.startsWith('/chatbot')) return null;
  return <>{children}</>;
}
