import privacy from './privacy-policy.json';
import terms from './terms-conditions.json';
import enrollment from './enrollment-terms.json';

/**
 * Legal documents, copied from jetking.com. The JSON keeps each page's wording as published;
 * only layout was cleaned up (real headings and lists, tables typed out instead of screenshots).
 * Each file records the page it came from in `sourceUrl`.
 */
export type LegalBlock =
  | { t: 'h2' | 'h3'; text: string }
  | { t: 'p'; text: string }
  /** Marker `m` is the source's own numbering ("a.", "3."); bullets have none. */
  | { t: 'ul' | 'ol'; items: { m: string | null; text: string }[] }
  | { t: 'table'; caption?: string; head: string[]; rows: string[][] }
  | { t: 'img'; src: string; alt: string; w: number; h: number };

export interface LegalDoc {
  slug: string;
  title: string;
  sourceUrl: string;
  blocks: LegalBlock[];
}

export const privacyPolicy = privacy as LegalDoc;
export const termsConditions = terms as LegalDoc;
export const enrollmentTerms = enrollment as LegalDoc;

/** Footer / cross-link entries, in the order they read best. */
export const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Enrollment Terms', href: '/enrollment-terms-and-conditions' },
] as const;
