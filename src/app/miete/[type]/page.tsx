import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Title from "@/components/ui/title/Title";
import {
  VALID_TYPES,
  TYPE_LABELS,
  TYPE_DESCRIPTIONS_MIETE,
  isValidType,
} from "@/types/property-types";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  if (!isValidType(type)) return {};
  const label = TYPE_LABELS[type];
  const description = `${TYPE_DESCRIPTIONS_MIETE[type]} – ${label} zur Miete in Bawinkel und dem Emsland.`;
  return {
    title: `${label} mieten`,
    description,
    alternates: { canonical: `/miete/${type}` },
    openGraph: {
      ...defaultOpenGraphMetadata,
      title: `${label} mieten`,
      description,
      url: `/miete/${type}`,
    },
    twitter: {
      ...defaultTwitterMetadata,
      title: `${label} mieten`,
      description,
    },
  };
}

export default async function MieteTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const label = TYPE_LABELS[type];

  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          {label} mieten
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Hier finden Sie alle verfügbaren {label} zur Miete
        </p>
      </div>

      <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Kategorisierte Immobiliensuche ist derzeit in Vorbereitung.
        </p>
        <p className="text-center text-card-text-l dark:text-card-text-d text-sm mt-2">
          Alle verfügbaren Immobilien finden Sie in der{' '}
          <Link href="/objekt" className="text-primary hover:underline">
            Gesamtübersicht
          </Link>
          .
        </p>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
