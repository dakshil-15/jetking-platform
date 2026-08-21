import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Compass,
  GraduationCap,
  Handshake,
  Heart,
  Landmark,
  Laptop,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Smile,
  Sparkles,
  Zap,
} from 'lucide-react';
import type { Course, CourseLevel, Post } from '@/lib/content/types';
import { siteConfig } from '@/lib/site';
import { ABOUT_HERO, ACHIEVEMENTS, LEGACY_STATS, PURPOSE } from '@/components/about/data';
import { PLACED_CANDIDATES, PLACEMENT_DISCLAIMER } from '@/components/placements/data';
import { RecommendedCourses } from '@/components/student/RecommendedCourses';
import { PostCard } from '@/components/blog/BlogCards';
import { brandMark } from '@/lib/course-logos';
import { ExploreTestimonialSlider } from './ExploreTestimonialSlider';
import { ExploreEnquiryForm } from './ExploreEnquiryForm';

/** Certifications students train toward — real brand marks, kept off white ('unity'/'tcs'/'x'). */
const CERTIFICATIONS = [
  'Cisco',
  'CompTIA',
  'Red Hat',
  'CEH',
  'AWS',
  'Microsoft Azure',
  'Google Cloud',
  'Kubernetes',
  'Docker',
  'Linux',
  'Splunk',
  'Checkpoint',
] as const;

/** Real companies from Jetking's own published placement records — see placements/data.ts. */
const ALUMNI_COMPANIES = [...new Set(PLACED_CANDIDATES.map((c) => c.company))];

/**
 * Original logos for placement-partner companies — fetched from each company's
 * own official site or Wikimedia/Wikipedia (2026-08-21), not generated. Only
 * included where the company's identity could be confirmed with confidence;
 * ambiguous or unconfirmed names (multiple same-named companies, no verifiable
 * source) are deliberately left out and fall back to the initials tile instead
 * of risking the wrong company's logo.
 */
const PARTNER_LOGOS: Record<string, { src: string; dark?: boolean }> = {
  Wipro: { src: '/placements/partners/wipro.svg' },
  'Bharti Airtel Limited': { src: '/placements/partners/bharti-airtel.svg' },
  'Birla Corp': { src: '/placements/partners/birla-corp.jpg' },
  Laundryheap: { src: '/placements/partners/laundryheap.svg', dark: true },
  Futwork: { src: '/placements/partners/futwork.svg' },
  Reisnet: { src: '/placements/partners/reisnet.png', dark: true },
};

const AVATARS = [
  '/student/avatar-1.png',
  '/student/avatar-2.png',
  '/student/avatar-3.png',
  '/student/avatar-4.png',
] as const;

const ORBIT = [
  {
    label: 'Browse Freely',
    detail: 'No sign-up needed to look around',
    icon: Compass,
    className: 'top-[6%] left-0 sm:left-[-4%] lg:left-[-8%]',
  },
  {
    label: 'Compare Paths',
    detail: 'Degrees, diplomas & short courses',
    icon: BookOpen,
    className: 'top-[4%] right-0 sm:right-[-2%] lg:right-[-6%]',
  },
  {
    label: 'Visit a Centre',
    detail: 'Pan-India network near you',
    icon: MapPin,
    className: 'bottom-[10%] left-0 sm:left-[-2%] lg:left-[-10%]',
  },
  {
    label: 'No Pressure',
    detail: 'Talk to us only when ready',
    icon: ShieldCheck,
    className: 'bottom-[8%] right-0 sm:right-[-2%] lg:right-[-8%]',
  },
] as const;

/** "Our Affiliation" — real logos live on the jetking.com homepage (fetched 2026-08-21). */
const AFFILIATIONS = [
  { name: 'Skill India', src: '/affiliations/skill-india.png' },
  { name: 'NSDC', src: '/affiliations/nsdc.png' },
  { name: 'Red Hat', src: '/affiliations/red-hat.png' },
  { name: 'Delhi Capitals', src: '/affiliations/delhi-capitals.png' },
] as const;

