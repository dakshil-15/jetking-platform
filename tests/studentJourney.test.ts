import { describe, expect, it } from 'vitest';
import type { Course } from '@/lib/content/types';
import {
  buildCareerRoadmap,
  recommendCourses,
  interestIntent,
  shouldShowJourneyPanel,
  type StudentDiscovery,
} from '@/persona/studentJourney';

const mockCourse = (slug: string, level: Course['level'] = 'certification'): Course => ({
  slug,
  title: slug.replace(/-/g, ' '),
  shortTitle: slug,
  level,
  duration: '6 months',
  eligibility: '10+2',
  summary: 'Summary',
  outcomes: ['Outcome A'],
  modules: ['Module A', 'Module B'],
  certifications: ['Cert A'],
  fees: { disclosed: false },
  personaRelevance: { student: 0.5 },
  seo: { title: slug, description: 'desc' },
  updatedAt: '2026-01-01T00:00:00.000Z',
});

const allCourses: Course[] = [
  mockCourse('ethical-hacking-specialist'),
  mockCourse('cloud-computing-engineer-ai'),
  mockCourse('routing-switching-administrator'),
  mockCourse('cloud-computing-professional-ai'),
  mockCourse('bca-cloud-cyber-security', 'degree'),
  mockCourse('pc-hardware-support', 'short'),
];

describe('student journey', () => {
  it('maps interest to intent label', () => {
    expect(interestIntent('cyber')).toBe('Cyber Security');
    expect(interestIntent('unsure')).toBe('Tech career');
  });

  it('ranks cyber interest highly for cyber courses', () => {
    const discovery: StudentDiscovery = { education: '12th', interest: 'cyber' };
    const recs = recommendCourses(allCourses, discovery, 3);
    expect(recs[0]?.slug).toBe('ethical-hacking-specialist');
  });

  it('builds a four-phase roadmap', () => {
    const course = mockCourse('cloud-computing-engineer-ai');
    const phases = buildCareerRoadmap(course, { education: '12th', interest: 'cloud' });
    expect(phases).toHaveLength(4);
    expect(phases[0]?.title).toBe('Foundation');
    expect(phases[3]?.title).toBe('Career launch');
  });

  it('hides journey panel until opted in', () => {
    expect(shouldShowJourneyPanel({ step: 'discover', recommendedSlugs: [], updatedAt: '' })).toBe(
      false,
    );
    expect(
      shouldShowJourneyPanel({
        step: 'discover',
        journeyStarted: true,
        recommendedSlugs: [],
        updatedAt: '',
      }),
    ).toBe(true);
    expect(
      shouldShowJourneyPanel({ step: 'recommend', recommendedSlugs: [], updatedAt: '' }),
    ).toBe(true);
  });
});
