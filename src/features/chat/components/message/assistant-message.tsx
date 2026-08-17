'use client';

import { AlertCircle } from 'lucide-react';

import { JetkingMark } from '@/components/brand/jetking-mark';
import { MessageActions } from '@/features/chat/components/message/message-actions';
import { ThinkingIndicator } from '@/features/chat/components/message/thinking-indicator';
import type { Message } from '@/features/chat/types';
import { AnswerPageView } from '@/features/knowledge/components/answer-page-view';

interface AssistantMessageProps {
  message: Message;
  onRetry: (messageId: string) => void;
  onFollowUp: (question: string) => void;
  busy: boolean;
}

export function AssistantMessage({ message, onRetry, onFollowUp, busy }: AssistantMessageProps) {
  const isPending = message.status === 'pending';
  const hasFailed = message.status === 'error';

  return (
    <div className="group/message flex gap-3.5">
      <span aria-hidden className="mt-0.5 size-7 shrink-0 text-brand">
        <JetkingMark />
      </span>

      <div className="min-w-0 flex-1">
        {isPending ? <ThinkingIndicator /> : null}

        {hasFailed ? (
          <div className="flex items-start gap-2.5 rounded-xl border border-danger-500/25 bg-danger-500/5 px-3.5 py-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger-500" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">
                {message.errorMessage ?? 'Something went wrong.'}
              </p>
              <button
                type="button"
                onClick={() => onRetry(message.id)}
                disabled={busy}
                className="mt-1 text-sm text-brand underline underline-offset-2 disabled:opacity-50"
              >
                Try again
              </button>
            </div>
          </div>
        ) : null}

        {message.answer ? (
          <AnswerPageView
            answer={message.answer}
            onFollowUp={onFollowUp}
            followUpsDisabled={busy}
          />
        ) : null}

        {message.status === 'stopped' ? (
          <p className="text-sm text-ink-subtle">Search stopped.</p>
        ) : null}

        {message.status === 'complete' ? (
          <div className="mt-3 -ml-1.5">
            <MessageActions message={message} onRetry={() => onRetry(message.id)} disabled={busy} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
