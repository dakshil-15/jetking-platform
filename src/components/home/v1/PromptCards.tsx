'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { openGuide } from '@/components/Guide';

/**
 * The two floating cards that close the homepage lead.
 *
 * On desktop they sit over the impact arc (rendered individually via `variant`).
 * On mobile ImpactPanel renders both stacked. The success card keeps the mock's
 * shape and points at /placements — unverified placement totals are not claimed.
 */

function LearnerCluster() {
  const discs = [
    { left: 0, top: 0, tint: '#d9b79a' },
    { left: 16, top: 0, tint: '#7f5a45' },
    { left: 32, top: 0, tint: '#b98b6c' },
    { left: 8, top: 16, tint: '#5d4a3c' },
    { left: 24, top: 16, tint: '#e0c3ab' },
  ];

  return (
    <span aria-hidden="true" className="relative block h-[42px] w-[58px] shrink-0">
      {discs.map((disc) => (
        <span
          key={`${disc.left}-${disc.top}`}
          className="absolute h-[26px] w-[26px] rounded-full border-2 border-white"
          style={{ left: disc.left, top: disc.top, background: disc.tint }}
        />
      ))}
    </span>
  );
}

function SuccessCard() {
  return (
    <Link
      href={'/placements' as Route}
      className="v1-float group/prompt flex items-center gap-3 rounded-[18px] p-4 sm:p-[16px_18px]"
    >
      <LearnerCluster />
      <span className="min-w-0">
        <span className="block text-[14.5px] leading-snug font-bold text-[var(--v1-ink)]">
          Rahul, Anjali &amp; others who got placed
        </span>
        <span className="mt-2 inline-flex items-center gap-2 text-[13.5px] font-bold text-[var(--v1-accent)]">
          View Success Stories
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/prompt:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </span>
    </Link>
  );
}

function GuideCard() {
  return (
    <button
      type="button"
      onClick={() => openGuide('home-prompt-card')}
      className="v1-float group/prompt flex w-full cursor-pointer items-center gap-3.5 rounded-[18px] p-4 text-left sm:p-[16px_18px]"
    >
      <span
        aria-hidden="true"
        className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-[var(--v1-accent)] text-white"
      >
        <Sparkles className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-[14.5px] leading-snug font-bold text-[var(--v1-ink)]">
          Not sure which course is right for you?
        </span>
        <span className="mt-2 inline-flex items-center gap-2 text-[13.5px] font-bold text-[var(--v1-accent)]">
          Chat with our AI Guide
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/prompt:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </span>
    </button>
  );
}

export function PromptCards({ variant }: { variant?: 'success' | 'guide' }) {
  if (variant === 'success') return <SuccessCard />;
  if (variant === 'guide') return <GuideCard />;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <SuccessCard />
      <GuideCard />
    </div>
  );
}
