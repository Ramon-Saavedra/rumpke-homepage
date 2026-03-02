import { notFound } from "next/navigation";
import TripleSlider from "@/components/features/triple-slider/TripleSlider";
import { MOCK_FEATURED_PROPERTIES } from "@/data/mock-properties";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyObjectPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.trim() === "") {
    notFound();
  }

  const property = MOCK_FEATURED_PROPERTIES.find(p => p.slug === slug);

  if (!property) {
    notFound();
  }

  const reorderedProperties = [
    property,
    ...MOCK_FEATURED_PROPERTIES.filter(p => p.slug !== slug)
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
              <h2 className="text-2xl font-semibold mb-4 text-text-l dark:text-text-d">
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
