import type { Metadata } from 'next';
import { AboutLanding } from '@/components/about/AboutLanding';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd, type Crumb } from '@/components/ui';
import { siteConfig } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(
    {
      title: `About ${siteConfig.name} — 80 Years of Legacy`,
      description: `Jetking is India's foremost computer networking and IT training institute with 80 years of legacy, 50+ centres and placement support for students across India.`,
    },
    '/about-us',
  );
}

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
];

export default async function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <AboutLanding />
    </>
  );
}
