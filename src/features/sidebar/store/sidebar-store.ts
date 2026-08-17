'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '@/lib/constants/storage';

interface SidebarState {
  /** Desktop: whether the rail is expanded. Persisted. */
  expanded: boolean;
  /** Mobile: whether the drawer is open. Never persisted. */
  mobileOpen: boolean;
  searchQuery: string;
}

interface SidebarActions {
  setExpanded: (expanded: boolean) => void;
  toggleExpanded: () => void;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
  setSearchQuery: (query: string) => void;
}

export const useSidebarStore = create<SidebarState & SidebarActions>()(
  persist(
    (set) => ({
      expanded: true,
      mobileOpen: false,
      searchQuery: '',

      setExpanded: (expanded) => set({ expanded }),
      toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
      setMobileOpen: (mobileOpen) => set({ mobileOpen }),
      toggleMobile: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
    }),
    {
      name: STORAGE_KEYS.sidebar,
      version: 1,
      // Transient UI state must not survive a reload.
      partialize: (state) => ({ expanded: state.expanded }),
    },
  ),
);
