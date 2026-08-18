import { describe, expect, it } from 'vitest';
import {
  isOrganicSearch,
  isPaidSearch,
  resolveAcquisitionChannel,
} from '@/persona/channel';
import { classify } from '@/persona/classify';
import type { FirstTouchInput } from '@/persona/types';
import { matchRule, selectHomepageVariantId } from '@/persona/ruleMatch';
import type { PersonaRule } from '@/lib/content/types';

const base: FirstTouchInput = {
  path: '/',
  isMobile: false,
};

describe('acquisition channel — organic search', () => {
  it('detects Google organic (referrer, no paid markers)', () => {
    const input: FirstTouchInput = { ...base, referrerHost: 'www.google.co.in' };
    expect(isOrganicSearch(input)).toBe(true);
    expect(resolveAcquisitionChannel(input)).toBe('organic_search');
  });

  it('detects Bing organic', () => {
    const input: FirstTouchInput = { ...base, referrerHost: 'www.bing.com' };
    expect(isOrganicSearch(input)).toBe(true);
    expect(resolveAcquisitionChannel(input)).toBe('organic_search');
  });

  it('does not treat Google + gclid as organic', () => {
    const input: FirstTouchInput = {
      ...base,
      referrerHost: 'www.google.com',
      gclid: 'Cj0KCQjw',
    };
    expect(isPaidSearch(input)).toBe(true);
    expect(isOrganicSearch(input)).toBe(false);
    expect(resolveAcquisitionChannel(input)).toBe('paid_search');
  });

  it('does not treat utm_medium=cpc as organic', () => {
    const input: FirstTouchInput = {
      ...base,
      referrerHost: 'www.google.com',
      utmMedium: 'cpc',
      utmSource: 'google',
    };
    expect(isOrganicSearch(input)).toBe(false);
    expect(resolveAcquisitionChannel(input)).toBe('paid_search');
  });

  it('classifies channel on Classification without forcing a persona', () => {
    const result = classify({
      firstTouch: { ...base, referrerHost: 'www.google.com' },
    });
    expect(result.acquisitionChannel).toBe('organic_search');
    expect(result.persona).toBe('unknown');
  });

  it('CMS rules can match channel=organic_search', () => {
    const rule: PersonaRule = {
      id: 'seo-organic',
      label: 'Organic SEO',
      priority: 50,
      matchAll: true,
      conditions: [{ field: 'channel', op: 'eq', value: 'organic_search' }],
      homepageVariantId: 'default',
      enabled: true,
    };
    expect(
      matchRule(
        {
          persona: 'unknown',
          returning: false,
          visitCount: 1,
          channel: 'organic_search',
        },
        rule,
      ),
    ).toBe(true);
    expect(
      selectHomepageVariantId(
        { persona: 'unknown', returning: false, visitCount: 1, channel: 'organic_search' },
        [rule],
      ),
    ).toBe('default');
  });

  it('direct traffic with no referrer is direct', () => {
    expect(resolveAcquisitionChannel(base)).toBe('direct');
  });
});
