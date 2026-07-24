import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import PropertyImage from '@/components/properties/PropertyImage';
import { getProperty } from '@/lib/property-client';
import { resolveDisplayPrice, formatArea, formatYear, formatRooms, formatPrice } from '@/lib/property-formatters';
import type { PropertyDetailDto } from '@/types/property-api';
import { PropertyFetchError } from '@/types/property-api';
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from '@/lib/site-metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildPropertyBreadcrumbs,
  buildBreadcrumbListJsonLd,
  buildPropertyStructuredData,
  resolveOgImage,
} from '@/lib/property-seo';

type RouteParams = {
  objektnrExtern: string;
};

interface PageProps {
  readonly params: Promise<RouteParams>;
}

function buildMetadataTitle(property: PropertyDetailDto): string {
  if (property.title) return property.title;
  return `Immobilie ${property.id}`;
}

function buildMetadataDescription(property: PropertyDetailDto): string {
  const type = property.propertySubType ?? property.propertyType ?? 'Immobilie';
  const city = property.address.city ?? '';
  const parts = [type];
  if (city) parts.push(city);
  const price = resolveDisplayPrice(property.marketingType, property.price.salePrice, property.price.coldRent);
  if (price) parts.push(price);
  return parts.join(' – ');
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { objektnrExtern } = await params;

    if (!objektnrExtern || objektnrExtern.trim() === '') {
      return { title: 'Immobilie nicht gefunden' };
    }

    const property = await getProperty(objektnrExtern);
    const title = buildMetadataTitle(property);
    const description = buildMetadataDescription(property);
    const canonicalPath = `/objekt/${property.id}`;
    const ogImage = resolveOgImage();
    const previousImages = (await parent).openGraph?.images ?? [];

    return {
      title,
      description,
      alternates: { canonical: canonicalPath },
      openGraph: {
        ...defaultOpenGraphMetadata,
        title,
        description,
        url: canonicalPath,
        images: ogImage
          ? [{ url: ogImage, alt: title }, ...previousImages]
          : previousImages,
      },
      twitter: {
        ...defaultTwitterMetadata,
        card: 'summary_large_image',
        title,
        description,
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch {
    return { title: 'Immobilie nicht gefunden' };
  }
}

function DetailField({ label, value }: { readonly label: string; readonly value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between">
      <dt className="font-medium">{label}:</dt>
      <dd>{value}</dd>
    </div>
  );
}

function DetailSection({ title, children }: { readonly title: string; readonly children: React.ReactNode }) {
  return (
    <div className="bg-bgSecondary-l dark:bg-bgSecondary-d p-6 rounded border border-border-l dark:border-border-d">
      <h2 className="text-xl font-semibold mb-4 text-text-l dark:text-text-d">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default async function ObjektDetailPage({ params }: PageProps) {
  const { objektnrExtern } = await params;

  if (!objektnrExtern || objektnrExtern.trim() === '') {
    notFound();
  }

  let property: PropertyDetailDto;
  try {
    property = await getProperty(objektnrExtern);
  } catch (error: unknown) {
    if (error instanceof PropertyFetchError && error.publicCode === 'PROPERTY_NOT_FOUND') {
      notFound();
    }
    throw error;
  }

  const displayPrice = resolveDisplayPrice(
    property.marketingType,
    property.price.salePrice,
    property.price.coldRent,
  );

  const displayType = property.propertySubType ?? property.propertyType;

  const breadcrumbs = buildPropertyBreadcrumbs(property);
  const breadcrumbLd = buildBreadcrumbListJsonLd(breadcrumbs);
  const structuredData = buildPropertyStructuredData(property);

  const locationParts = [
    property.address.street ? `${property.address.street}${property.address.houseNumber ? ` ${property.address.houseNumber}` : ''}` : null,
    [property.address.zip, property.address.city].filter(Boolean).join(' ') || null,
  ].filter(Boolean);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      {structuredData && <JsonLd data={structuredData} />}

      <main className="w-full">
        <div className="relative w-full h-64 md:h-96 shrink-0 overflow-hidden">
          <PropertyImage
            images={property.images}
            alt={property.title ?? property.id}
            className="h-full w-full"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-text-l dark:text-text-d">
            {property.title ?? `Immobilie ${property.id}`}
          </h1>
          {displayType && (
            <p className="text-card-text-l dark:text-card-text-d mb-6">{displayType}</p>
          )}

          {locationParts.length > 0 && (
            <p className="text-card-text-l dark:text-card-text-d mb-8">
              {locationParts.join(', ')}
            </p>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {(property.description || property.locationDescription || property.furnishingDescription) && (
                <DetailSection title="Beschreibung">
                  {property.description && (
                    <p className="text-card-text-l dark:text-card-text-d leading-relaxed mb-4">
                      {property.description}
                    </p>
                  )}
                  {property.locationDescription && (
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2 text-text-l dark:text-text-d">Lage</h3>
                      <p className="text-card-text-l dark:text-card-text-d leading-relaxed">
                        {property.locationDescription}
                      </p>
                    </div>
                  )}
                  {property.furnishingDescription && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-text-l dark:text-text-d">Ausstattung</h3>
                      <p className="text-card-text-l dark:text-card-text-d leading-relaxed">
                        {property.furnishingDescription}
                      </p>
                    </div>
                  )}
                </DetailSection>
              )}
            </div>

            <div className="space-y-6">
              <DetailSection title="Details">
                <dl className="space-y-3 text-card-text-l dark:text-card-text-d">
                  {displayPrice && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Preis:</dt>
                      <dd className="text-primary font-bold">{displayPrice}</dd>
                    </div>
                  )}

                  {property.marketingType && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Art:</dt>
                      <dd>{property.marketingType === 'miete' ? 'Miete' : 'Kauf'}</dd>
                    </div>
                  )}

                  {displayType && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Typ:</dt>
                      <dd>{displayType}</dd>
                    </div>
                  )}

                  <DetailField label="Etage" value={property.floor} />
                  <DetailField label="Baujahr" value={property.yearBuilt !== null ? formatYear(property.yearBuilt) : null} />
                  <DetailField label="Zustand" value={property.condition} />
                  <DetailField label="Energieausweis" value={property.energyCertificateType} />

                  {property.totalFloors !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Etagen:</dt>
                      <dd>{property.totalFloors}</dd>
                    </div>
                  )}
                </dl>
              </DetailSection>

              <DetailSection title="Fläche & Zimmer">
                <dl className="space-y-3 text-card-text-l dark:text-card-text-d">
                  {property.area.livingArea !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Wohnfläche:</dt>
                      <dd>{formatArea(property.area.livingArea)}</dd>
                    </div>
                  )}
                  {property.area.usableArea !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Nutzfläche:</dt>
                      <dd>{formatArea(property.area.usableArea)}</dd>
                    </div>
                  )}
                  {property.area.plotArea !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Grundstück:</dt>
                      <dd>{formatArea(property.area.plotArea)}</dd>
                    </div>
                  )}
                  {property.rooms.total !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Zimmer:</dt>
                      <dd>{formatRooms(property.rooms.total)}</dd>
                    </div>
                  )}
                  {property.rooms.bedrooms !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Schlafzimmer:</dt>
                      <dd>{property.rooms.bedrooms}</dd>
                    </div>
                  )}
                  {property.rooms.bathrooms !== null && (
                    <div className="flex justify-between">
                      <dt className="font-medium">Badezimmer:</dt>
                      <dd>{property.rooms.bathrooms}</dd>
                    </div>
                  )}
                </dl>
              </DetailSection>

              {property.price.warmRent !== null && (
                <DetailSection title="Mietdetails">
                  <dl className="space-y-3 text-card-text-l dark:text-card-text-d">
                    {property.price.coldRent !== null && (
                      <div className="flex justify-between">
                        <dt className="font-medium">Kaltmiete:</dt>
                        <dd>{formatPrice(property.price.coldRent)}</dd>
                      </div>
                    )}
                    {property.price.warmRent !== null && (
                      <div className="flex justify-between">
                        <dt className="font-medium">Warmmiete:</dt>
                        <dd>{formatPrice(property.price.warmRent)}</dd>
                      </div>
                    )}
                    {property.price.hoaFee !== null && (
                      <div className="flex justify-between">
                        <dt className="font-medium">Hausgeld:</dt>
                        <dd>{formatPrice(property.price.hoaFee)}</dd>
                      </div>
                    )}
                    {property.price.additionalCosts !== null && (
                      <div className="flex justify-between">
                        <dt className="font-medium">Nebenkosten:</dt>
                        <dd>{formatPrice(property.price.additionalCosts)}</dd>
                      </div>
                    )}
                  </dl>
                </DetailSection>
              )}

              <DetailSection title="Ausstattung">
                <dl className="space-y-3 text-card-text-l dark:text-card-text-d">
                  <div className="flex justify-between">
                    <dt className="font-medium">Balkon:</dt>
                    <dd>{property.balcony ? 'Ja' : 'Nein'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Terrasse:</dt>
                    <dd>{property.terrace ? 'Ja' : 'Nein'}</dd>
                  </div>
                </dl>
              </DetailSection>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
