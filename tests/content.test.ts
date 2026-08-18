import { describe, expect, it } from 'vitest';
import { localSource } from '@/lib/content/sources/local';
import { trustSignals } from '@/lib/content/fixtures/trust';
import { courses } from '@/lib/content/fixtures/courses';
import { posts } from '@/lib/content/fixtures/posts';

/**
 * Content-layer invariants.
 *
 * These guard the rules that are easy to break by editing a fixture, where nothing
 * would fail loudly until the claim was already public.
 */

describe('trust signals — unverified claims are unrenderable', () => {
  it('exposes only verified signals that carry a named source', async () => {
    const published = await localSource.listTrustSignals();
    for (const signal of published) {
      expect(signal.verified).toBe(true);
      expect(signal.source).toBeTruthy();
    }
  });

  it('filters at the source, so a template cannot opt out of the check', async () => {
    const published = await localSource.listTrustSignals();
    const unverified = trustSignals.filter((s) => !s.verified);
    for (const signal of unverified) {
      expect(published.find((p) => p.id === signal.id)).toBeUndefined();
    }
  });

  it('requires every signal to declare provenance, verified or not', () => {
    // Even an unverified claim must say where it came from, or it cannot be chased down.
    for (const signal of trustSignals) {
      expect(signal.source, `${signal.id} has no source`).toBeTruthy();
    }
  });
});

describe('courses — the fee invariant', () => {
  it('never exposes a fee figure unless it is explicitly disclosed', () => {
    for (const course of courses) {
      if (!course.fees.disclosed) {
        expect(course.fees.totalInr, `${course.slug} leaks a fee while undisclosed`).toBeUndefined();
      }
    }
  });

  it('gives every course the SEO fields the CI gate requires', () => {
    for (const course of courses) {
      expect(course.seo.title.length, `${course.slug} title`).toBeGreaterThan(0);
      expect(course.seo.title.length, `${course.slug} title too long`).toBeLessThanOrEqual(65);
      expect(course.seo.description.length, `${course.slug} description`).toBeGreaterThan(0);
      expect(
        course.seo.description.length,
        `${course.slug} description too long`,
      ).toBeLessThanOrEqual(165);
    }
  });
});

describe('posts — migration readiness', () => {
  it('keeps slugs unique', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('keeps SEO titles and descriptions within SERP limits', () => {
    for (const post of posts) {
      expect(post.seo.title.length, `${post.slug} title too long`).toBeLessThanOrEqual(65);
      expect(
        post.seo.description.length,
        `${post.slug} description too long`,
      ).toBeLessThanOrEqual(165);
    }
  });

  it('records a legacyPath on migrated posts so redirects can be verified', () => {
    for (const post of posts) {
      expect(post.legacyPath, `${post.slug} has no legacyPath`).toBeTruthy();
    }
  });
});
