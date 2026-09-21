import type { Centre } from '@/lib/content/types';

/**
 * Google Maps "search" link for a centre — the documented universal URL, so it opens the
 * Maps app on phones and maps.google.com on desktop with no API key.
 *
 * Exact coordinates win when a centre has them. Otherwise the query is the centre name plus
 * its address and pincode: the name lets Google match the listed business, the address
 * keeps it pinned to the right building if it does not.
 */
export function googleMapsUrl(
  centre: Pick<Centre, 'name' | 'addressLine' | 'pincode' | 'geo'>,
): string {
  const query = centre.geo
    ? `${centre.geo.lat},${centre.geo.lng}`
    : [centre.name, centre.addressLine, centre.pincode].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
