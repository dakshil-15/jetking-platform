import type { Metadata } from 'next';
import type { Centre, Course, Faq, Post, Seo } from '@/lib/content/types';
import { absoluteUrl, siteConfig } from './site';
import { centrePath } from './centre-path';

/**
 * SEO helpers.
 *
 * Every indexable page goes through `buildMetadata`, which guarantees the four
 * things the CI SEO gate asserts (DEVELOPMENT-PLAN §6.2): a non-empty title, a
 * non-empty description, a self-referential absolute canonical, and correct
 * indexability. Pages cannot forget these because there is no other path to
 * metadata in the codebase.
 */

export function buildMetadata(seo: Seo, path: string): Metadata {
  const canonical = absoluteUrl(seo.canonicalPath ?? path);

  return {
    // `absolute` suppresses the root layout's "%s | Jetking" template. SEO titles
    // are authored complete (they already carry the brand), so letting the template
    // apply produces "… | Jetking | Jetking".
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical },
    robots: seo.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: seo.title,
      description: seo.description,
      url: canonical,
      ...(seo.ogImage ? { images: [{ url: absoluteUrl(seo.ogImage) }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Structured data                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/**
 * Course schema deliberately omits `offers`/price. Emitting a price we are not
 * certain of is the structured-data equivalent of the AI Guide quoting a wrong fee
 * (risk R4) — and unlike a chat reply, a wrong price in schema can surface directly
 * in search results.
 */
export function courseSchema(course: Course): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.seo.description,
    url: absoluteUrl(`/courses/${course.slug}`),
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    educationalCredentialAwarded: course.level === 'degree' ? 'Bachelor Degree' : 'Certificate',
    timeRequired: course.duration,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: course.duration,
    },
  };
}

export function centreSchema(centre: Centre, cityName: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/EducationalOrganization',
    name: centre.name,
    url: absoluteUrl(centrePath(centre.slug)),
    parentOrganization: { '@type': 'EducationalOrganization', name: siteConfig.name },
    address: {
      '@type': 'PostalAddress',
      streetAddress: centre.addressLine,
      addressLocality: cityName,
      addressRegion: centre.state,
      postalCode: centre.pincode,
      addressCountry: 'IN',
    },
    ...(centre.phone ? { telephone: centre.phone } : {}),
    ...(centre.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: centre.geo.lat, longitude: centre.geo.lng } }
      : {}),
  };
}

export function articleSchema(post: Post): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(post.heroImage ? { image: absoluteUrl(post.heroImage.url) } : {}),
  };
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
