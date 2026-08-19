/**
 * Placements content — mirrored from jetking.com/placements (fetched 2026-08-18).
 * Names, companies and quotes are Jetking's own published placement records;
 * nothing here is invented. No figure implies a guarantee — see the summary
 * disclaimer, which is load-bearing, not decorative.
 */

export const PLACEMENTS_HERO = {
  eyebrow: 'Placements',
  titleLead: 'Career growth begins with',
  titleAccent: 'the right placement',
  lede: "Gain the upper hand through Jetking's network of industry and placement partners — real preparation, real introductions to hiring companies.",
} as const;

/** Deliberately no promised numbers here — see design-system/MASTER.md, "unverified claims stay unpublished". */
export const PLACEMENT_DISCLAIMER =
  'Placement support is real work Jetking does on a learner’s behalf: resume preparation, interview practice and introductions to hiring partners where available. It is not a guarantee — outcomes depend on the programme, the centre, the local employer market and the individual learner.';

export type ProcessStep = { step: string; title: string };

export const PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'Complete the training' },
  { step: '02', title: 'Biodata preparation' },
  { step: '03', title: 'Mock interviews' },
  { step: '04', title: 'Student interviews' },
  { step: '05', title: 'Appointment letter' },
];

export const STUDENT_BENEFITS = [
  'Learn practically',
  'English speaking',
  'Interview skills',
  'Get jobs',
] as const;

export type PlacedCandidate = { name: string; company: string };

/** A sample of Jetking's own published placement records — not an exhaustive list. */
export const PLACED_CANDIDATES: PlacedCandidate[] = [
  { name: 'Abhay Singh', company: 'Reisnet' },
  { name: 'Niloy Saha', company: 'Laundryheap' },
  { name: 'Vaibhav Mishra', company: 'Futwork' },
  { name: 'Umang Tiwari', company: 'Vishwada Enterprises' },
  { name: 'Amit Gupta', company: 'Meenakshi Infotech' },
  { name: 'Suresh Hansda', company: 'Bharti Airtel Limited' },
  { name: 'Pavan T', company: 'Oraiyan Groups' },
  { name: 'Ravi Kumar', company: 'Birla Corp' },
  { name: 'Aravind Andugula', company: 'Sai Hadya Hospital' },
  { name: 'Soumyajeet Mandal', company: 'Cygnus Group' },
  { name: 'Saurav Sarma', company: 'ICICI Insurance' },
  { name: 'Mohd Qasim', company: 'Wipro' },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Ashwani Jaiswal',
    role: 'Support Engineer, Apple',
    quote:
      'After completing my course from Jetking in 2015, I joined Apple Inc. as a Service Engineer, and now I am a Sr. Service Engineer with them.',
  },
  {
    name: 'Prakhar Dixit',
    role: 'Service Engineer, Apple',
    quote: 'This course helped me acquire thorough knowledge of hardware and networking.',
  },
  {
    name: 'Mr. Satish Dhiman',
    role: 'Chief Business Manager, PNB MetLife',
    quote: "It's a really good approach to meet employers and encourage job seekers.",
  },
];

export const PLACEMENTS_CONTACT = {
  phone: '07666830000',
  tel: 'tel:07666830000',
  email: 'info@jetking.com',
} as const;
