'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCopyToClipboardOptions {
  /** How long `copied` stays true before resetting. */
  resetAfterMs?: number;
}

interface UseCopyToClipboardResult {
  copied: boolean;
  copy: (value: string) => Promise<boolean>;
}

/**
 * Clipboard write with a self-resetting "copied" flag.
 *
 * Falls back to a hidden textarea + `execCommand` for non-secure origins,
 * where `navigator.clipboard` is undefined.
 */
export function useCopyToClipboard({
  resetAfterMs = 2000,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardResult {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (value: string) => {
      const ok = await writeToClipboard(value);
      if (!ok) return false;

      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
      return true;
    },
    [resetAfterMs],
  );

  return { copied, copy };
}

async function writeToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall through to the legacy path below.
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
