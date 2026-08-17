import { Mail, MapPin, Phone } from 'lucide-react';

import { CourseCard } from '@/features/knowledge/components/course-card';
import type { AnswerBlock } from '@/features/knowledge/types/answer';
import { siteHref } from '@/lib/config/site';

function BlockHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.08em] text-ink-subtle uppercase">
      <span aria-hidden className="h-3 w-0.5 rounded-pill bg-brand" />
      {children}
    </h3>
  );
}

/**
 * Renders one composed block.
 *
 * The switch is exhaustive over the discriminated union, so adding a block
 * type to the composer fails the build here until it has a renderer.
 */
export function AnswerBlockView({
  block,
  linkless = false,
}: {
  block: AnswerBlock;
  /** Suppress links to external jetking.com pages (KB-only chat mode). */
  linkless?: boolean;
}) {
  switch (block.type) {
    case 'prose':
      return (
        <section>
          {block.heading ? <BlockHeading>{block.heading}</BlockHeading> : null}
          <div className="flex flex-col gap-3">
            {block.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[0.9375rem] leading-[1.7] text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      );

    case 'courses':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {block.courses.map((course) => (
              <CourseCard key={course.id} course={course} linkless={linkless} />
            ))}
          </div>
        </section>
      );

    case 'faqs':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
            {block.faqs.map((faq) => (
              <div key={faq.id} className="p-4">
                <dt className="text-sm font-semibold text-ink">{faq.question}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case 'stats':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {block.stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-xl border border-line bg-surface-sunken px-3.5 py-3"
              >
                <p className="font-display text-xl font-semibold text-brand">{stat.value}</p>
                <p className="mt-0.5 text-xs leading-snug text-ink-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'facts':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {block.items.map((item) => (
              <div key={item.label} className="bg-surface px-3.5 py-3">
                <dt className="text-xs text-ink-subtle">{item.label}</dt>
                <dd className="mt-0.5 text-sm font-medium text-ink capitalize">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      );

    case 'centres':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {block.centres.map((centre) => {
              const CentreWrapper = linkless ? 'div' : 'a';
              return (
                <CentreWrapper
                  key={centre.id}
                  href={linkless ? undefined : siteHref(centre.path)}
                  className="group/centre flex flex-col gap-2 rounded-card border border-line bg-surface p-4 transition-[border-color,box-shadow] hover:border-brand-border hover:shadow-panel"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-brand" />
                    <h4 className="text-sm font-semibold text-ink">{centre.city}</h4>
                  </div>

                  {centre.locations.length > 0 ? (
                    <ul className="flex flex-col gap-0.5">
                      {centre.locations.slice(0, 3).map((location) => (
                        <li key={location.name} className="text-xs text-ink-muted">
                          {location.name}
                          {location.locality ? ` — ${location.locality}` : ''}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {centre.programmes.length > 0 ? (
                    <p className="mt-auto line-clamp-2 pt-1 text-xs text-ink-subtle">
                      {centre.programmes.slice(0, 4).join(' · ')}
                    </p>
                  ) : null}
                </CentreWrapper>
              );
            })}
          </div>
        </section>
      );

    case 'contact':
      return (
        <section>
          <BlockHeading>{block.heading}</BlockHeading>
          <div className="flex flex-col gap-2.5 rounded-card border border-line bg-surface p-4">
            {linkless ? null : (
              <a
                href={siteHref(block.contact.enquiryPath)}
                className="inline-flex w-fit items-center gap-2 rounded-input bg-brand px-3.5 py-2 text-sm font-semibold text-brand-ink shadow-accent transition-colors hover:bg-brand-hover"
              >
                Enquire now
              </a>
            )}
            <a
              href={`tel:${block.contact.phone}`}
              className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-brand"
            >
              <Phone className="size-4 shrink-0 text-ink-subtle" />
              {block.contact.phone}
            </a>
            <a
              href={`mailto:${block.contact.email}`}
              className="inline-flex items-center gap-2.5 text-sm text-ink transition-colors hover:text-brand"
            >
              <Mail className="size-4 shrink-0 text-ink-subtle" />
              {block.contact.email}
            </a>
            <p className="inline-flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ink-subtle" />
              {block.contact.address}
            </p>
          </div>
        </section>
      );
  }
}
