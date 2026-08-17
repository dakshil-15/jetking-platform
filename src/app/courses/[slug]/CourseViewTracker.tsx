'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';

/**
 * Records a course view into the behaviour store and the analytics layer.
 *
 * Renders nothing. Kept as a separate client component so the course page itself
 * stays a server component — the page's indexable content must not be inside a
 * client boundary.
 */
export function CourseViewTracker({
  slug,
  level,
  title,
}: {
  slug: string;
  level: string;
  title: string;
}) {
  const { record } = usePersona();
  const firedRef = useRef<string>('');

  useEffect(() => {
    if (firedRef.current === slug) return;
    firedRef.current = slug;

    record({ kind: 'course-view', slug, level });
    track('course_viewed', { course_slug: slug, course_title: title, level });
  }, [slug, level, title, record]);

  return null;
}
