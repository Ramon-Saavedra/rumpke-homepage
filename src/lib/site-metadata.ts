import type { Metadata } from "next";

export const siteName = "Rumpke Immobilien";
export const siteLocale = "de_DE";
export const siteDescription =
  "Persoenliche Immobilienberatung fuer Verkauf, Vermietung und Bewertung in Bawinkel und Umgebung.";
export const siteTitleTemplate = `%s | ${siteName}`;

const defaultSiteUrl = "http://localhost:3000";

function resolveMetadataBase(): URL {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredSiteUrl) {
    try {
      return new URL(configuredSiteUrl);
    } catch {
      return new URL(defaultSiteUrl);
    }
  }

  return new URL(defaultSiteUrl);
}

export const defaultOpenGraphMetadata = {
  locale: siteLocale,
  siteName,
  type: "website",
} satisfies NonNullable<Metadata["openGraph"]>;

export const defaultTwitterMetadata = {
  card: "summary",
} satisfies NonNullable<Metadata["twitter"]>;

export const siteMetadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  applicationName: siteName,
  title: {
    default: siteName,
    template: siteTitleTemplate,
  },
  description: siteDescription,
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
