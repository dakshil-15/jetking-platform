import { describe, expect, it } from 'vitest';
import { EMPTY_BEHAVIOUR, RULES_VERSION, type BehaviourInput, type Classification } from '@/persona/types';
import {
  buildUserProfile,
  deriveIntent,
  deriveNextBestAction,
  deriveStage,
  formatIntentLabel,
} from '@/persona/profile';

const baseClassification = (persona: Classification['persona'], confidence = 0.9): Classification => ({
  persona,
  confidence,
  signals: [],
  version: RULES_VERSION,
  classifiedAt: '2026-01-01T00:00:00.000Z',
  acquisitionChannel: 'direct',
});

describe('formatIntentLabel', () => {
  it('normalises known tags', () => {
    expect(formatIntentLabel('ai')).toBe('AI');
    expect(formatIntentLabel('cyber')).toBe('Cyber Security');
    expect(formatIntentLabel('cloud')).toBe('Cloud');
  });
});

describe('deriveIntent', () => {
  it('prefers an explicit lock', () => {
    const behaviour: BehaviourInput = {
      ...EMPTY_BEHAVIOUR,
      interests: ['cloud'],
      lastCourse: 'cyber-security-specialist',
    };
    expect(
      deriveIntent(behaviour, {
        intent: 'AI Career',
        intentKey: 'ai',
        lockedAt: '2026-01-01',
      }),
    ).toEqual({ intent: 'AI Career', intentKey: 'ai' });
  });

  it('uses latest interest then last course', () => {
    expect(
      deriveIntent(
        { ...EMPTY_BEHAVIOUR, interests: ['cloud', 'cyber'] },
        null,
      ).intent,
    ).toBe('Cyber Security');

    expect(
      deriveIntent(
        { ...EMPTY_BEHAVIOUR, lastCourse: 'cloud-devops-engineer' },
        null,
      ).intentKey,
    ).toBe('cloud-devops-engineer');
  });
});

describe('deriveStage', () => {
  it('starts at discover', () => {
    expect(deriveStage(EMPTY_BEHAVIOUR)).toBe('discover');
  });

  it('moves to explore on first course view', () => {
    expect(
      deriveStage({ ...EMPTY_BEHAVIOUR, courseViews: ['cloud-devops-engineer'], lastCourse: 'cloud-devops-engineer' }),
    ).toBe('explore');
  });

  it('moves to compare on fees or multiple courses', () => {
    expect(deriveStage({ ...EMPTY_BEHAVIOUR, feeDepthViews: 1, courseViews: ['a'] })).toBe('compare');
    expect(deriveStage({ ...EMPTY_BEHAVIOUR, courseViews: ['a', 'b'] })).toBe('compare');
  });

  it('moves to counsel / admit via enquiry forms', () => {
    expect(
      deriveStage({
        ...EMPTY_BEHAVIOUR,
        formAttempts: [{ formId: 'enquiry', status: 'started', at: '2026-01-01' }],
      }),
    ).toBe('counsel');

    expect(
      deriveStage({
        ...EMPTY_BEHAVIOUR,
        formAttempts: [{ formId: 'enquiry', status: 'completed', at: '2026-01-01' }],
      }),
    ).toBe('admit');
  });
});

describe('deriveNextBestAction', () => {
  it('asks unknown discoverers to choose intent', () => {
    const nba = deriveNextBestAction({
      persona: 'unknown',
      confidence: 0,
      stage: 'discover',
    });
    expect(nba.id).toBe('choose-intent');
    expect(nba.href).toBe('/');
  });

  it('sends comparing students to counselling', () => {
    const nba = deriveNextBestAction({
      persona: 'student',
      confidence: 0.95,
      stage: 'compare',
      intent: 'Cyber Security',
      lastCourse: 'cyber-security-specialist',
    });
    expect(nba.id).toBe('book-counselling');
    expect(nba.label).toMatch(/counselling/i);
  });

  it('resumes last course while exploring', () => {
    const nba = deriveNextBestAction({
      persona: 'student',
      confidence: 0.9,
      stage: 'explore',
      intent: 'Cloud',
      lastCourse: 'cloud-devops-engineer',
    });
    expect(nba.id).toBe('continue-course');
    expect(nba.href).toBe('/courses/cloud-devops-engineer');
  });
});

describe('buildUserProfile', () => {
  it('assembles persona + intent + stage + nba', () => {
    const profile = buildUserProfile({
      visitorId: 'JK_TEST123456',
      returning: true,
      classification: baseClassification('student'),
      behaviour: {
        ...EMPTY_BEHAVIOUR,
        interests: ['cyber'],
        courseViews: ['cyber-security-specialist', 'cloud-devops-engineer'],
        lastCourse: 'cloud-devops-engineer',
        feeDepthViews: 1,
      },
      now: '2026-08-05T00:00:00.000Z',
    });

    expect(profile.persona).toBe('student');
    expect(profile.intent).toBe('Cyber Security');
    expect(profile.stage).toBe('compare');
    expect(profile.returning).toBe(true);
    expect(profile.nextBestAction.id).toBe('book-counselling');
    expect(profile.updatedAt).toBe('2026-08-05T00:00:00.000Z');
  });
});
