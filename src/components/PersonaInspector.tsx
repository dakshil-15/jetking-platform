'use client';

import { useState } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { PERSONA_IDS, type PersonaId } from '@/persona/types';
import { clearBehaviour } from '@/persona/behaviour';
import { cx } from './ui';

/**
 * Persona inspector.
 *
 * Two jobs, both from the proposal:
 *   1. The stakeholder demo — "one site, four people, four journeys". Switch persona
 *      and watch the page re-compose live.
 *   2. The transparency guarantee — the proposal sells a system that is "fully
 *      editable by your team, transparent, no lock-in". This panel makes the signal
 *      trail visible, so that claim is verifiable rather than asserted.
 *
 * Gated behind NEXT_PUBLIC_SHOW_INSPECTOR=true so it can run on staging for
 * client review and stays off for every visitor by default (including local
 * `next dev` unless that env is set).
 */

const PERSONA_LABELS: Record<PersonaId, string> = {
  student: 'School-leaver',
  professional: 'Working professional',
  parent: 'Parent',
  franchise: 'Franchise investor',
  unknown: 'Unknown (cold start)',
};

export function PersonaInspector() {
  const { classification, hydrated, visitor, profile, override, overridden } = usePersona();
  const [open, setOpen] = useState(false);

  if (!hydrated) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] print:hidden">
      {open ? (
        <div className="mb-2 flex max-h-[min(70dvh,calc(100dvh-5.5rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[var(--radius-dialog)] border border-border bg-background shadow-[var(--shadow-lg)]">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <h2 className="label-mono">Persona engine</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer text-foreground-muted transition-colors hover:text-foreground"
              aria-label="Close persona inspector"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto overscroll-contain p-4">
            <div>
              <p className="text-sm text-foreground-muted">Currently classified as</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">
                {PERSONA_LABELS[classification.persona]}
              </p>
              <p className="label-mono mt-1">
                Visitor:{' '}
                <span className="text-foreground-secondary">
                  {visitor.id || '—'} ({visitor.state})
                </span>
              </p>
              <p className="label-mono mt-1">
                Channel:{' '}
                <span className="text-foreground-secondary">
                  {classification.acquisitionChannel ?? 'direct'}
                </span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div
                  className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-200"
                  role="img"
                  aria-label={`Confidence ${Math.round(classification.confidence * 100)} percent`}
                >
                  <div
                    className="h-full rounded-full bg-jk-600 transition-[width] duration-500"
                    style={{ width: `${Math.round(classification.confidence * 100)}%` }}
                  />
                </div>
                <span className="label-mono numeral">
                  {Math.round(classification.confidence * 100)}%
                </span>
              </div>
              {overridden ? (
                <p className="mt-2 text-xs font-medium text-signal-600">
                  Manually overridden — engine inference paused.
                </p>
              ) : null}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-foreground-secondary">User profile</p>
              <ul className="space-y-1 text-xs text-foreground-secondary">
                <li>
                  Intent:{' '}
                  <span className="font-medium text-foreground">{profile.intent ?? '—'}</span>
                </li>
                <li>
                  Stage:{' '}
                  <span className="font-medium text-foreground">{profile.stage}</span>
                </li>
                <li>
                  Returning:{' '}
                  <span className="font-medium text-foreground">
                    {profile.returning ? 'yes' : 'no'}
                  </span>
                </li>
                <li>
                  Next:{' '}
                  <span className="font-medium text-foreground">{profile.nextBestAction.label}</span>
                </li>
                <li className="text-foreground-muted">{profile.nextBestAction.reason}</li>
              </ul>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-foreground-secondary">Why — signal trail</p>
              {classification.signals.length === 0 ? (
                <p className="text-xs text-foreground-muted">
                  No signals yet. Browse a course or arrive via a campaign link.
                </p>
              ) : (
                <ul className="space-y-1.5">
                  {classification.signals.slice(0, 6).map((signal) => (
                    <li key={signal.id} className="flex items-start gap-2 text-xs">
                      <span className="label-mono numeral mt-0.5">
                        {signal.weight.toFixed(2)}
                      </span>
                      <span className="text-foreground-secondary">
                        {signal.detail}
                        <span className="ml-1 text-foreground-muted">→ {signal.persona}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-foreground-secondary">Simulate a visitor</p>
              <div className="grid grid-cols-2 gap-1.5">
                {PERSONA_IDS.map((persona) => (
                  <button
                    key={persona}
                    type="button"
                    onClick={() => override(persona)}
                    className={cx(
                      'cursor-pointer rounded-lg border px-2 py-1.5 text-left text-xs font-medium transition-colors',
                      classification.persona === persona
                        ? 'border-jk-300 bg-jk-50 text-jk-700'
                        : 'border-border-medium bg-surface text-foreground-secondary hover:border-border-strong',
                    )}
                  >
                    {PERSONA_LABELS[persona]}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => override(null)}
                  className="flex-1 cursor-pointer rounded-lg border border-border-medium bg-surface px-2 py-1.5 text-xs text-foreground-secondary transition-colors hover:border-border-strong"
                >
                  Resume inference
                </button>
                <button
                  type="button"
                  onClick={() => {
                    clearBehaviour();
                    window.location.reload();
                  }}
                  className="flex-1 cursor-pointer rounded-lg border border-border-medium bg-surface px-2 py-1.5 text-xs text-foreground-secondary transition-colors hover:border-border-strong"
                >
                  Reset all
                </button>
              </div>
            </div>

            <p className="label-mono border-t border-border pt-3">
              rules v{classification.version}
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground-secondary shadow-[var(--shadow-md)] transition-colors hover:border-border-strong"
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-jk-500" />
        {PERSONA_LABELS[classification.persona]}
      </button>
    </div>
  );
}
