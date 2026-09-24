import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { PlacementsTestimonialSlider } from '@/components/placements/PlacementsTestimonialSlider';
import { PLACEMENT_DISCLAIMER, TESTIMONIALS } from '@/components/placements/data';

/**
 * The same carousel `/placements` uses, fed Jetking's own published, named placement
 * stories (`placements/data.ts` — not the CMS homepage-variant placeholders).
 */
export function PlacementProof() {
  return (
    <section className="border-y border-[var(--dc-hairline)] bg-[var(--dc-surface)] py-12 sm:py-14 lg:py-16" aria-labelledby="home-proof-heading">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="dc-eyebrow text-[13px] font-bold tracking-[0.06em] uppercase">Placements</p>
            <h2
              id="home-proof-heading"
              className="dc-heading-glow mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em] text-[var(--dc-ink)] xs:text-[28px] sm:text-[32px]"
            >
              Where Jetking learners have gone next
            </h2>
          </div>
          <Link
            href={'/placements' as Route}
            className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-bold text-[var(--dc-accent-soft)]"
          >
            All placement stories
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10">
          <PlacementsTestimonialSlider testimonials={TESTIMONIALS} />
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-[var(--dc-ink-muted)]">{PLACEMENT_DISCLAIMER}</p>
      </div>
    </section>
  );
}
