import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BadgeCheck,
  Cloud,
  GraduationCap,
  Handshake,
  Landmark,
  Network,
  PhoneCall,
  ScanSearch,
  ServerCog,
  ShieldCheck,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';

/**
 * Static homepage content that has no home in the CMS content model — grounded in
 * what already ships elsewhere in this app (About timeline, admissions policy,
 * franchise copy, course fixtures) rather than invented for this page. No figure
 * here is a scale/outcome claim; those come only from `buildFigures()` /
 * `listTrustSignals()`, which is the one place unverified numbers are refused.
 */

/**
 * One of the site's four global category hues (`--theme-{hue}-ink` / `-tint` in
 * globals.css) — the same set `PROGRAM_META` uses for course-card icon chips on the
 * Professional page (`src/components/professional/data.ts`). Reused here, on career
 * paths and the "Why Jetking" cards, instead of inventing new colours per section —
 * that per-card colour-chip treatment is the "internal page" card language this
 * homepage is matching.
 */
export type Hue = 'network' | 'cloud' | 'cyber' | 'ai';

export const HUE_VARS: Record<Hue, { accent: string; tint: string }> = {
  network: { accent: 'var(--theme-network-ink)', tint: 'var(--theme-network-tint)' },
  cloud: { accent: 'var(--theme-cloud-ink)', tint: 'var(--theme-cloud-tint)' },
  cyber: { accent: 'var(--theme-cyber-ink)', tint: 'var(--theme-cyber-tint)' },
  ai: { accent: 'var(--theme-ai-ink)', tint: 'var(--theme-ai-tint)' },
};

export interface Differentiator {
  icon: LucideIcon;
  hue: Hue;
  title: string;
  detail: string;
}

export const WHY_JETKING: Differentiator[] = [
  {
    icon: Wrench,
    hue: 'network',
    title: 'Lab time, not just lecture time',
    detail:
      'Programmes are built around configuring networks, hardening systems and working through real scenarios in a lab — the same discipline the hardware-and-networking courses were built on.',
  },
  {
    icon: Cloud,
    hue: 'cloud',
    title: 'Hardware fundamentals into cloud and cyber',
    detail:
      'Short courses in PC hardware, networking and Windows feed the same curriculum logic that the cloud, cyber security and data tracks build on — one continuous ladder, not disconnected subjects.',
  },
  {
    icon: Users,
    hue: 'cyber',
    title: 'A counsellor before a checkout page',
    detail:
      'Admissions are handled centre by centre: a counsellor checks eligibility and walks through the right track before you enrol, not an automated cart.',
  },
  {
    icon: ShieldCheck,
    hue: 'cloud',
    title: 'Placement support, honestly framed',
    detail:
      'Resume workshops, mock interviews and hiring-partner introductions where available. Outcomes depend on the student, the market and the programme — no placement is guaranteed.',
  },
];

/** One of the site's four global category hues (`--theme-{hue}-ink` / `-tint` in globals.css) — the same set `PROGRAM_META` uses on the Professional page, reused here rather than inventing a fifth. */
export type CareerHue = 'network' | 'cloud' | 'cyber' | 'ai';

export interface CareerPath {
  icon: LucideIcon;
  hue: CareerHue;
  title: string;
  detail: string;
  skills: string[];
  href: string;
}

export const CAREER_PATHS: CareerPath[] = [
  {
    icon: Network,
    hue: 'network',
    title: 'Network & Systems Engineer',
    detail: 'Design, configure and maintain the networks organisations run on.',
    skills: ['Routing & switching (CCNA)', 'Windows & Linux server admin', 'Network security basics'],
    href: '/courses?tech=networking',
  },
  {
    icon: Cloud,
    hue: 'cloud',
    title: 'Cloud Administrator',
    detail: 'Provision, monitor and secure infrastructure on AWS, Azure and Google Cloud.',
    skills: ['AWS & Azure fundamentals', 'Cloud architecture', 'Hybrid infrastructure'],
    href: '/courses?tech=cloud',
  },
  {
    icon: ScanSearch,
    hue: 'cyber',
    title: 'Cybersecurity Analyst',
    detail: 'Find, report and help close the security gaps attackers look for.',
    skills: ['Ethical hacking (CEH)', 'Security operations', 'Incident response basics'],
    href: '/courses?tech=cyber-security',
  },
  {
    icon: ServerCog,
    hue: 'ai',
    title: 'Data Analyst',
    detail: 'Turn spreadsheets and databases into decisions a business can act on.',
    skills: ['SQL & Excel', 'Power BI & Tableau', 'Python for data'],
    href: '/courses?tech=data',
  },
];

