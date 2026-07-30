import { Suspense } from "react";
import PropertyShowcase from "./PropertyShowcase";
import PropertyShowcaseSkeleton from "./PropertyShowcaseSkeleton";
import { getProperties } from "@/lib/property-client";
import type { PropertyCardDto } from "@/types/property-api";

async function ShowcaseData() {
  let properties: readonly PropertyCardDto[] = [];
  let hasError = false;

  try {
    const result = await getProperties({ page: 1, limit: 12 });
    properties = result.data;
  } catch {
    hasError = true;
  }

  return <PropertyShowcase properties={properties} error={hasError} />;
}

export default function PropertyShowcaseSection() {
  return (
    <Suspense fallback={<PropertyShowcaseSkeleton />}>
      <ShowcaseData />
    </Suspense>
  );
}
