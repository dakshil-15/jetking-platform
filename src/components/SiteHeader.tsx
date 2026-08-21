'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Bot, Moon, Sun, X } from 'lucide-react';
import { mainNav, siteConfig } from '@/lib/site';
import { useTheme } from '@/components/providers/theme-provider';
import { cx } from './ui';
import { useDialog } from './useDialog';
import { useHydrated } from './useHydrated';

/**
 * Site header — matches the Jetking Landing Replica chrome:
 * red crest + wordmark + "Better Life", circular utility, dark hamburger.
 * Text nav lives in a right-side drawer (the mock has no desktop link row).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const mounted = useHydrated();
  const drawerRef = useRef<HTMLElement>(null);

  const isHome = pathname === '/';
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const open = menu.open && menu.path === pathname;
  const setOpen = useCallback(
    (next: boolean) => setMenu({ open: next, path: pathname }),
    [pathname],
  );
  const close = useCallback(() => setOpen(false), [setOpen]);

  /* Both the top bar and its drawer follow the resolved global theme. */
  const onDarkLead = resolvedTheme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /*
   * Escape-to-close, focus into the drawer, a Tab loop inside it, and focus back
   * on the hamburger when it closes. Previously only Escape was handled: opening
   * the menu left focus on the toggle behind an overlay, and Tab walked straight
   * into the page underneath.
   */
  useDialog(open, close, drawerRef);

  const drawer = mounted
    ? createPortal(
        <>
          {/*
            Scrim. A div, not a button: with a focus trap and a real Close button in
            the drawer header, a full-viewport "Dismiss menu" control adds a second
            tab stop that announces nothing useful. Click-to-dismiss is a pointer
            convenience, and every keyboard route to the same outcome already exists.
          */}
          <div
            aria-hidden="true"
            className={cx(
              'fixed inset-0 z-[70] transition-opacity duration-300 ease-out motion-reduce:transition-none',
              onDarkLead ? 'bg-black/55' : 'bg-foreground/35',
              open ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            onClick={close}
          />

          <aside
            id="site-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal={open || undefined}
            aria-label="Site menu"
            inert={!open}
            className={cx(
              'fixed inset-y-0 right-0 z-[80] flex w-[min(100%,22rem)] flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[24rem]',
              onDarkLead
                ? 'surface-inverse bg-background shadow-[-18px_0_40px_rgb(0_0_0/0.55)]'
                : 'bg-background shadow-[-18px_0_40px_rgb(16_24_40/0.12)]',
              open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
            )}
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-5 xs:h-[80px] sm:h-[88px] sm:px-6 2xl:h-[96px]">
              <span className="font-display text-[18px] font-extrabold tracking-[-0.02em] text-foreground sm:text-[20px]">
                Menu
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className={cx(
                  'grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-200 sm:h-12 sm:w-12',
                  onDarkLead
                    ? 'bg-white text-ink-900 hover:bg-surface'
                    : 'bg-foreground text-background hover:bg-foreground-secondary',
                )}
              >
                <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main" className="flex flex-1 flex-col overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              {mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    aria-current={active ? 'page' : undefined}
                    onClick={close}
                    className={cx(
                      'flex items-center gap-2 border-b border-border py-4 text-[16px] font-bold tracking-[-0.01em] transition-colors last:border-0 sm:text-[17px]',
                      active
                        ? 'text-[var(--accent-ink)]'
                        : 'text-foreground hover:text-[var(--accent-ink)]',
                    )}
                  >
                    {active ? (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-ink)]" />
                    ) : null}
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/enquiry"
                onClick={close}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-jk-600 px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_24px_rgb(199_20_28/0.28)] transition-colors hover:bg-jk-700"
              >
                Enquire Now
                <span aria-hidden="true" className="text-lg leading-none">
                  →
                </span>
              </Link>
            </nav>
          </aside>
        </>,
        document.body,
      )
    : null;

  return (
    <header
      className={cx(
        'sticky top-0 z-50 transition-[background-color,box-shadow] duration-300',
        /*
         * Header sits above <main>, not over the hero. `bg-transparent` therefore
         * shows the white body — on the dark lead use the canvas colour instead.
         */
        onDarkLead
          ? scrolled
            ? 'bg-background/92 shadow-[0_8px_24px_rgb(0_0_0/0.45)] backdrop-blur-md'
            : 'bg-background'
          : scrolled
            ? 'bg-background/92 shadow-[0_6px_20px_rgb(60_50_90/0.08)] backdrop-blur-md'
            : 'bg-transparent',
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-4 xs:h-[80px] sm:h-[88px] 2xl:h-[96px]">
        <Link href="/" className="group flex items-center" aria-label={`${siteConfig.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- brand asset; sized by caller */}
          <img
            src="/brand/jetking-wordmark.png"
            alt={siteConfig.name}
            draggable={false}
            className="block h-[28px] max-w-full select-none object-contain object-left xs:h-[32px] sm:h-[38px] 2xl:h-[42px]"
          />
        </Link>

        <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 2xl:gap-[22px]">
          <Link
            href={'/chatbot' as Route}
            className={cx(
              'inline-flex h-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-bold transition-[background-color,border-color,color,box-shadow] xs:h-12 xs:px-4 sm:h-[52px] sm:px-5',
              onDarkLead
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/16'
                : 'border-jk-500/20 bg-white text-foreground shadow-[0_4px_14px_rgb(60_50_90/0.08)] hover:border-jk-500/35 hover:bg-surface',
            )}
            aria-label="Open Jetking AI assistant"
          >
            <Bot
              className="h-5 w-5 text-jk-500"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Jetking AI</span>
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={resolvedTheme === 'dark'}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            className={cx(
              'group grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full border transition-[background-color,transform,border-color,color,box-shadow] duration-200 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-jk-500 active:scale-[0.96] motion-reduce:transform-none xs:h-12 xs:w-12 sm:h-[52px] sm:w-[52px]',
              onDarkLead
                ? 'border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/16'
                : 'border-jk-500/20 bg-jk-50 text-jk-500 shadow-[0_4px_14px_rgb(60_50_90/0.08)] hover:border-jk-500/35 hover:bg-jk-100',
            )}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            )}
          </button>
          {isHome ? null : (
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cx(
                'group relative grid h-12 w-12 cursor-pointer place-items-center rounded-full transition-[background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:scale-[1.04] active:scale-[0.94] motion-reduce:transition-colors motion-reduce:hover:scale-100 motion-reduce:active:scale-100 xs:h-[52px] xs:w-[52px] sm:h-[62px] sm:w-[62px]',
                onDarkLead
                  ? 'bg-white text-ink-900 shadow-[0_4px_14px_rgb(0_0_0/0.35)] ring-2 ring-jk-500 ring-offset-2 ring-offset-background hover:bg-surface hover:shadow-[0_6px_20px_rgb(216_31_38/0.35)]'
                  : 'bg-foreground text-background ring-2 ring-jk-500 ring-offset-2 ring-offset-background hover:bg-foreground-secondary hover:shadow-[0_6px_20px_rgb(216_31_38/0.28)]',
              )}
            >
              {/* Brand accent — small red tick on the button edge */}
              <span
                aria-hidden="true"
                className={cx(
                  'pointer-events-none absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-jk-500 transition-transform duration-300 group-hover:scale-110 sm:h-3 sm:w-3',
                  onDarkLead
                    ? 'shadow-[0_0_0_2px_var(--color-background)]'
                    : 'shadow-[0_0_0_2px_var(--color-background)]',
                )}
              />
              {/*
                Three bars stay mounted so open/close can morph via transform
                instead of hard-swapping to the Lucide X. Hover also nudges each line.
              */}
              <span
                aria-hidden="true"
                className="relative block h-[14px] w-[18px] sm:h-[18px] sm:w-6"
              >
                <span
                  className={cx(
                    'absolute left-0 top-0 block h-[2px] w-full origin-center rounded-full transition-[transform,opacity,width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[2.5px]',
                    open
                      ? 'translate-y-[6px] rotate-45 bg-jk-500 sm:translate-y-[7.75px]'
                      : onDarkLead
                        ? 'bg-ink-900 group-hover:-translate-y-0.5 group-hover:bg-jk-500'
                        : 'bg-white group-hover:-translate-y-0.5 group-hover:bg-jk-500',
                  )}
                />
                <span
                  className={cx(
                    'absolute left-0 top-1/2 block h-[2px] w-full -translate-y-1/2 origin-center rounded-full bg-jk-500 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[2.5px]',
                    open
                      ? 'scale-x-0 opacity-0 delay-75'
                      : 'group-hover:scale-x-[0.72] group-hover:delay-75',
                  )}
                />
                <span
                  className={cx(
                    'absolute bottom-0 left-0 block h-[2px] w-3 origin-center rounded-full transition-[transform,opacity,width,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:h-[2.5px] sm:w-4',
                    open
                      ? 'w-full -translate-y-[6px] -rotate-45 bg-jk-500 delay-100 sm:-translate-y-[7.75px]'
                      : onDarkLead
                        ? 'bg-ink-900 group-hover:w-full group-hover:translate-y-0.5 group-hover:bg-jk-500'
                        : 'bg-white group-hover:w-full group-hover:translate-y-0.5 group-hover:bg-jk-500',
                  )}
                />
              </span>
            </button>
          )}
        </div>
      </div>

      {isHome ? null : drawer}
    </header>
  );
}
