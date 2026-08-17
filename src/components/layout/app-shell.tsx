'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { AppSidebar } from '@/features/sidebar/components/app-sidebar';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';
import { useHotkey } from '@/hooks';
import { ROUTES } from '@/lib/config/routes';

const CONVERSATION_PATH = /^\/chatbot\/c\/([^/]+)\/?$/;

function readConversationId(pathname: string): string | null {
  return CONVERSATION_PATH.exec(pathname)?.[1] ?? null;
}

/**
 * Application chrome: persistent sidebar plus the routed pane.
 *
 * The active conversation is derived from the URL rather than held in state,
 * so back/forward navigation and deep links stay correct for free.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);

  const activeConversationId = readConversationId(pathname);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  useHotkey('k', () => router.push(ROUTES.home()), { meta: true, allowInInput: true });

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <AppSidebar activeConversationId={activeConversationId} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
