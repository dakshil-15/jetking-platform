'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';

export function BookCounselling() {
  const { classification } = usePersona();

  return (
    <Link
      href={'/enquiry' as Route}
      onClick={() =>
        track('enquiry_started', { persona: classification.persona, source: 'student-whats-next' })
      }
      className="group/book inline-flex w-full min-h-12 items-center justify-between gap-3 rounded-full bg-[var(--stu-navy)] py-3 pr-3 pl-5 text-[14.5px] font-bold text-white shadow-[0_0_24px_rgb(196_30_36/0.35)] transition-colors hover:bg-jk-700 xs:text-[15px]"
    >
      <span className="inline-flex min-w-0 items-center gap-2.5">
        <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        <span className="truncate">Book Free Counselling</span>
      </span>
      <span
        aria-hidden="true"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-200 group-hover/book:translate-x-0.5"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
      </span>
    </Link>
  );
}
