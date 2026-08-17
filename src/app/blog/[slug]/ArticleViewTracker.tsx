'use client';

import { useEffect, useRef } from 'react';
import { usePersona } from '@/persona/PersonaProvider';
import { track } from '@/lib/analytics';

export function ArticleViewTracker({
  slug,
  category,
  title,
}: {
  slug: string;
  category: string;
  title: string;
}) {
  const { record } = usePersona();
  const firedRef = useRef<string>('');

  useEffect(() => {
    if (firedRef.current === slug) return;
    firedRef.current = slug;

    record({ kind: 'article-view', category });
    track('article_viewed', { post_slug: slug, category, title });
  }, [slug, category, title, record]);

  return null;
}
