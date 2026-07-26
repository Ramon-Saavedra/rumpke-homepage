import Link from "next/link";
import Title from "@/components/ui/title/Title";
import PropertyTypeGrid from "@/components/properties/PropertyTypeGrid";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import ContentPanel from "@/components/ui/content-panel/ContentPanel";
import { getProperties } from "@/lib/property-client";
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
        <ContentPanel className="p-8 rounded">
          <p className="text-center text-card-text-l dark:text-card-text-d">
            Der Immobilienservice ist derzeit nicht verfügbar.
          </p>
        </ContentPanel>
      ) : properties.length === 0 ? (
        <ContentPanel className="p-8 rounded">
          <p className="text-center text-card-text-l dark:text-card-text-d">
            Aktuell sind keine Immobilien{" "}
            {marketingType === "kauf" ? "zum Kauf" : "zur Miete"} verfügbar.
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
        <PropertiesGrid properties={properties} />
      )}
    </>
  );
}
