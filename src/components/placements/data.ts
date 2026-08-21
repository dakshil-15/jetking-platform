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
  // The following three are mirrored from the jetking.com homepage (fetched 2026-08-21), not /placements.
  {
    name: 'Preeti Madan',
    role: 'Quatrro',
    quote:
      "Before joining Jetking, I was not sure what to do with my career. But after completing the course, I got the right platform to start my career. It's been nearly 5 years and I have never looked back. I am very satisfied with my decision to join Jetking which has proved that there is no disadvantage of being a girl in technical domain.",
  },
  {
    name: 'Nikhil Pathare',
    role: 'Tata Consultancy Services',
    quote:
      'Without Jetking, I don’t know where I would be. You made a major difference in my life. All those times that you have gone the extra mile for me, I really did notice. Your belief in me makes me believe in myself.',
  },
  {
    name: 'Abhishek',
    role: 'IBM-Collabera',
    quote:
      'I am very happy with Jetking for the placement assistance, even after my first job. I am grateful for all the guidance and technical knowledge provided. At Jetking we are not only trained in the technical domain as well as I have also improved my communication skills and confidence in appearing for interviews.',
  },
];

export type VideoTestimonial = {
  name: string;
  title: string;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  thumbnail: string;
};

/**
 * Video placement testimonials — real videos embedded live on jetking.com,
 * confirmed via YouTube/Vimeo oEmbed (fetched 2026-08-21): one from Jetking's
 * official YouTube channel (embedded on /placements), three from Jetking's
 * official Vimeo account (embedded on the jetking.com homepage). No video
 * content or thumbnail here is generated or guessed — every id resolves to a
 * currently-live Jetking-published video.
 */
export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    name: 'Prajwal',
    title: 'Placement testimonial — Jetking Blockchain',
    provider: 'youtube',
    videoId: 'Q4-k5emEc54',
    thumbnail: 'https://i.ytimg.com/vi/Q4-k5emEc54/hqdefault.jpg',
  },
  {
    name: 'Shivam Thakur',
    title: 'Placement testimonial — Jetking Blockchain',
    provider: 'vimeo',
    videoId: '662754940',
    thumbnail:
      'https://i.vimeocdn.com/video/1341047580-3829e2724a90143d5dc7e239eeb16cccf943574be18716b0b48e1f04c62b4225-d_640?region=us',
  },
  {
    name: 'Srinivas Balaji',
    title: 'Placement testimonial — Jetking Blockchain',
    provider: 'vimeo',
    videoId: '662750796',
    thumbnail:
      'https://i.vimeocdn.com/video/1341040811-6a627a6d76667e374731f1df9fc5699e4ba0762b90ebaa6cdd1029935be461c3-d_640?region=us',
  },
  {
    name: 'Anandhu Krishnan',
    title: 'Placement testimonial — Jetking Blockchain',
    provider: 'vimeo',
    videoId: '672638981',
    thumbnail:
      'https://i.vimeocdn.com/video/1363127547-b5dd990b44cceb59df4c32e23b81c412ca462ae5ce05a645ca6e0174ba60ba87-d_640?region=us',
  },
];

export const PLACEMENTS_CONTACT = {
  phone: '07666830000',
  tel: 'tel:07666830000',
  email: 'info@jetking.com',
} as const;
