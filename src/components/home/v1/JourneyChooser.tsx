'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';
import { cx } from '@/components/ui';
import { JOURNEYS, type Journey } from '../journeys';

/**
 * Journey chooser — responsive:
 *   default     → 1-col rows
 *   sm / md     → 2-col rows
 *   lg+         → 3 + asymmetric 2 (desktop mock)
 */

function JourneyCard({
  journey,
  className,
}: {
  journey: Journey;
  className?: string;
}) {
  const { override } = usePersona();
  const ink = `var(--v1-${journey.hue}-ink)`;

  return (
    <Link
      href={journey.href as Route}
      onClick={() => {
        if (journey.persona) override(journey.persona);
        track('adaptive_slot_rendered', {
          slot_id: 'home-v1-journey',
          persona: journey.persona ?? 'unknown',
          strategy: 'emphasise',
          journey: journey.id,
        });
      }}
      className={cx(
        'v1-card v1-card-interactive group/journey relative flex items-center gap-3.5 overflow-hidden rounded-[16px] p-3.5',
        'min-h-[88px] xs:gap-4 xs:rounded-[18px] xs:p-4 xs:min-h-[92px]',
        'lg:min-h-[280px] lg:flex-col lg:items-stretch lg:justify-end lg:gap-0 lg:p-0',
        'xl:min-h-[300px]',
        '2xl:min-h-[320px]',
        journey.hue === 'franchise' && 'v1-card-warm',
        className,
      )}
      style={{ '--hex-ink': ink } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[12px] xs:h-[76px] xs:w-[76px] lg:absolute lg:inset-0 lg:h-auto lg:w-auto lg:rounded-none"
      >
        <Image
          src={journey.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, 76px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/journey:scale-105"
        />
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(180deg,rgb(10_10_20/0.1)_0%,rgb(10_10_20/0.35)_40%,rgb(8_8_16/0.88)_100%)] lg:block"
      />

      <span className="relative z-10 min-w-0 flex-1 lg:mt-auto lg:flex-none lg:p-5 xl:p-6">
        <span className="block text-[15px] leading-tight font-extrabold tracking-[-0.01em] text-[color:var(--hex-ink)] xs:text-[15.5px] lg:text-[16px] lg:text-white xl:text-[17px]">
          {journey.title}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-[var(--v1-ink-muted)] xs:mt-1.5 xs:text-[13.5px] lg:text-white/80">
          {journey.detail}
        </span>

        <span
          aria-hidden="true"
          className="mt-4 hidden h-8 w-8 place-items-center rounded-full border-[1.5px] border-white/70 text-white transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/journey:translate-x-0.5 lg:grid"
        >
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </span>

      <span
        aria-hidden="true"
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.5px] text-[color:var(--hex-ink)] transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/journey:translate-x-0.5 lg:hidden"
        style={{ borderColor: ink }}
      >
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
    </Link>
  );
}

export function JourneyChooser() {
  const top = JOURNEYS.slice(0, 3);
  const bottom = JOURNEYS.slice(3);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 xs:gap-3.5 sm:grid-cols-2 lg:hidden">
        {JOURNEYS.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-3 xl:gap-3.5">
          {top.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
        <div className="mt-3 flex items-start gap-3 xl:mt-3.5 xl:gap-4">
          {bottom[0] ? (
            <JourneyCard
              journey={bottom[0]}
              className="w-[min(240px,48%)] shrink-0 lg:min-h-[280px] xl:min-h-[300px]"
            />
          ) : null}
          {bottom[1] ? (
            <JourneyCard
              journey={bottom[1]}
              className="mt-1 w-[min(220px,44%)] shrink-0 lg:min-h-[276px] xl:mt-1.5 xl:min-h-[296px]"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
