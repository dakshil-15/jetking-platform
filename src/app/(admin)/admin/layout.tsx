import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { adminLogout, getCurrentUser } from './actions';
import { ROLE_LABEL, type Role } from '@/lib/auth/users';
import { AdminSidebarNav } from './AdminSidebarNav';
import { AdminShell } from './AdminShell';

export const metadata = {
  title: 'Jetking Admin',
  robots: { index: false, follow: false },
};

/**
 * Admin chrome, modernized after the TailAdmin reference (nextjs-demo.
 * tailadmin.com) — shell proportions, control density, card/table/form
 * quality — but NOT its palette or typeface: the accent stays Jetking red
 * and the type stays the site's own Bricolage/Jakarta pairing (see the
 * comment on `.surface-default` in globals.css for the full rationale).
 *
 * Deliberately still the *light* surface, forced via `.surface-default` so a
 * visitor's site-wide dark-mode toggle can't carry into the CMS.
 *
 * The shell is a fixed-height viewport (`h-screen` + `overflow-hidden`) with
 * exactly one scrolling region — `<main>`. That's what keeps the sidebar and
 * topbar in place while content scrolls, rather than `position: sticky`
 * fighting an ancestor's overflow.
 */

// Grouped and ordered to match the sidebar's visual sections (Main / Content
// / Experience / CRM / Administration) — `AdminSidebarNav` renders a quiet
// group heading whenever `group` changes between consecutive (role-filtered)
// items, so the array's order here *is* the sidebar's visual order.
const NAV: Array<{ href: Route; label: string; icon: string; group: string; roles?: Role[] }> = [
  { href: '/admin' as Route, label: 'Dashboard', icon: 'LayoutGrid', group: 'Main' },
  { href: '/admin/courses' as Route, label: 'Courses', icon: 'GraduationCap', group: 'Content', roles: ['admin', 'editor'] },
  { href: '/admin/centres' as Route, label: 'Centres', icon: 'Building2', group: 'Content', roles: ['admin', 'editor'] },
  { href: '/admin/posts' as Route, label: 'Posts', icon: 'Newspaper', group: 'Content', roles: ['admin', 'editor'] },
  { href: '/admin/faqs' as Route, label: 'FAQs', icon: 'HelpCircle', group: 'Content', roles: ['admin', 'editor'] },
  { href: '/admin/policies' as Route, label: 'Policies', icon: 'ShieldCheck', group: 'Content', roles: ['admin', 'editor'] },
  { href: '/admin/faculty' as Route, label: 'Faculty', icon: 'UserCog', group: 'Content', roles: ['admin', 'editor'] },
  {
    href: '/admin/variants' as Route,
    label: 'Homepage variants',
    icon: 'LayoutTemplate',
    group: 'Experience',
    roles: ['admin', 'editor'],
  },
  {
    href: '/admin/rules' as Route,
    label: 'Persona rules',
    icon: 'SlidersHorizontal',
    group: 'Experience',
    roles: ['admin', 'editor'],
  },
  { href: '/admin/leads' as Route, label: 'Leads', icon: 'Users', group: 'CRM' },
  { href: '/admin/team' as Route, label: 'Team & access', icon: 'KeyRound', group: 'Administration', roles: ['admin'] },
  { href: '/admin/audit' as Route, label: 'Audit log', icon: 'History', group: 'Administration', roles: ['admin'] },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  const nav = user ? NAV.filter((item) => !item.roles || item.roles.includes(user.role)) : [];

  const sidebar = user ? (
    <aside className="flex h-full w-[272px] shrink-0 flex-col border-r border-border bg-background p-4">
      <Link href={'/admin' as Route} className="flex flex-col gap-2 px-2 py-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand asset; sized by caller */}
        <img
          src="/brand/jetking-wordmark.png"
          alt="Jetking"
          draggable={false}
          className="h-6 w-auto shrink-0 select-none object-contain"
        />
        <span className="label-mono shrink-0 text-foreground-muted">Admin Console</span>
      </Link>

      <AdminSidebarNav items={nav} />

      {/* Identity and sign-out are deliberately two visually distinct blocks
         (a divider between them), not one continuous stack — the account
         summary isn't the same kind of thing as the sign-out action. */}
      <div className="mt-auto border-t border-border pt-4">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]"
          >
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-foreground">{user.name}</span>
            <span className="block text-xs text-foreground-muted">{ROLE_LABEL[user.role]}</span>
          </span>
        </div>

        <div className="my-3 border-t border-border" />

        <form action={adminLogout}>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[var(--admin-radius)] border border-border px-4 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  ) : null;

  return (
    <div className="surface-default h-screen overflow-hidden bg-surface text-foreground">
      {user && sidebar ? (
        <>
          {/* The root layout (src/app/layout.tsx) already renders its own
             "Skip to content" targeting `<main id="main">`, which wraps this
             entire admin shell — so on an admin page that skip link lands
             right before the sidebar, not past it. This second, differently
             worded link is what actually skips the ~13-link sidebar nav.
             Its target is a plain `<div>`, not `<main>`: the root's `<main
             id="main">` is already the page's one landmark, and nesting a
             second `<main>` inside it would be an invalid nested landmark. */}
          <a
            href="#admin-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[var(--admin-radius)] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip sidebar navigation
          </a>
          <AdminShell sidebar={sidebar} navItems={nav}>
            <div id="admin-content" className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-8">
              {process.env.CONTENT_SOURCE !== 'admin' ? (
                <div
                  role="alert"
                  className="mb-6 rounded-[var(--admin-radius)] border border-[var(--color-signal-600)]/25 bg-[var(--color-signal-50)] px-4 py-3 text-sm font-medium text-[var(--color-signal-600)]"
                >
                  Changes here do not affect the live site. The deployed site is reading content from
                  repo fixtures (<code>CONTENT_SOURCE={process.env.CONTENT_SOURCE ?? 'local'}</code>
                  ), not this CMS store — saves below will succeed but won&apos;t go live until
                  CONTENT_SOURCE is set to <code>admin</code> and the site is redeployed.
                </div>
              ) : null}
              {children}
            </div>
          </AdminShell>
        </>
      ) : (
        <div className="h-full overflow-y-auto">{children}</div>
      )}
    </div>
  );
}
