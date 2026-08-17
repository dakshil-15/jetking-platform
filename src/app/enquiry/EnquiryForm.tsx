'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePersona } from '@/persona/PersonaProvider';
import { linkVisitorIdentity } from '@/persona/visitor';
import { clearHandoff, readHandoff, type GuideHandoffPayload } from '@/guide/handoff';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';
import { Button, Field, Input, Notice, Select, Textarea } from '@/components/ui';

/**
 * Enquiry form.
 *
 * Persona context is attached to the submission so the counsellor sees how the lead
 * arrived and what it was reading — that context is the practical payoff of the
 * whole persona engine, and it is what "the AI warms the lead" means in the proposal.
 *
 * When the visitor arrives from the Guide handoff, conversation summary is prefilled
 * into the message and sent as `guideSummary` for CRM routing.
 */

interface Option {
  slug: string;
  title?: string;
  name?: string;
}

type Status = 'idle' | 'submitting' | 'done' | 'error';

const INTRO: Record<string, string> = {
  student: 'Tell us where you are in your studies and we will point you to the right track.',
  professional: 'Tell us your current role and what you want to move into.',
  parent: 'Tell us a little about your child’s situation and what you would like to know.',
  franchise: 'Tell us which territory you are interested in and we will connect you with the franchise team.',
  unknown: 'Tell us what you are looking for.',
};

function resolveGuidePrefill(searchParams: URLSearchParams): {
  handoff: GuideHandoffPayload | null;
  course: string;
  city: string;
  message: string;
} {
  const stored = typeof window !== 'undefined' ? readHandoff() : null;
  if (stored) {
    return {
      handoff: stored,
      course: stored.courseSlug ?? '',
      city: stored.citySlug ?? '',
      message: `I was chatting with the Jetking Guide and would like a counsellor to follow up.\n\n${
        stored.lastQuestion
          ? `Last question: ${stored.lastQuestion}`
          : stored.summary.slice(0, 500)
      }`,
    };
  }

  if (searchParams.get('from') === 'guide') {
    return {
      handoff: null,
      course: searchParams.get('course') ?? '',
      city: searchParams.get('city') ?? '',
      message: '',
    };
  }

  return { handoff: null, course: '', city: '', message: '' };
}

export function EnquiryForm({ courses, cities }: { courses: Option[]; cities: Option[] }) {
  const { classification, visitor, profile, record } = usePersona();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const startedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  const prefill = useMemo(() => resolveGuidePrefill(searchParams), [searchParams]);

  // Move the reading position onto whichever outcome panel just appeared.
  useEffect(() => {
    if (status === 'done') successRef.current?.focus();
    if (status === 'error') errorRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('enquiry_started', {
      persona: classification.persona,
      from_guide: Boolean(prefill.handoff) || searchParams.get('from') === 'guide',
    });
    record({ kind: 'form', formId: 'enquiry', status: 'started' });
  }, [classification.persona, record, prefill.handoff, searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          phone: form.get('phone'),
          email: form.get('email') || undefined,
          city: form.get('city') || undefined,
          courseSlug: form.get('courseSlug') || undefined,
          message: form.get('message') || undefined,
          persona: classification.persona,
          confidence: classification.confidence,
          source: prefill.handoff ? 'guide-handoff' : window.location.pathname,
          guideSummary: prefill.handoff?.summary,
          guideReason: prefill.handoff?.reason,
          visitorId: visitor.id || undefined,
          // Rich profile context for CRM / counsellor routing.
          journeyStage: profile.stage,
          intent: profile.intent,
        }),
      });

      const data: { ok?: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        setStatus('error');
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      const phone = String(form.get('phone') ?? '');
      const email = String(form.get('email') ?? '');
      const linked = linkVisitorIdentity({
        visitorId: visitor.id,
        phone,
        email: email || undefined,
      });
      if (linked) {
        track('identity_linked', {
          visitor_id: linked.visitorId,
          has_phone: Boolean(linked.phone),
          has_email: Boolean(linked.email),
        });
      }

      setStatus('done');
      clearHandoff();
      track('enquiry_submitted', {
        persona: classification.persona,
        confidence: classification.confidence,
        has_course: Boolean(form.get('courseSlug')),
        from_guide: Boolean(prefill.handoff),
        visitor_id: visitor.id,
        stage: profile.stage,
        intent: profile.intent ?? '',
      });
      record({ kind: 'form', formId: 'enquiry', status: 'completed' });
    } catch {
      setStatus('error');
      setError('We could not send that. Please check your connection and try again.');
    }
  }

  if (status === 'done') {
    return (
      /*
       * The form is replaced by this panel, so focus would otherwise fall back to
       * <body> and a screen reader user would hear nothing at all — the submission
       * appears to have done nothing. `tabIndex={-1}` plus the focus effect below
       * moves the reading position onto the confirmation, and `role="status"`
       * announces it (WCAG 3.3.1, 4.1.3).
       */
      <div ref={successRef} tabIndex={-1} role="status" className="focus:outline-none">
        <Notice tone="success" title="Thank you — that has reached us.">
          <p>
            A counsellor from your nearest centre will be in touch, usually within one
            working day.
          </p>
          {siteConfig.whatsappNumber ? (
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_clicked', { persona: classification.persona })}
              className="link-underline mt-4 inline-flex items-center gap-1.5 font-semibold text-jk-600"
            >
              Prefer WhatsApp? Message us now
              <span aria-hidden="true">→</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </Notice>
      </div>
    );
  }

  return (
    /*
     * `noValidate` was suppressing native constraint validation while nothing
     * replaced it — every `required` and `pattern` on the fields below was inert,
     * so an empty form went to the server and came back as one generic banner with
     * no indication of which field was at fault. There is no custom validator here,
     * so letting the browser do it restores per-field, per-locale, assistive-tech
     * -aware errors for free (WCAG 3.3.1, 3.3.3).
     */
    <form onSubmit={handleSubmit} className="space-y-7">
      <p className="text-base text-foreground-secondary">
        {INTRO[classification.persona] ?? INTRO.unknown}
      </p>

      {prefill.handoff ? (
        <Notice tone="accent">
          Your Guide conversation will be shared with the counsellor so they have context.
        </Notice>
      ) : null}

      <Field label="Your name" htmlFor="name" required>
        <Input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name" />
      </Field>

      <Field
        label="Phone number"
        htmlFor="phone"
        required
        hint="A counsellor will call or message you on this."
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          pattern="[\d\s+()-]{10,20}"
        />
      </Field>

      <Field label="Email" htmlFor="email" hint="Optional.">
        <Input id="email" name="email" type="email" maxLength={200} autoComplete="email" />
      </Field>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Nearest city" htmlFor="city">
          <Select id="city" name="city" defaultValue={prefill.city}>
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Programme of interest" htmlFor="courseSlug">
          <Select id="courseSlug" name="courseSlug" defaultValue={prefill.course}>
            <option value="">Not sure yet</option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.title}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Anything you would like to ask?" htmlFor="message">
        <Textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          defaultValue={prefill.message}
          key={prefill.message ? 'with-guide' : 'blank'}
        />
      </Field>

      {error ? (
        <p
          ref={errorRef}
          role="alert"
          tabIndex={-1}
          className="rounded-[var(--radius-input)] border border-jk-200 bg-jk-50 px-4 py-3 text-sm font-medium text-jk-700 focus:outline-none"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </Button>

      <p className="text-sm text-foreground-muted">
        We use your details only to respond to this enquiry.
      </p>
    </form>
  );
}
