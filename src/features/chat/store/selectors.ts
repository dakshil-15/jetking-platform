'use client';

import { useShallow } from 'zustand/react/shallow';

import { groupConversationsByRecency, matchesQuery } from '@/features/chat/lib/conversation';
import { useChatStore, type ChatActions, type ChatStore } from '@/features/chat/store/chat-store';
import type { Conversation, ConversationGroup, Message } from '@/features/chat/types';

/**
 * Read-side API for the chat store.
 *
 * Components subscribe through these hooks rather than the raw store so the
 * normalised shape stays an implementation detail, and so every selector that
 * derives a new array or object is wrapped in `useShallow` — without it, the
 * fresh reference on each run would re-render on every unrelated state change.
 */

function selectActions(state: ChatStore): ChatActions {
  return {
    createConversation: state.createConversation,
    deleteConversation: state.deleteConversation,
    renameConversation: state.renameConversation,
    toggleStar: state.toggleStar,
    deleteAllConversations: state.deleteAllConversations,
    setActiveConversation: state.setActiveConversation,
    setDraft: state.setDraft,
    ask: state.ask,
    retry: state.retry,
    editUserMessage: state.editUserMessage,
    cancel: state.cancel,
  };
}

/** Action handles are stable, so this never causes a re-render on its own. */
export function useChatActions(): ChatActions {
  return useChatStore(useShallow(selectActions));
}

export function useConversation(conversationId: string | null): Conversation | null {
  return useChatStore((state) =>
    conversationId ? (state.conversations[conversationId] ?? null) : null,
  );
}

export function useMessages(conversationId: string | null): Message[] {
  return useChatStore(
    useShallow((state) => {
      if (!conversationId) return [];
      const conversation = state.conversations[conversationId];
      if (!conversation) return [];

      return conversation.messageIds.flatMap((id) => {
        const message = state.messages[id];
        return message ? [message] : [];
      });
    }),
  );
}

export function useIsAnswering(): boolean {
  return useChatStore((state) => state.pendingMessageId !== null);
}

export function useConversationCount(): number {
  return useChatStore((state) => state.conversationIds.length);
}

/**
 * Conversations matching the search query, most recently updated first.
 *
 * Returns store objects untouched. That matters: `useShallow` compares the
 * array element-by-element with `Object.is`, so a selector that built fresh
 * objects here would never compare equal, and zustand v5 would re-render in a
 * loop. Derived shapes belong in `useMemo` at the call site instead.
 */
export function useFilteredConversations(query: string): Conversation[] {
  return useChatStore(
    useShallow((state) =>
      state.conversationIds.flatMap((id) => {
        const conversation = state.conversations[id];
        if (!conversation) return [];

        const contents = conversation.messageIds.flatMap((messageId) => {
          const content = state.messages[messageId]?.content;
          return content ? [content] : [];
        });

        return matchesQuery(conversation, contents, query) ? [conversation] : [];
      }),
    ),
  );
}

/**
 * Sidebar history: starred conversations pinned to the top, the rest bucketed
 * by recency. Pure — safe to call inside `useMemo`.
 */
export function buildConversationGroups(
  conversations: readonly Conversation[],
): ConversationGroup[] {
  const starred = conversations.filter((conversation) => conversation.starred);
  const rest = conversations.filter((conversation) => !conversation.starred);

  return [
    ...(starred.length ? [{ key: 'starred', label: 'Starred', conversations: starred }] : []),
    ...groupConversationsByRecency(rest),
  ];
}
