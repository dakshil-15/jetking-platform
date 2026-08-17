import type { AnswerPage } from '@/features/knowledge/types/answer';

export type MessageRole = 'user' | 'assistant';

/**
 * Lifecycle of a single message.
 *
 * `pending`   — created, the knowledge base is being searched
 * `complete`  — an answer was composed
 * `stopped`   — cancelled by the user before the answer landed
 * `error`     — the search or index load failed
 */
export type MessageStatus = 'pending' | 'complete' | 'stopped' | 'error';

export type AttachmentKind = 'image' | 'document' | 'code' | 'other';

export interface Attachment {
  id: string;
  name: string;
  /** Size in bytes. */
  size: number;
  kind: AttachmentKind;
}

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  /** User text, or a plain-text fallback for assistant messages. */
  content: string;
  status: MessageStatus;
  createdAt: number;
  /** The composed answer. Present on completed assistant messages only. */
  answer?: AnswerPage;
  attachments?: Attachment[];
  errorMessage?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  /** Ordered message ids; the message bodies live in a normalised map. */
  messageIds: string[];
  starred: boolean;
}

/** Grouped conversations, ready to render as sidebar sections. */
export interface ConversationGroup {
  key: string;
  label: string;
  conversations: Conversation[];
}
