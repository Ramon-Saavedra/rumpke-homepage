import { getProperties } from '@/lib/property-client';
import type { PropertyCardDto, Pagination } from '@/types/property-api';
import Title from '@/components/ui/title/Title';
import PropertiesGrid from '@/components/properties/PropertiesGrid';
import PropertyPagination from '@/components/properties/PropertyPagination';
import type { Metadata } from 'next';
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from '@/lib/site-metadata';

export const metadata: Metadata = {
  title: 'Immobilien',
  description:
    'Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.',
  alternates: { canonical: '/objekt' },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: 'Immobilien',
    description:
      'Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.',
    url: '/objekt',
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: 'Immobilien',
    description:
      'Immobilienangebote von Rumpke Immobilien – Häuser, Wohnungen und Gewerbeimmobilien in Bawinkel und dem Emsland.',
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
    const result = await getProperties(page, 12);
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
  const rawPage = resolvedParams.page ?? '1';
  const page = Math.max(1, parseInt(rawPage, 10) || 1);
  const fetchResult = await fetchPageData(page);

  if (!fetchResult.ok) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-2 xl:px-0">
        <div className="mb-12">
          <Title variant="h1" align="center" size="xl" className="mb-4">
            Immobilien
          </Title>
        </div>
        <div className="p-8 bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d rounded">
          <p className="text-center text-card-text-l dark:text-card-text-d">
            Der Immobilienservice ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.
          </p>
        </div>
      </div>
    );
  }

  const { data, pagination } = fetchResult;

  return (
    <div className="container mx-auto max-w-5xl py-12 px-2 xl:px-0">
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl" className="mb-4">
          Immobilien
        </Title>
        <p className="text-center text-card-text-l dark:text-card-text-d">
          Alle verfügbaren Immobilien von Rumpke Immobilien
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-card-text-l dark:text-card-text-d">
            Keine Immobilien gefunden.
          </p>
        </div>
      ) : (
        <>
          <PropertiesGrid properties={data} />
          <div className="mt-8">
            <PropertyPagination pagination={pagination} />
          </div>
        </>
      )}
    </div>
  );
}
