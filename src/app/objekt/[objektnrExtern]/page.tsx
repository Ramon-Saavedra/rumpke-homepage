import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/page-container/PageContainer";
import PropertyBreadcrumb from "@/components/properties/detail/PropertyBreadcrumb";
import PropertyContactCard from "@/components/properties/detail/PropertyContactCard";
import PropertyCoreFacts from "@/components/properties/detail/PropertyCoreFacts";
import PropertyDetailHeader from "@/components/properties/detail/PropertyDetailHeader";
import PropertyDetailSection from "@/components/properties/detail/PropertyDetailSection";
import PropertyEnergySection from "@/components/properties/detail/PropertyEnergySection";
import PropertyFeaturesSection from "@/components/properties/detail/PropertyFeaturesSection";
import PropertyFloorplansSection from "@/components/properties/detail/PropertyFloorplansSection";
import PropertyGallery from "@/components/properties/detail/PropertyGallery";
import PropertyInquiryPanel from "@/components/properties/detail/PropertyInquiryPanel";
import PropertyInquiryProvider from "@/components/properties/detail/PropertyInquiryContext";
import PropertyLocationSection from "@/components/properties/detail/PropertyLocationSection";
import PropertyPriceSection from "@/components/properties/detail/PropertyPriceSection";
import PropertyStickyCta from "@/components/properties/detail/PropertyStickyCta";
import SimilarProperties from "@/components/properties/detail/SimilarProperties";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProperty } from "@/lib/property-client";
import { resolveDisplayPrice } from "@/lib/property-formatters";
import { groupPropertyImages } from "@/lib/property-images";
import {
  buildPropertyDetailFacts,
  buildPropertyFeatures,
  buildPropertyPriceRows,
  resolvePropertyTitle,
} from "@/lib/property-detail";
import {
  buildBreadcrumbListJsonLd,
  buildPropertyBreadcrumbs,
  buildPropertyStructuredData,
  resolveOgImage,
} from "@/lib/property-seo";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";
import type { PropertyDetailDto } from "@/types/property-api";
import { PropertyFetchError } from "@/types/property-api";

type RouteParams = {
  objektnrExtern: string;
};

interface PageProps {
  readonly params: Promise<RouteParams>;
}

function buildMetadataDescription(property: PropertyDetailDto): string {
  const type = property.propertySubType ?? property.propertyType ?? "Immobilie";
  const city = property.address.city ?? "";
  const parts = [type];
  if (city) parts.push(city);
  const price = resolveDisplayPrice(
    property.marketingType,
    property.price.salePrice,
    property.price.coldRent,
  );
  if (price) parts.push(price);
  return parts.join(" – ");
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { objektnrExtern } = await params;

    if (!objektnrExtern || objektnrExtern.trim() === "") {
      return { title: "Immobilie nicht gefunden" };
    }

    const property = await getProperty(objektnrExtern);
    const title = resolvePropertyTitle(property);
    const description = buildMetadataDescription(property);
    const canonicalPath = `/objekt/${encodeURIComponent(property.id)}`;
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
        card: "summary_large_image",
        title,
        description,
        ...(ogImage && { images: [ogImage] }),
      },
    };
  } catch {
    return { title: "Immobilie nicht gefunden" };
  }
}

export default async function ObjektDetailPage({ params }: PageProps) {
  const { objektnrExtern } = await params;

  if (!objektnrExtern || objektnrExtern.trim() === "") {
    notFound();
  }

  let property: PropertyDetailDto;
  try {
    property = await getProperty(objektnrExtern);
  } catch (error: unknown) {
    if (
      error instanceof PropertyFetchError &&
      error.publicCode === "PROPERTY_NOT_FOUND"
    ) {
      notFound();
    }
    throw error;
  }

  const title = resolvePropertyTitle(property);
  const { photos, floorplans } = groupPropertyImages(property.images);
  const facts = buildPropertyDetailFacts(property);
  const features = buildPropertyFeatures(property);
  const priceRows = buildPropertyPriceRows(property);
  const displayPrice = resolveDisplayPrice(
    property.marketingType,
    property.price.salePrice,
    property.price.coldRent,
  );

  const breadcrumbs = buildPropertyBreadcrumbs(property);
  const breadcrumbLd = buildBreadcrumbListJsonLd(breadcrumbs);
  const structuredData = buildPropertyStructuredData(property);

  return (
    <PropertyInquiryProvider>
      <JsonLd data={breadcrumbLd} />
      {structuredData && <JsonLd data={structuredData} />}

      <PageContainer as="main" className="pb-28 lg:pb-20">
        <PropertyBreadcrumb items={breadcrumbs} />

        <PropertyGallery images={photos} alt={title} className="mt-3.5" />

        <div className="mt-8 grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-[2fr_1fr] lg:gap-14">
          <PropertyDetailHeader
            property={property}
            className="order-1 lg:col-span-2"
          />

          <PropertyCoreFacts facts={facts} className="order-2 lg:col-span-2" />

          <div className="order-3 min-w-0 space-y-11 md:order-4 lg:order-3">
            {property.description && (
              <PropertyDetailSection title="Objektbeschreibung">
                <p className="whitespace-pre-line text-base leading-relaxed">
                  {property.description}
                </p>
              </PropertyDetailSection>
            )}

            {property.locationDescription && (
              <PropertyDetailSection title="Lage">
                <p className="whitespace-pre-line text-base leading-relaxed">
                  {property.locationDescription}
                </p>
              </PropertyDetailSection>
            )}

            <PropertyFeaturesSection
              features={features}
              description={property.furnishingDescription}
            />

            <PropertyLocationSection property={property} />

            <PropertyPriceSection rows={priceRows} />

            <PropertyEnergySection property={property} />

            <PropertyFloorplansSection floorplans={floorplans} />
          </div>

          <div className="order-4 min-w-0 md:order-3 lg:sticky lg:top-[calc(var(--topbar-height)+1.5rem)] lg:order-4">
            <PropertyInquiryPanel property={property} />
            <PropertyContactCard className="mt-5" />
          </div>

          <Suspense fallback={null}>
            <SimilarProperties
              propertyId={property.id}
              marketingType={property.marketingType}
              className="order-5 lg:col-span-2"
            />
          </Suspense>
        </div>
      </PageContainer>

      <PropertyStickyCta price={displayPrice} />
    </PropertyInquiryProvider>
  );
}
