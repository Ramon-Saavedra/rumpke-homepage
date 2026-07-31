import Title from "@/components/ui/title/Title";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyPagination from "@/components/properties/PropertyPagination";
import PropertyEmptyState from "@/components/properties/PropertyEmptyState";
import { getProperties } from "@/lib/property-client";
import {
  categoryEmptyStateCopy,
  SERVICE_ERROR_COPY,
} from "@/lib/property-empty-state";
import {
  PROPERTY_TYPE_FILTERS,
  TYPE_LABELS,
  type MarketingType,
  type PropertyType,
} from "@/types/property-types";

interface PropertyCategoryPageProps {
  readonly marketingType: MarketingType;
  readonly propertyType: PropertyType;
  readonly page: number;
}

async function fetchCategoryProperties(
  marketingType: MarketingType,
  propertyType: PropertyType,
  page: number,
) {
  try {
    return await getProperties({
      page,
      limit: 12,
      marketingType,
      propertyType: PROPERTY_TYPE_FILTERS[propertyType],
    });
  } catch {
    return null;
  }
}

export default async function PropertyCategoryPage({
  marketingType,
  propertyType,
  page,
}: PropertyCategoryPageProps) {
  const label = TYPE_LABELS[propertyType];
  const transactionLabel = marketingType === "kauf" ? "zum Kauf" : "zur Miete";
  const query = {
    marketingType,
    propertyType: PROPERTY_TYPE_FILTERS[propertyType],
  };
  const result = await fetchCategoryProperties(
    marketingType,
    propertyType,
    page,
  );

  return (
    <>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          {label} {marketingType === "kauf" ? "kaufen" : "mieten"}
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          {`Verfügbare ${label} ${transactionLabel} im Emsland`}
        </p>
      </div>

      {!result ? (
        <PropertyEmptyState
          {...SERVICE_ERROR_COPY}
          marketingType={marketingType}
        />
      ) : result.data.length === 0 ? (
        <PropertyEmptyState
          {...categoryEmptyStateCopy(propertyType, marketingType)}
          marketingType={marketingType}
        />
      ) : (
        <>
          <PropertiesGrid properties={result.data} />
          <div className="mt-8">
            <PropertyPagination
              pagination={result.pagination}
              basePath={`/${marketingType}/${propertyType}`}
              query={query}
            />
          </div>
        </>
      )}
    </>
  );
}
