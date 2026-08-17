'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';

export function CentreViewTracker({
  slug,
  name,
  city,
}: {
  slug: string;
  name: string;
  city: string;
}) {
  const { record } = usePersona();
  const firedRef = useRef<string>('');

  useEffect(() => {
    if (firedRef.current === slug) return;
    firedRef.current = slug;

    record({ kind: 'centre-view', citySlug: city, slug, name });
    track('centre_viewed', { centre_slug: slug, centre_name: name, city });
  }, [slug, name, city, record]);

  return null;
}
