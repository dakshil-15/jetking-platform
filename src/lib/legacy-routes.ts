/**
 * Legacy URL aliases from jetking.com → new site routes.
 *
 * Reviewed 1:1 mappings only — no wildcard-to-homepage redirects (see DEVELOPMENT-PLAN §6).
 * Merged into next.config.ts alongside redirects.json at build time.
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent?: boolean;
}

/** Navigation and section aliases that differ on the live site. */
export const legacyNavRedirects: LegacyRedirect[] = [
  { source: '/our-courses', destination: '/courses', permanent: true },
  { source: '/our-courses/:path*', destination: '/courses/:path*', permanent: true },
  { source: '/contact-us', destination: '/enquiry', permanent: true },
  { source: '/faqs', destination: '/faq', permanent: true },
  { source: '/student-faqs', destination: '/faq', permanent: true },
  /** Singular — older links and ads sometimes use this form. */
  { source: '/centre/:slug', destination: '/centres/:slug', permanent: true },
  /** WordPress blog posts shipped with .html extensions. */
  { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true },
  { source: '/sitemap-xml', destination: '/sitemap.xml', permanent: true },
];

/**
 * Root-level course landing pages from the live site.
 * Each maps to the nearest equivalent programme in the new catalogue.
 */
export const legacyCourseLandings: LegacyRedirect[] = [
  {
    source: '/diploma-in-cloud-computing-and-cyber-security',
    destination: '/courses/cyber-security-specialist',
    permanent: true,
  },
  {
    source: '/masters-in-blockchain-course-registration-page',
    destination: '/courses',
    permanent: true,
  },
  {
    source: '/masters-in-blockchain-development-course-brochure',
    destination: '/courses',
    permanent: true,
  },
  {
    source: '/courses/diploma-cloud-computing-cyber-security',
    destination: '/courses/cyber-security-specialist',
    permanent: true,
  },
  {
    source: '/courses/aws-solution-specialist',
    destination: '/courses/cloud-devops-engineer',
    permanent: true,
  },
  {
    source: '/courses/red-hat-certification-rhcsa',
    destination: '/courses/network-infrastructure-engineer',
    permanent: true,
  },
  {
    source: '/courses/microsoft-server-technology-specialist-mcts',
    destination: '/courses/network-infrastructure-engineer',
    permanent: true,
  },
  {
    source: '/courses/mcts-windows-10',
    destination: '/courses/it-foundation-programme',
    permanent: true,
  },
  {
    source: '/courses/mbd',
    destination: '/courses',
    permanent: true,
  },
];

export const legacyRedirects: LegacyRedirect[] = [
  ...legacyNavRedirects,
  ...legacyCourseLandings,
];
