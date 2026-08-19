import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { adminLogout, isAdminAuthenticated } from './actions';

export const metadata = {
  title: 'Jetking Admin',
  robots: { index: false, follow: false },
};

/**
 * Admin chrome.
 *
 * Deliberately the dark surface. The CMS is a tool staff sit inside all day, and the
 * contrast against the light public site is a useful "you are editing, not browsing"
 * signal. It uses `.surface-inverse` and the same tokens as everything else — the
 * previous zinc-and-orange palette belonged to no design system at all.
 */

const NAV: Array<{ href: Route; label: string }> = [
  { href: '/admin' as Route, label: 'Dashboard' },
  { href: '/admin/courses' as Route, label: 'Courses' },
  { href: '/admin/centres' as Route, label: 'Centres' },
  { href: '/admin/posts' as Route, label: 'Posts' },
  { href: '/admin/faqs' as Route, label: 'FAQs' },
  { href: '/admin/policies' as Route, label: 'Policies' },
  { href: '/admin/faculty' as Route, label: 'Faculty' },
  { href: '/admin/variants' as Route, label: 'Homepage variants' },
  { href: '/admin/rules' as Route, label: 'Persona rules' },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  return (
    <div className="surface-inverse min-h-screen">
      {authed ? (
        <div className="flex min-h-screen">
          <aside className="flex w-60 shrink-0 flex-col border-r border-border p-5">
            <Link href={'/admin' as Route} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-[0.55rem] bg-jk-600 font-display text-xs font-extrabold text-white"
              >
                Jk
              </span>
              <span className="label-mono">Jetking CMS</span>
            </Link>

            <nav className="mt-8 flex flex-col gap-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[var(--radius-input)] px-3 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:bg-card hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <form action={adminLogout} className="mt-auto pt-8">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground-secondary transition-colors hover:border-border-strong hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </aside>

          <main className="flex-1 overflow-auto p-8 lg:p-12">
            {process.env.CONTENT_SOURCE !== 'admin' ? (
              <div
                role="alert"
                className="mb-6 rounded-[var(--radius-input)] border border-jk-500/30 bg-jk-500/10 px-4 py-3 text-sm font-medium text-jk-400"
              >
                Changes here do not affect the live site. The deployed site is reading content from
                repo fixtures (<code>CONTENT_SOURCE={process.env.CONTENT_SOURCE ?? 'local'}</code>
                ), not this CMS store — saves below will succeed but won&apos;t go live until
                CONTENT_SOURCE is set to <code>admin</code> and the site is redeployed.
              </div>
            ) : null}
            {children}
          </main>
        </div>
      ) : (
        <main className="flex min-h-screen items-center justify-center p-8">{children}</main>
      )}
    </div>
  );
}
