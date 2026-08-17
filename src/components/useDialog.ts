'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Modal behaviour for a surface that is already in the DOM.
 *
 * The site had three overlay surfaces — the nav drawer, the AI Guide panel and the
 * franchise drawer — and none of them did any of this. That is four separate WCAG
 * failures per surface, so the behaviour lives here once rather than being
 * re-implemented (or re-forgotten) at each call site:
 *
 *   • 2.4.3 Focus Order — focus moves into the surface when it opens.
 *   • 2.1.2 No Keyboard Trap / APG dialog — Tab and Shift+Tab cycle inside it.
 *     Everything behind the overlay is unreachable, so a keyboard user cannot
 *     silently walk off into a page they cannot see.
 *   • 2.1.1 Keyboard — Escape dismisses.
 *   • 3.2.1 On Focus — focus returns to whatever opened the surface on close, so
 *     the tab sequence resumes where the user left it rather than at <body>.
 *
 * Body scroll is locked while open, which is presentation rather than conformance
 * but stops the page behind the overlay drifting under a trackpad.
 *
 * The caller still owns the ARIA: `role="dialog"`, `aria-modal="true"` and an
 * accessible name. This hook only owns behaviour.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    // `offsetParent` is null for anything `display:none`, and `inert` subtrees are
    // not reachable even though they still match the selector.
    (el) => el.offsetParent !== null && !el.closest('[inert]'),
  );
}

export interface DialogOptions {
  /**
   * `true` (default) is a modal: Tab is trapped inside and body scroll is locked.
   *
   * `false` is a non-modal surface — the AI Guide's corner panel. Focus still moves
   * in on open, Escape still closes, and focus still returns to the opener, but the
   * page behind stays reachable and scrollable. Trapping a persistent chat panel
   * would be a regression, not a fix: the whole point of it is that you can keep
   * reading the page it is answering questions about.
   */
  modal?: boolean;
}

export function useDialog(
  open: boolean,
  onClose: () => void,
  ref: RefObject<HTMLElement | null>,
  { modal = true }: DialogOptions = {},
): void {
  // Held in a ref so a re-render mid-dialog cannot swap the close handler out from
  // under the keydown listener registered below.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const surface = ref.current;
    if (!surface) return;

    const opener = document.activeElement as HTMLElement | null;

    // Focus the first control, falling back to the surface itself so the dialog is
    // never opened with focus still parked behind it.
    const first = focusableWithin(surface)[0];
    if (first) {
      first.focus();
    } else {
      surface.setAttribute('tabindex', '-1');
      surface.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !modal) return;
      const surfaceEl = ref.current;
      if (!surfaceEl) return;

      const items = focusableWithin(surfaceEl);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const firstItem = items[0]!;
      const lastItem = items[items.length - 1]!;
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it has escaped the surface
      // (browser chrome, an address-bar round trip, a stray programmatic focus).
      if (!surfaceEl.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? lastItem : firstItem).focus();
      } else if (event.shiftKey && active === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    if (modal) document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (modal) document.body.style.overflow = previousOverflow;
      // `surface` is captured from the effect body rather than re-read off the ref:
      // by cleanup time the ref may already point at a different node (or null).
      // Only reclaim focus if it is still inside the surface being torn down —
      // otherwise the user has already moved on and yanking them back is worse.
      if (opener?.isConnected && surface.contains(document.activeElement)) {
        opener.focus();
      }
    };
  }, [open, ref, modal]);
}
