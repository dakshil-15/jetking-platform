'use client';

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { useAccount } from '@/components/account/AccountProvider';
import { Button, Field, Input, Select } from '@/components/ui';
import { usePersona } from '@/persona/PersonaProvider';
import { linkVisitorIdentity } from '@/persona/visitor';
import { track } from '@/lib/analytics';

export interface EnquiryCentre {
  slug: string;
  name: string;
  citySlug: string;
  state: string;
}

export type QuickEnquiryStatus = 'idle' | 'submitting' | 'done' | 'error';

/**
 * The short lead form: name, mobile, state, centre. Shared by the "Enquire now" modal and the
 * card on the centres banner, so both collect the same fields, validate the same way and reach
 * the same `/api/enquiry` — `source` records which surface it came from.
 *
 * The centre list follows the chosen state, and a centre that no longer belongs to the state is
 * dropped, so the submitted pair is always consistent. A signed-in visitor's name, phone, state
 * and centre are pre-filled from their account.
 */
export function QuickEnquiryForm({
  centres,
  source,
  onStatusChange,
  successAction,
}: {
  centres: EnquiryCentre[];
  /** Which surface this form is on, e.g. `home-hero-modal` or `centres-hero-form`. */
  source: string;
  /** Lets a host (the modal) swap its own heading when the form is done. */
  onStatusChange?: (status: QuickEnquiryStatus) => void;
  /** Extra control shown under the thank-you message, e.g. the modal's Close button. */
  successAction?: React.ReactNode;
}) {
  const id = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const { classification, visitor, record } = usePersona();
  const { user } = useAccount();
  const [status, setStatus] = useState<QuickEnquiryStatus>('idle');
  const [error, setError] = useState('');
  // `null` = untouched, so the signed-in account's saved state/centre show through as defaults.
  const [stateChoice, setStateChoice] = useState<string | null>(null);
  const [centreChoice, setCentreChoice] = useState<string | null>(null);
  const state = stateChoice ?? user?.state ?? '';

  const states = useMemo(
    () => [...new Set(centres.map((c) => c.state).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [centres],
  );
  const stateCentres = useMemo(
    () => (state ? centres.filter((c) => c.state === state) : []),
    [centres, state],
  );
  const wantedCentre = centreChoice ?? user?.centre ?? '';
  const centre = stateCentres.some((c) => c.slug === wantedCentre) ? wantedCentre : '';

  function updateStatus(next: QuickEnquiryStatus) {
    setStatus(next);
    onStatusChange?.(next);
  }

  // The form is replaced by the thank-you panel, so move the reading position onto it.
  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    const form = new FormData(event.currentTarget);
    const chosen = stateCentres.find((c) => c.slug === centre);
    const phone = String(form.get('phone') ?? '');

    updateStatus('submitting');
    setError('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(form.get('name') ?? ''),
          phone,
          state: state || undefined,
          city: chosen?.citySlug,
          centre: chosen?.slug,
          persona: classification.persona,
          confidence: classification.confidence,
          source,
          visitorId: visitor.id || undefined,
        }),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        updateStatus('error');
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      updateStatus('done');
      track('enquiry_submitted', {
        persona: classification.persona,
        source,
        has_centre: Boolean(chosen),
        visitor_id: visitor.id,
      });
      record({ kind: 'form', formId: source, status: 'completed' });
      linkVisitorIdentity({ visitorId: visitor.id, phone });
    } catch {
      updateStatus('error');
      setError('We could not send that. Please check your connection and try again.');
    }
  }

  if (status === 'done') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="py-4 text-center focus:outline-none">
        <p className="font-display text-xl font-extrabold text-foreground">Thank you!</p>
        <p className="mt-3 text-[15px] leading-relaxed text-foreground-secondary">
          A counsellor from your chosen centre will get in touch, usually within one working day.
        </p>
        {successAction}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Your name" htmlFor={`${id}-name`} required>
        <Input
          id={`${id}-name`}
          name="name"
          key={`name-${user?.id ?? 'guest'}`}
          defaultValue={user?.name}
          minLength={2}
          maxLength={120}
          autoComplete="name"
        />
      </Field>

      <Field label="Mobile number" htmlFor={`${id}-phone`} required>
        <Input
          id={`${id}-phone`}
          name="phone"
          key={`phone-${user?.id ?? 'guest'}`}
          defaultValue={user?.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          pattern="[\d\s+\(\)\-]{10,20}"
          placeholder="+91 98765 43210"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="State" htmlFor={`${id}-state`} required>
          <Select
            id={`${id}-state`}
            value={state}
            onChange={(e) => {
              setStateChoice(e.target.value);
              setCentreChoice('');
            }}
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Centre" htmlFor={`${id}-centre`} required>
          <Select
            id={`${id}-centre`}
            value={centre}
            onChange={(e) => setCentreChoice(e.target.value)}
            disabled={stateCentres.length === 0}
          >
            <option value="">{stateCentres.length > 0 ? 'Select centre' : 'Select state first'}</option>
            {stateCentres.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-[var(--accent-ink)]">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="md" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Submitting…' : 'Submit'}
      </Button>

      <p className="text-center text-xs text-foreground-muted">
        We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}
