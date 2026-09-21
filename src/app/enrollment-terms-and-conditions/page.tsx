import type { Metadata } from 'next';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { JsonLd, type Crumb } from '@/components/ui';
import { enrollmentTerms } from '@/lib/legal';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Enrollment Terms and Conditions | Jetking',
    description:
      'The Jetking student passport: academic policies, attendance, exams, fees, refunds, placement rules and the student code of conduct that apply once you enrol.',
  },
  '/enrollment-terms-and-conditions',
);

const trail: Crumb[] = [
  { name: 'Home', path: '/' },
  { name: 'Enrollment Terms and Conditions', path: '/enrollment-terms-and-conditions' },
];

export default function EnrollmentTermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <LegalDocument
        doc={enrollmentTerms}
        trail={trail}
        path="/enrollment-terms-and-conditions"
        intro="The student passport: the policies, procedures and rules that apply once you enrol at a Jetking centre."
      />
    </>
  );
}
