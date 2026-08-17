'use client';

import { useId, useRef, useState, type ReactNode } from 'react';
import { cx } from './ui';

/**
 * Progressive disclosure that is safe to index.
 *
 * The rule: collapsed content is ALWAYS in the DOM and always in the server-rendered
 * HTML. It is hidden with `height: 0; overflow: hidden` plus `inert`, never with
 * conditional rendering and never with `display: none` on indexable prose.
 *
 * That distinction is the whole point. `{open && <Content/>}` would remove course
 * curricula and FAQ answers from the document a crawler receives, which on this
 * project means deliberately deleting the content the pages rank for. Hidden-but-
 * present is fine; absent is not.
 *
 * Height is animated from a measured value rather than a guess, so the reveal reads
 * as the panel growing out of its header rather than a box appearing.
 */

export function Disclosure({
  summary,
  meta,
  children,
  defaultOpen = false,
  tone = 'default',
}: {
  summary: ReactNode;
  /** Right-aligned secondary label — step number, duration, count. */
  meta?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  tone?: 'default' | 'flush';
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();

  return (
    <div
      className={cx(
        'group/disclosure',
        tone === 'default'
          ? 'rounded-[var(--radius-card)] border border-border transition-colors duration-300 hover:border-border-medium data-[open=true]:border-border-medium data-[open=true]:bg-surface'
          : 'border-b border-border',
      )}
      data-open={open}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          'flex w-full cursor-pointer items-center gap-4 text-left transition-colors duration-200',
          tone === 'default' ? 'p-5' : 'py-5 hover:text-jk-600',
        )}
      >
        <span className="min-w-0 flex-1 text-base font-semibold">{summary}</span>
        {meta ? <span className="label-mono shrink-0">{meta}</span> : null}
        <span
          aria-hidden="true"
          className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border transition-transform duration-300 ease-[var(--ease-out-soft)] group-data-[open=true]/disclosure:rotate-45"
        >
          <span className="absolute h-px w-3 bg-jk-600" />
          <span className="absolute h-3 w-px bg-jk-600 transition-opacity duration-300 group-data-[open=true]/disclosure:opacity-100" />
        </span>
      </button>

      {/*
        `grid-template-rows: 0fr → 1fr` animates to content height without measuring
        it in JS, so there is no flash and no ResizeObserver. `inert` removes the
        collapsed panel from the tab order and the a11y tree while leaving it in the
        DOM for crawlers.
      */}
      <div
        id={id}
        ref={panelRef}
        inert={!open}
        className={cx(
          'grid transition-[grid-template-rows] duration-400 ease-[var(--ease-out-soft)]',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cx(
              'text-foreground-secondary transition-opacity duration-300',
              tone === 'default' ? 'px-5 pb-5' : 'pb-5',
              open ? 'opacity-100' : 'opacity-0',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
