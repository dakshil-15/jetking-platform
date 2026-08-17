import type { Course } from '../types';

/**
 * PLACEHOLDER CONTENT — structure is production-shaped, values are not authoritative.
 *
 * Every `@grounded` field here must be replaced with Jetking-supplied data before
 * launch. `fees.disclosed: false` is the safe default: it forces the AI Guide down
 * the counsellor-handoff path rather than letting it quote a number (risk R4).
 */
export const courses: Course[] = [
  {
    slug: 'bca-cloud-cyber-security',
    title: 'BCA in Cloud Computing & Cyber Security',
    shortTitle: 'BCA — Cloud & Cyber',
    level: 'degree',
    duration: '3 years',
    eligibility: '10+2 pass in any stream. No entrance test required.',
    heroImage: {
      url: '/courses/bca-cloud-cyber-security.jpg',
      alt: 'BCA in Cloud Computing and Cyber Security illustration',
    },
    certificateImage: {
      url: '/courses/bca-cloud-cyber-security-certificate.jpg',
      alt: 'BCA in Cloud Computing and Cyber Security certificate specimen',
    },
    summary:
      'A UGC-recognised bachelor degree built around industry certification. Students work on cloud infrastructure and security tooling from the first year, with placement support beginning before the degree completes.',
    outcomes: [
      'Graduate with a recognised BCA degree plus stacked industry certifications',
      'Build and secure cloud infrastructure on major providers',
      'Enter roles such as Cloud Support Associate, SOC Analyst, or Network Engineer',
    ],
    modules: [
      'Foundations of computing and networking',
      'Linux system administration',
      'Cloud infrastructure and virtualisation',
      'Cyber security operations and incident response',
      'Industry capstone project',
    ],
    certifications: ['Red Hat', 'CompTIA', 'Cloud platform associate'],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { student: 1, parent: 0.9, professional: 0.2 },
    seo: {
      title: 'BCA in Cloud Computing & Cyber Security | Jetking',
      description:
        'A 3-year BCA degree in cloud computing and cyber security. No entrance test, industry certifications included, placement support. Eligibility: 10+2 any stream.',
    },
    featured: true,
    updatedAt: '2026-07-01',
  },
  {
    slug: 'cyber-security-specialist',
    title: 'Cyber Security Specialist Programme',
    shortTitle: 'Cyber Security Specialist',
    level: 'diploma',
    duration: '12 months',
    eligibility: '10+2 pass, or graduates and working professionals seeking a career change.',
    heroImage: {
      url: '/courses/ethical-hacking-specialist.jpg',
      alt: 'Cyber Security Specialist programme illustration',
    },
    summary:
      'A hands-on programme covering defensive and offensive security practice, built for learners who want to move into a security operations role without a multi-year degree commitment.',
    outcomes: [
      'Operate as a Tier-1 SOC analyst',
      'Run vulnerability assessments and interpret findings',
      'Prepare for recognised industry security certifications',
    ],
    modules: [
      'Networking and protocol fundamentals',
      'Operating system hardening',
      'Threat detection and SIEM operations',
      'Ethical hacking and penetration testing basics',
      'Governance, risk and compliance overview',
    ],
    certifications: ['CompTIA Security+', 'Red Hat'],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { professional: 1, student: 0.7, parent: 0.4 },
    seo: {
      title: 'Cyber Security Specialist Course — 12 Months | Jetking',
      description:
        'A 12-month cyber security specialist programme covering SOC operations, threat detection and ethical hacking. Open to 10+2 pass and working professionals.',
    },
    featured: true,
    updatedAt: '2026-07-01',
  },
  {
    slug: 'cloud-devops-engineer',
    title: 'Cloud & DevOps Engineer Programme',
    shortTitle: 'Cloud & DevOps',
    level: 'diploma',
    duration: '10 months',
    eligibility: 'Graduates or working professionals with basic IT familiarity.',
    heroImage: {
      url: '/courses/cloud-computing-engineer-ai.jpg',
      alt: 'Cloud and DevOps Engineer programme illustration',
    },
    certificateImage: {
      url: '/courses/cloud-computing-engineer-ai-certificate.jpg',
      alt: 'Cloud and DevOps Engineer certificate specimen',
    },
    summary:
      'Designed for upskillers already in an IT role. Covers cloud infrastructure, containerisation and CI/CD pipelines with an emphasis on production practice rather than theory.',
    outcomes: [
      'Deploy and operate containerised workloads',
      'Build CI/CD pipelines end to end',
      'Move into Cloud Engineer or DevOps Associate roles',
    ],
    modules: [
      'Linux and shell proficiency',
      'Cloud compute, storage and networking',
      'Containers and orchestration',
      'CI/CD tooling and automation',
      'Infrastructure as code',
    ],
    certifications: ['Red Hat', 'Cloud platform associate'],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { professional: 1, student: 0.4 },
    seo: {
      title: 'Cloud & DevOps Engineer Course — 10 Months | Jetking',
      description:
        'A 10-month cloud and DevOps programme for working professionals. Containers, CI/CD, infrastructure as code and cloud operations with hands-on labs.',
    },
    featured: true,
    updatedAt: '2026-07-01',
  },
  {
    slug: 'network-infrastructure-engineer',
    title: 'Network & Infrastructure Engineer Programme',
    shortTitle: 'Network Engineer',
    level: 'diploma',
    duration: '9 months',
    eligibility: '10+2 pass. No prior IT experience required.',
    heroImage: {
      url: '/courses/routing-switching-administrator.jpg',
      alt: 'Network and Infrastructure Engineer programme illustration',
    },
    summary:
      'The classic Jetking networking track, updated for hybrid cloud environments. Suited to learners who want a structured entry into IT infrastructure roles.',
    outcomes: [
      'Configure and troubleshoot enterprise networks',
      'Administer Windows and Linux server environments',
      'Enter roles such as Network Support Engineer or IT Infrastructure Associate',
    ],
    modules: [
      'Networking fundamentals and routing',
      'Windows server administration',
      'Linux server administration',
      'Network security essentials',
      'Hybrid cloud connectivity',
    ],
    certifications: ['CompTIA Network+', 'Red Hat'],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { student: 0.9, professional: 0.6, parent: 0.7 },
    seo: {
      title: 'Network & Infrastructure Engineer Course | Jetking',
      description:
        'A 9-month network and infrastructure engineering programme. Routing, server administration and hybrid cloud connectivity. Open to 10+2 pass, no experience needed.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'ai-cloud-track',
    title: 'AI & Cloud Applications Track',
    shortTitle: 'AI & Cloud',
    level: 'certification',
    duration: '6 months',
    eligibility: 'Graduates, or learners who have completed a Jetking foundation programme.',
    heroImage: {
      url: '/courses/cloud-computing-professional-ai.jpg',
      alt: 'AI and Cloud Applications track illustration',
    },
    certificateImage: {
      url: '/courses/cloud-computing-professional-ai-certificate.jpg',
      alt: 'AI and Cloud Applications certificate specimen',
    },
    summary:
      'A shorter, focused track on applying AI services within cloud environments — aimed at learners who already have infrastructure grounding and want to add applied AI capability.',
    outcomes: [
      'Integrate managed AI services into applications',
      'Understand model deployment and cost considerations',
      'Add an applied AI specialisation to an infrastructure profile',
    ],
    modules: [
      'Cloud AI service landscape',
      'Working with model APIs',
      'Data handling and pipelines',
      'Deployment, monitoring and cost control',
    ],
    certifications: ['Cloud platform AI associate'],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { professional: 1, student: 0.5 },
    seo: {
      title: 'AI & Cloud Applications Course — 6 Months | Jetking',
      description:
        'A 6-month applied AI and cloud track covering managed AI services, model APIs, deployment and cost control. For graduates and Jetking foundation learners.',
    },
    updatedAt: '2026-07-01',
  },
  {
    slug: 'it-foundation-programme',
    title: 'IT Foundation Programme',
    shortTitle: 'IT Foundation',
    level: 'short',
    duration: '4 months',
    eligibility: '10th pass or above. Absolute beginners welcome.',
    heroImage: {
      url: '/courses/pc-hardware-support.jpg',
      alt: 'IT Foundation programme illustration',
    },
    summary:
      'An entry point for learners with no technical background, covering computing fundamentals, networking basics and the study habits needed for a longer programme.',
    outcomes: [
      'Build confidence with computing and networking fundamentals',
      'Identify which specialist track fits your goals',
      'Progress into a diploma or degree programme',
    ],
    modules: [
      'Computing fundamentals',
      'Introduction to networking',
      'Introduction to operating systems',
      'Career orientation and pathway planning',
    ],
    certifications: [],
    fees: { disclosed: false, emiAvailable: true, note: 'Fees vary by centre and intake. Confirmed by a counsellor.' },
    personaRelevance: { student: 0.8, parent: 0.8 },
    seo: {
      title: 'IT Foundation Programme — 4 Months | Jetking',
      description:
        'A 4-month IT foundation course for complete beginners. Computing and networking fundamentals plus guided pathway planning. Eligibility: 10th pass.',
    },
    updatedAt: '2026-07-01',
  },
];
