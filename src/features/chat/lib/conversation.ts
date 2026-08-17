import type {
  Attachment,
  Conversation,
  ConversationGroup,
  Message,
  MessageRole,
} from '@/features/chat/types';
import {
  RECENCY_BUCKET_LABEL,
  RECENCY_BUCKET_ORDER,
  createId,
  getRecencyBucket,
  type RecencyBucket,
} from '@/lib/utils';

export const UNTITLED_CONVERSATION = 'New chat';

const MAX_TITLE_LENGTH = 48;

/** Derive a conversation title from its first question. */
export function deriveTitle(firstMessage: string): string {
  const flat = firstMessage.replace(/\s+/g, ' ').trim();
  if (!flat) return UNTITLED_CONVERSATION;

  const firstSentence = flat.split(/(?<=[.?!])\s/)[0] ?? flat;
  const candidate = firstSentence.replace(/[.?!]+$/, '');

  if (candidate.length <= MAX_TITLE_LENGTH) return candidate;

  // Cut on a word boundary rather than mid-word.
  const truncated = candidate.slice(0, MAX_TITLE_LENGTH);
  const lastSpace = truncated.lastIndexOf(' ');
  return `${(lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated).trimEnd()}…`;
}

interface CreateConversationInput {
  id?: string;
  title?: string;
  now?: number;
}

export function createConversation({
  id = createId('conv'),
  title = UNTITLED_CONVERSATION,
  now = Date.now(),
}: CreateConversationInput = {}): Conversation {
  return {
    id,
    title,
    createdAt: now,
    updatedAt: now,
    messageIds: [],
    starred: false,
  };
}

interface CreateMessageInput {
  conversationId: string;
  role: MessageRole;
  content?: string;
  attachments?: Attachment[];
  now?: number;
}

export function createMessage({
  conversationId,
  role,
  content = '',
  attachments,
  now = Date.now(),
}: CreateMessageInput): Message {
  return {
    id: createId('msg'),
    conversationId,
    role,
    content,
    createdAt: now,
    status: role === 'user' ? 'complete' : 'pending',
    ...(attachments?.length ? { attachments } : {}),
  };
}

/**
 * Bucket conversations by recency for the sidebar, preserving the caller's
 * sort order within each group and dropping empty groups.
 */
export function groupConversationsByRecency(
  conversations: readonly Conversation[],
  now: number = Date.now(),
): ConversationGroup[] {
  const buckets = new Map<RecencyBucket, Conversation[]>();

  for (const conversation of conversations) {
    const bucket = getRecencyBucket(conversation.updatedAt, now);
    const existing = buckets.get(bucket);
    if (existing) existing.push(conversation);
    else buckets.set(bucket, [conversation]);
  }

  return RECENCY_BUCKET_ORDER.flatMap((bucket) => {
    const items = buckets.get(bucket);
    if (!items?.length) return [];
    return [{ key: bucket, label: RECENCY_BUCKET_LABEL[bucket], conversations: items }];
  });
}

/** Case-insensitive match against title and message content. */
export function matchesQuery(
  conversation: Conversation,
  messages: string[],
  query: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;

  if (conversation.title.toLowerCase().includes(needle)) return true;
  return messages.some((content) => content.toLowerCase().includes(needle));
}
