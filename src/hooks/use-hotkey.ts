'use client';

import { useEffect, useInsertionEffect, useRef } from 'react';

interface HotkeyOptions {
  /** Cmd on macOS, Ctrl elsewhere. */
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  enabled?: boolean;
  /** Fire even while a text field has focus. */
  allowInInput?: boolean;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

/**
 * Window-level keyboard shortcut.
 *
 * The handler is kept in a ref so callers may pass an inline closure without
 * re-binding the listener on every render.
 */
export function useHotkey(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: HotkeyOptions = {},
): void {
  const {
    meta = false,
    shift = false,
    alt = false,
    enabled = true,
    allowInInput = false,
  } = options;

  const handlerRef = useRef(handler);

  // Mutating a ref during render is unsafe under concurrent rendering; an
  // insertion effect commits the latest handler before any listener can run.
  useInsertionEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return;
      if (meta !== (event.metaKey || event.ctrlKey)) return;
      if (shift !== event.shiftKey) return;
      if (alt !== event.altKey) return;
      if (!allowInInput && isEditableTarget(event.target)) return;

      event.preventDefault();
      handlerRef.current(event);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, meta, shift, alt, enabled, allowInInput]);
}
