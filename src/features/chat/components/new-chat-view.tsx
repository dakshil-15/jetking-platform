'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { JetkingMark } from '@/components/brand/jetking-mark';
import { ChatHeader } from '@/features/chat/components/chat-header';
import { Composer } from '@/features/chat/components/composer/composer';
import { SuggestionPicker } from '@/features/chat/components/suggestion-picker';
import { useChatActions } from '@/features/chat/store/selectors';
import type { Attachment } from '@/features/chat/types';
import { SyncStatus } from '@/features/knowledge/components/sync-status';
import { ROUTES } from '@/lib/config/routes';
import { SITE } from '@/lib/config/site';

/** Landing state: what the assistant is, a composer, and starter questions. */
export function NewChatView() {
  const router = useRouter();
  const { createConversation, ask, setActiveConversation } = useChatActions();
  const [draft, setDraft] = useState('');

  useEffect(() => {
    setActiveConversation(null);
  }, [setActiveConversation]);

  const start = useCallback(
    (content: string, attachments: Attachment[] = []) => {
      const conversationId = createConversation();
      setDraft('');

      // Navigate first so the conversation view is mounted and can render the
      // answer as it lands, rather than arriving at a finished page.
      router.push(ROUTES.conversation(conversationId));
      void ask({ conversationId, content, attachments });
    },
    [createConversation, router, ask],
  );

  return (
    <div className="flex h-full flex-col">
      <ChatHeader title="New chat" />

      <div className="scrollbar-subtle flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-thread flex-col justify-center gap-8 px-4 py-10 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <JetkingMark className="size-12 text-brand" />
            <div>
              <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-ink md:text-[2.125rem]">
                Ask anything about Jetking
              </h2>
              <p className="mt-2 text-[0.9375rem] text-ink-muted">
                Courses, placements, fees, eligibility and centres — answered from{' '}
                {SITE.sourceLabel}.
              </p>
            </div>
          </div>

          <Composer
            value={draft}
            onValueChange={setDraft}
            onSubmit={start}
            isBusy={false}
            onCancel={() => undefined}
            autoFocus
          />

          <SuggestionPicker onSelect={(question) => start(question)} />

          <SyncStatus />
        </div>
      </div>
    </div>
  );
}
