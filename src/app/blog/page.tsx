import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { JsonLd, type Crumb } from '@/components/ui';
import { BlogLanding } from '@/components/blog/BlogLanding';

export const metadata: Metadata = buildMetadata(
  {
    title: 'Career Guidance & IT Insights | Jetking Blog',
    description:
      'Guidance on choosing an IT course, switching careers, and what employers look for — written for students, working professionals and parents.',
  },
  '/blog',
);

/**
 * Blog index — Future-Ready dark canvas (home / student language).
 *
 * Cards carry the volume better than a light editorial list once the page sits
 * on the same dark lead as `/` and `/student`. Adaptation re-orders cards; it
 * never hides a post. Article pages (`/blog/[slug]`) stay on the light reading
 * template — only this index shares the lead skin.
 */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}) {
  const { category: rawCategory, q: rawQuery, page: rawPage } = await searchParams;
  const allPosts = await content.listPosts();

  const categories = [...new Set(allPosts.map((p) => p.category))].sort((a, b) =>
    a.localeCompare(b),
  );

  const activeCategory =
    rawCategory && categories.includes(rawCategory) ? rawCategory : null;

  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const parsedPage = Number.parseInt(typeof rawPage === 'string' ? rawPage : '', 10);
  const initialPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const trail: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <BlogLanding
        allPosts={allPosts}
        posts={posts}
        categories={categories}
        activeCategory={activeCategory}
        latestSlug={allPosts[0]?.slug ?? null}
        initialQuery={typeof rawQuery === 'string' ? rawQuery : ''}
        initialPage={initialPage}
      />
    </>
  );
}
