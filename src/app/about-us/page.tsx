import type { Metadata } from 'next';
import { AboutLanding } from '@/components/about/AboutLanding';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd, type Crumb } from '@/components/ui';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata(
  {
    title: `About ${siteConfig.name} — 79 Years of IT Education`,
    description:
      'Jetking is India\'s foremost computer networking and IT training institute with 79 years of legacy, 100+ centres and placement support for students across India.',
  },
  '/about-us',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <AboutLanding />
    </>
  );
}
