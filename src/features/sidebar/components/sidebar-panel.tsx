'use client';

import { PanelLeftClose, Plus, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { JetkingMark } from '@/components/brand/jetking-mark';
import { Button, Skeleton, Tooltip } from '@/components/ui/index';
import { ConversationList } from '@/features/sidebar/components/conversation-list';
import { SidebarUserMenu } from '@/features/sidebar/components/sidebar-user-menu';
import { PRIMARY_NAV } from '@/features/sidebar/config/nav';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';
import { useMounted } from '@/hooks';
import { ROUTES } from '@/lib/config/routes';
import { SITE } from '@/lib/config/site';
import { cn } from '@/lib/utils';

interface SidebarPanelProps {
  activeConversationId: string | null;
  /** Rendered inside the mobile drawer  swaps the collapse control for close. */
  variant?: 'desktop' | 'drawer';
  onClose?: () => void;
}

export function SidebarPanel({
  activeConversationId,
  variant = 'desktop',
  onClose,
}: SidebarPanelProps) {
  const pathname = usePathname();
  const mounted = useMounted();
  const searchQuery = useSidebarStore((state) => state.searchQuery);
  const setSearchQuery = useSidebarStore((state) => state.setSearchQuery);
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);

  const isDrawer = variant === 'drawer';

  return (
    <div className="flex h-full w-sidebar flex-col bg-rail">
      {/* Brand + collapse */}
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <Link
          href={ROUTES.home()}
          onClick={onClose}
          className="flex items-center gap-2 rounded-lg px-1 py-1 transition-opacity hover:opacity-80"
        >
          <JetkingMark className="size-5 text-brand" />
          {/* eslint-disable-next-line @next/next/no-img-element -- brand asset; sized by caller */}
          <img
            src="/brand/jetking-wordmark.png"
            alt={SITE.name}
            draggable={false}
            className="block h-4 max-w-full min-w-0 shrink select-none object-contain object-left"
          />
        </Link>

        <Tooltip
          label={isDrawer ? 'Close' : 'Collapse sidebar'}
          shortcut={isDrawer ? undefined : 'âŒ˜\\'}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={isDrawer ? 'Close sidebar' : 'Collapse sidebar'}
            onClick={isDrawer ? onClose : toggleExpanded}
          >
            {isDrawer ? <X /> : <PanelLeftClose />}
          </Button>
        </Tooltip>
      </div>

      {/* New chat */}
      <div className="px-3 pb-2">
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start gap-2.5 px-2.5 font-medium text-brand hover:bg-brand-soft hover:text-brand"
        >
          <Link href={ROUTES.home()} onClick={onClose}>
            <Plus />
            New chat
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-ink-subtle"
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search chats"
            aria-label="Search chats"
            className={cn(
              'h-9 w-full rounded-lg border border-transparent bg-surface-hover pr-2.5 pl-8.5',
              'text-sm text-ink placeholder:text-ink-subtle',
              'transition-colors outline-none',
              'focus:border-line-strong focus:bg-surface',
              '[&::-webkit-search-cancel-button]:appearance-none',
            )}
          />
        </div>
      </div>

      {/* Primary navigation */}
      <nav className="px-3 pb-3" aria-label="Primary">
        <ul className="flex flex-col gap-px">
          {PRIMARY_NAV.map(({ id, label, href, icon: Icon }) => {
            const isActive =
              id === 'chats' ? pathname === href || pathname.startsWith('/c/') : pathname === href;

            return (
              <li key={id}>
                <Link
                  href={href}
                  onClick={onClose}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm',
                    'transition-colors',
                    isActive
                      ? 'bg-surface-active font-medium text-ink'
                      : 'text-ink-muted hover:bg-surface-hover hover:text-ink',
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* History */}
      <div className="scrollbar-subtle min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {mounted ? (
          <ConversationList activeConversationId={activeConversationId} searchQuery={searchQuery} />
        ) : (
          <HistorySkeleton />
        )}
      </div>

      {/* Account */}
      <div className="border-t border-line px-2 py-2">
        <SidebarUserMenu collapsed={false} />
      </div>
    </div>
  );
}

/**
 * Placeholder shown until the persisted store has hydrated. Rendering the real
 * list on the server would produce markup the client immediately replaces.
 */
function HistorySkeleton() {
  return (
    <div className="flex flex-col gap-2 pt-1" aria-hidden>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} className="h-8 rounded-lg" style={{ opacity: 1 - index * 0.12 }} />
      ))}
    </div>
  );
}

