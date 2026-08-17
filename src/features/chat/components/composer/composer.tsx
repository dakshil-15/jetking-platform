'use client';

import { ArrowUp, Paperclip, Square } from 'lucide-react';
import { useCallback, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';

import { Button, Tooltip } from '@/components/ui/index';
import { ComposerAttachments } from '@/features/chat/components/composer/composer-attachments';
import { toAttachments } from '@/features/chat/lib/attachments';
import type { Attachment } from '@/features/chat/types';
import { useAutosizeTextarea } from '@/hooks';
import { SITE } from '@/lib/config/site';
import { cn } from '@/lib/utils';

const TEXTAREA_MAX_HEIGHT = 264;

interface ComposerProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (content: string, attachments: Attachment[]) => void;
  isBusy: boolean;
  onCancel: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function Composer({
  value,
  onValueChange,
  onSubmit,
  isBusy,
  onCancel,
  placeholder = 'Ask about Jetking courses, placements, feesâ€¦',
  autoFocus = false,
  className,
}: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  useAutosizeTextarea({ ref: textareaRef, value, maxHeight: TEXTAREA_MAX_HEIGHT });

  const canSubmit = value.trim().length > 0 && !isBusy;

  const submit = useCallback(() => {
    if (!canSubmit) return;
    onSubmit(value, attachments);
    setAttachments([]);
  }, [canSubmit, onSubmit, value, attachments]);

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends; Shift+Enter inserts a newline. IME composition must never
    // be interrupted, or committing a candidate would send the message.
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  const onFilesPicked = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files?.length) setAttachments((current) => [...current, ...toAttachments(files)]);
    // Reset so picking the same file twice still fires a change event.
    event.target.value = '';
  };

  const removeAttachment = useCallback((attachmentId: string) => {
    setAttachments((current) => current.filter((attachment) => attachment.id !== attachmentId));
  }, []);

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'rounded-3xl border border-line bg-surface shadow-composer',
          'transition-[border-color,box-shadow] duration-200',
          'focus-within:border-brand/40',
        )}
      >
        <ComposerAttachments attachments={attachments} onRemove={removeAttachment} />

        <label className="sr-only" htmlFor="composer-input">
          Ask a question about Jetking
        </label>
        <textarea
          id="composer-input"
          ref={textareaRef}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={1}
          autoFocus={autoFocus}
          spellCheck
          className={cn(
            'block scrollbar-subtle w-full resize-none bg-transparent',
            'px-4 pt-3.5 pb-1 text-[0.9375rem] leading-[1.6] text-ink',
            'outline-none placeholder:text-ink-subtle',
          )}
        />

        <div className="flex items-center justify-between gap-2 px-2.5 pt-1 pb-2.5">
          <div className="flex items-center gap-0.5">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={onFilesPicked}
              aria-hidden
              tabIndex={-1}
            />
            <Tooltip label="Attach files">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Attach files"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip />
              </Button>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-ink-subtle sm:inline">
              Answers from {SITE.sourceLabel}
            </span>

            {isBusy ? (
              <Tooltip label="Stop">
                <Button
                  variant="primary"
                  size="icon-sm"
                  aria-label="Stop"
                  onClick={onCancel}
                  className="size-8 rounded-lg"
                >
                  <Square className="size-3 fill-current" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip label="Ask" shortcut="â†µ">
                <Button
                  variant="primary"
                  size="icon-sm"
                  aria-label="Ask"
                  onClick={submit}
                  disabled={!canSubmit}
                  className="size-8 rounded-lg"
                >
                  <ArrowUp />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <p className="mt-2 text-center text-[0.6875rem] text-ink-subtle">
        Answers are drawn from published {SITE.sourceLabel} pages. Confirm details with Jetking
        before enrolling.
      </p>
    </div>
  );
}

