import type { Course, Testimonial } from '@/lib/content/types';
import { ActionRail } from '@/components/home/v1/ActionRail';
import { ProfessionalBottomCta } from './ProfessionalBottomCta';
import { ProfessionalGrowthPath } from './ProfessionalGrowthPath';
import { ProfessionalHero } from './ProfessionalHero';
import { ProfessionalImpact } from './ProfessionalImpact';
import { ProfessionalPrograms } from './ProfessionalPrograms';
import { ProfessionalSocialProof } from './ProfessionalSocialProof';

export function ProfessionalLanding({
  courses,
  video,
}: {
  courses: Course[];
  video?: { title: string; src: string };
  testimonials?: Testimonial[];
}) {
  return (
    <>
      <section
        className={[
          'home-v2 relative flex flex-col overflow-hidden',
          /* Bleed the section's own gradient background up behind the sticky,
             transparent header instead of stopping in a hard line at its
             bottom edge — see the matching fix in home/v2/HomeV2.tsx. Offsets
             must match SiteHeader's height breakpoints (72/80/88/96). */
          '-mt-[72px] pt-[72px]',
          'xs:-mt-[80px] xs:pt-[80px]',
          'sm:-mt-[88px] sm:pt-[88px]',
          '2xl:-mt-[96px] 2xl:pt-[96px]',
        ].join(' ')}
      >
        <div className="shell relative flex flex-col pt-8 pb-6 xs:pt-10 xs:pb-7 sm:pt-12 sm:pb-8 md:pt-14 md:pb-9 lg:pt-12 lg:pb-8 xl:pt-10 xl:pb-7 2xl:pt-8 2xl:pb-6 3xl:pt-10 3xl:pb-8">
          <ProfessionalHero video={video} />

          <div className="mt-8 shrink-0 xs:mt-10 lg:mt-12 3xl:mt-14">
            <ActionRail source="professional-rail" />
          </div>
        </div>
      </section>

      <div className="professional-page relative overflow-hidden">
        <div className="relative z-10 -mt-6 rounded-t-[32px] bg-[var(--pro-surface)] xs:-mt-8 xs:rounded-t-[40px] sm:-mt-10">
          <ProfessionalGrowthPath />
          <ProfessionalPrograms courses={courses} />
        </div>

        <ProfessionalImpact />
        <ProfessionalSocialProof />
        <ProfessionalBottomCta />
      </div>
    </>
  );
}
