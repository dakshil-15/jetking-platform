'use client';

import { MessagesSquare, SearchX } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { ConfirmDialog } from '@/components/ui/index';
import {
  buildConversationGroups,
  useChatActions,
  useFilteredConversations,
} from '@/features/chat/store/selectors';
import type { Conversation } from '@/features/chat/types';
import { ConversationItem } from '@/features/sidebar/components/conversation-item';

interface ConversationListProps {
  activeConversationId: string | null;
  searchQuery: string;
}

export function ConversationList({ activeConversationId, searchQuery }: ConversationListProps) {
  const conversations = useFilteredConversations(searchQuery);
  const groups = useMemo(() => buildConversationGroups(conversations), [conversations]);
  const { renameConversation, toggleStar, deleteConversation } = useChatActions();

  const [pendingDelete, setPendingDelete] = useState<Conversation | null>(null);

  const handleRequestDelete = useCallback((conversation: Conversation) => {
    setPendingDelete(conversation);
  }, []);

  if (groups.length === 0) {
    return <EmptyHistory searching={searchQuery.trim().length > 0} />;
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        {groups.map((group) => (
          <section key={group.key} aria-label={group.label}>
            <h3 className="px-2.5 pb-1 text-[0.6875rem] font-semibold tracking-wider text-ink-subtle uppercase">
              {group.label}
            </h3>
            <ul className="flex flex-col gap-px">
              {group.conversations.map((conversation) => (
                <li key={conversation.id}>
                  <ConversationItem
                    conversation={conversation}
                    isActive={conversation.id === activeConversationId}
                    onRename={renameConversation}
                    onToggleStar={toggleStar}
                    onRequestDelete={handleRequestDelete}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
        title="Delete chat?"
        description={
          <>
            <span className="font-medium text-ink">{pendingDelete?.title}</span> and all of its
            messages will be permanently removed. This cannot be undone.
          </>
        }
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          if (pendingDelete) deleteConversation(pendingDelete.id);
        }}
      />
    </>
  );
}

function EmptyHistory({ searching }: { searching: boolean }) {
  const Icon = searching ? SearchX : MessagesSquare;

  return (
    <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
      <Icon className="size-5 text-ink-subtle" />
      <p className="text-sm text-ink-subtle">
        {searching ? 'No chats match your search.' : 'Your chats will appear here.'}
      </p>
    </div>
  );
}

