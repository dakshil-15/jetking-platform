'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * FLIP (First, Last, Invert, Play).
 *
 * Used when a list reorganises — filtering, persona re-ranking, layout change. The
 * point is not decoration: when six cards silently swap order, the visitor cannot
 * tell whether the set changed or merely reordered. Animating the move answers that
 * question, so the motion is carrying information.
 *
 * Implementation notes:
 *   • Web Animations API, no library. Framer Motion would be ~40KB for this.
 *   • Elements opt in with `data-flip-key`. Anything without one is ignored.
 *   • Respects prefers-reduced-motion by skipping the animation entirely — the
 *     layout still updates, it just arrives instantly.
 *   • Transform-only, so it never triggers layout and never contributes to CLS.
 */

const DURATION = 380;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Animates children of `ref` whenever `signature` changes.
 *
 * `signature` should encode the order/membership of the list (e.g. the joined keys),
 * so the effect runs exactly when the arrangement changed and not on unrelated
 * re-renders.
 */
export function useFlip(ref: React.RefObject<HTMLElement | null>, signature: string): void {
  const previousRects = useRef<Map<string, DOMRect>>(new Map());
  const previousSignature = useRef<string>('');

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLElement>('[data-flip-key]'),
    );

    const nextRects = new Map<string, DOMRect>();
    for (const node of nodes) {
      const key = node.dataset.flipKey;
      if (key) nextRects.set(key, node.getBoundingClientRect());
    }

    const arrangementChanged = previousSignature.current !== signature;
    const hasHistory = previousRects.current.size > 0;

    if (arrangementChanged && hasHistory && !prefersReducedMotion()) {
      for (const node of nodes) {
        const key = node.dataset.flipKey;
        if (!key) continue;

        const first = previousRects.current.get(key);
        const last = nextRects.get(key);

        if (!first || !last) {
          // Newly present in the list — fade it in rather than sliding from nowhere.
          node.animate(
            [
              { opacity: 0, transform: 'scale(0.97)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: DURATION, easing: EASING },
          );
          continue;
        }

        const dx = first.left - last.left;
        const dy = first.top - last.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;

        node.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          { duration: DURATION, easing: EASING },
        );
      }
    }

    previousRects.current = nextRects;
    previousSignature.current = signature;
  }, [ref, signature]);
}
