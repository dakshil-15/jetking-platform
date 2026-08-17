'use client';

import { useMemo } from 'react';
import type { Route } from 'next';
import { usePersona } from './PersonaProvider';
import { readBehaviour } from './behaviour';
import { ArrowLink, ButtonLink, IndexRow, Section, SectionHead } from '@/components/ui';
import { centrePath } from '@/lib/centre-path';

/**
 * Return-visit personalization blocks. Render nothing on first visit / SSR.
 */
export function ReturnVisitSections({
  courseTitles,
}: {
  courseTitles: Record<string, string>;
}) {
  const { hydrated } = usePersona();

  const profile = useMemo(() => {
    if (!hydrated) return null;
    return readBehaviour();
  }, [hydrated]);

  if (!hydrated || !profile || profile.visitCount <= 1) return null;

  const lastCourse = profile.lastCourse;
  const lastCentre = profile.lastCentre;
  const recent = [...profile.visitedPages].reverse().slice(0, 5);
  const recommended = [...profile.courseViews]
    .reverse()
    .filter((s, i, a) => a.indexOf(s) === i)
    .slice(0, 4);

  return (
    <>
      {lastCourse ? (
        <Section tone="sunken">
          <SectionHead
            eyebrow="Continue"
            title={courseTitles[lastCourse] ?? lastCourse}
            lede="Pick up where you left off."
            action={
              <ButtonLink href={`/courses/${lastCourse}` as Route} size="lg">
                Continue
              </ButtonLink>
            }
          />
        </Section>
      ) : null}

      {recommended.length > 0 ? (
        <Section>
          <SectionHead eyebrow="Recommended" title="Based on what you viewed" />
          <ul className="mt-10 border-t border-border sm:grid sm:grid-cols-2 sm:gap-x-10">
            {recommended.map((slug) => (
              <IndexRow
                key={slug}
                href={`/courses/${slug}`}
                title={courseTitles[slug] ?? slug}
              />
            ))}
          </ul>
        </Section>
      ) : null}

      {lastCentre ? (
        <Section tone="sunken">
          <SectionHead
            eyebrow="Nearby centres"
            title={lastCentre.name ?? lastCentre.slug}
            lede={`You recently looked at centres in ${lastCentre.citySlug}.`}
          />
          <div className="mt-8 flex flex-wrap gap-8">
            <ArrowLink href={centrePath(lastCentre.slug)}>
              Open last centre
            </ArrowLink>
            <ArrowLink href={`/centres/${lastCentre.citySlug}`}>
              All centres in {lastCentre.citySlug}
            </ArrowLink>
          </div>
        </Section>
      ) : null}

      {recent.length > 0 ? (
        <Section>
          <SectionHead eyebrow="Recently viewed" title="Your recent pages" />
          <ul className="mt-10 border-t border-border">
            {recent.map((p) => (
              <IndexRow
                key={`${p.path}-${p.at}`}
                href={p.path}
                title={p.title ?? p.path}
              />
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
