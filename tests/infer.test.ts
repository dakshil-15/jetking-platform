import { describe, expect, it } from 'vitest';
import { heuristicInfer, type InferPayload } from '@/persona/infer';

const emptyBehaviour: InferPayload['behaviour'] = {
  courseViews: [],
  levelViews: [],
  feeDepthViews: 0,
  centreViews: 0,
  franchiseViews: 0,
  categoryViews: [],
  visitCount: 1,
  interests: [],
};

describe('heuristicInfer — silent classification', () => {
  it('returns unknown with no evidence', () => {
    const result = heuristicInfer({ signals: [], behaviour: emptyBehaviour });
    expect(result.persona).toBe('unknown');
  });

  it('infers franchise from franchise engagement', () => {
    const result = heuristicInfer({
      signals: [],
      behaviour: { ...emptyBehaviour, franchiseViews: 3 },
    });
    expect(result.persona).toBe('franchise');
    expect(result.confidence).toBeGreaterThanOrEqual(0.35);
  });

  it('infers parent from fee + centre depth', () => {
    const result = heuristicInfer({
      signals: [],
      behaviour: { ...emptyBehaviour, feeDepthViews: 3, centreViews: 2 },
    });
    expect(result.persona).toBe('parent');
  });

  it('infers student from degree level views', () => {
    const result = heuristicInfer({
      signals: [],
      behaviour: {
        ...emptyBehaviour,
        levelViews: ['degree', 'degree'],
        courseViews: ['bca-cloud-cyber-security'],
      },
    });
    expect(result.persona).toBe('student');
  });

  it('does not classify a visitor as student from topic interest alone', () => {
    // Cloud/cyber/AI subjects span both degree and short/certification
    // programmes, so browsing them says nothing about student vs.
    // professional on its own — a working professional researching the same
    // subjects should not be nudged toward "student" by topic tags alone.
    const result = heuristicInfer({
      signals: [],
      behaviour: { ...emptyBehaviour, interests: ['cloud', 'cyber', 'ai', 'cloud', 'cyber'] },
    });
    expect(result.persona).not.toBe('student');
  });

  it('infers professional from short/certification views regardless of topic tags', () => {
    const result = heuristicInfer({
      signals: [],
      behaviour: {
        ...emptyBehaviour,
        levelViews: ['certification', 'certification'],
        interests: ['cloud', 'cyber'],
      },
    });
    expect(result.persona).toBe('professional');
  });
});
