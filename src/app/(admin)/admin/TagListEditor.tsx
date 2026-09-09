'use client';

import { useState } from 'react';

export function TagListEditor({
  value,
  onChange,
  placeholder = 'Add…',
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState('');

  function add() {
    const v = draft.trim();
    if (!v) return;
    onChange([...value, v]);
    setDraft('');
  }

  return (
    <div className="rounded-[var(--admin-radius)] border border-border p-2">
      {value.length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {value.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs text-foreground"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                aria-label={`Remove ${tag}`}
                className="cursor-pointer text-foreground-muted hover:text-[var(--color-error-600)]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      ) : null}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          className="admin-input h-8 flex-1 py-0 text-xs"
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 cursor-pointer rounded-[var(--admin-radius)] border border-border px-3 text-xs font-semibold text-foreground-secondary transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Add
        </button>
      </div>
    </div>
  );
}
