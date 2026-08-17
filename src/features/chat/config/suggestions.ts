import type { LucideIcon } from 'lucide-react';
import { Briefcase, GraduationCap, MapPin, ShieldCheck } from 'lucide-react';

export interface SuggestionCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Questions revealed when the category is selected. */
  prompts: readonly string[];
}

/** Starter questions, each answerable from the crawled jetking.com content. */
export const SUGGESTION_CATEGORIES: readonly SuggestionCategory[] = [
  {
    id: 'courses',
    label: 'Courses',
    icon: GraduationCap,
    prompts: [
      'Which courses does Jetking offer?',
      'What is the BCA in Cloud Computing and Cyber Security?',
      'How long is the Master in Gaming and Metaverse Design?',
    ],
  },
  {
    id: 'careers',
    label: 'Placements',
    icon: Briefcase,
    prompts: [
      'Will I get a job after completing the course?',
      'How many students has Jetking placed?',
      'Which companies recruit from Jetking?',
    ],
  },
  {
    id: 'cyber',
    label: 'Cyber & cloud',
    icon: ShieldCheck,
    prompts: [
      'Which course should I take for a cybersecurity career?',
      'Do you teach ethical hacking?',
      'What AWS and cloud courses are available?',
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    icon: MapPin,
    prompts: [
      'How do I enrol at Jetking?',
      'Where are the Jetking training centres?',
      'What are the course fees and payment options?',
    ],
  },
] as const;
