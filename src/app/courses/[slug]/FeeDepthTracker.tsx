'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';

/**
 * Fires the `fee-depth` signal only when the fees / placement answers are actually read,
 * not merely loaded: the block with `targetId` must be on screen (at least 40% of it) for a
 * continuous dwell before the signal is recorded, and it fires at most once per page view.
 * Scrolling past it, or a bounce, does not count — a bounce should not look like considered
 * interest.
 *
 * This is the strongest single behavioural signal for the `parent` persona, so it is worth
 * measuring properly rather than firing on page load. It lives on the course page because
 * that is where the fees and placement-support questions are now answered.
 */

const DWELL_MS = 8000;
const VISIBLE_RATIO = 0.4;

export function FeeDepthTracker({ targetId, courseSlug }: { targetId: string; courseSlug: string }) {
  const { record } = usePersona();
  const firedRef = useRef(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || firedRef.current) return;

    let timer: number | undefined;
    const stopTimer = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || firedRef.current) return;
        if (entry.isIntersecting) {
          if (timer === undefined) {
            timer = window.setTimeout(() => {
              if (firedRef.current) return;
              firedRef.current = true;
              record({ kind: 'fee-depth' });
              track('fee_section_viewed', { dwell_ms: DWELL_MS, course_slug: courseSlug });
              observer.disconnect();
            }, DWELL_MS);
          }
        } else {
          stopTimer();
        }
      },
      { threshold: VISIBLE_RATIO },
    );

    observer.observe(target);
    return () => {
      stopTimer();
      observer.disconnect();
    };
  }, [targetId, courseSlug, record]);

  return null;
}
