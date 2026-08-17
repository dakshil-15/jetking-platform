'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';

const MILESTONES = [25, 50, 75, 100] as const;

/** Fires scroll_depth once per milestone per page view. */
export function ScrollDepthTracker() {
  const { classification, hydrated } = usePersona();
  const fired = useRef(new Set<number>());

  useEffect(() => {
    if (!hydrated) return;

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          track('scroll_depth', {
            depth: m,
            persona: classification.persona,
            path: window.location.pathname,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hydrated, classification.persona]);

  return null;
}