const LEVEL_META: Record<CourseLevel, { label: string; blurb: string; icon: typeof GraduationCap }> = {
  degree: {
    label: 'Degree Programmes',
    blurb: 'Multi-year BCA-style pathways combining a degree with an IT specialisation.',
    icon: GraduationCap,
  },
  diploma: {
    label: 'Diploma Programmes',
    blurb: 'Structured, multi-month diplomas that go deep on one technology track.',
    icon: BookOpen,
  },
  certification: {
    label: 'Career Courses',
    blurb: 'Certification-focused programmes built to get you job-ready faster.',
    icon: Award,
  },
  short: {
    label: 'Short Courses',
    blurb: 'Focused, shorter programmes to pick up a specific in-demand skill.',
    icon: Zap,
  },
};

const LEVEL_ORDER: CourseLevel[] = ['degree', 'diploma', 'certification', 'short'];

/**
 * "10 reasons why Jetking is every student's choice" — mirrored from the live
 * jetking.com homepage (fetched 2026-08-21). One reason is reworded: the live
 * site's "100% Job Guarantee" is softened to match the placement disclaimer
 * used everywhere else on this site — see PLACEMENT_DISCLAIMER and the
 * job-guarantee cleanup elsewhere in this codebase. Everything else is
 * unchanged from what Jetking currently publishes.
 */
const REASONS = [
  {
    title: 'Trained & Certified Faculty',
    detail: 'Award winning and internationally bench-marked training faculty.',
    icon: Award,
  },
  {
    title: 'Practical Foundation through Labs',
    detail: 'One computer per student, so every theory lesson gets hands-on practice.',
    icon: Laptop,
  },
  {
    title: 'Placement Support',
    detail: 'We take every necessary step to help you get a suitable job on completing the course.',
    icon: ShieldCheck,
  },
  {
    title: 'Scenario Based Learning',
    detail: 'Case studies and animated scenarios give you real-life problem-solving practice.',
    icon: Lightbulb,
  },
  {
    title: 'SmartLabPlus Teaching Methodology',
    detail: 'Innovative methods of teaching that make learning fun and easy to remember.',
    icon: Sparkles,
  },
  {
    title: 'Countrywide Network',
    detail: 'A well-established, nationally recognised institute with 100+ centres.',
    icon: Building2,
  },
  {
    title: 'Personality Development',
    detail: 'Builds confidence and supports better job and salary prospects.',
    icon: Smile,
  },
  {
    title: 'State-of-the-Art Infrastructure',
    detail: 'Every centre is equipped for a successful learning environment.',
    icon: Landmark,
  },
  {
    title: 'De-stress with Yoga',
    detail: 'A relaxed mind finds it easier to learn.',
    icon: Heart,
  },
  {
    title: 'Partnership with NSDC',
    detail: 'Associated with the National Skill Development Corporation as a skill development partner.',
    icon: Handshake,
  },
] as const;

/** Real logos, fetched from the "Collaboration With Top Universities and Learning Entities" section live on jetking.com (2026-08-21). */
const UNIVERSITY_PARTNERS = [
  { name: 'Yenepoya (Deemed to be University)', src: '/university-partners/yenepoya.png' },
  { name: 'Tilak Maharashtra Vidyapeeth, Pune', src: '/university-partners/tilak-maharashtra-vidyapeeth.png' },
  { name: 'Pearson', src: '/university-partners/pearson.png' },
  { name: 'Lincoln University College', src: '/university-partners/lincoln-university.png' },
] as const;

function groupCoursesByLevel(courses: Course[]): Array<{ level: CourseLevel; courses: Course[] }> {
  return LEVEL_ORDER.map((level) => ({
    level,
    courses: courses.filter((c) => c.level === level),
  })).filter((group) => group.courses.length > 0);
}

/** Short initials fallback for names with no local brand mark, e.g. "Bharti Airtel Limited" → "BA". */
function initialsOf(name: string): string {
  return name
    .replace(/[^A-Za-z0-9+/]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.slice(0, part.length <= 4 ? part.length : 1).toUpperCase())
    .join('')
    .slice(0, 4);
}

