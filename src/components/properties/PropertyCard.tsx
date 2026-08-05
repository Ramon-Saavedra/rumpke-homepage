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
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  readonly property: PropertyCardDto;
  readonly preload?: boolean;
  readonly className?: string;
}

export default function PropertyCard({
  property,
  preload = false,
  className,
}: PropertyCardProps) {
  const { title, location, price, isRent, facts, detailUrl, imageAlt } =
    resolvePropertyCardData(property);
  const categoryLabel = resolvePropertyCategoryLabel(
    property.propertyType,
    property.propertySubType,
  );

  return (
    <Link
      href={detailUrl}
      className={cn(
        "group flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
    >
      <article className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l shadow-sm transition-shadow group-hover:shadow-lg dark:border-border-d dark:bg-bgSecondary-d dark:group-hover:border-card-text-d/30">
        <div className="relative aspect-4/3 shrink-0 overflow-hidden">
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full"
            priority={preload}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          />

          {categoryLabel && (
            <span className="absolute top-3 left-3 rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              {categoryLabel}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <h2 className="mb-2 line-clamp-2 font-serif text-[15px] font-bold leading-snug text-foreground group-hover:text-primary">
            {title}
          </h2>

          {location && (
            <div className="mb-1.5 flex items-center gap-1.5 text-card-text-l dark:text-card-text-d">
              <MapPin
                className="h-3 w-3 shrink-0 opacity-70"
                aria-hidden="true"
              />
              <span className="line-clamp-1 text-xs">{location}</span>
            </div>
          )}

          <PropertyFacts facts={facts} size="xs" className="mb-3.5" />

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-l pt-3 dark:border-border-d">
            {price && (
              <span className="text-sm font-bold text-primary">{price}</span>
            )}
            {property.marketingType && (
              <PropertyTransactionBadge
                isRent={isRent}
                className="rounded-md px-2.5 py-1 text-[11px]"
              />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
