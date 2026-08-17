'use client';

import { useEffect, useMemo, useRef } from 'react';
import type {
  HomepageVariant,
  PersonaRule,
  Testimonial,
  SuccessStory,
  VideoContent,
} from '@/lib/content/types';
import { usePersona } from './PersonaProvider';
import { AdaptiveList, type AdaptiveItem } from './AdaptiveSlot';
import { readBehaviour } from './behaviour';
import { resolveHomepageVariant, type RuleContext } from './ruleMatch';
import { track } from '@/lib/analytics';

/**
 * Picks the CMS homepage variant after hydration using persona + behaviour + rules.
 * SSR always renders the `fallback` variant (usually `default`).
 */
export function useHomepageVariant(
  rules: PersonaRule[],
  variants: HomepageVariant[],
  fallbackId = 'default',
): HomepageVariant {
  const { classification, hydrated } = usePersona();
  const reported = useRef(false);

  const variant = useMemo(() => {
    const fallback =
      variants.find((v) => v.id === fallbackId) ?? variants[0] ?? { id: 'default', label: 'Default' };
    if (!hydrated) return fallback;
    const behaviour = readBehaviour();
    const interest =
      behaviour.interests?.[0] ??
      behaviour.courseViews[behaviour.courseViews.length - 1]?.replace(/-/g, ' ');
    const ctx: RuleContext = {
      persona: classification.persona,
      locationCity: behaviour.lastCentre?.citySlug
        ? behaviour.lastCentre.citySlug.charAt(0).toUpperCase() +
          behaviour.lastCentre.citySlug.slice(1)
        : behaviour.geoCity,
      interest,
      returning: behaviour.visitCount > 1,
      visitCount: behaviour.visitCount,
      device:
        typeof navigator !== 'undefined' &&
        /mobile|android|iphone|ipad/i.test(navigator.userAgent)
          ? 'mobile'
          : 'desktop',
      path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      channel: classification.acquisitionChannel,
    };
    return resolveHomepageVariant(ctx, rules, variants);
  }, [
    hydrated,
    classification.persona,
    classification.acquisitionChannel,
    rules,
    variants,
    fallbackId,
  ]);

  useEffect(() => {
    if (!hydrated || reported.current) return;
    reported.current = true;
    track('adaptive_slot_rendered', {
      slot_id: 'homepage-variant',
      persona: classification.persona,
      strategy: 'emphasise',
      variant_id: variant.id,
    });
  }, [hydrated, classification.persona, variant.id]);

  return variant;
}

export function AdaptiveTestimonials({
  rules,
  variants,
  fallbackId = 'default',
}: {
  rules: PersonaRule[];
  variants: HomepageVariant[];
  fallbackId?: string;
}) {
  const variant = useHomepageVariant(rules, variants, fallbackId);
  const items: Testimonial[] = variant.testimonials ?? [];
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t.id} className="border-t border-border pt-5">
          <blockquote className="text-base text-foreground-secondary">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-sm text-foreground-muted">{t.role}</p>
        </li>
      ))}
    </ul>
  );
}

export function AdaptiveStories({
  rules,
  variants,
  fallbackId = 'default',
}: {
  rules: PersonaRule[];
  variants: HomepageVariant[];
  fallbackId?: string;
}) {
  const variant = useHomepageVariant(rules, variants, fallbackId);
  const items: SuccessStory[] = variant.stories ?? [];
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s.id} className="border-t border-border pt-5">
          <p className="font-semibold text-foreground">{s.title}</p>
          <p className="mt-2 text-sm text-foreground-secondary">{s.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export function AdaptiveVideo({
  rules,
  variants,
  fallbackId = 'default',
}: {
  rules: PersonaRule[];
  variants: HomepageVariant[];
  fallbackId?: string;
}) {
  const variant = useHomepageVariant(rules, variants, fallbackId);
  const video: VideoContent | undefined = variant.video;
  const { hydrated } = usePersona();
  const reported = useRef(false);

  useEffect(() => {
    if (!hydrated || !video || reported.current) return;
    reported.current = true;
    track('video_played', { title: video.title, variant_id: variant.id });
  }, [hydrated, video, variant.id]);

  if (!video) return null;

  return (
    <div className="aspect-video overflow-hidden rounded-[var(--radius-image)] border border-border bg-black">
      <iframe
        title={video.title}
        src={video.src}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function useVariantCourseBoost(
  rules: PersonaRule[],
  variants: HomepageVariant[],
  fallbackId = 'default',
): string[] {
  const variant = useHomepageVariant(rules, variants, fallbackId);
  return useMemo(() => variant.courseBoost ?? [], [variant]);
}

/** Eyebrow only — never swaps h1 (SEO-safe emphasise of CMS banner). */
export function AdaptiveHeroEyebrow({
  rules,
  variants,
  fallback,
  fallbackId = 'default',
}: {
  rules: PersonaRule[];
  variants: HomepageVariant[];
  fallback: string;
  fallbackId?: string;
}) {
  const { hydrated } = usePersona();
  const variant = useHomepageVariant(rules, variants, fallbackId);
  const eyebrow =
    hydrated && variant.banner?.eyebrow ? variant.banner.eyebrow : fallback;

  return <span className="label-mono block text-[var(--accent-ink)]">{eyebrow}</span>;
}

/**
 * @deprecated Explicit “who are you?” chooser removed from the live UX.
 * SilentPersonaInfer + rule/heuristic classify adapt the page without asking.
 * Kept as a no-op export so older imports do not break.
 */
export function ColdStartChooser(_props?: { id?: string }) {
  return null;
}

/** Featured courses with CMS courseBoost folded into AdaptiveList ordering. */
export function AdaptiveBoostedCourses({
  rules,
  variants,
  items,
  fallbackId = 'default',
}: {
  rules: PersonaRule[];
  variants: HomepageVariant[];
  items: AdaptiveItem[];
  fallbackId?: string;
}) {
  const boostKeys = useVariantCourseBoost(rules, variants, fallbackId);
  return (
    <AdaptiveList
      id="home-featured-courses"
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      items={items}
      boostKeys={boostKeys}
    />
  );
}
