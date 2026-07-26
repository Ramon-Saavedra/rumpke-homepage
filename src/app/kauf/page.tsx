import type { Metadata } from "next";
import PropertyCategoryLandingPage from "@/components/properties/PropertyCategoryLandingPage";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Immobilien kaufen",
  description:
    "Kaufimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen, Grundstücke und Gewerbeimmobilien bei Rumpke Immobilien.",
  alternates: { canonical: "/kauf" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Immobilien kaufen",
    description:
      "Kaufimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen, Grundstücke und Gewerbeimmobilien bei Rumpke Immobilien.",
    url: "/kauf",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Immobilien kaufen",
    description:
      "Kaufimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen, Grundstücke und Gewerbeimmobilien bei Rumpke Immobilien.",
  },
};

export default function KaufPage() {
  return (
    <PropertyCategoryLandingPage
      marketingType="kauf"
      heading="Immobilien kaufen"
      subtitle="Finden Sie Ihre Traumimmobilie zum Kauf"
    />
  );
}
