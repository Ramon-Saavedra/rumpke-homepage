import type { PropertyDetailDto } from '@/types/property-api';
import { siteName } from '@/lib/site-metadata';

interface BreadcrumbItem {
  readonly name: string;
  readonly item: string;
}

export function buildPropertyBreadcrumbs(property: PropertyDetailDto): BreadcrumbItem[] {
  return [
    { name: siteName, item: '/' },
    { name: 'Immobilien', item: '/objekt' },
    { name: property.title ?? property.id, item: `/objekt/${property.id}` },
  ];
}

export function buildBreadcrumbListJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

function nullOrString(value: string | null | undefined): string | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  return value;
}

export function buildPropertyStructuredData(property: PropertyDetailDto): Record<string, unknown> | null {
  const name = property.title ?? `Immobilie ${property.id}`;

  const address: Record<string, unknown> = {};
  const addr = property.address;
  if (addr.street) address['streetAddress'] = addr.street + (addr.houseNumber ? ` ${addr.houseNumber}` : '');
  if (addr.city) address['addressLocality'] = addr.city;
  if (addr.zip) address['postalCode'] = addr.zip;
  if (addr.country) address['addressCountry'] = addr.country;

  if (Object.keys(address).length === 0) return null;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name,
  };

  schema['address'] = { '@type': 'PostalAddress', ...address };

  if (property.area.livingArea !== null) {
    schema['floorSize'] = { '@type': 'QuantitativeValue', value: property.area.livingArea, unitCode: 'MTK' };
  }

  if (property.rooms.total !== null) {
    schema['numberOfRooms'] = property.rooms.total;
  }

  const imageUrl = resolveOgImage();
  if (imageUrl) {
    schema['image'] = imageUrl;
  }

  const description = property.description ?? property.locationDescription;
  if (description) {
    schema['description'] = description;
  }

  return schema;
}

function resolveOgImage(): string | null {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? '';
  const fallback = base ? `${base}/og-default.png` : null;
  return fallback;
}

export { resolveOgImage, nullOrString };
