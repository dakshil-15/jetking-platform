import { permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { centrePath } from '@/lib/centre-path';
import { buildMetadata } from '@/lib/seo';

/**
 * Nested centre URL — `/centres/{city}/{slug}`.
 *
 * The live site uses flat `/centres/{slug}` paths. Nested URLs still resolve for
 * bookmarks and internal links, but permanently redirect to the flat canonical.
 */
export async function generateStaticParams() {
  const centres = await content.listCentres();
  return centres.map((centre) => ({ city: centre.citySlug, slug: centre.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}): Promise<Metadata> {
  const { city, slug } = await params;
  const centre = await content.getCentre(city, slug);
  if (!centre) return {};
  return buildMetadata(centre.seo, centrePath(centre.slug));
}

export default async function NestedCentrePage({
  params,
}: {
  params: Promise<{ city: string; slug: string }>;
}) {
  const { city: citySlug, slug } = await params;
  const centre = await content.getCentre(citySlug, slug);
  if (!centre) permanentRedirect('/centres');

  permanentRedirect(centrePath(centre.slug));
}
