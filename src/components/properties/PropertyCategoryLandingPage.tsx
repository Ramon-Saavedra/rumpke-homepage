import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import PropertyListingHeader from "@/components/properties/PropertyListingHeader";
import PropertyListingResults from "@/components/properties/PropertyListingResults";
import PropertyEmptyState from "@/components/properties/PropertyEmptyState";
import { getProperties } from "@/lib/property-client";
import { SERVICE_ERROR_COPY } from "@/lib/property-empty-state";
import { getPropertyTypes, type MarketingType } from "@/types/property-types";

interface PropertyCategoryLandingPageProps {
  readonly marketingType: MarketingType;
  readonly heading: string;
  readonly subtitle: string;
}

async function fetchLandingProperties(marketingType: MarketingType) {
  try {
    return await getProperties({ page: 1, limit: 12, marketingType });
  } catch {
    return null;
  }
}

export default async function PropertyCategoryLandingPage({
  marketingType,
  heading,
  subtitle,
}: PropertyCategoryLandingPageProps) {
  const transactionLabel = marketingType === "kauf" ? "zum Kauf" : "zur Miete";
  const result = await fetchLandingProperties(marketingType);

  return (
    <>
      <PropertyListingHeader title={heading} subtitle={subtitle} />

      <PropertyTypeGrid
        types={getPropertyTypes(marketingType)}
        basePath={marketingType}
        title="Nach Immobilientyp filtern"
      />

      {result === null ? (
        <PropertyEmptyState
          {...SERVICE_ERROR_COPY}
          marketingType={marketingType}
          showIcon
        />
      ) : (
        <PropertyListingResults
          properties={result.data}
          marketingType={marketingType}
          empty={{
            headline: `Zurzeit sind keine Immobilien ${transactionLabel} veröffentlicht`,
            body: "Unser Angebot wird regelmäßig aktualisiert. Gerne informieren wir Sie persönlich über passende Immobilien oder unterstützen Sie bei Ihrer individuellen Suche.",
          }}
        />
      )}
    </>
  );
}
