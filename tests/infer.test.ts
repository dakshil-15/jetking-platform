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
});
