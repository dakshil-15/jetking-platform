'use client';

import { PanelLeftOpen, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { JetkingMark } from '@/components/brand/jetking-mark';
import { Button, Tooltip } from '@/components/ui/index';
import { SidebarUserMenu } from '@/features/sidebar/components/sidebar-user-menu';
import { PRIMARY_NAV } from '@/features/sidebar/config/nav';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';
import { ROUTES } from '@/lib/config/routes';
import { cn } from '@/lib/utils';

/** The collapsed desktop sidebar: icons only, every control tooltipped. */
export function SidebarRail() {
  const pathname = usePathname();
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);

  return (
    <div className="flex h-full w-sidebar-collapsed flex-col items-center bg-rail py-3">
      <Link href={ROUTES.home()} aria-label="Home" className="mb-2 p-1.5">
        <JetkingMark className="size-5 text-brand" />
      </Link>

      <Tooltip label="Expand sidebar" shortcut="âŒ˜\" side="right">
        <Button variant="ghost" size="icon" aria-label="Expand sidebar" onClick={toggleExpanded}>
          <PanelLeftOpen />
        </Button>
      </Tooltip>

      <Tooltip label="New chat" shortcut="âŒ˜K" side="right">
        <Button asChild variant="ghost" size="icon" className="mt-1 text-brand hover:bg-brand-soft">
          <Link href={ROUTES.home()} aria-label="New chat">
            <Plus />
          </Link>
        </Button>
      </Tooltip>

      <Tooltip label="Search chats" side="right">
        <Button variant="ghost" size="icon" aria-label="Search chats" onClick={toggleExpanded}>
          <Search />
        </Button>
      </Tooltip>

      <nav className="mt-2 flex flex-col items-center gap-1" aria-label="Primary">
        {PRIMARY_NAV.map(({ id, label, href, icon: Icon }) => {
          const isActive =
            id === 'chats' ? pathname === href || pathname.startsWith('/c/') : pathname === href;

          return (
            <Tooltip key={id} label={label} side="right">
              <Link
                href={href}
                aria-label={label}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex size-9 items-center justify-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-surface-active text-ink'
                    : 'text-ink-muted hover:bg-surface-hover hover:text-ink',
                )}
              >
                <Icon className="size-[1.125rem]" />
              </Link>
            </Tooltip>
          );
        })}
      </nav>

      <div className="mt-auto">
        <SidebarUserMenu collapsed />
      </div>
    </div>
  );
}

