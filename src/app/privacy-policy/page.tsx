import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { JsonLd, type Crumb } from '@/components/ui';
import { privacyPolicy } from '@/lib/legal';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Privacy Policy | Jetking',
    description:
      'How Jetking Infotrain Limited collects, uses and protects the personal information you share through the Jetking website and services.',
  },
  '/privacy-policy',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <LegalDocument
        doc={privacyPolicy}
        trail={trail}
        path="/privacy-policy"
        intro="How Jetking collects, uses and protects the information you share with us through this website and our services."
      />
    </>
  );
}
