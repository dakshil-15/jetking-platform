'use client';

import {
  useCallback,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

interface UseAutoScrollOptions<T extends HTMLElement> {
  containerRef: RefObject<T | null>;
  /** Re-evaluates whenever this changes — pass the streamed text length. */
  dependency: unknown;
  /** Distance from the bottom, in px, still treated as "at the bottom". */
  threshold?: number;
}

interface UseAutoScrollResult {
  /** True when the user has scrolled away from the bottom. */
  showScrollButton: boolean;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

/**
 * Keeps a scroll container pinned to the bottom while content streams in,
 * but yields the moment the user scrolls up — re-anchoring under someone who
 * is reading earlier output is the single most irritating chat-UI bug.
 */
export function useAutoScroll<T extends HTMLElement>({
  containerRef,
  dependency,
  threshold = 80,
}: UseAutoScrollOptions<T>): UseAutoScrollResult {
  const [pinned, setPinned] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  // Mirrored into a ref so the follow effect below can read the latest value
  // without listing `pinned` as a dependency — depending on it would re-run
  // (and re-anchor) every time the user scrolls back to the bottom.
  const pinnedRef = useRef(pinned);
  useInsertionEffect(() => {
    pinnedRef.current = pinned;
  });

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      const container = containerRef.current;
      if (!container) return;
      container.scrollTo({ top: container.scrollHeight, behavior });
      setPinned(true);
    },
    [containerRef],
  );

  // Track whether the user is at the bottom.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const distance = container.scrollHeight - container.scrollTop - container.clientHeight;
      const atBottom = distance <= threshold;
      setPinned(atBottom);
      setShowScrollButton(!atBottom && container.scrollHeight > container.clientHeight + 200);
    };

    onScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [containerRef, threshold]);

  // Follow new content only while pinned.
  useEffect(() => {
    if (!pinnedRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [containerRef, dependency]);

  return { showScrollButton, scrollToBottom };
}
