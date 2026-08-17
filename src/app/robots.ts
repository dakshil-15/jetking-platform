import type { MetadataRoute } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/site';

/**
 * Staging must never be indexed — a crawlable staging copy competes with production
 * for the exact keywords the migration is protecting. Gated on an explicit env flag
 * rather than on NODE_ENV, because staging builds are production builds.
 */
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false';

  if (!indexable) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /v2 is the alternate homepage lead over the same content. It carries
        // noindex + a canonical to `/` already; keeping crawlers off it entirely
        // saves the budget being spent on a duplicate of the site's top page.
        disallow: ['/api/', '/enquiry', '/v2'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteConfig.url,
  };
}
