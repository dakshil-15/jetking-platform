'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  UNTITLED_CONVERSATION,
  createConversation,
  createMessage,
  deriveTitle,
} from '@/features/chat/lib/conversation';
import type { Attachment, Conversation, Message } from '@/features/chat/types';
import {
  AnswerAbortedError,
  KnowledgeEmptyError,
  answerQuery,
} from '@/features/knowledge/lib/engine';
import { STORAGE_KEYS } from '@/lib/constants/storage';
import { createBatchedStorage } from '@/lib/storage/debounced-storage';

/**
 * The in-flight request's controller.
 *
 * Deliberately module-scoped rather than store state: an `AbortController` is
 * neither serialisable nor comparable, so it must never reach persistence or
 * a React render.
 */
let activeController: AbortController | null = null;

interface ChatState {
  conversations: Record<string, Conversation>;
  /** Conversation ids, most recently updated first. */
  conversationIds: string[];
  messages: Record<string, Message>;

  activeConversationId: string | null;
  /** Id of the assistant message currently being answered, if any. */
  pendingMessageId: string | null;

  /** Unsent composer text, keyed by conversation id. */
  drafts: Record<string, string>;
}

interface AskInput {
  conversationId: string;
  content: string;
  attachments?: Attachment[];
}

export interface ChatActions {
  createConversation: () => string;
  deleteConversation: (conversationId: string) => void;
  renameConversation: (conversationId: string, title: string) => void;
  toggleStar: (conversationId: string) => void;
  deleteAllConversations: () => void;

  setActiveConversation: (conversationId: string | null) => void;
  setDraft: (key: string, value: string) => void;

  ask: (input: AskInput) => Promise<void>;
  retry: (assistantMessageId: string) => Promise<void>;
  editUserMessage: (userMessageId: string, content: string) => Promise<void>;
  cancel: () => void;
}

export type ChatStore = ChatState & ChatActions;

const INITIAL_STATE: ChatState = {
  conversations: {},
  conversationIds: [],
  messages: {},
  activeConversationId: null,
  pendingMessageId: null,
  drafts: {},
};

/** Move a conversation to the front of the ordering. */
function promote(conversationIds: readonly string[], conversationId: string): string[] {
  return [conversationId, ...conversationIds.filter((id) => id !== conversationId)];
}

/**
 * Unbounded conversation history has two failure modes: `debounced-storage`
 * silently drops the write once localStorage's quota is hit (no user-facing
 * signal — new conversations would just stop persisting), and every write
 * before that point re-serializes the whole growing history. Evicts the
 * oldest *unstarred* conversations past the cap; a user's starred history is
 * never auto-deleted.
 */
const MAX_CONVERSATIONS = 200;

