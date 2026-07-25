import Link from "next/link";
import { MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import type { PropertyCardDto } from "@/types/property-api";
import { resolveDisplayPrice, formatArea } from "@/lib/property-formatters";
import { TRANSACTION_LABELS } from "@/types/property-types";
import { SHOWCASE_CTA_COMPACT_GROUP_CLASS } from "./showcase-cta";
import { cn } from "@/lib/utils";

interface PropertySpotlightCardProps {
  readonly property: PropertyCardDto;
  readonly className?: string;
}

export default function PropertySpotlightCard({
  property,
  className,
}: PropertySpotlightCardProps) {
  const title = property.title ?? `Immobilie ${property.id}`;
  const location = property.city;
  const displayType = property.propertySubType ?? property.propertyType;
  const price = resolveDisplayPrice(
    property.marketingType,
    property.salePrice,
    property.coldRent,
  );
  const isRent = property.marketingType === "miete";

  const metaLeft = [displayType, location].filter(Boolean).join(" · ");
  const areaText =
    property.livingArea !== null ? formatArea(property.livingArea) : null;
  const roomsText = property.rooms !== null ? `${property.rooms} Zimmer` : null;
  const metaRight = [areaText, roomsText].filter(Boolean).join(" · ");

  const imageAlt = [title, location].filter(Boolean).join(", ");

  return (
    <Link
      href={`/objekt/${property.id}`}
      className={cn(
        "group mx-auto block w-full max-w-4xl rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      <article className="flex flex-col overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l transition duration-200 group-hover:shadow-lg motion-safe:group-hover:-translate-y-0.5 sm:flex-row dark:border-border-d dark:bg-bgSecondary-d dark:group-hover:border-card-text-d/30">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] sm:w-[54%] sm:shrink-0">
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 640px) 100vw, 500px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-1 p-6 sm:p-8">
          {property.marketingType && (
            <span
              className={cn(
                "mb-3 w-fit rounded-md px-3 py-1 text-[11px] font-semibold text-white",
                isRent ? "bg-rent" : "bg-buy",
              )}
            >
              {isRent ? TRANSACTION_LABELS.miete : TRANSACTION_LABELS.kauf}
            </span>
          )}

          <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          {metaLeft && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-card-text-l dark:text-card-text-d">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{metaLeft}</span>
            </div>
          )}

          {price && (
            <span className="mt-4 text-xl font-bold text-primary">{price}</span>
          )}

          {metaRight && (
            <span className="mt-1 text-[13px] text-card-text-l dark:text-card-text-d">
              {metaRight}
            </span>
          )}

          <span className={cn("mt-6", SHOWCASE_CTA_COMPACT_GROUP_CLASS)}>
            Objekt ansehen
          </span>
        </div>
      </article>
    </Link>
  );
}
