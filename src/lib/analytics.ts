/**
 * Event layer.
 *
 * Vendor-neutral by design: `track()` is the only call site the app knows about.
 * GA4/GTM already exist at Jetking and carry over; PostHog is added for cohorts and
 * experimentation.
 */

export type EventName =
  | 'persona_classified'
  | 'persona_changed'
  | 'visitor_recognized'
  | 'journey_resumed'
  | 'identity_linked'
  | 'profile_updated'
  | 'journey_discovery_completed'
  | 'journey_course_selected'
  | 'journey_course_detail'
  | 'journey_soft_save'
  | 'journey_soft_save_skipped'
  | 'journey_roadmap_continue'
  | 'journey_counsel_submitted'
  | 'journey_step'
  | 'journey_start_clicked'
  | 'journey_continue_clicked'
  | 'nudge_shown'
  | 'nudge_clicked'
  | 'nudge_dismissed'
  | 'adaptive_slot_rendered'
  | 'guide_opened'
  | 'guide_message'
  | 'guide_cited'
  | 'guide_refused'
  | 'guide_handoff'
  | 'enquiry_started'
  | 'enquiry_submitted'
  | 'whatsapp_clicked'
  | 'course_viewed'
  | 'centre_viewed'
  | 'fee_section_viewed'
  | 'article_viewed'
  | 'course_clicked'
  | 'apply_clicked'
  | 'centre_searched'
  | 'blog_searched'
  | 'phone_clicked'
  | 'brochure_downloaded'
  | 'video_played'
  | 'scroll_depth';

export type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    posthog?: { capture: (event: string, props?: Record<string, unknown>) => void };
  }
}

const isDev = process.env.NODE_ENV === 'development';

export function track(event: EventName, props: EventProps = {}): void {
  if (typeof window === 'undefined') return;

  const payload = { ...props, ts: Date.now() };

  // GA4 / GTM — the existing Jetking analytics stack.
  window.dataLayer?.push({ event, ...payload });

  // PostHog — cohorts, funnels, experimentation.
  window.posthog?.capture(event, payload);

  if (isDev) {
    console.debug(`[event] ${event}`, payload);
  }
}

/**
 * Page-level context helper. Called by route components so behavioural signals and
 * analytics stay in step — one call records both.
 */
export function trackPageContext(
  event: Extract<EventName, 'course_viewed' | 'centre_viewed' | 'article_viewed'>,
  props: EventProps,
): void {
  track(event, props);
}
