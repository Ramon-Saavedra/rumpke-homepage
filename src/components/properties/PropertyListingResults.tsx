import PropertiesGrid from "./PropertiesGrid";
import PropertyFeaturedListing from "./PropertyFeaturedListing";
import PropertyEmptyState from "./PropertyEmptyState";
import type { EmptyStateAction } from "./PropertyEmptyState";
import type { PropertyCardDto } from "@/types/property-api";
import type { EmptyStateCopy } from "@/lib/property-empty-state";
import type { MarketingType } from "@/types/property-types";

interface PropertyListingResultsProps {
  readonly properties: readonly PropertyCardDto[];
  readonly marketingType?: MarketingType;
  readonly total?: number;
  readonly context?: string;
  readonly empty: EmptyStateCopy;
  readonly emptyReset?: EmptyStateAction;
}

export default function PropertyListingResults({
  properties,
  marketingType,
  total,
  context,
  empty,
  emptyReset,
}: PropertyListingResultsProps) {
  const resolvedTotal = total ?? properties.length;

  return (
    <section>
      {context && resolvedTotal > 0 && (
        <p className="mb-5 text-sm text-card-text-l dark:text-card-text-d">
          {context}
        </p>
      )}

      {properties.length === 0 ? (
        <PropertyEmptyState
          {...empty}
          marketingType={marketingType}
          reset={emptyReset}
          showIcon
        />
      ) : resolvedTotal === 1 ? (
        <PropertyFeaturedListing property={properties[0]} />
      ) : (
        <PropertiesGrid properties={properties} />
      )}
    </section>
  );
}
