'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { SidebarPanel } from '@/features/sidebar/components/sidebar-panel';
import { useSidebarStore } from '@/features/sidebar/store/sidebar-store';

interface MobileSidebarProps {
  activeConversationId: string | null;
}

/** Off-canvas drawer for small screens. Focus trap and Esc come from Radix. */
export function MobileSidebar({ activeConversationId }: MobileSidebarProps) {
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);

  const close = () => setMobileOpen(false);

  return (
    <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-clay-950/40 fixed inset-0 z-40 backdrop-blur-[2px] data-[state=open]:animate-fade-in md:hidden" />
        <DialogPrimitive.Content
          aria-label="Navigation"
          className="fixed inset-y-0 left-0 z-50 shadow-pop data-[state=open]:animate-slide-in-left md:hidden"
        >
          <DialogPrimitive.Title className="sr-only">Navigation</DialogPrimitive.Title>
          <SidebarPanel
            activeConversationId={activeConversationId}
            variant="drawer"
            onClose={close}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
