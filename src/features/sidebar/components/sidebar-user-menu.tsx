'use client';

import { ChevronsUpDown, LogOut, Monitor, Moon, Settings, Sun, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useTheme, type ThemePreference } from '@/components/providers/theme-provider';
import {
  Avatar,
  ConfirmDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/index';
import { useChatActions } from '@/features/chat/store/selectors';
import { CURRENT_USER } from '@/lib/config/site';
import { cn } from '@/lib/utils';

const THEME_OPTIONS: ReadonlyArray<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

interface SidebarUserMenuProps {
  collapsed: boolean;
}

export function SidebarUserMenu({ collapsed }: SidebarUserMenuProps) {
  const { theme, setTheme } = useTheme();
  const { deleteAllConversations } = useChatActions();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="Account menu"
          className={cn(
            'flex w-full items-center gap-2.5 rounded-lg p-2 text-left',
            'transition-colors hover:bg-surface-hover',
            'data-[state=open]:bg-surface-hover',
            collapsed && 'justify-center',
          )}
        >
          <Avatar name={CURRENT_USER.name} size="md" />
          {collapsed ? null : (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">
                  {CURRENT_USER.name}
                </span>
                <span className="block truncate text-xs text-ink-subtle">{CURRENT_USER.plan}</span>
              </span>
              <ChevronsUpDown className="size-4 shrink-0 text-ink-subtle" />
            </>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" side="top" className="min-w-64">
          <div className="px-2.5 py-2">
            <p className="truncate text-sm font-medium text-ink">{CURRENT_USER.name}</p>
            <p className="truncate text-xs text-ink-subtle">{CURRENT_USER.email}</p>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem
              key={value}
              onSelect={() => setTheme(value)}
              className={cn(theme === value && 'bg-surface-hover')}
            >
              <Icon />
              {label}
              {theme === value ? (
                <span className="ml-auto size-1.5 rounded-full bg-brand" aria-hidden />
              ) : null}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem destructive onSelect={() => setConfirmClearOpen(true)}>
            <Trash2 />
            Clear all chats
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmClearOpen}
        onOpenChange={setConfirmClearOpen}
        title="Clear all chats?"
        description="Every conversation stored in this browser will be permanently deleted. This cannot be undone."
        confirmLabel="Delete everything"
        destructive
        onConfirm={deleteAllConversations}
      />
    </>
  );
}

