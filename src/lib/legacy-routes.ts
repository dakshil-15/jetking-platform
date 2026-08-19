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
    destination: '/courses/cloud-cyber-security-professional',
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
    destination: '/courses/cloud-cyber-security-professional',
    permanent: true,
  },
  /*
   * `/courses/aws-solution-specialist` used to redirect to a placeholder course
   * slug. The real catalogue now has an actual `aws-solution-specialist`
   * course, so the legacy URL and the live route are the same string — no
   * redirect needed; removing the entry lets the real page serve directly.
   */
  {
    source: '/courses/red-hat-certification-rhcsa',
    destination: '/courses/red-hat-professional',
    permanent: true,
  },
  {
    source: '/courses/microsoft-server-technology-specialist-mcts',
    destination: '/courses/microsoft-server-specialist',
    permanent: true,
  },
  {
    source: '/courses/mcts-windows-10',
    destination: '/courses/windows-10-specialist',
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
