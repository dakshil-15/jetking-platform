'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';

/**
 * Replaces the browser's native `window.confirm()` for destructive actions
 * (record/lead delete) — same tokens as the rest of the admin, not the
 * generic `components/ui/dialog.tsx` (that one targets a different,
 * unused-here token set: `border-line`, `text-ink`, etc.).
 */
export function AdminConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Delete',
  pendingLabel,
  cancelLabel = 'Cancel',
  /** 'destructive' (default) is the red delete/disable/discard treatment used
   *  everywhere so far; 'default' is the brand-accent treatment for a
   *  confirm step that isn't inherently destructive (e.g. a role change,
   *  which could just as easily be a promotion). */
  tone = 'destructive',
  pending = false,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  pendingLabel?: string;
  cancelLabel?: string;
  tone?: 'destructive' | 'default';
  pending?: boolean;
  onConfirm: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-xl focus:outline-none">
          <Dialog.Title className="text-lg font-semibold text-foreground">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-foreground-secondary">
            {description}
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                type="button"
                className="h-10 cursor-pointer rounded-[var(--admin-radius)] border border-border px-4 text-sm font-semibold text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground"
              >
                {cancelLabel}
              </button>
            </Dialog.Close>
            <button
              type="button"
              disabled={pending}
              onClick={onConfirm}
              className={`h-10 cursor-pointer rounded-[var(--admin-radius)] px-4 text-sm font-semibold text-white transition-colors disabled:opacity-45 ${
                tone === 'default'
                  ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)]'
                  : 'bg-[var(--color-error-600)] hover:bg-[var(--color-error-600)]/90'
              }`}
            >
              {pending ? (pendingLabel ?? (tone === 'default' ? 'Saving…' : 'Deleting…')) : confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
