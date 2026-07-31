import { getProperties } from "@/lib/property-client";
import type { PropertyCardDto, Pagination } from "@/types/property-api";
import Title from "@/components/ui/title/Title";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import PropertyPagination from "@/components/properties/PropertyPagination";
import PageContainer from "@/components/layout/page-container/PageContainer";
import PropertyEmptyState from "@/components/properties/PropertyEmptyState";
import { SERVICE_ERROR_COPY } from "@/lib/property-empty-state";
import type { Metadata } from "next";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Immobilien",
  description:
    "Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.",
  alternates: { canonical: "/objekt" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Immobilien",
    description:
      "Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.",
    url: "/objekt",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Immobilien",
    description:
      "Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.",
  },
};

interface SearchParams {
  page?: string;
}

type FetchResult =
  | { ok: true; data: readonly PropertyCardDto[]; pagination: Pagination }
  | { ok: false };

async function fetchPageData(page: number): Promise<FetchResult> {
  try {
    const result = await getProperties({ page, limit: 12 });
    return { ok: true, data: result.data, pagination: result.pagination };
  } catch {
    return { ok: false };
  }
}

export default async function ObjektListPage({
  searchParams,
}: {
  readonly searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const rawPage = resolvedParams.page ?? "1";
  const page = Math.max(1, parseInt(rawPage, 10) || 1);
  const fetchResult = await fetchPageData(page);

  if (!fetchResult.ok) {
    return (
      <PageContainer className="py-12">
        <div className="mb-12">
          <Title variant="h1" align="center" size="xl" className="mb-4">
            Immobilien
          </Title>
        </div>
        <PropertyEmptyState {...SERVICE_ERROR_COPY} />
      </PageContainer>
    );
  }

  const { data, pagination } = fetchResult;

  return (
    <PageContainer>
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle verfügbaren Immobilien von Rumpke Immobilien
        </p>
      </div>

      {data.length === 0 ? (
        <PropertyEmptyState
          headline="Zurzeit sind keine Immobilien veröffentlicht"
          body="Unser Angebot wird regelmäßig aktualisiert. Gerne informieren wir Sie persönlich über passende Immobilien oder unterstützen Sie bei Ihrer individuellen Suche."
        />
      ) : (
        <>
          <PropertiesGrid properties={data} />
          <div className="mt-8">
            <PropertyPagination pagination={pagination} />
          </div>
        </>
      )}
    </PageContainer>
  );
}
