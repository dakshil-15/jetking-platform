'use client';

import { ArrowDown } from 'lucide-react';
import type { RefObject } from 'react';

import { Button } from '@/components/ui/index';
import { AssistantMessage } from '@/features/chat/components/message/assistant-message';
import { UserMessage } from '@/features/chat/components/message/user-message';
import type { Message } from '@/features/chat/types';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: readonly Message[];
  containerRef: RefObject<HTMLDivElement | null>;
  busy: boolean;
  showScrollButton: boolean;
  onScrollToBottom: () => void;
  onEditMessage: (messageId: string, content: string) => void;
  onRetry: (messageId: string) => void;
  onFollowUp: (question: string) => void;
}

export function MessageList({
  messages,
  containerRef,
  busy,
  showScrollButton,
  onScrollToBottom,
  onEditMessage,
  onRetry,
  onFollowUp,
}: MessageListProps) {
  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={containerRef}
        className="scrollbar-subtle h-full overflow-y-auto overscroll-contain"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <div className="mx-auto flex w-full max-w-thread flex-col gap-8 px-4 pt-6 pb-10 md:px-6">
          {messages.map((message) =>
            message.role === 'user' ? (
              <UserMessage
                key={message.id}
                message={message}
                onEdit={onEditMessage}
                editingDisabled={busy}
              />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                onRetry={onRetry}
                onFollowUp={onFollowUp}
                busy={busy}
              />
            ),
          )}
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-3 flex justify-center',
          'transition-opacity duration-200',
          showScrollButton ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Scroll to latest message"
          tabIndex={showScrollButton ? 0 : -1}
          onClick={onScrollToBottom}
          className={cn(
            'rounded-full bg-surface shadow-panel',
            showScrollButton && 'pointer-events-auto',
          )}
        >
          <ArrowDown />
        </Button>
      </div>
    </div>
  );
}

