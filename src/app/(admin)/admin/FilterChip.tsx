'use client';

import type { ReactNode } from 'react';

/**
 * The pill-shaped toggle used for every filter row in the panel (Leads'
 * status/source filters, Team's role filter) — extracted because the active
 * vs. inactive class string was copy-pasted six times across two files
 * before this existed. `aria-pressed` is what makes these behave like real
 * toggle buttons for a screen reader, not just visually-distinct `<button>`s.
 */
export function FilterChip({
  active,
  onClick,
  capitalize = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  /** Only for chips whose label is a raw, lowercase data value (e.g. a lead
   *  `source`) — never for an already human-cased label, where CSS
   *  `capitalize` would incorrectly title-case every word (e.g. "Centre
   *  staff" → "Centre Staff"). */
  capitalize?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${capitalize ? 'capitalize' : ''} ${
        active
          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
          : 'border-border text-foreground-secondary hover:border-border-medium'
      }`}
    >
      {children}
    </button>
  );
}
