'use client';

import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { SUGGESTION_CATEGORIES } from '@/features/chat/config/suggestions';
import { cn } from '@/lib/utils';

interface SuggestionPickerProps {
  onSelect: (prompt: string) => void;
}

/**
 * Category chips that expand into concrete starter prompts. Selecting a prompt
 * fills the composer rather than sending, so the user can edit it first.
 */
export function SuggestionPicker({ onSelect }: SuggestionPickerProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const activeCategory = SUGGESTION_CATEGORIES.find((category) => category.id === activeCategoryId);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTION_CATEGORIES.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeCategoryId;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategoryId(isActive ? null : id)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3.5 py-2',
                'text-[0.8125rem] font-medium transition-colors duration-150',
                isActive
                  ? 'border-brand/40 bg-brand-soft text-brand'
                  : 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink',
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          );
        })}
      </div>

      {activeCategory ? (
        <ul className="w-full animate-rise-in overflow-hidden rounded-xl border border-line bg-surface">
          {activeCategory.prompts.map((prompt) => (
            <li key={prompt} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => onSelect(prompt)}
                className={cn(
                  'group/prompt flex w-full items-center gap-3 px-4 py-3 text-left',
                  'text-sm text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink',
                )}
              >
                <span className="min-w-0 flex-1">{prompt}</span>
                <ArrowUpRight className="size-4 shrink-0 text-ink-subtle opacity-0 transition-opacity group-hover/prompt:opacity-100" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
