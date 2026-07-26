import type { Metadata } from "next";
import PropertyCategoryLandingPage from "@/components/properties/PropertyCategoryLandingPage";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Immobilien mieten",
  description:
    "Mietimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen und Gewerbeimmobilien zur Miete bei Rumpke Immobilien.",
  alternates: { canonical: "/miete" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Immobilien mieten",
    description:
      "Mietimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen und Gewerbeimmobilien zur Miete bei Rumpke Immobilien.",
    url: "/miete",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Immobilien mieten",
    description:
      "Mietimmobilien im Emsland und der Grafschaft Bentheim – Häuser, Wohnungen und Gewerbeimmobilien zur Miete bei Rumpke Immobilien.",
  },
};

export default function MietePage() {
  return (
    <PropertyCategoryLandingPage
      marketingType="miete"
      heading="Immobilien mieten"
      subtitle="Finden Sie Ihre Traumimmobilie zur Miete"
    />
  );
}
