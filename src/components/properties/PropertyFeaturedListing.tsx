import Link from "next/link";
import { ArrowRight, Camera, MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import PropertyFacts from "./PropertyFacts";
import PropertyTransactionBadge from "./PropertyTransactionBadge";
import {
  PROPERTY_CTA_CLASS,
  PROPERTY_CTA_SECONDARY_CLASS,
} from "./property-cta";
import type { PropertyCardDto } from "@/types/property-api";
import {
  resolvePropertyCardData,
  resolvePropertyCategoryLabel,
} from "@/lib/property-display";
import { OFFER_LABEL, PRICE_LABEL } from "@/lib/property-listing";
import { cn } from "@/lib/utils";

interface PropertyFeaturedListingProps {
  readonly property: PropertyCardDto;
  readonly className?: string;
}

export default function PropertyFeaturedListing({
  property,
  className,
}: PropertyFeaturedListingProps) {
  const { title, location, price, isRent, facts, detailUrl, imageAlt } =
    resolvePropertyCardData(property);
  const categoryLabel = resolvePropertyCategoryLabel(
    property.propertyType,
    property.propertySubType,
  );
  const marketingType = isRent ? "miete" : ("kauf" as const);
  const photoCount = property.images.length;
  const showsOfferLabel =
    property.marketingType === "kauf" || property.marketingType === "miete";

  return (
    <article
      className={cn(
        "flex flex-col gap-7 lg:flex-row lg:items-stretch lg:gap-11",
        className,
      )}
    >
      <Link
        href={detailUrl}
        className="group relative block overflow-hidden rounded shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:w-[54%] lg:shrink-0"
      >
        <div className="relative aspect-4/3 lg:aspect-auto lg:h-full lg:min-h-[380px]">
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full"
            priority
            sizes="(max-width: 1024px) 100vw, 54vw"
          />
        </div>

        {categoryLabel && (
          <span className="absolute top-4 left-4 rounded-md bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground">
            {categoryLabel}
          </span>
        )}

        {property.marketingType && (
          <PropertyTransactionBadge
            isRent={isRent}
            className="absolute top-4 right-4 rounded-md px-4 py-1.5 text-[13px]"
          />
        )}

        {photoCount > 1 && (
          <span className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-md bg-black/55 px-3 py-1.5 text-xs font-medium text-white">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            {photoCount} Fotos
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-center gap-3.5">
        {showsOfferLabel && (
          <span
            className={cn(
              "text-[13px] font-bold tracking-wide uppercase",
              isRent ? "text-rent" : "text-buy",
            )}
          >
            {OFFER_LABEL[marketingType]}
          </span>
        )}

        <h2 className="font-serif text-2xl leading-tight font-bold text-foreground sm:text-3xl">
          <Link
            href={detailUrl}
            className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {title}
          </Link>
        </h2>

        {location && (
          <div className="flex items-center gap-1.5 text-sm text-card-text-l dark:text-card-text-d">
            <MapPin
              className="h-4 w-4 shrink-0 opacity-70"
              aria-hidden="true"
            />
            <span>{location}</span>
          </div>
        )}

        <PropertyFacts
          facts={facts}
          className="gap-x-6 border-b border-border-l pb-4 dark:border-border-d"
        />

        {price && showsOfferLabel && (
          <div>
            <p className="text-xs tracking-wide text-card-text-l uppercase dark:text-card-text-d">
              {PRICE_LABEL[marketingType]}
            </p>
            <p className="mt-0.5 text-lg font-semibold text-primary">{price}</p>
          </div>
        )}

        <div className="mt-1 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`${detailUrl}#objekt-anfrage`}
            className={cn("w-full sm:w-auto", PROPERTY_CTA_CLASS)}
          >
            Anfrage senden
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/kontakt"
            className={cn("w-full sm:w-auto", PROPERTY_CTA_SECONDARY_CLASS)}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </article>
  );
}
