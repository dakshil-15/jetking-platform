'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, X } from 'lucide-react';
import { usePersona } from './PersonaProvider';
import { dismissWelcome, isWelcomeDismissed } from './visitor';
import { track } from '@/lib/analytics';

/**
 * Same-browser resume prompt — driven by UserProfile.nextBestAction.
 *
 * Only for known visitors with a useful NBA (not cold "choose intent").
 * Never claims a personal name — we only know the browser / journey.
 */
export function WelcomeBack({ className = '' }: { className?: string }) {
  const { hydrated, visitor, profile } = usePersona();
  /*
   * Read the session dismissal in a lazy initialiser, not an effect. It is safe to
   * touch sessionStorage here: `canResume` requires `hydrated`, which is false on
   * the first client render, so this component renders `null` on the server and on
   * the hydration pass regardless of what the initialiser returns. Visibility is
   * then derived, which removes the setState-in-effect cascade entirely.
   */
  const [dismissed, setDismissed] = useState(isWelcomeDismissed);

  const nba = profile.nextBestAction;
  const canResume =
    hydrated &&
    visitor.state === 'known' &&
    nba.id !== 'choose-intent' &&
    (Boolean(profile.intent) || profile.stage !== 'discover' || profile.persona !== 'unknown');

  const visible = canResume && !dismissed;

  useEffect(() => {
    if (!visible) return;
    track('journey_resumed', {
      visitor_id: visitor.id,
      persona: profile.persona,
      stage: profile.stage,
      intent: profile.intent ?? '',
      nba: nba.id,
      continue_href: nba.href,
    });
  }, [visible, visitor.id, profile.persona, profile.stage, profile.intent, nba.id, nba.href]);

  function dismiss() {
    dismissWelcome();
    setDismissed(true);
  }

  if (!visible) return null;

  const headline = profile.intent
    ? `Welcome back! Continue your ${profile.intent} journey?`
    : `Welcome back! ${nba.label}?`;

  return (
    <div
      role="status"
      className={[
        'flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="min-w-0 text-left">
        <p className="text-[14px] font-medium text-[var(--v2-ink)] sm:text-[15px]">{headline}</p>
        {profile.intent && nba.id === 'book-counselling' ? (
          <p className="mt-0.5 text-[12px] text-[var(--v2-ink-muted)] sm:text-[13px]">
            Next: {nba.label}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={nba.href as Route}
          onClick={() => {
            track('nudge_clicked', {
              slot_id: 'welcome-back',
              persona: profile.persona,
              nba: nba.id,
              href: nba.href,
            });
            dismiss();
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--v2-accent)] px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90 sm:text-[14px]"
        >
          Continue
          <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-[var(--v2-ink-muted)] transition-colors hover:bg-white/10 hover:text-[var(--v2-ink)]"
          aria-label="Dismiss welcome back"
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
