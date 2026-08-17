'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/lib/content/types';

const FALLBACK: Testimonial[] = [
  {
    id: 'fra-fallback-1',
    quote:
      'The brand opened doors with parents in our city that a standalone centre never would. Within 18 months we broke even and are now expanding to a second floor.',
    name: 'Rohit Verma',
    role: 'Jetking Franchise Partner, Pune',
  },
  {
    id: 'fra-fallback-2',
    quote:
      "Jetking's end-to-end support — from centre setup to marketing — made the transition from corporate life to education entrepreneurship smooth and rewarding.",
    name: 'Priya Nair',
    role: 'Jetking Franchise Partner, Bangalore',
  },
  {
    id: 'fra-fallback-3',
    quote:
      'The proven curriculum and placement partnerships gave us credibility from day one. Parents trust the Jetking name, and that trust drives admissions.',
    name: 'Amit Desai',
    role: 'Jetking Franchise Partner, Ahmedabad',
  },
];

const AVATARS = [
  '/franchise/partner-testimonial.png',
  '/student/avatar-2.png',
  '/student/avatar-3.png',
] as const;

export function FranchiseTestimonialSlider({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const items = testimonials?.length ? testimonials : FALLBACK;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const timer = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(timer);
  }, [go, items.length, paused]);

  const current = items[index];

  return (
    <div
      className="relative min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-[var(--radius-card)]" aria-live="polite" aria-atomic="true">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => {
            const avatar = AVATARS[i % AVATARS.length] ?? '/franchise/partner-testimonial.png';
            return (
              <blockquote
                key={item.id}
                className="v2-card w-full shrink-0 rounded-[var(--radius-card)] p-6 sm:p-7"
                aria-hidden={i !== index}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[48px] leading-none font-extrabold text-[var(--v2-franchise-ink)]"
                >
                  &ldquo;
                </span>
                <p className="-mt-4 text-[15px] leading-relaxed text-[var(--v2-ink-secondary)] sm:text-[16px]">
                  {item.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[rgb(255_176_122/0.45)]">
                    <Image src={avatar} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <cite className="not-italic">
                    <span className="block text-[14.5px] font-bold text-[var(--v2-ink)]">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[var(--v2-ink-muted)]">
                      {item.role}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            );
          })}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex gap-1.5" role="tablist" aria-label="Partner stories">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Story ${i + 1}: ${item.name}`}
                onClick={() => setIndex(i)}
                className={[
                  'h-2 cursor-pointer rounded-full transition-all duration-300',
                  i === index
                    ? 'w-6 bg-[var(--v2-accent)]'
                    : 'w-2 bg-[rgb(255_80_90/0.35)] hover:bg-[var(--v2-ink-muted)]',
                ].join(' ')}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous story"
              onClick={() => go(-1)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[var(--v2-hairline)] bg-[var(--v2-card)] text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-accent)] hover:text-[var(--v2-accent-soft)]"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              aria-label="Next story"
              onClick={() => go(1)}
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[var(--v2-hairline)] bg-[var(--v2-card)] text-[var(--v2-ink)] transition-colors hover:border-[var(--v2-accent)] hover:text-[var(--v2-accent-soft)]"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      ) : null}

      <span className="sr-only">
        Showing story {index + 1} of {items.length}: {current?.name}, {current?.role}
      </span>
    </div>
  );
}
