import type { Metadata } from 'next';
import Image from 'next/image';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { Breadcrumbs, JsonLd, type Crumb } from '@/components/ui';
import { AdaptiveNudge } from '@/persona/AdaptiveSlot';
import { siteConfig } from '@/lib/site';
import { CourseExplorer } from './CourseExplorer';

export const metadata: Metadata = buildMetadata(
  {
    title: 'IT Courses — Cloud, Cyber Security & DevOps | Jetking',
    description:
      'Jetking programmes in cloud, cyber security, DevOps and networking — from a 4-month foundation course to a 3-year BCA degree.',
  },
  '/courses',
);

export default async function CoursesPage() {
  const courses = await content.listCourses();
  const levelCount = new Set(courses.map((c) => c.level)).size;

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      {/*
        The Future-Ready dark skin. `.dark-canvas` supplies the canvas and the
        `--dc-*` accent tokens, both already wired to the site's global light/dark
        toggle. `.surface-inverse` is NOT used here — it forces the semantic
        `--color-*` tokens permanently dark regardless of the toggle, which broke
        theme switching on this page (and on /about-us and /courses/[slug], fixed
        alongside this). `.dc-flow` drops the theme's `overflow: hidden` clip so
        the explorer's sticky filter sidebar can pin, and the orbs move onto a
        self-clipping `.dc-orbs` child.
      */}
      <div className="dark-canvas no-orbs dc-flow pt-6 pb-16 sm:pt-8 lg:pb-20">
        <span className="dc-orbs" aria-hidden="true" />

        <div className="shell">
          <Breadcrumbs trail={trail} />

          {/* ── Cinematic banner (blog / centres hero language) ───────────── */}
          <section className="relative mt-5 sm:mt-6">
            <div className="dc-banner relative min-h-[min(74vw,400px)] overflow-hidden rounded-[24px] xs:min-h-[380px] xs:rounded-[28px] sm:min-h-[420px] sm:rounded-[32px] lg:min-h-[480px]">
              <Image
                src="/home/journey-student-v2.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_22%]"
              />
              <div
                aria-hidden="true"
                className="dc-banner-wash pointer-events-none absolute inset-0"
              />

              <div className="relative z-[1] flex h-full min-h-[inherit] flex-col justify-center px-6 py-10 xs:px-8 xs:py-12 sm:px-10 sm:py-14 lg:max-w-[56%] lg:px-12 lg:py-16 xl:px-14">
                <p className="dc-eyebrow label-mono">Programmes</p>

                <h1 className="dc-heading-glow mt-4 font-display text-[34px] leading-[1.04] font-extrabold tracking-[-0.035em] text-balance text-[var(--dc-ink)] xs:text-[40px] sm:mt-5 sm:text-[48px] md:text-[52px] lg:text-[54px]">
                  Every Jetking programme,
                  <span className="dc-accent-glow mt-1 block sm:mt-1.5">in one place.</span>
                </h1>

                <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] text-[var(--dc-ink-secondary)] xs:text-[15.5px] sm:mt-5 sm:text-[16px]">
                  Cloud, cyber security, DevOps and networking — from a four-month
                  foundation course to a three-year degree. Sorted by what suits you;
                  every programme stays listed.
                </p>

                <p className="mt-6 numeral text-[11.5px] font-bold tracking-[0.12em] text-[var(--dc-ink-muted)] uppercase sm:mt-7">
                  {siteConfig.name}
                  {' · '}
                  {courses.length} programmes
                  {' · '}
                  {levelCount} levels
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8 max-w-2xl">
            <AdaptiveNudge
              id="courses-guidance-nudge"
              reserve="standard"
              tone="dark"
              variants={{
                student: {
                  headline: 'Comparing the cloud and cyber tracks?',
                  body: 'They look similar and suit different people. This explains the difference.',
                  ctaLabel: 'Read the comparison',
                  ctaHref: '/blog/cyber-security-vs-cloud-computing',
                },
                professional: {
                  headline: 'Changing careers rather than starting one?',
                  body: 'What transfers from your current role, and what does not.',
                  ctaLabel: 'Read the guide',
                  ctaHref: '/blog/switching-to-it-career-at-30',
                },
                parent: {
                  headline: 'Evaluating on your child’s behalf?',
                  body: 'Seven questions worth asking any training institute — including us.',
                  ctaLabel: 'See the checklist',
                  ctaHref: '/blog/what-parents-should-ask-it-institute',
                },
                franchise: {
                  headline: 'Here about the franchise opportunity?',
                  body: 'The franchise section covers the operating model.',
                  ctaLabel: 'Go to franchise',
                  ctaHref: '/franchise',
                },
              }}
            />
          </div>

          {/*
            The explorer is a client component, so Next server-renders it: every
            course card and link is in the initial HTML. Its filter sidebar only
            toggles visibility — nothing is hidden from crawlers, and every course
            page stays linked. See the contract at the top of CourseExplorer.tsx.
          */}
          <div className="mt-10 lg:mt-12">
            <CourseExplorer courses={courses} />
          </div>
        </div>
      </div>
    </>
  );
}
