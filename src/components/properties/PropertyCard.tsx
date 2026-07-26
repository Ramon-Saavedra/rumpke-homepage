import Link from "next/link";
import { MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import PropertyFacts from "./PropertyFacts";
import PropertyTransactionBadge from "./PropertyTransactionBadge";
import type { PropertyCardDto } from "@/types/property-api";
import {
  resolvePropertyCardData,
  resolvePropertyCategoryLabel,
} from "@/lib/property-display";

interface PropertyCardProps {
  readonly property: PropertyCardDto;
  readonly preload?: boolean;
}

export default function PropertyCard({
  property,
  preload = false,
}: PropertyCardProps) {
  const { title, location, price, isRent, facts, detailUrl } =
    resolvePropertyCardData(property);
  const categoryLabel = resolvePropertyCategoryLabel(
    property.propertyType,
    property.propertySubType,
  );

  return (
    <Link
      href={detailUrl}
      className="group block hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors rounded overflow-hidden"
    >
      <article className="group relative flex flex-col dark:border-border-d overflow-hidden shadow-lg">
        <div className="relative h-64 md:h-48 shrink-0 overflow-hidden">
          <PropertyImage
            images={property.images}
            alt={property.title ?? property.id}
            className="h-full w-full"
            priority={preload}
          />

          {categoryLabel && (
            <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-xs font-medium">
              {categoryLabel}
            </div>
          )}
        </div>

        <div className="p-3 flex flex-col flex-1 bg-bgSecondary-l dark:bg-bgSecondary-d">
          <h2 className="text-base font-bold text-text-l dark:text-text-d mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h2>

          <PropertyFacts facts={facts} size="xs" className="mb-2" />

          {location && (
            <div className="flex items-center gap-1.5 text-card-text-l dark:text-card-text-d mb-auto">
              <MapPin
                className="w-3 h-3 shrink-0 opacity-70"
                aria-hidden="true"
              />
              <span className="text-xs line-clamp-1">{location}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-l dark:border-border-d">
            {price && (
              <div className="text-sm font-bold text-primary">{price}</div>
            )}
            {property.marketingType && (
              <PropertyTransactionBadge
                isRent={isRent}
                className="px-2 py-1 rounded text-xs"
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
