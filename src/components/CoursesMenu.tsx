'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { coursesMenu } from '@/lib/site';
import { cx } from './ui';

/**
 * "Courses" header item with a category dropdown (desktop header only). Opens on hover
 * and on keyboard focus (`group-focus-within`), so the panel's links are reachable by
 * Tab. The trigger is still a real link to /courses. An entry is marked current when the
 * URL is /courses with exactly that filter (or no filter, for "All courses").
 */
function Inner({ onDarkLead }: { onDarkLead: boolean }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const onCourses = pathname === '/courses' || pathname.startsWith('/courses/');

  const isCurrent = (params: Record<string, string>) => {
    if (pathname !== '/courses') return false;
    const keys = Object.keys(params);
    if (keys.length === 0) return !search.get('tech') && !search.get('level');
    return keys.every((k) => search.get(k) === params[k]);
  };

  return (
    <div className="group relative">
      <Link
        href={'/courses' as Route}
        aria-current={pathname === '/courses' ? 'page' : undefined}
        aria-haspopup="true"
        className={cx(
          'inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-bold tracking-[-0.01em] transition-colors duration-200',
          onCourses
            ? onDarkLead
              ? 'text-white'
              : 'text-[var(--accent-ink)]'
            : onDarkLead
              ? 'text-white/75 hover:bg-white/10 hover:text-white'
              : 'text-foreground-secondary hover:bg-surface hover:text-foreground',
        )}
      >
        Courses
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </Link>

      <div className="invisible absolute top-full left-1/2 z-[60] w-[260px] -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="rounded-2xl border border-border bg-background p-2 shadow-[0_18px_40px_rgb(16_24_40/0.16)]">
          {coursesMenu.map((item) => {
            const active = isCurrent(item.params);
            return (
              <li key={item.href}>
                <Link
                  href={item.href as Route}
                  aria-current={active ? 'page' : undefined}
                  className={cx(
                    'flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                    active
                      ? 'bg-jk-50 text-[var(--accent-ink)]'
                      : 'text-foreground-secondary hover:bg-surface hover:text-foreground',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx('h-1.5 w-1.5 shrink-0 rounded-full', active ? 'bg-[var(--accent-ink)]' : 'bg-transparent')}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function CoursesMenu({ onDarkLead }: { onDarkLead: boolean }) {
  return (
    <Suspense
      fallback={
        <Link
          href={'/courses' as Route}
          className="rounded-full px-4 py-2.5 text-sm font-bold tracking-[-0.01em] text-foreground-secondary"
        >
          Courses
        </Link>
      }
    >
      <Inner onDarkLead={onDarkLead} />
    </Suspense>
  );
}
