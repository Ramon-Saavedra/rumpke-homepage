import type { Metadata } from "next";
import Title from "@/components/ui/title/Title";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import { getPropertyTypes } from "@/types/property-types";
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
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien mieten
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Finden Sie Ihre Traumimmobilie zur Miete
        </p>
      </div>

      <PropertyTypeGrid
        types={getPropertyTypes("miete")}
        basePath="miete"
        title="Nach Immobilientyp filtern"
      />

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle Immobilien zur Miete werden hier angezeigt, sobald das Backend integriert ist.
        </p>
      </div>
    </>
  );
}
