'use client';

import { MoreHorizontal, Pencil, Star, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { memo, useEffect, useRef, useState, type KeyboardEvent } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/index';
import type { Conversation } from '@/features/chat/types';
import { ROUTES } from '@/lib/config/routes';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onRename: (conversationId: string, title: string) => void;
  onToggleStar: (conversationId: string) => void;
  onRequestDelete: (conversation: Conversation) => void;
}

function ConversationItemImpl({
  conversation,
  isActive,
  onRename,
  onToggleStar,
  onRequestDelete,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  const beginEdit = () => {
    setDraftTitle(conversation.title);
    setIsEditing(true);
  };

  const commitEdit = () => {
    setIsEditing(false);
    if (draftTitle.trim() && draftTitle !== conversation.title) {
      onRename(conversation.id, draftTitle);
    }
  };

  const onEditKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commitEdit();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsEditing(false);
      setDraftTitle(conversation.title);
    }
  };

  if (isEditing) {
    return (
      <div className="rounded-lg bg-surface-hover px-1.5 py-0.5">
        <input
          ref={inputRef}
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={onEditKeyDown}
          aria-label="Conversation title"
          className="w-full bg-transparent py-1.5 text-sm text-ink outline-none"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group/item relative flex items-center rounded-lg',
        'transition-colors duration-150',
        isActive ? 'bg-surface-active' : 'hover:bg-surface-hover',
        // Keep the row highlighted while its menu is open.
        menuOpen && 'bg-surface-hover',
      )}
    >
      <Link
        href={ROUTES.conversation(conversation.id)}
        title={conversation.title}
        className={cn(
          'flex min-w-0 flex-1 items-center gap-1.5 py-2 pr-1 pl-2.5',
          'truncate text-sm leading-5',
          isActive ? 'text-ink' : 'text-ink-muted group-hover/item:text-ink',
        )}
      >
        {conversation.starred ? (
          <Star className="size-3 shrink-0 fill-brand text-brand" aria-label="Starred" />
        ) : null}
        <span className="truncate">{conversation.title}</span>
      </Link>

      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Options for ${conversation.title}`}
            className={cn(
              'mr-1 shrink-0 opacity-0 transition-opacity',
              'group-hover/item:opacity-100 focus-visible:opacity-100',
              menuOpen && 'opacity-100',
            )}
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-44">
          <DropdownMenuItem onSelect={() => onToggleStar(conversation.id)}>
            <Star className={cn(conversation.starred && 'fill-current')} />
            {conversation.starred ? 'Remove star' : 'Star'}
          </DropdownMenuItem>
          {/* Defer focus to the effect above; Radix restores focus on close. */}
          <DropdownMenuItem onSelect={() => setTimeout(beginEdit, 0)}>
            <Pencil />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={() => onRequestDelete(conversation)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** Rows re-render only when their own conversation or active flag changes. */
export const ConversationItem = memo(ConversationItemImpl);