function LogoTile({ name }: { name: string }) {
  const partner = PARTNER_LOGOS[name];
  const mark = partner ? null : brandMark(name);
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <span
        aria-hidden="true"
        className={`grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-[var(--stu-hairline)] sm:h-16 sm:w-16 ${
          partner?.dark ? 'bg-[#14141f]' : 'bg-[var(--stu-card)]'
        }`}
      >
        {partner ? (
          // eslint-disable-next-line @next/next/no-img-element -- real company logo, fetched from its official site/Wikimedia
          <img src={partner.src} alt="" className="h-full w-full object-contain p-2" />
        ) : mark?.painted ? (
          // eslint-disable-next-line @next/next/no-img-element -- local painted SVG badge
          <img src={mark.src} alt="" className="h-full w-full object-cover" />
        ) : mark ? (
          <span
            className="dc-logo !h-8 !w-8 sm:!h-9 sm:!w-9"
            style={{ '--logo': `url(${mark.src})`, color: mark.color } as React.CSSProperties}
          />
        ) : (
          <span className="font-display text-[15px] font-extrabold tracking-tight text-[var(--stu-ink-muted)]">
            {initialsOf(name) || '·'}
          </span>
        )}
      </span>
      <span className="max-w-[8.5rem] text-[12px] leading-snug font-semibold text-[var(--stu-ink-secondary)]">
        {name}
      </span>
    </div>
  );
}

