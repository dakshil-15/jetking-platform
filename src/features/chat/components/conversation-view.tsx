'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/index';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { Composer } from '@/features/chat/components/composer/composer';
import { MessageList } from '@/features/chat/components/message/message-list';
import { useAutoScroll } from '@/features/chat/hooks/use-auto-scroll';
import {
  useChatActions,
  useConversation,
  useIsAnswering,
  useMessages,
} from '@/features/chat/store/selectors';
import type { Attachment } from '@/features/chat/types';
import { useMounted } from '@/hooks';
import { ROUTES } from '@/lib/config/routes';

interface ConversationViewProps {
  conversationId: string;
}

export function ConversationView({ conversationId }: ConversationViewProps) {
  const mounted = useMounted();
  const conversation = useConversation(conversationId);
  const messages = useMessages(conversationId);
  const busy = useIsAnswering();
  const { ask, cancel, retry, editUserMessage, setActiveConversation } = useChatActions();

  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const scrollKey = `${messages.length}:${lastMessage?.status ?? ''}`;

  const { showScrollButton, scrollToBottom } = useAutoScroll({
    containerRef: scrollRef,
    dependency: scrollKey,
  });

  useEffect(() => {
    setActiveConversation(conversationId);
  }, [conversationId, setActiveConversation]);

  const handleSubmit = useCallback(
    (content: string, attachments: Attachment[]) => {
      setDraft('');
      void ask({ conversationId, content, attachments });
    },
    [conversationId, ask],
  );

  const handleFollowUp = useCallback(
    (question: string) => {
      void ask({ conversationId, content: question });
    },
    [conversationId, ask],
  );

  const handleEdit = useCallback(
    (messageId: string, content: string) => {
      void editUserMessage(messageId, content);
    },
    [editUserMessage],
  );

  const handleRetry = useCallback(
    (messageId: string) => {
      void retry(messageId);
    },
    [retry],
  );

  // Before hydration the persisted store is empty, so "missing" is only
  // meaningful once we are mounted.
  if (mounted && !conversation) return <ConversationNotFound />;

  return (
    <div className="flex h-full flex-col">
      <ChatHeader conversation={conversation} />

      <MessageList
        messages={messages}
        containerRef={scrollRef}
        busy={busy}
        showScrollButton={showScrollButton}
        onScrollToBottom={scrollToBottom}
        onEditMessage={handleEdit}
        onRetry={handleRetry}
        onFollowUp={handleFollowUp}
      />

      <div className="shrink-0 px-4 pb-3 md:px-6">
        <div className="mx-auto w-full max-w-thread">
          <Composer
            value={draft}
            onValueChange={setDraft}
            onSubmit={handleSubmit}
            isBusy={busy}
            onCancel={cancel}
            placeholder="Ask a follow-upâ€¦"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

function ConversationNotFound() {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader title="Chat not found" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <div>
          <h2 className="font-display text-2xl tracking-tight text-ink">This chat is not here</h2>
          <p className="mt-1.5 text-sm text-ink-muted">
            It may have been deleted, or it belongs to a different browser.
          </p>
        </div>
        <Button asChild variant="primary">
          <Link href={ROUTES.home()}>Start a new chat</Link>
        </Button>
      </div>
    </div>
  );
}

