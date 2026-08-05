import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Title from "@/components/ui/title/Title";
import { Key, FileText } from "lucide-react";
import PropertyEmptyState from "@/components/properties/PropertyEmptyState";
import { getProperties } from "@/lib/property-client";
import {
  categoryEmptyStateCopy,
  SERVICE_ERROR_COPY,
} from "@/lib/property-empty-state";
import {
  VALID_TYPES,
  TYPE_LABELS,
  TYPE_DESCRIPTIONS,
  TRANSACTION_LABELS,
  PROPERTY_TYPE_FILTERS,
  isValidType,
  type PropertyType,
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { type } = await params;
  if (!isValidType(type)) return {};
  const label = TYPE_LABELS[type];
  const description = `${TYPE_DESCRIPTIONS[type]} – ${label} kaufen oder mieten in Bawinkel und dem Emsland.`;
  return {
    title: label,
    description,
    alternates: { canonical: `/kategorie/${type}` },
    openGraph: {
      ...defaultOpenGraphMetadata,
      title: label,
      description,
      url: `/kategorie/${type}`,
    },
    twitter: {
      ...defaultTwitterMetadata,
      title: label,
      description,
    },
  };
}

type AvailabilityResult = "available" | "empty" | "error";

async function fetchCategoryAvailability(
  type: PropertyType,
): Promise<AvailabilityResult> {
  try {
    const result = await getProperties({
      page: 1,
      limit: 1,
      propertyType: PROPERTY_TYPE_FILTERS[type],
    });
    return result.data.length === 0 ? "empty" : "available";
  } catch {
    return "error";
  }
}

export default async function PropertyTypePage({ params }: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const label = TYPE_LABELS[type];
  const description = TYPE_DESCRIPTIONS[type];
  const availability = await fetchCategoryAvailability(type);

  if (availability !== "available") {
    return (
      <div>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Title variant="h1" size="xl" align="center">
            {label}
          </Title>
        </div>

        {availability === "error" ? (
          <PropertyEmptyState {...SERVICE_ERROR_COPY} />
        ) : (
          <PropertyEmptyState {...categoryEmptyStateCopy(type)} />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Title variant="h1" size="xl" align="center" subtitle={description}>
          {label}
        </Title>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href={`/kauf/${type}`}
          className="group rounded-lg border border-border-l bg-bgSecondary-l p-8 text-center transition hover:bg-Bghover-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-12 dark:border-border-d dark:bg-bgSecondary-d dark:hover:bg-Bghover-d"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Key size={48} strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">
              {TRANSACTION_LABELS.kauf}
            </h2>
            <p className="text-lg text-card-text-l dark:text-card-text-d">
              {label} zum Kauf anzeigen
            </p>
          </div>
        </Link>

        <Link
          href={`/miete/${type}`}
          className="group rounded-lg border border-border-l bg-bgSecondary-l p-8 text-center transition hover:bg-Bghover-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-12 dark:border-border-d dark:bg-bgSecondary-d dark:hover:bg-Bghover-d"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText size={48} strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">
              {TRANSACTION_LABELS.miete}
            </h2>
            <p className="text-lg text-card-text-l dark:text-card-text-d">
              {label} zur Miete anzeigen
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