function evictOldest(state: ChatState): Partial<ChatState> {
  if (state.conversationIds.length <= MAX_CONVERSATIONS) return {};

  const evictable = state.conversationIds.filter(
    (id) => !state.conversations[id]?.starred,
  );
  const overflow = state.conversationIds.length - MAX_CONVERSATIONS;
  if (overflow <= 0 || evictable.length === 0) return {};

  const toEvict = new Set(evictable.slice(-Math.min(overflow, evictable.length)));
  if (toEvict.size === 0) return {};

  const conversations = { ...state.conversations };
  const messages = { ...state.messages };
  const drafts = { ...state.drafts };

  for (const id of toEvict) {
    const conversation = conversations[id];
    if (conversation) for (const messageId of conversation.messageIds) delete messages[messageId];
    delete conversations[id];
    delete drafts[id];
  }

  return {
    conversations,
    messages,
    drafts,
    conversationIds: state.conversationIds.filter((id) => !toEvict.has(id)),
  };
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      createConversation: () => {
        const conversation = createConversation();

        set((state) => {
          const withNew: ChatState = {
            ...state,
            conversations: { ...state.conversations, [conversation.id]: conversation },
            conversationIds: [conversation.id, ...state.conversationIds],
          };
          return {
            ...withNew,
            ...evictOldest(withNew),
            activeConversationId: conversation.id,
          };
        });

        return conversation.id;
      },

      deleteConversation: (conversationId) => {
        const snapshot = get();
        if (!snapshot.conversations[conversationId]) return;

        // Abort before mutating: an in-flight answer writing into a deleted
        // conversation would resurrect it in the messages map.
        const pending = snapshot.pendingMessageId
          ? snapshot.messages[snapshot.pendingMessageId]
          : undefined;
        if (pending?.conversationId === conversationId) activeController?.abort();

        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          const conversations = { ...state.conversations };
          delete conversations[conversationId];

          const messages = { ...state.messages };
          for (const messageId of conversation.messageIds) delete messages[messageId];

          const drafts = { ...state.drafts };
          delete drafts[conversationId];

          return {
            conversations,
            messages,
            drafts,
            conversationIds: state.conversationIds.filter((id) => id !== conversationId),
            activeConversationId:
              state.activeConversationId === conversationId ? null : state.activeConversationId,
          };
        });
      },

      renameConversation: (conversationId, title) => {
        const trimmed = title.trim();

        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: { ...conversation, title: trimmed || UNTITLED_CONVERSATION },
            },
          };
        });
      },

      toggleStar: (conversationId) => {
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: { ...conversation, starred: !conversation.starred },
            },
          };
        });
      },

      deleteAllConversations: () => {
        activeController?.abort();
        set({
          conversations: {},
          conversationIds: [],
          messages: {},
          drafts: {},
          activeConversationId: null,
          pendingMessageId: null,
        });
      },

      setActiveConversation: (conversationId) => set({ activeConversationId: conversationId }),

      setDraft: (key, value) => set((state) => ({ drafts: { ...state.drafts, [key]: value } })),

      ask: async ({ conversationId, content, attachments }) => {
        const question = content.trim();
        if (!question || get().pendingMessageId) return;
        if (!get().conversations[conversationId]) return;

        const now = Date.now();
        const userMessage = createMessage({
          conversationId,
          role: 'user',
          content: question,
          ...(attachments?.length ? { attachments } : {}),
          now,
        });
        const assistantMessage = createMessage({
          conversationId,
          role: 'assistant',
          now: now + 1,
        });

        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          const isFirstMessage = conversation.messageIds.length === 0;
          const drafts = { ...state.drafts };
          delete drafts[conversationId];

          return {
            messages: {
              ...state.messages,
              [userMessage.id]: userMessage,
              [assistantMessage.id]: assistantMessage,
            },
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                title:
                  isFirstMessage && conversation.title === UNTITLED_CONVERSATION
                    ? deriveTitle(question)
                    : conversation.title,
                messageIds: [...conversation.messageIds, userMessage.id, assistantMessage.id],
                updatedAt: now,
              },
            },
            conversationIds: promote(state.conversationIds, conversationId),
            drafts,
            pendingMessageId: assistantMessage.id,
          };
        });

        await resolveAnswer({ set, get, query: question, assistantMessageId: assistantMessage.id });
      },

      retry: async (assistantMessageId) => {
        const state = get();
        if (state.pendingMessageId) return;

        const assistantMessage = state.messages[assistantMessageId];
        if (!assistantMessage || assistantMessage.role !== 'assistant') return;

        const conversation = state.conversations[assistantMessage.conversationId];
        if (!conversation) return;

        // The question is the user message immediately preceding this one.
        const index = conversation.messageIds.indexOf(assistantMessageId);
        const previousId = index > 0 ? conversation.messageIds[index - 1] : undefined;
        const query = previousId ? state.messages[previousId]?.content : undefined;
        if (!query) return;

        set((current) => {
          const message = current.messages[assistantMessageId];
          if (!message) return current;

          const reset: Message = {
            ...message,
            content: '',
            status: 'pending',
            createdAt: Date.now(),
          };
          delete reset.answer;
          delete reset.errorMessage;

          return {
            messages: { ...current.messages, [assistantMessageId]: reset },
            pendingMessageId: assistantMessageId,
          };
        });

        await resolveAnswer({ set, get, query, assistantMessageId });
      },

      editUserMessage: async (userMessageId, content) => {
        const trimmed = content.trim();
        const state = get();
        if (!trimmed || state.pendingMessageId) return;

        const userMessage = state.messages[userMessageId];
        if (!userMessage || userMessage.role !== 'user') return;

        const conversation = state.conversations[userMessage.conversationId];
        if (!conversation) return;

        const index = conversation.messageIds.indexOf(userMessageId);
        if (index === -1) return;

        const now = Date.now();
        // Everything after the edited question is no longer valid.
        const removedIds = conversation.messageIds.slice(index + 1);
        const assistantMessage = createMessage({
          conversationId: conversation.id,
          role: 'assistant',
          now: now + 1,
        });

        set((current) => {
          const messages = { ...current.messages };
          for (const id of removedIds) delete messages[id];

          messages[userMessageId] = { ...userMessage, content: trimmed };
          messages[assistantMessage.id] = assistantMessage;

          return {
            messages,
            conversations: {
              ...current.conversations,
              [conversation.id]: {
                ...conversation,
                messageIds: [...conversation.messageIds.slice(0, index + 1), assistantMessage.id],
                updatedAt: now,
              },
            },
            conversationIds: promote(current.conversationIds, conversation.id),
            pendingMessageId: assistantMessage.id,
          };
        });

        await resolveAnswer({ set, get, query: trimmed, assistantMessageId: assistantMessage.id });
      },

      cancel: () => {
        activeController?.abort();
      },
    }),
    {
      name: STORAGE_KEYS.chat,
      version: 2,
      storage: createBatchedStorage(),
      partialize: (state) => ({
        conversations: state.conversations,
        conversationIds: state.conversationIds,
        messages: state.messages,
        drafts: state.drafts,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // A request cannot survive a reload; anything mid-flight is now stale.
        state.pendingMessageId = null;
        for (const message of Object.values(state.messages)) {
          if (message.status === 'pending') {
            message.status = 'error';
            message.errorMessage = 'This answer was interrupted. Ask again to retry.';
          }
        }
      },
    },
  ),
);