export interface JourneyStep {
  icon: LucideIcon;
  title: string;
  detail: string;
}

export const HOW_IT_WORKS: JourneyStep[] = [
  {
    icon: PhoneCall,
    title: 'Enquire',
    detail: 'Tell us where you are and what you want to study — takes under a minute.',
  },
  {
    icon: Users,
    title: 'Talk to a counsellor',
    detail: 'A counsellor at your nearest centre checks eligibility and fees with you.',
  },
  {
    icon: GraduationCap,
    title: 'Enrol',
    detail: 'Pick your track and batch — degree, diploma or short certification.',
  },
  {
    icon: Wrench,
    title: 'Train in the lab',
    detail: 'Hands-on classes and lab work, not just slides and video.',
  },
  {
    icon: ShieldCheck,
    title: 'Get placement support',
    detail: 'Resume help, mock interviews and hiring-partner introductions where available.',
  },
];

/** Real cert/vendor logos already in `public/logos/`, limited to certifications Jetking's own course fixtures actually cite. */
export const CERT_LOGOS = [
  { name: 'Cisco', file: '/logos/cisco.svg' },
  { name: 'AWS', file: '/logos/amazonaws.svg' },
  { name: 'Microsoft Azure', file: '/logos/microsoftazure.svg' },
  { name: 'Red Hat', file: '/logos/redhat.svg' },
  { name: 'CompTIA', file: '/logos/comptia.svg' },
  { name: 'CEH', file: '/logos/ceh.svg' },
  { name: 'CHFI', file: '/logos/chfi.svg' },
  { name: 'Splunk', file: '/logos/splunk.svg' },
  { name: 'Python', file: '/logos/python.svg' },
  { name: 'Power BI', file: '/logos/powerbi.svg' },
  { name: 'Tableau', file: '/logos/tableau.svg' },
  { name: 'Unity', file: '/logos/unity.svg' },
  { name: 'Unreal Engine', file: '/logos/unrealengine.svg' },
  { name: 'Windows Server', file: '/logos/windows11.svg' },
] as const;

export interface Recognition {
  icon: LucideIcon;
  hue: Hue;
  badge: string;
  title: string;
  detail: string;
}

/** Every entry is taken from the About timeline (`about/data.ts` TIMELINE) or the course fixtures (`fixtures/courses.ts`) — nothing new is claimed here. */
export const RECOGNITIONS: Recognition[] = [
  {
    icon: BadgeCheck,
    hue: 'cloud',
    badge: '1999',
    title: 'Microsoft Certified Solution Provider',
    detail: 'Recognised as a Microsoft Certified Solution Provider and Certified Technical Education Centre (CTEC).',
  },
  {
    icon: Award,
    hue: 'ai',
    badge: '2007',
    title: "Pike's Peak Award",
    detail: 'Honoured for implementing SmartLab Plus, Jetking\u2019s lab-first teaching methodology.',
  },
  {
    icon: Trophy,
    hue: 'cyber',
    badge: '2008',
    title: 'Best Franchisor Award',
    detail: 'Felicitated as Best Franchisor, alongside the launch of a computer fault-simulator kit for troubleshooting practice.',
  },
  {
    icon: Handshake,
    hue: 'network',
    badge: '2011',
    title: 'Alliance with Wipro and IBM',
    detail: 'Industry alliances that shaped the curriculum and placement network.',
  },
  {
    icon: Landmark,
    hue: 'cloud',
    badge: 'Degrees',
    title: 'UGC-approved BCA and MCA',
    detail: 'Cloud Computing & Cyber Security degrees, with the MCA offered with Yenepoya Deemed University.',
  },
  {
    icon: ShieldCheck,
    hue: 'network',
    badge: 'Skill India',
    title: 'NSDC / Skill India recognition',
    detail: 'The Certified Data Analyst programme is NSDC / Skill India recognised.',
  },
];
