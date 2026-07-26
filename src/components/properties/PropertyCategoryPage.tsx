import Link from "next/link";
import Title from "@/components/ui/title/Title";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyPagination from "@/components/properties/PropertyPagination";
import ContentPanel from "@/components/ui/content-panel/ContentPanel";
import { getProperties } from "@/lib/property-client";
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
          {result
            ? `Verfügbare ${label} ${transactionLabel} im Emsland`
            : "Der Immobilienservice ist derzeit nicht verfügbar."}
        </p>
      </div>

      {!result ? (
        <ContentPanel className="p-8 rounded">
          <p className="text-center text-card-text-l dark:text-card-text-d">
            Bitte versuchen Sie es später erneut.
          </p>
        </ContentPanel>
      ) : result.data.length === 0 ? (
        <ContentPanel className="p-8 rounded">
          <p className="text-center text-card-text-l dark:text-card-text-d">
            Aktuell sind keine {label} {transactionLabel} verfügbar.
          </p>
          <p className="text-center text-card-text-l dark:text-card-text-d text-sm mt-2">
            Alle verfügbaren Immobilien finden Sie in der{" "}
            <Link href="/objekt" className="text-primary hover:underline">
              Gesamtübersicht
            </Link>
            .
          </p>
        </ContentPanel>
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
