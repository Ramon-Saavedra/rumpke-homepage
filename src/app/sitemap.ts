import type { MetadataRoute } from 'next';
import { VALID_TYPES } from '@/types/property-types';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/kauf`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/miete`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/objekt`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/dienstleistungen`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/dienstleistungen/immobilien-kauf`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/dienstleistungen/verkauf-vermietung`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/dienstleistungen/immobilienbewertung`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ueber-uns`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/kontakt`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
  ];

  const kaufRoutes: MetadataRoute.Sitemap = VALID_TYPES.map(type => ({
    url: `${BASE_URL}/kauf/${type}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const mieteRoutes: MetadataRoute.Sitemap = VALID_TYPES.map(type => ({
    url: `${BASE_URL}/miete/${type}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const kategorieRoutes: MetadataRoute.Sitemap = VALID_TYPES.map(type => ({
    url: `${BASE_URL}/kategorie/${type}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [...staticRoutes, ...kaufRoutes, ...mieteRoutes, ...kategorieRoutes];
}
