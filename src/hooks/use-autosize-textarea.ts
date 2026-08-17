'use client';

import { useCallback, useLayoutEffect, type RefObject } from 'react';

interface UseAutosizeTextareaOptions {
  ref: RefObject<HTMLTextAreaElement | null>;
  /** Value to react to — re-measures whenever it changes. */
  value: string;
  maxHeight: number;
}

/**
 * Grows a textarea with its content up to `maxHeight`, then hands scrolling
 * back to the element. Runs in a layout effect so the user never sees the
 * intermediate single-row height.
 */
export function useAutosizeTextarea({
  ref,
  value,
  maxHeight,
}: UseAutosizeTextareaOptions): () => void {
  const resize = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Reset first: scrollHeight only shrinks if the element is allowed to.
    el.style.height = 'auto';
    const next = Math.min(el.scrollHeight, maxHeight);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [ref, maxHeight]);

  useLayoutEffect(resize, [resize, value]);

  return resize;
}