export function ExploreLanding({
  courses,
  counts,
  posts,
}: {
  courses: Course[];
  counts: { courses: number; centres: number; cities: number };
  posts: Post[];
}) {
  const levelGroups = groupCoursesByLevel(courses);

  return (
    <div
      className={[
        'student-page relative overflow-hidden',
        '-mt-[72px] pt-[72px]',
        'xs:-mt-[80px] xs:pt-[80px]',
        'sm:-mt-[88px] sm:pt-[88px]',
        '2xl:-mt-[96px] 2xl:pt-[96px]',
      ].join(' ')}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="shell relative pt-8 pb-6 xs:pt-10 sm:pt-12 lg:pt-14 lg:pb-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[-60px] right-[8%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgb(232_36_43/0.22),transparent_68%)]"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-6 xl:gap-10">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stu-hairline)] bg-[var(--stu-accent-tint)] px-3.5 py-1.5 text-[13px] font-bold text-[var(--stu-accent-soft)]">
              Just Exploring? Welcome! <span aria-hidden="true">👋</span>
            </p>

            <h1 className="mt-5 font-display text-[34px] leading-[1.08] font-extrabold tracking-[-0.035em] text-[var(--stu-ink)] xs:text-[40px] sm:mt-6 sm:text-[46px] md:text-[50px] lg:text-[48px] xl:text-[54px]">
              See everything <span className="text-[var(--stu-accent-soft)]">{siteConfig.name}</span> has to offer
            </h1>

            <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.65] text-[var(--stu-ink-secondary)] xs:text-[16px] sm:mt-6">
              No commitment needed. Browse programmes, see why students and franchise
              partners choose {siteConfig.name}, and find a centre near you — at your own
              pace.
            </p>

            <div className="mt-7 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href={'/courses' as Route}
                className="group/cta inline-flex min-h-12 items-center gap-3 rounded-full bg-[var(--stu-accent)] py-3 pr-3 pl-6 text-[15px] font-bold text-white shadow-[0_0_24px_rgb(196_30_36/0.4)] transition-colors hover:bg-jk-700"
              >
                Explore courses
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink-900 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>

              <Link
                href={'/centres' as Route}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-[var(--stu-accent)] px-5 py-3 text-[15px] font-bold text-[var(--stu-accent-soft)] transition-colors hover:bg-[var(--stu-accent-tint)]"
              >
                Find a centre
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-10">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex -space-x-2.5">
                  {AVATARS.map((src) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-[2.5px] border-[var(--stu-card)] shadow-sm"
                    >
                      <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </span>
                <span className="text-[13.5px] font-semibold text-[var(--stu-ink-secondary)]">
                  Visitors from {counts.cities}+ cities
                </span>
              </div>
              <span className="hidden h-4 w-px bg-[var(--stu-hairline)] sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[var(--stu-ink-secondary)]">
                <ShieldCheck
                  className="h-4 w-4 text-[var(--stu-accent-soft)]"
                  strokeWidth={2.25}
                  aria-hidden="true"
                />
                No form, no pressure
              </span>
            </div>
          </div>

          <div className="stu-hero-glow relative mx-auto w-full max-w-[540px] lg:max-w-none">
            <div className="relative mx-auto aspect-square w-[min(100%,440px)] lg:w-full lg:max-w-[500px]">
              <div aria-hidden="true" className="stu-orbit-ring absolute inset-[10%] rounded-full" />
              <div
                aria-hidden="true"
                className="absolute inset-[16%] rounded-full border border-dashed border-[rgb(232_36_43/0.28)]"
              />

              <div className="absolute inset-[20%] overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--card),var(--surface-sunken),var(--card))] shadow-[0_28px_70px_rgb(0_0_0/0.55)]">
                <Image
                  src="/home/journey-explore-v2.jpg"
                  alt="Visitor exploring the Jetking campus"
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 75vw"
                  className="object-cover object-[center_22%]"
                />
              </div>

              {ORBIT.map((item) => (
                <div
                  key={item.label}
                  className={`stu-float absolute z-10 flex max-w-[158px] items-start gap-2.5 rounded-2xl p-3 sm:max-w-[172px] sm:p-3.5 ${item.className}`}
                >
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--stu-accent-tint)] text-[var(--stu-accent-soft)]"
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block text-[13px] font-extrabold text-[var(--stu-ink)]">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-[var(--stu-ink-secondary)]">
                      {item.detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick enquiry (optional — no pressure) ───────────────────────── */}
      <section id="enquire" className="py-10 sm:py-12 lg:py-14">
        <div className="shell">
          <div className="stu-card overflow-hidden rounded-[28px]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[200px] overflow-hidden lg:min-h-full">
                <Image
                  src="/home/journey-explore-v2.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-[center_22%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(7_7_12/0.88)] via-[rgb(7_7_12/0.35)] to-transparent lg:bg-gradient-to-r" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="font-display text-[22px] font-extrabold leading-snug tracking-[-0.02em] text-white sm:text-[26px]">
                    Have a specific question?
                  </p>
                  <p className="mt-3 text-[14px] text-white/75">
                    Leave a note and we&rsquo;ll get back — entirely optional.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <ExploreEnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Jetking ─────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-12 lg:py-14" aria-labelledby="exp-about">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
            <div>
              <p className="text-[13px] font-bold tracking-[0.06em] text-[var(--stu-accent-soft)] uppercase">
                {ABOUT_HERO.eyebrow}
              </p>
              <h2
                id="exp-about"
                className="mt-2 font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
              >
                {ABOUT_HERO.titleLead} {ABOUT_HERO.titleAccent}
              </h2>
              <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-[var(--stu-ink-secondary)] sm:text-[15px]">
                {ABOUT_HERO.lede}
              </p>
              <Link
                href={'/about-us' as Route}
                className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[var(--stu-accent-soft)]"
              >
                Read our story
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </Link>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PURPOSE.map((item) => (
                <div key={item.title} className="stu-card rounded-[18px] p-4">
                  <dt className="text-[13px] font-extrabold text-[var(--stu-ink)]">{item.title}</dt>
                  <dd className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--stu-ink-muted)]">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Programmes (shared RecommendedCourses card design) ──────────── */}
      <div className="bg-[var(--stu-surface)]">
        <div className="shell pt-8 xs:pt-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[13px] font-bold text-[var(--stu-ink-muted)]">Browse by format:</span>
            {levelGroups.map((group) => {
              const meta = LEVEL_META[group.level];
              return (
                <Link
                  key={group.level}
                  href={'/courses' as Route}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--stu-hairline)] bg-[var(--stu-card)] px-3 py-1.5 text-[12.5px] font-bold text-[var(--stu-ink-secondary)] transition-colors hover:border-[var(--stu-accent-soft)] hover:text-[var(--stu-accent-soft)]"
                >
                  {meta.label}
                  <span className="text-[var(--stu-ink-muted)]">{group.courses.length}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <RecommendedCourses
          courses={courses}
          headingId="exp-courses"
          title="Programmes to explore"
          description={`${counts.courses} programmes across ${levelGroups.length} formats — tap a card to see full details.`}
        />
      </div>

      {/* ── Why Jetking + testimonial slider ─────────────────────────────── */}
      <section className="bg-[var(--stu-surface)] pt-2 pb-10 sm:pb-12 lg:pb-14" aria-labelledby="exp-why">
        <div className="shell">
          <div className="stu-why overflow-hidden rounded-[28px] px-6 py-10 text-white xs:rounded-[32px] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12">
              <div>
                <h2
                  id="exp-why"
                  className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-white xs:text-[28px] sm:text-[32px]"
                >
                  Why People Choose <span className="text-jk-400">{siteConfig.name}</span>
                </h2>

                <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 lg:grid-cols-2">
                  {LEGACY_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="block font-display text-[24px] leading-none font-extrabold text-jk-400 sm:text-[28px]">
                          {stat.value}
                        </span>
                        <span className="mt-2 block text-[12.5px] leading-snug text-white/70 sm:text-[13.5px]">
                          {stat.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-8 max-w-md text-[12.5px] leading-relaxed text-white/60">
                  {PLACEMENT_DISCLAIMER}
                </p>
              </div>

              <ExploreTestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards & recognition ─────────────────────────────────────────── */}
      <section className="bg-[var(--stu-surface)] pt-0 pb-10 sm:pb-12 lg:pb-14" aria-labelledby="exp-awards">
        <div className="shell">
          <h2
            id="exp-awards"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            Awards &amp; recognition
          </h2>
          <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ACHIEVEMENTS.slice(0, 4).map((item) => (
              <li key={item.title}>
                <article className="stu-card flex h-full flex-col items-center rounded-[18px] p-5 text-center">
                  <div className="relative h-24 w-full sm:h-28">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 20vw, 40vw"
                      className="object-contain"
                    />
                  </div>
                  <h3 className="mt-4 text-[13px] leading-snug font-extrabold text-[var(--stu-ink)]">
                    {item.title}
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 10 reasons why Jetking is every student's choice ─────────────── */}
      <section className="bg-[var(--stu-surface)] pt-0 pb-10 sm:pb-12 lg:pb-14" aria-labelledby="exp-benefits">
        <div className="shell">
          <h2
            id="exp-benefits"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            10 reasons why {siteConfig.name} is every student&rsquo;s choice
          </h2>
          <ul className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {REASONS.map((card) => (
              <li key={card.title} className="min-w-0">
                <article className="stu-card flex h-full flex-col gap-0 rounded-[20px] p-5">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--stu-accent-soft)]/40 bg-[var(--stu-accent-tint)] text-[var(--stu-accent-soft)]"
                  >
                    <card.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold text-[var(--stu-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug text-[var(--stu-ink-muted)]">
                    {card.detail}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Collaboration with top universities & learning entities ──────── */}
      <section className="bg-[var(--stu-surface)] pt-0 pb-10 sm:pb-12 lg:pb-14" aria-labelledby="exp-university-partners">
        <div className="shell">
          <h2
            id="exp-university-partners"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            Collaboration with top universities &amp; learning entities
          </h2>
          <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {UNIVERSITY_PARTNERS.map((partner) => (
              <li key={partner.name}>
                <div className="stu-card flex h-full flex-col items-center gap-3 rounded-[18px] p-5 text-center">
                  <span className="relative h-16 w-full sm:h-20">
                    <Image src={partner.src} alt={partner.name} fill sizes="200px" className="object-contain" />
                  </span>
                  <span className="text-[12px] leading-snug font-semibold text-[var(--stu-ink-secondary)]">
                    {partner.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Certifications & technology partners ─────────────────────────── */}
      <section className="py-10 sm:py-12 lg:py-14" aria-labelledby="exp-certs">
        <div className="shell">
          <h2
            id="exp-certs"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            Certifications you can train towards
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--stu-ink-muted)] sm:text-[15px]">
            Industry-recognised technologies built into Jetking&rsquo;s curriculum.
          </p>
          <ul className="mt-7 grid grid-cols-3 gap-5 xs:grid-cols-4 sm:grid-cols-6">
            {CERTIFICATIONS.map((name) => (
              <li key={name}>
                <LogoTile name={name} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Where our alumni work ────────────────────────────────────────── */}
      <section className="bg-[var(--stu-surface)] py-10 sm:py-12 lg:py-14" aria-labelledby="exp-alumni">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="exp-alumni"
              className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
            >
              Where our alumni work
            </h2>
            <Link
              href={'/placements' as Route}
              className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[var(--stu-accent-soft)]"
            >
              See placement records
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--stu-ink-muted)] sm:text-[15px]">
            Companies from Jetking&rsquo;s own published placement records.
          </p>
          <ul className="mt-7 grid grid-cols-3 gap-5 xs:grid-cols-4 sm:grid-cols-6">
            {ALUMNI_COMPANIES.map((company) => (
              <li key={company}>
                <LogoTile name={company} />
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-2xl text-[12.5px] leading-relaxed text-[var(--stu-ink-muted)]">
            {PLACEMENT_DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ── Our Placement Partners (real collage from jetking.com) ───────── */}
      <section className="py-10 sm:py-12 lg:py-14" aria-labelledby="exp-partners">
        <div className="shell">
          <h2
            id="exp-partners"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            Our Placement Partners
          </h2>
          <div className="stu-card mt-7 overflow-hidden rounded-[20px] p-4 sm:p-6">
            <span className="relative block aspect-[1000/868] w-full">
              <Image
                src="/placements/partners-collage.png"
                alt="Logos of organisations Jetking students have been placed with, including Walmart, Accenture, Wipro, Microsoft, IBM, SAP, Vodafone, JPMorgan Chase, Capgemini, Tech Mahindra, PayPal and Infosys"
                fill
                sizes="(min-width: 640px) 700px, 100vw"
                className="object-contain"
              />
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed text-[var(--stu-ink-muted)]">
            Note: Placements are subject to recruitment norms. Jetking does not guarantee
            placements in the above organisations.
          </p>
        </div>
      </section>

      {/* ── Our Affiliation ───────────────────────────────────────────────── */}
      <section className="bg-[var(--stu-surface)] py-10 sm:py-12 lg:py-14" aria-labelledby="exp-affiliation">
        <div className="shell">
          <h2
            id="exp-affiliation"
            className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--stu-ink)] xs:text-[26px] sm:text-[28px]"
          >
            Our Affiliation
          </h2>
          <ul className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AFFILIATIONS.map((item) => (
              <li key={item.name}>
                <div className="stu-card flex h-full flex-col items-center gap-3 rounded-[18px] p-5 text-center">
                  <span className="relative h-16 w-full sm:h-20">
                    <Image src={item.src} alt={item.name} fill sizes="200px" className="object-contain" />
                  </span>
                  <span className="text-[12px] leading-snug font-semibold text-[var(--stu-ink-secondary)]">
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── From the blog ────────────────────────────────────────────────── */}
      {posts.length > 0 ? (
        <section className="blog-page relative overflow-hidden py-10 sm:py-12 lg:py-14" aria-labelledby="exp-blog">
          <div className="shell relative">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="exp-blog"
                className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-[var(--blog-ink)] xs:text-[26px] sm:text-[28px]"
              >
                From the blog
              </h2>
              <Link
                href={'/blog' as Route}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[var(--blog-accent-soft)]"
              >
                Read more
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
              </Link>
            </div>
            <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {posts.map((post, i) => (
                <li key={post.slug}>
                  <PostCard post={post} badge={i === 0 ? 'latest' : undefined} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ── Locations + final CTA ────────────────────────────────────────── */}
      <section className="pt-4 pb-14 sm:pb-16 lg:pb-20" aria-labelledby="exp-cta">
        <div className="shell">
          <div className="stu-card flex flex-col gap-6 rounded-[24px] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--stu-accent-tint)] text-[var(--stu-accent-soft)]"
              >
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2 id="exp-cta" className="mt-4 text-[20px] font-extrabold text-[var(--stu-ink)] sm:text-[22px]">
                {counts.centres}+ centres across {counts.cities}+ cities
              </h2>
              <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-[var(--stu-ink-muted)]">
                Not ready to talk to anyone yet? Just browse — every centre and every
                programme is listed, no form required.
              </p>
            </div>
            <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Link
                href={'/centres' as Route}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--stu-navy)] px-6 py-3.5 text-[14.5px] font-bold text-white transition-colors hover:bg-jk-700"
              >
                Browse centres
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
              <Link
                href={'/courses' as Route}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--stu-hairline)] px-6 py-3.5 text-[14.5px] font-bold text-[var(--stu-ink)] transition-colors hover:border-[var(--stu-accent-soft)]"
              >
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
