'use client';

import { MoreHorizontal, PanelLeft, Share2, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Button,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
} from '@/components/ui/index';
import { useChatActions } from '@/features/chat/store/selectors';
import type { Conversation } from '@/features/chat/types';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';
import { ROUTES } from '@/lib/config/routes';
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  conversation?: Conversation | null;
  title?: string;
}

export function ChatHeader({ conversation, title }: ChatHeaderProps) {
  const router = useRouter();
  const toggleMobile = useSidebarStore((state) => state.toggleMobile);
  const { toggleStar, deleteConversation } = useChatActions();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const heading = conversation?.title ?? title ?? 'New chat';

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-13 shrink-0 items-center gap-2 px-3 md:px-4',
        'border-b border-transparent bg-canvas/85 backdrop-blur-sm',
      )}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Open navigation"
        onClick={toggleMobile}
        className="md:hidden"
      >
        <PanelLeft />
      </Button>

      <h1 className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{heading}</h1>

      {conversation ? (
        <div className="flex items-center gap-0.5">
          <Tooltip label={conversation.starred ? 'Remove star' : 'Star chat'}>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={conversation.starred ? 'Remove star' : 'Star chat'}
              aria-pressed={conversation.starred}
              onClick={() => toggleStar(conversation.id)}
            >
              <Star className={cn(conversation.starred && 'fill-brand text-brand')} />
            </Button>
          </Tooltip>

          <Tooltip label="Share">
            <Button variant="ghost" size="icon-sm" aria-label="Share chat">
              <Share2 />
            </Button>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Chat options">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => toggleStar(conversation.id)}>
                <Star className={cn(conversation.starred && 'fill-current')} />
                {conversation.starred ? 'Remove star' : 'Star chat'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive onSelect={() => setConfirmDeleteOpen(true)}>
                <Trash2 />
                Delete chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ConfirmDialog
            open={confirmDeleteOpen}
            onOpenChange={setConfirmDeleteOpen}
            title="Delete chat?"
            description={
              <>
                <span className="font-medium text-ink">{conversation.title}</span> and all of its
                messages will be permanently removed. This cannot be undone.
              </>
            }
            confirmLabel="Delete"
            destructive
            onConfirm={() => {
              deleteConversation(conversation.id);
              router.push(ROUTES.home());
            }}
          />
        </div>
      ) : null}
    </header>
  );
}

