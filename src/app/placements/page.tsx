import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { JsonLd, type Crumb } from '@/components/ui';
import { PlacementsLanding } from '@/components/placements/PlacementsLanding';
import { FeeDepthTracker } from './FeeDepthTracker';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Placement Support at Jetking — What It Includes',
    description:
      'What Jetking placement support covers: interview preparation, profile building and employer introductions. Written for students and parents evaluating the programme.',
  },
  '/placements',
);

export default async function PlacementsPage() {
  const faqs = await content.listFaqs();
  const relevant = faqs.filter((f) => f.topic === 'placement' || f.topic === 'fees');

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Placements', path: '/placements' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <FeeDepthTracker />
      <PlacementsLanding faqs={relevant} />
    </>
  );
}
