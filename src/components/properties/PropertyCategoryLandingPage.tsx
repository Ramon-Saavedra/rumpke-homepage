import Title from "@/components/ui/title/Title";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
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
    const result = await getProperties({ page: 1, limit: 12, marketingType });
    return result.data;
  } catch {
    return null;
  }
}

export default async function PropertyCategoryLandingPage({
  marketingType,
  heading,
  subtitle,
}: PropertyCategoryLandingPageProps) {
  const types = getPropertyTypes(marketingType);
  const transactionLabel = marketingType === "kauf" ? "zum Kauf" : "zur Miete";
  const properties = await fetchLandingProperties(marketingType);

  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          {heading}
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          {subtitle}
        </p>
      </div>

      <PropertyTypeGrid
        types={types}
        basePath={marketingType}
        title="Nach Immobilientyp filtern"
      />

      {properties === null ? (
        <PropertyEmptyState
          {...SERVICE_ERROR_COPY}
          marketingType={marketingType}
        />
      ) : properties.length === 0 ? (
        <PropertyEmptyState
          marketingType={marketingType}
          headline={`Zurzeit sind keine Immobilien ${transactionLabel} veröffentlicht`}
          body="Unser Angebot wird regelmäßig aktualisiert. Gerne informieren wir Sie persönlich über passende Immobilien oder unterstützen Sie bei Ihrer individuellen Suche."
        />
      ) : (
        <PropertiesGrid properties={properties} />
      )}
    </>
  );
}
