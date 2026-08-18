import { describe, expect, it } from 'vitest';
import { classify } from '@/persona/classify';
import { CONFIDENCE_THRESHOLD, EMPTY_BEHAVIOUR, type FirstTouchInput } from '@/persona/types';

/**
 * Rule-matrix coverage for the persona classifier.
 *
 * This is the highest-value test file in the project: the classifier decides what
 * every visitor sees, and a silent regression here degrades the entire adaptive layer
 * without breaking a single page.
 */

const base: FirstTouchInput = {
  path: '/',
  isMobile: false,
};

describe('classify — cold start', () => {
  it('returns unknown with no signals at all', () => {
    const result = classify({});
    expect(result.persona).toBe('unknown');
    expect(result.confidence).toBe(0);
  });

  it('returns unknown for a bare homepage visit on mobile', () => {
    // Only weak signals available — deliberately not enough to commit to a persona.
    const result = classify({ firstTouch: { ...base, isMobile: true } });
    expect(result.persona).toBe('unknown');
  });

  it('treats unknown as a first-class outcome, not an error', () => {
    const result = classify({ firstTouch: base });
    expect(result.signals).toBeDefined();
    expect(result.version).toBeTruthy();
  });
});

describe('classify — first-touch path signals', () => {
  it('classifies a franchise landing as franchise with high confidence', () => {
    const result = classify({ firstTouch: { ...base, path: '/franchise' } });
    expect(result.persona).toBe('franchise');
    expect(result.confidence).toBeGreaterThan(0.9);
  });

  it('classifies a BCA degree landing as student', () => {
    const result = classify({
      firstTouch: { ...base, path: '/courses/bca-cloud-cyber-security' },
    });
    expect(result.persona).toBe('student');
  });

  it('classifies a placements landing as parent', () => {
    const result = classify({ firstTouch: { ...base, path: '/placements' } });
    expect(result.persona).toBe('parent');
  });
});

describe('classify — campaign attribution', () => {
  it('maps a known campaign to its persona', () => {
    const result = classify({
      firstTouch: { ...base, utmCampaign: 'upskill' },
    });
    expect(result.persona).toBe('professional');
  });

  it('matches campaigns by substring so dated variants still resolve', () => {
    const result = classify({
      firstTouch: { ...base, utmCampaign: 'summer-after-12th-2026' },
    });
    expect(result.persona).toBe('student');
  });

  it('ignores an unmapped campaign rather than guessing', () => {
    const result = classify({
      firstTouch: { ...base, utmCampaign: 'brand-awareness-generic' },
    });
    expect(result.persona).toBe('unknown');
  });
});

describe('classify — referrer signals', () => {
  it('treats a job portal as a professional signal', () => {
    const result = classify({
      firstTouch: { ...base, referrerHost: 'www.naukri.com' },
    });
    expect(result.persona).toBe('professional');
  });

  it('does not commit on a weak referrer alone', () => {
    // YouTube is 0.25 — below the threshold by itself, and it should stay that way.
    const result = classify({ firstTouch: { ...base, referrerHost: 'www.youtube.com' } });
    expect(result.persona).toBe('unknown');
  });
});

describe('classify — behavioural signals', () => {
  it('classifies repeated degree views as student', () => {
    const result = classify({
      behaviour: { ...EMPTY_BEHAVIOUR, levelViews: ['degree', 'degree', 'degree'] },
    });
    expect(result.persona).toBe('student');
  });

  it('classifies deep fee engagement as parent', () => {
    const result = classify({
      behaviour: { ...EMPTY_BEHAVIOUR, feeDepthViews: 3 },
    });
    expect(result.persona).toBe('parent');
  });

  it('classifies franchise engagement as franchise', () => {
    const result = classify({
      behaviour: { ...EMPTY_BEHAVIOUR, franchiseViews: 2 },
    });
    expect(result.persona).toBe('franchise');
  });

  it('applies diminishing returns so one obsessive signal cannot pin confidence at 1', () => {
    const result = classify({
      behaviour: { ...EMPTY_BEHAVIOUR, feeDepthViews: 50 },
    });
    expect(result.confidence).toBeLessThan(0.7);
  });
});

describe('classify — signal combination', () => {
  it('combines first-touch and behaviour into higher confidence', () => {
    const firstTouchOnly = classify({
      firstTouch: { ...base, utmCampaign: 'upskill' },
    });
    const combined = classify({
      firstTouch: { ...base, utmCampaign: 'upskill' },
      behaviour: { ...EMPTY_BEHAVIOUR, levelViews: ['certification', 'short'] },
    });
    expect(combined.confidence).toBeGreaterThan(firstTouchOnly.confidence);
    expect(combined.persona).toBe('professional');
  });

  it('does not let three weak signals outrank one decisive signal', () => {
    // The reason combination is probabilistic-OR rather than a sum.
    const decisive = classify({ firstTouch: { ...base, path: '/franchise' } });
    const weak = classify({
      firstTouch: {
        ...base,
        path: '/franchise',
        referrerHost: 'www.youtube.com',
        isMobile: true,
        hourIst: 23,
      },
    });
    expect(weak.persona).toBe('franchise');
    expect(decisive.persona).toBe('franchise');
  });

  it('reduces confidence when the runner-up is close', () => {
    const result = classify({
      behaviour: {
        ...EMPTY_BEHAVIOUR,
        levelViews: ['degree'],
        feeDepthViews: 1,
      },
    });
    // Student and parent are near-tied here; confidence should reflect the ambiguity.
    if (result.persona !== 'unknown') {
      expect(result.confidence).toBeLessThan(0.75);
    }
  });
});

describe('classify — deduplication', () => {
  it('does not inflate confidence when a prior signal repeats', () => {
    const prior = classify({ firstTouch: { ...base, utmCampaign: 'upskill' } });

    const repeated = classify({
      priorSignals: prior.signals,
      firstTouch: { ...base, utmCampaign: 'upskill' },
    });

    // Same evidence twice must not read as stronger evidence.
    expect(repeated.confidence).toBeCloseTo(prior.confidence, 3);
  });
});

describe('classify — threshold discipline', () => {
  it('never returns a known persona below the confidence threshold', () => {
    const inputs: FirstTouchInput[] = [
      { ...base, isMobile: true },
      { ...base, hourIst: 23 },
      { ...base, referrerHost: 'www.facebook.com' },
      { ...base, referrerHost: 'www.youtube.com', isMobile: true },
    ];

    for (const firstTouch of inputs) {
      const result = classify({ firstTouch });
      if (result.persona !== 'unknown') {
        expect(result.confidence).toBeGreaterThanOrEqual(CONFIDENCE_THRESHOLD);
      }
    }
  });

  it('always reports the rules version for auditability', () => {
    const result = classify({ firstTouch: { ...base, path: '/franchise' } });
    expect(result.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('always carries a signal trail explaining the decision', () => {
    const result = classify({ firstTouch: { ...base, path: '/franchise' } });
    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.signals[0]?.detail).toBeTruthy();
  });
});
