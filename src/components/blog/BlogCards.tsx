import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ImageRef, Post } from '@/lib/content/types';
import { siteConfig } from '@/lib/site';

export const BLOG_PAGE_SIZE = 12;

export function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function blogIndexHref({
  category = null,
  searchQuery,
  page,
}: {
  category?: string | null;
  searchQuery?: string;
  page?: number;
}): Route {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  const q = searchQuery?.trim();
  if (q) params.set('q', q);
  if (page && page > 1) params.set('page', String(page));
  const qs = params.toString();
  return (qs ? `/blog?${qs}` : '/blog') as Route;
}

/** @deprecated Prefer blogIndexHref — kept for existing call sites. */
export function categoryHref(category: string | null, searchQuery?: string): Route {
  return blogIndexHref({ category, searchQuery });
}

/** Cover for cards — hero first, then SEO og image. */
export function postCover(post: Post): ImageRef | null {
  if (post.heroImage?.url) return post.heroImage;
  if (post.seo?.ogImage) {
    return { url: post.seo.ogImage, alt: post.title };
  }
  return null;
}

export function PostCard({ post, badge }: { post: Post; badge?: 'latest' }) {
  const cover = postCover(post);

  return (
    <article className="relative h-full">
      {badge === 'latest' ? (
        <span className="blog-latest-badge">
          <Sparkles className="h-3 w-3" strokeWidth={2.25} aria-hidden="true" />
          Latest
        </span>
      ) : null}
      <Link
        href={`/blog/${post.slug}` as Route}
        className="blog-card-shell blog-card-interactive group/post"
      >
        <div className="blog-card flex h-full flex-col overflow-hidden">
          <div className="blog-card-media relative aspect-[840/300] overflow-hidden">
            {cover ? (
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/post:scale-[1.03]"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,var(--blog-card),var(--blog-surface),var(--blog-card))]"
                aria-hidden="true"
              >
                <span className="flex items-center gap-2.5 opacity-90">
                  <span
                    className="relative grid h-9 w-[30px] shrink-0 place-items-center overflow-hidden border-[2.5px] sm:h-10 sm:w-[34px]"
                    style={{
                      borderRadius: '7px 7px 46% 46% / 7px 7px 56% 56%',
                      borderColor: 'var(--blog-accent-soft)',
                    }}
                  >
                    <span
                      className="mt-[-2px] h-[58%] w-[38%]"
                      style={{
                        background:
                          'repeating-linear-gradient(-48deg,var(--blog-accent-soft) 0 2px,transparent 2px 5.5px)',
                      }}
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[20px] leading-none font-extrabold tracking-[-0.02em] text-jk-400 sm:text-[22px]">
                      {siteConfig.name}
                      <sup className="ml-0.5 text-[9px] font-bold sm:text-[10px]">®</sup>
                    </span>
                    <span className="mt-0.5 text-[9px] font-semibold tracking-[0.06em] text-jk-300 sm:text-[10px]">
                      Better Life
                    </span>
                  </span>
                </span>
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(7_7_12/0.35)] via-transparent to-transparent"
            />
          </div>

          <div className="flex flex-1 flex-col p-5 xs:p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="inline-flex rounded-full border border-[var(--blog-accent-soft)]/35 bg-[var(--blog-accent-tint)] px-2.5 py-1 text-[11px] font-bold tracking-[0.06em] text-[var(--blog-accent-soft)] uppercase">
                {post.category}
              </span>
              <time
                dateTime={post.publishedAt}
                className="numeral text-[12.5px] font-semibold text-[var(--blog-ink-muted)]"
              >
                {formatPostDate(post.publishedAt)}
              </time>
            </div>

            <h3 className="mt-3.5 font-display text-[17px] leading-snug font-extrabold tracking-[-0.02em] text-[var(--blog-ink)] transition-colors group-hover/post:text-[var(--blog-accent-soft)] xs:text-[18px] sm:text-[19px]">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-[var(--blog-ink-muted)] xs:text-[14px]">
              {post.excerpt}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-bold text-[var(--blog-accent-soft)]">
              Read article
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/post:translate-x-0.5"
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
