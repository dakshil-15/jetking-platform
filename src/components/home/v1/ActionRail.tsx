'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { ReactNode } from 'react';
import { CalendarDays, MapPin, Phone } from 'lucide-react';
import { track } from '@/lib/analytics';
import { usePersona } from '@/persona/PersonaProvider';
import { siteConfig } from '@/lib/site';
import { cx } from '@/components/ui';

/**
 * Standing quick actions from the homepage lead (Find Center / Call / Book).
 * The AI Guide lives on the global Guide launcher — not duplicated here.
 *
 * Below `xl`: a horizontal row under the chooser (in document flow).
 * From `xl` up: fixed on the right edge, sharing the `right-4` gutter with
 * the Guide launcher below it.
 *
 * "Call us" only renders as a `tel:` link when NEXT_PUBLIC_PHONE is configured.
 * Otherwise it points at /centres, whose pages carry each centre's real number.
 *
 * Tokens fall back across v1/v2 so the same rail can sit on either lead.
 */

const RAIL_CLASS =
  'grid h-[54px] w-[54px] place-items-center rounded-full bg-white text-ink-900 shadow-[0_0_18px_rgb(232_36_43/0.28),0_8px_24px_rgb(0_0_0/0.25)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] group-hover/rail:-translate-y-0.5 group-hover/rail:shadow-[0_0_28px_rgb(232_36_43/0.55),0_0_48px_rgb(232_36_43/0.25)]';

function Item({
  icon,
  label,
  onClick,
  href,
}: {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const body = (
    <>
      {icon}
      <span className="text-[12.5px] font-semibold text-[var(--v1-ink-secondary,var(--v2-ink-secondary,#43434e))]">
        {label}
      </span>
    </>
  );

  const shell = 'group/rail flex flex-col items-center gap-2 text-center';

  if (href) {
    return href.startsWith('tel:') ? (
      <a href={href} onClick={onClick} className={shell}>
        {body}
      </a>
    ) : (
      <Link href={href as Route} onClick={onClick} className={shell}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cx(shell, 'cursor-pointer')}>
      {body}
    </button>
  );
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rounded-full bg-[rgb(198_198_210)] xl:my-0"
    />
  );
}

export function ActionRail({
  className,
  source = 'home-rail',
}: {
  className?: string;
  /** Analytics source tag — distinguish v1 vs v2 leads. */
  source?: string;
}) {
  const { classification } = usePersona();
  const hasPhone = siteConfig.phone.length > 0;

  return (
    <nav
      aria-label="Quick actions"
      className={cx(
        'flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6',
        /* Same right gutter as Guide launcher (right-4); vertically centered on the viewport.
           Fixed vertical on the right from lg2 (1200px) — where the hero becomes two-column
           and reserves this gutter. Below that the hero is stacked and the rail sits inline. */
        'lg2:fixed lg2:right-4 lg2:top-1/2 lg2:-translate-y-1/2 lg2:z-30 lg2:w-[135px] lg2:flex-col lg2:flex-nowrap lg2:items-center lg2:justify-start lg2:gap-4',
        className,
      )}
    >
      <Item
        label="Find Center"
        href="/centres"
        icon={
          <span className={RAIL_CLASS}>
            <MapPin className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        }
      />

      <Separator />

      <Item
        label={hasPhone ? 'Call Us' : 'Call a Center'}
        href={hasPhone ? `tel:${siteConfig.phone}` : '/centres'}
        onClick={() =>
          track('phone_clicked', {
            persona: classification.persona,
            source,
            resolved: hasPhone ? 'national-line' : 'centre-directory',
          })
        }
        icon={
          <span className={RAIL_CLASS}>
            <Phone className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        }
      />

      <Separator />

      <Item
        label="Book Counselling"
        href="/enquiry"
        onClick={() =>
          track('enquiry_started', { persona: classification.persona, source })
        }
        icon={
          <span className={RAIL_CLASS}>
            <CalendarDays className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        }
      />
    </nav>
  );
}
