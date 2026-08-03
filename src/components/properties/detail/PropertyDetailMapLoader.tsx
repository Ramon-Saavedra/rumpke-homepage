"use client";

import dynamic from "next/dynamic";
import type { PropertyCoordinates } from "@/lib/property-detail";

const PropertyDetailMap = dynamic(
  () => import("@/components/properties/detail/PropertyDetailMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-60 w-full animate-pulse border border-border-l bg-bgSecondary-l dark:border-border-d dark:bg-bgSecondary-d lg:h-72" />
    ),
  },
);

interface PropertyDetailMapLoaderProps {
  readonly coordinates: PropertyCoordinates;
  readonly title: string;
  readonly isExact: boolean;
}

export default function PropertyDetailMapLoader({
  coordinates,
  title,
  isExact,
}: PropertyDetailMapLoaderProps) {
  return (
    <PropertyDetailMap
      coordinates={coordinates}
      title={title}
      isExact={isExact}
    />
  );
}
