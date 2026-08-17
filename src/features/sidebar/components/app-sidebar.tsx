'use client';

import { MobileSidebar } from '@/features/sidebar/components/mobile-sidebar';
import { SidebarPanel } from '@/features/sidebar/components/sidebar-panel';
import { SidebarRail } from '@/features/sidebar/components/sidebar-rail';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';
import { useHotkey, useMounted } from '@/hooks';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  activeConversationId: string | null;
}

export function AppSidebar({ activeConversationId }: AppSidebarProps) {
  const expanded = useSidebarStore((state) => state.expanded);
  const toggleExpanded = useSidebarStore((state) => state.toggleExpanded);
  const mounted = useMounted();

  useHotkey('\\', toggleExpanded, { meta: true, allowInInput: true });

  // Before hydration the persisted `expanded` value is unknown; render the
  // expanded panel (the default) so the server and client agree.
  const showPanel = !mounted || expanded;

  return (
    <>
      <aside
        aria-label="Sidebar"
        className={cn(
          'hidden shrink-0 border-r border-line md:block',
          'transition-[width] duration-200 ease-[var(--ease-out-soft)]',
          showPanel ? 'w-sidebar' : 'w-sidebar-collapsed',
        )}
      >
        {showPanel ? <SidebarPanel activeConversationId={activeConversationId} /> : <SidebarRail />}
      </aside>

      <MobileSidebar activeConversationId={activeConversationId} />
    </>
  );
}
