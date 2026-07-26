import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyCategoryPage from "@/components/properties/PropertyCategoryPage";
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
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

export default async function MieteTypePage({
  params,
  searchParams,
}: PageProps) {
  const { type } = await params;

  if (!isValidType(type)) {
    notFound();
  }

  const { page: rawPage } = await searchParams;
  const page = Math.max(1, parseInt(rawPage ?? "1", 10) || 1);

  return (
    <PropertyCategoryPage
      marketingType="miete"
      propertyType={type}
      page={page}
    />
  );
}

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({
    type,
  }));
}
