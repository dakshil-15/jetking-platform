import type { KnownPersonaId } from '@/persona/types';

/**
 * The five entry points in the homepage lead.
 *
 * Every one of them is a real route. The chooser is a signpost, not a gate: the
 * page renders identically for a visitor who never touches it, and nothing behind
 * a card is hidden from a crawler that follows the link. Selecting one records an
 * explicit persona — the strongest signal the engine can get, and the only one the
 * visitor actually consented to — but the navigation happens either way.
 */
export interface Journey {
  id: string;
  title: string;
  detail: string;
  href: string;
  /** Environment photo for the journey chooser (lab, centre, workspace). */
  image: string;
  /** `undefined` for "just exploring" — declining to answer is not a persona. */
  persona?: KnownPersonaId;
  /** CSS custom-property suffix in home.css: `--home-{hue}-ink` / `-tint`. */
  hue: 'student' | 'parent' | 'professional' | 'franchise' | 'explore';
}

export const JOURNEYS: Journey[] = [
  {
    id: 'student',
    title: "I'm a Student",
    detail: 'Explore courses and start my career',
    href: '/student',
    image: '/home/journey-student-v2.jpg',
    persona: 'student',
    hue: 'student',
  },
  {
    id: 'parent',
    title: "I'm a Parent",
    detail: 'Find the right career path for my child',
    href: '/parent',
    image: '/home/journey-parent-v3.jpg',
    persona: 'parent',
    hue: 'parent',
  },
  {
    id: 'professional',
    title: "I'm a Working Professional",
    detail: 'Upgrade my skills and advance my career',
    href: '/professional',
    image: '/home/journey-professional-v3.jpg',
    persona: 'professional',
    hue: 'professional',
  },
  {
    id: 'franchise',
    title: "I'm Interested in Franchise",
    detail: 'Partner with Jetking and grow your business',
    href: '/franchise',
    image: '/home/journey-franchise-v3.jpg',
    persona: 'franchise',
    hue: 'franchise',
  },
  {
    id: 'exploring',
    title: "I'm Just Exploring",
    detail: 'Browse around and learn more',
    href: '/explore',
    image: '/home/journey-explore-v2.jpg',
    hue: 'explore',
  },
];
