'use client';

import { useRef, useState } from 'react';
import { Clock3 } from 'lucide-react';
import { usePersona } from '@/persona/PersonaProvider';
import { linkVisitorIdentity } from '@/persona/visitor';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'done' | 'error';

export function FranchiseEnquiryForm() {
  const { classification, visitor, record } = usePersona();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const startedRef = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setError('');

    const investmentCapacity = String(data.get('investmentCapacity') ?? '').trim();
    const payload = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      city: String(data.get('city') ?? ''),
      message: investmentCapacity
        ? `Franchise enquiry from landing page form. Investment Capacity: ${investmentCapacity}.`
        : 'Franchise enquiry from landing page form.',
      persona: 'franchise' as const,
      confidence: classification.confidence,
      source: 'franchise-landing',
      visitorId: visitor.id || undefined,
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Something went wrong. Please try again.');
      }

      setStatus('done');
      form.reset();
      record({ kind: 'form', formId: 'franchise-enquiry', status: 'completed' });
      track('enquiry_submitted', { persona: 'franchise', source: 'franchise-landing' });
      linkVisitorIdentity({
        visitorId: visitor.id,
        phone: payload.phone,
        email: payload.email || undefined,
      });
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  function handleFocus() {
    if (startedRef.current) return;
    startedRef.current = true;
    record({ kind: 'form', formId: 'franchise-enquiry', status: 'started' });
    track('enquiry_started', { persona: 'franchise', source: 'franchise-landing' });
  }

  if (status === 'done') {
    return (
      <div className="fra-form-card p-8 text-center">
        <p className="font-display text-xl font-extrabold text-[var(--v2-ink)]">Thank you!</p>
        <p className="mt-3 text-[15px] text-[var(--v2-ink-secondary)]">
          Our franchise team will get in touch with you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFocus} className="fra-form-card p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="fra-field">
          <label htmlFor="fra-name" className="fra-field-label">
            Name <span className="text-[var(--v2-accent-soft)]">*</span>
          </label>
          <input
            id="fra-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your full name"
            className="fra-input"
          />
        </div>

        <div className="fra-field">
          <label htmlFor="fra-phone" className="fra-field-label">
            Mobile Number <span className="text-[var(--v2-accent-soft)]">*</span>
          </label>
          <input
            id="fra-phone"
            name="phone"
            type="tel"
            required
            minLength={10}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            className="fra-input"
          />
        </div>

        <div className="fra-field">
          <label htmlFor="fra-email" className="fra-field-label">
            Email Address
          </label>
          <p className="fra-field-hint">Optional.</p>
          <input
            id="fra-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="fra-input"
          />
        </div>

        <div className="fra-field">
          <label htmlFor="fra-city" className="fra-field-label">
            Preferred Location
          </label>
          <input
            id="fra-city"
            name="city"
            type="text"
            placeholder="City or territory"
            className="fra-input"
          />
        </div>

        <div className="fra-field">
          <label htmlFor="fra-investment" className="fra-field-label">
            Investment Capacity <span className="text-[var(--v2-accent-soft)]">*</span>
          </label>
          <select
            id="fra-investment"
            name="investmentCapacity"
            required
            className="fra-input"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="UPTO 50 L">UPTO 50 L</option>
            <option value="UPTO 1 CR">UPTO 1 CR</option>
            <option value="UPTO 3 CR">UPTO 3 CR</option>
          </select>
        </div>
      </div>

      {error ? (
        <div className="fra-form-notice mt-6" role="alert">
          <strong>Could not submit</strong>
          <p className="mt-1 text-[14px] text-[var(--v2-ink-secondary)]">{error}</p>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="v2-cta-glow mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Get Franchise Details'}
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--v2-ink-muted)]">
        <Clock3 className="h-4 w-4 shrink-0 text-[var(--v2-franchise-ink)]" strokeWidth={2} aria-hidden="true" />
        Our team will get in touch with you within 24 hours!
      </p>
    </form>
  );
}
