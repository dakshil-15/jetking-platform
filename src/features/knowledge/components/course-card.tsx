import { ArrowUpRight, Clock, GraduationCap } from 'lucide-react';

import { COURSE_CATEGORY_LABEL, type CourseRecord } from '@/features/knowledge/types';
import { siteHref } from '@/lib/config/site';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: CourseRecord;
  /** Render as a static card with no link to the external course page. */
  linkless?: boolean;
}

export function CourseCard({ course, linkless = false }: CourseCardProps) {
  const Wrapper = linkless ? 'div' : 'a';
  return (
    <Wrapper
      href={linkless ? undefined : siteHref(course.path)}
      className={cn(
        'group/card flex flex-col gap-2.5 rounded-card border border-line bg-surface p-4',
        'transition-[border-color,box-shadow,transform] duration-150',
        !linkless && 'hover:-translate-y-0.5 hover:border-brand-border hover:shadow-panel',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-pill bg-brand-soft px-2 py-0.5 text-[0.625rem] font-bold tracking-wide text-brand uppercase">
          {COURSE_CATEGORY_LABEL[course.category]}
        </span>
        {linkless ? null : (
          <ArrowUpRight className="size-4 shrink-0 text-ink-subtle opacity-0 transition-opacity group-hover/card:opacity-100" />
        )}
      </div>

      <h4 className="text-[0.9375rem] leading-snug font-semibold text-ink">{course.name}</h4>

      {course.outcomes.length > 0 || course.topics.length > 0 ? (
        <p className="line-clamp-2 text-xs leading-relaxed text-ink-muted">
          {(course.outcomes.length ? course.outcomes : course.topics).slice(0, 3).join(' · ')}
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-ink-subtle">
        {course.durationLabel ? (
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {course.durationLabel}
          </span>
        ) : null}
        {course.eligibility ? (
          <span className="inline-flex min-w-0 items-center gap-1">
            <GraduationCap className="size-3.5 shrink-0" />
            <span className="truncate">{course.eligibility.split(/[.·]/)[0]}</span>
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
