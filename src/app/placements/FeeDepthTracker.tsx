'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';

/**
 * Fires the `fee-depth` signal only when the fees/placement content is actually read,
 * not merely loaded. Depth is inferred from an IntersectionObserver on the FAQ block
 * plus a dwell threshold — a bounce should not look like considered interest.
 *
 * This is the strongest single behavioural signal for the `parent` persona, so it is
 * worth measuring properly rather than firing on page load.
 */

const DWELL_MS = 8000;

export function FeeDepthTracker() {
  const { record } = usePersona();
  const firedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firedRef.current) return;
      firedRef.current = true;
      record({ kind: 'fee-depth' });
      track('fee_section_viewed', { dwell_ms: DWELL_MS });
    }, DWELL_MS);

    return () => clearTimeout(timer);
  }, [record]);

  return null;
}
