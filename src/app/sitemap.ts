import type { MetadataRoute } from 'next';
import { content } from '@/lib/content';
import { centrePath } from '@/lib/centre-path';
import { absoluteUrl } from '@/lib/site';

/**
 * Generated from the content source, so it can never drift out of sync with what
 * actually exists — a hand-maintained sitemap is the usual cause of the "sitemap
 * contains redirected/404 URLs" failure in the CI SEO gate (§6.2).
 *
 * `/enquiry` is deliberately absent: it is noindex, and a noindex URL in the sitemap
 * is a contradictory signal to crawlers.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, cities, centres, posts] = await Promise.all([
    content.listCourses(),
    content.listCities(),
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
  ];

  return [
    ...staticRoutes,
    ...courses.map((course) => ({
      url: absoluteUrl(`/courses/${course.slug}`),
      lastModified: new Date(course.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...cities.map((city) => ({
      url: absoluteUrl(`/centres/${city.slug}`),
      lastModified: new Date(city.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
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
