'use client';

import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import { Menu } from 'lucide-react';

export function AdminTopbar({
  items,
  onMenuClick,
}: {
  items: Array<{ href: Route; label: string; icon: string }>;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const current =
    items.find((item) => (item.href === '/admin' ? pathname === '/admin' : pathname?.startsWith(item.href)))
      ?.label ?? 'Dashboard';

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-[var(--admin-radius)] text-foreground-secondary transition-colors hover:bg-surface hover:text-foreground lg:hidden"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </button>

      <div className="flex items-baseline gap-2 text-sm">
        <span className="text-foreground-muted">Admin</span>
        <span className="text-foreground-muted">/</span>
        <span className="font-medium text-foreground">{current}</span>
      </div>
    </header>
  );
}
