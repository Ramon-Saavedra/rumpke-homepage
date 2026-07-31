import PropertyListingHeader from "@/components/properties/PropertyListingHeader";
import PropertyListingResults from "@/components/properties/PropertyListingResults";
import PropertyPagination from "@/components/properties/PropertyPagination";
import PropertyEmptyState from "@/components/properties/PropertyEmptyState";
import { getProperties } from "@/lib/property-client";
import {
  categoryEmptyStateCopy,
  SERVICE_ERROR_COPY,
} from "@/lib/property-empty-state";
import { formatListingCount, MARKETING_VERB } from "@/lib/property-listing";
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
  const title = `${TYPE_LABELS[propertyType]} ${MARKETING_VERB[marketingType]}`;
  const result = await fetchCategoryProperties(
    marketingType,
    propertyType,
    page,
  );

  if (!result) {
    return (
      <>
        <PropertyListingHeader title={title} />
        <PropertyEmptyState
          {...SERVICE_ERROR_COPY}
          marketingType={marketingType}
          showIcon
        />
      </>
    );
  }

  const hasResults = result.pagination.total > 0;

  return (
    <>
      <PropertyListingHeader
        title={title}
        subtitle={formatListingCount(
          result.pagination.total,
          marketingType,
          propertyType,
        )}
      />

      <PropertyListingResults
        properties={result.data}
        marketingType={marketingType}
        total={result.pagination.total}
        empty={categoryEmptyStateCopy(propertyType, marketingType)}
      />

      {hasResults && (
        <div className="mt-10">
          <PropertyPagination
            pagination={result.pagination}
            basePath={`/${marketingType}/${propertyType}`}
            query={{
              marketingType,
              propertyType: PROPERTY_TYPE_FILTERS[propertyType],
            }}
          />
        </div>
      )}
    </>
  );
}
