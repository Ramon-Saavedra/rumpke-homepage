import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripleSlider from "@/components/features/triple-slider/TripleSlider";
import { MOCK_FEATURED_PROPERTIES } from "@/data/mock-properties";

type RouteParams = {
  slug: string;
};

interface PageProps {
  params: Promise<RouteParams>;
}

type Property = (typeof MOCK_FEATURED_PROPERTIES)[number];

function getPropertyBySlug(slug: string): Property | undefined {
  return MOCK_FEATURED_PROPERTIES.find(property => property.slug === slug);
}

function buildPropertyMetadataDescription(property: Property): string {
  const transactionLabel = property.operationType === "miete" ? "mieten" : "kaufen";
  const propertyDetails = [
    property.type,
    property.location,
    property.area,
    property.rooms ? `${property.rooms} Zimmer` : undefined,
  ].filter(Boolean).join(" · ");

  return `${property.title}: ${propertyDetails}. Immobilie jetzt für ${property.price} bei Rumpke Immobilien ${transactionLabel}.`;
}

async function getRouteProperty(paramsPromise: Promise<RouteParams>): Promise<Property> {
  const { slug } = await paramsPromise;

  if (!slug || slug.trim() === "") {
    notFound();
  }

  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return property;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await getRouteProperty(params);
  const description = buildPropertyMetadataDescription(property);

  return {
    title: `${property.title} in ${property.location} | Rumpke Immobilien`,
    description,
    openGraph: {
      title: property.title,
      description,
      locale: "de_DE",
      siteName: "Rumpke Immobilien",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: property.title,
      description,
    },
  };
}

export default async function PropertyObjectPage({ params }: PageProps) {
  const property = await getRouteProperty(params);

  const reorderedProperties = [
    property,
    ...MOCK_FEATURED_PROPERTIES.filter(candidateProperty => candidateProperty.slug !== property.slug)
  ];

  return (
    <main className="w-full">
      <TripleSlider properties={reorderedProperties} />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-text-l dark:text-text-d">
          {property.title}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card-l dark:bg-card-d p-6 rounded border border-border-l dark:border-border-d">
              <h2 className="text-xl font-semibold mb-4 text-text-l dark:text-text-d">
                Beschreibung
              </h2>
              <p className="text-card-text-l dark:text-card-text-d leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card-l dark:bg-card-d p-6 rounded border border-border-l dark:border-border-d">
              <h3 className="text-xl font-semibold mb-4 text-text-l dark:text-text-d">
                Details
              </h3>
              <dl className="space-y-3 text-card-text-l dark:text-card-text-d">
                <div className="flex justify-between">
                  <dt className="font-medium">Preis:</dt>
                  <dd className="text-primary font-bold">{property.price}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Typ:</dt>
                  <dd>{property.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Standort:</dt>
                  <dd>{property.location}</dd>
                </div>
                {property.area && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Fläche:</dt>
                    <dd>{property.area}</dd>
                  </div>
                )}
                {property.rooms && (
                  <div className="flex justify-between">
                    <dt className="font-medium">Zimmer:</dt>
                    <dd>{property.rooms}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
