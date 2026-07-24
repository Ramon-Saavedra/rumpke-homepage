import type { Metadata } from "next";
import Link from "next/link";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import Title from "@/components/ui/title/Title";
import { getPropertyTypes } from "@/types/property-types";
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
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien kaufen
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Finden Sie Ihre Traumimmobilie zum Kauf
        </p>
      </div>

      <PropertyTypeGrid
        types={getPropertyTypes("kauf")}
        basePath="kauf"
        title="Nach Immobilientyp filtern"
      />

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Kategorisierte Immobiliensuche ist derzeit in Vorbereitung.
        </p>
        <p className="text-center text-card-text-l dark:text-card-text-d text-sm mt-2">
          Alle verfügbaren Immobilien zum Kauf finden Sie in der{' '}
          <Link href="/objekt" className="text-primary hover:underline">
            Gesamtübersicht
          </Link>
          .
        </p>
      </div>
    </>
  );
}
