'use client';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { TooltipProvider } from '@/components/ui/index';

/**
 * Single mount point for every client-side provider.
 *
 * Keeping them here means the root layout stays a server component and new
 * providers only ever touch one file.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={350} skipDelayDuration={200}>
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}

