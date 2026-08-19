'use client';

import { useId, useState } from 'react';

/**
 * Leadership bio — collapsed by default when there is more than one paragraph.
 * Extra copy stays in the DOM (grid-rows + inert) so it remains indexable.
 */
export function LeaderBio({ paragraphs }: { paragraphs: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const [preview, ...rest] = paragraphs;
  const hasMore = rest.length > 0;

  if (!preview) return null;

  return (
    <div className="mt-4 text-left text-[13.5px] leading-relaxed text-[var(--dc-ink-secondary)] sm:text-[14px]">
      <p>{preview}</p>

      {hasMore ? (
        <>
          <div
            id={id}
            inert={!open}
            className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-soft)] ${
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`space-y-3 pt-3 transition-opacity duration-300 ${
                  open ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {rest.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="mt-3 cursor-pointer text-[13px] font-bold text-[var(--dc-accent-soft)] transition-colors hover:text-[var(--dc-ink)]"
          >
            {open ? 'Read less' : 'Read more'}
          </button>
        </>
      ) : null}
    </div>
  );
}
