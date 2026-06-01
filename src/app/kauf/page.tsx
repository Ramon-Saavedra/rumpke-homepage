import type { Metadata } from "next";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import Title from "@/components/ui/title/Title";
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



const PROPERTY_TYPES = [
  { slug: "haeuser", label: "Häuser", description: "Einfamilienhäuser, Reihenhäuser, Villen" },
  { slug: "wohnungen", label: "Wohnungen", description: "Eigentumswohnungen, Apartments" },
  { slug: "gewerbeimmobilien", label: "Gewerbeimmobilien", description: "Büros, Lagerhallen, Geschäfte" },
  { slug: "grundstueck", label: "Grundstück", description: "Baugrundstücke, Ackerland" },
] as const;

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
        types={PROPERTY_TYPES}
        basePath="kauf"
        title="Nach Immobilientyp filtern"
      />

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle Immobilien zum Kauf werden hier angezeigt, sobald das Backend integriert ist.
        </p>
      </div>
    </>
  );
}
