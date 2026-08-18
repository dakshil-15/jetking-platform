import { describe, expect, it } from 'vitest';
import { matchCondition, matchRule, selectHomepageVariantId } from '@/persona/ruleMatch';
import type { PersonaRule } from '@/lib/content/types';
import type { RuleContext } from '@/persona/ruleMatch';

const baseCtx: RuleContext = {
  persona: 'student',
  returning: false,
  visitCount: 1,
};

describe('CMS rule matcher', () => {
  it('matches AI Mumbai returning rule', () => {
    const rule: PersonaRule = {
      id: 'ai-mumbai-returning',
      label: 'AI Mumbai',
      priority: 100,
      matchAll: true,
      conditions: [
        { field: 'location.city', op: 'eq', value: 'Mumbai' },
        { field: 'interest', op: 'contains', value: 'AI' },
        { field: 'returning', op: 'eq', value: true },
      ],
      homepageVariantId: 'ai-mumbai',
      enabled: true,
    };

    const ctx: RuleContext = {
      ...baseCtx,
      locationCity: 'Mumbai',
      interest: 'AI cloud',
      returning: true,
      visitCount: 3,
    };

    expect(matchRule(ctx, rule)).toBe(true);
    expect(selectHomepageVariantId(ctx, [rule])).toBe('ai-mumbai');
  });

  it('fails when any ALL-condition misses', () => {
    expect(
      matchCondition(
        { ...baseCtx, locationCity: 'Pune' },
        { field: 'location.city', op: 'eq', value: 'Mumbai' },
      ),
    ).toBe(false);
  });

  it('falls back to default when nothing matches', () => {
    expect(selectHomepageVariantId(baseCtx, [])).toBe('default');
  });

  it('prefers higher priority rules', () => {
    const rules: PersonaRule[] = [
      {
        id: 'low',
        label: 'student',
        priority: 10,
        matchAll: true,
        conditions: [{ field: 'persona', op: 'eq', value: 'student' }],
        homepageVariantId: 'student',
        enabled: true,
      },
      {
        id: 'high',
        label: 'mumbai',
        priority: 100,
        matchAll: true,
        conditions: [{ field: 'location.city', op: 'eq', value: 'Mumbai' }],
        homepageVariantId: 'ai-mumbai',
        enabled: true,
      },
    ];
    expect(
      selectHomepageVariantId({ ...baseCtx, locationCity: 'Mumbai' }, rules),
    ).toBe('ai-mumbai');
  });
});
