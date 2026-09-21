import type { MetadataRoute } from 'next';
import { content } from '@/lib/content';
import { centrePath } from '@/lib/centre-path';
import { disclosures } from '@/lib/investors/disclosures';
import { absoluteUrl } from '@/lib/site';

/**
 * Generated from the content source, so it can never drift out of sync with what
 * actually exists — a hand-maintained sitemap is the usual cause of the "sitemap
 * contains redirected/404 URLs" failure in the CI SEO gate (§6.2).
 *
 * There are no city URLs: `/centres/{city}` permanently redirects to the centres directory,
 * and a redirecting URL does not belong in a sitemap.
 *
 * `/enquiry` is deliberately absent: it is noindex, and a noindex URL in the sitemap
 * is a contradictory signal to crawlers.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, centres, posts] = await Promise.all([
    content.listCourses(),
    content.listCentres(),
    content.listPosts(),
  ]);

  const now = new Date();


  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/courses'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/centres'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/placements'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/student'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/parent'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: absoluteUrl('/professional'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    { url: absoluteUrl('/franchise'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: absoluteUrl('/about-us'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl('/sitemap'), lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: absoluteUrl('/privacy-policy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms-conditions'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/enrollment-terms-and-conditions'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: absoluteUrl('/investors'),
      // Filings land quarterly, so the honest "last modified" is when the lists were last synced.
      lastModified: new Date(disclosures.syncedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  return [
    ...staticRoutes,
    ...courses.map((course) => ({
      url: absoluteUrl(`/courses/${course.slug}`),
      lastModified: new Date(course.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...centres.map((centre) => ({
      url: absoluteUrl(centrePath(centre.slug)),
      lastModified: new Date(centre.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
