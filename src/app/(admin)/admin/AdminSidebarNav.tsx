'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Route } from 'next';
import {
  LayoutGrid,
  Users,
  GraduationCap,
  Building2,
  Newspaper,
  HelpCircle,
  ShieldCheck,
  UserCog,
  LayoutTemplate,
  SlidersHorizontal,
  KeyRound,
  History,
  type LucideIcon,
} from 'lucide-react';

// Icons are looked up by name here rather than passed in as props: a Server
// Component can't hand a Client Component a component reference (same
// "functions can't cross the RSC boundary" rule that applies to any function).
const ICONS: Record<string, LucideIcon> = {
  LayoutGrid,
  Users,
  GraduationCap,
  Building2,
  Newspaper,
  HelpCircle,
  ShieldCheck,
  UserCog,
  LayoutTemplate,
  SlidersHorizontal,
  KeyRound,
  History,
};

export function AdminSidebarNav({
  items,
}: {
  items: Array<{ href: Route; label: string; icon: string; group?: string }>;
}) {
  const pathname = usePathname();

  return (
    <nav className="mt-5 flex flex-col gap-0.5">
      {items.map((item, index) => {
        const showGroupHeading = Boolean(item.group) && item.group !== items[index - 1]?.group;
        const Icon = ICONS[item.icon] ?? LayoutGrid;
        const active = item.href === '/admin' ? pathname === '/admin' : pathname?.startsWith(item.href);

        return (
          <Fragment key={item.href}>
            {showGroupHeading ? (
              <p className="mt-3 px-3 pb-1.5 text-[10px] font-semibold tracking-wider text-foreground-muted/70 uppercase first:mt-0">
                {item.group}
              </p>
            ) : null}
            <Link
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`group flex h-11 items-center gap-3 rounded-[var(--admin-radius)] px-3 text-sm font-medium transition-colors ${
                active
                  ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'text-foreground-secondary hover:bg-surface hover:text-foreground'
              }`}
            >
              <Icon
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 transition-colors ${
                  active ? 'text-[var(--accent)]' : 'text-foreground-muted group-hover:text-foreground'
                }`}
              />
              {item.label}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
