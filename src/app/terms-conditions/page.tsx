import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { JsonLd, type Crumb } from '@/components/ui';
import { termsConditions } from '@/lib/legal';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Terms and Conditions | Jetking',
    description:
      'The terms of use for the Jetking website and services, including disclaimers, intellectual property, governing law, and the cancellation and refund policy.',
  },
  '/terms-conditions',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Terms and Conditions', path: '/terms-conditions' },
];

export default function TermsConditionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <LegalDocument
        doc={termsConditions}
        trail={trail}
        path="/terms-conditions"
        intro="The terms that apply when you use the Jetking website and its services."
      />
    </>
  );
}
