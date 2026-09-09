'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { Download, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';
import type { EventName } from '@/lib/analytics';

/**
 * The dark three-up action bar that closes the v2 lead.
 *
 * "Find Center", "Call a Center" and "Book Counselling" already live in the
 * ActionRail right beside this bar — this bar covers what the rail doesn't:
 * the brochure, the placement pitch and social proof. "Download Brochure"
 * points at /courses (no PDF yet); the other two point at /placements,
 * which carries the placement-support content and its testimonials.
 */

interface Action {
  icon: LucideIcon;
  label: string;
  detail: string;
  href: string;
  event?: EventName;
}

export function ActionBar() {
  const { classification } = usePersona();

  const actions: Action[] = [
    {
      icon: Download,
      label: 'Download Brochure',
      detail: 'Courses, fees & more',
      href: '/courses',
    },
    {
      icon: ShieldCheck,
      label: '100% Job Guarantee',
      detail: 'See how placement support works',
      href: '/placements',
    },
    {
      icon: MessageSquareQuote,
      label: 'Student Testimonials',
      detail: 'Hear from Jetking alumni',
      href: '/placements#placements-testimonials',
    },
  ];

  return (
    <nav
      aria-label="Next steps"
      className="v2-bar-glow overflow-hidden rounded-[12px] border border-[rgb(232_36_43/0.28)] bg-[var(--v2-ink-bar)] text-white xs:rounded-[14px] lg:rounded-[12px]"
    >
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:h-[68px] lg:grid-cols-none lg:flex-row lg:items-stretch 3xl:h-[72px]">
        {actions.map((action, index) => (
          <li
            key={action.label}
            className="flex-1 border-t border-white/12 first:border-t-0 sm:border-t-0 sm:border-l sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(2n+1)]:border-l-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
          >
            <Link
              href={action.href as Route}
              onClick={() =>
                action.event
                  ? track(action.event, {
                      persona: classification.persona,
                      source: 'home-v2-action-bar',
                      position: index + 1,
                    })
                  : undefined
              }
              className="flex min-h-[56px] items-center gap-3.5 px-4 py-3.5 transition-colors duration-200 hover:bg-[rgb(232_36_43/0.12)] xs:gap-4 xs:px-5 lg:h-full lg:px-5 lg:py-0 xl:px-6"
            >
              <action.icon
                className="v2-icon-glow h-5 w-5 shrink-0 text-[var(--v2-accent-soft,#ff4d54)] xs:h-6 xs:w-6"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-[14px] font-bold xs:text-[15px]">{action.label}</span>
                <span className="mt-0.5 block text-[12px] text-[var(--v2-ink-bar-muted)] xs:text-[12.5px]">
                  {action.detail}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