/* -------------------------------------------------------------------------- */
/* Answer driver                                                              */
/* -------------------------------------------------------------------------- */

interface ResolveInput {
  set: (partial: (state: ChatStore) => Partial<ChatStore>) => void;
  get: () => ChatStore;
  query: string;
  assistantMessageId: string;
}

/**
 * Runs one question to a terminal status.
 *
 * Every exit path clears `pendingMessageId`, which is what re-enables the
 * composer — so a thrown error can never leave the UI permanently disabled.
 */
async function resolveAnswer({ set, get, query, assistantMessageId }: ResolveInput): Promise<void> {
  const controller = new AbortController();
  activeController = controller;

  const patch = (changes: Partial<Message>) => {
    set((state) => {
      const message = state.messages[assistantMessageId];
      if (!message) return {};
      return { messages: { ...state.messages, [assistantMessageId]: { ...message, ...changes } } };
    });
  };

  try {
    const answer = await answerQuery({ query, signal: controller.signal });
    if (controller.signal.aborted) throw new AnswerAbortedError();

    patch({ answer, content: answer.lede, status: 'complete' });
  } catch (error) {
    if (error instanceof AnswerAbortedError || controller.signal.aborted) {
      patch({ status: 'stopped' });
    } else if (error instanceof KnowledgeEmptyError) {
      patch({
        status: 'error',
        errorMessage:
          'No jetking.com content has been synced yet. Run `npm run sync:content` to build the knowledge base.',
      });
    } else {
      patch({
        status: 'error',
        errorMessage: 'The Jetking content index could not be loaded. Please try again.',
      });
    }
  } finally {
    if (activeController === controller) activeController = null;

    const conversationId = get().messages[assistantMessageId]?.conversationId;

    set((state) => ({
      pendingMessageId:
        state.pendingMessageId === assistantMessageId ? null : state.pendingMessageId,
      ...(conversationId && state.conversations[conversationId]
        ? {
            conversations: {
              ...state.conversations,
              [conversationId]: { ...state.conversations[conversationId], updatedAt: Date.now() },
            },
            conversationIds: promote(state.conversationIds, conversationId),
          }
        : {}),
    }));
  }
}
