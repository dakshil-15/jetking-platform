import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { JsonLd, type Crumb } from '@/components/ui';
import { ScrollDepthTracker } from '@/components/ScrollDepthTracker';
import { loadHomeData } from '@/components/home/data';
import { ParentLanding } from '@/components/parent/ParentLanding';

export const metadata: Metadata = buildMetadata(
  {
    title: `Parent Path — Placements, Fees & Trust | ${siteConfig.name}`,
    description:
      'For parents evaluating Jetking: placement support explained honestly, fee clarity, centre visits, and counsellor conversations before you decide.',
  },
  '/parent',
);

export default async function ParentPage() {
  const [courses, home] = await Promise.all([content.listCourses(), loadHomeData()]);

  const preferred = [
    'bca-cloud-cyber-security',
    'ethical-hacking-specialist',
    'cloud-computing-engineer-ai',
    'routing-switching-administrator',
    'cloud-computing-professional-ai',
    'pc-hardware-support',
  ];

  const parentCourses = [...courses]
    .sort((a, b) => {
      const ia = preferred.indexOf(a.slug);
      const ib = preferred.indexOf(b.slug);
      const ra = ia === -1 ? 99 : ia;
      const rb = ib === -1 ? 99 : ib;
      if (ra !== rb) return ra - rb;
      return (b.personaRelevance.parent ?? 0) - (a.personaRelevance.parent ?? 0);
    })
    .slice(0, 4);

  const parentVariant =
    home.variants.find((v) => v.id === 'parent') ??
    home.variants.find((v) => v.id === 'default') ??
    home.variants[0];
  const testimonials = parentVariant?.testimonials ?? [];

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Parent', path: '/parent' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <ScrollDepthTracker />
      <ParentLanding
        courses={parentCourses}
        counts={home.counts}
        testimonials={testimonials}
      />
    </>
  );
}
