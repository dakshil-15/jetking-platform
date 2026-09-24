import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BadgeCheck,
  Handshake,
  Landmark,
  ShieldCheck,
  Trophy,
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

/** One of the site's four global category hues (`--theme-{hue}-ink` / `-tint` in globals.css) — the same set `PROGRAM_META` uses on the Professional page, reused here rather than inventing a fifth. */
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
