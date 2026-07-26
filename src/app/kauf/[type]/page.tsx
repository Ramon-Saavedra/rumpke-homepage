import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyCategoryPage from "@/components/properties/PropertyCategoryPage";
import {
  VALID_TYPES,
  TYPE_LABELS,
  TYPE_DESCRIPTIONS_KAUF,
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
  const description = `${TYPE_DESCRIPTIONS_KAUF[type]} – ${label} zum Kauf in Bawinkel und dem Emsland.`;
  return {
    title: `${label} kaufen`,
    description,
    alternates: { canonical: `/kauf/${type}` },
    openGraph: {
      ...defaultOpenGraphMetadata,
      title: `${label} kaufen`,
      description,
      url: `/kauf/${type}`,
    },
    twitter: {
      ...defaultTwitterMetadata,
      title: `${label} kaufen`,
      description,
    },
  };
}

export default async function KaufTypePage({
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
      marketingType="kauf"
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
