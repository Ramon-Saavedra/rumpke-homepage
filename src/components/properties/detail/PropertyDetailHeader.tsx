import { MapPin } from "lucide-react";
import PropertyTransactionBadge from "@/components/properties/PropertyTransactionBadge";
import PropertyInquiryCta from "./PropertyInquiryCta";
import type { PropertyDetailDto } from "@/types/property-api";
import { resolveDisplayPrice } from "@/lib/property-formatters";
import { resolvePropertyCategoryLabel } from "@/lib/property-display";
import {
  resolvePropertyLocationLabel,
  resolvePropertyReference,
  resolvePropertyTitle,
} from "@/lib/property-detail";
import { cn } from "@/lib/utils";

interface PropertyDetailHeaderProps {
  readonly property: PropertyDetailDto;
  readonly className?: string;
}

export default function PropertyDetailHeader({
  property,
  className,
}: PropertyDetailHeaderProps) {
  const title = resolvePropertyTitle(property);
  const location = resolvePropertyLocationLabel(property);
  const price = resolveDisplayPrice(
    property.marketingType,
    property.price.salePrice,
    property.price.coldRent,
  );
  const typeLabel = resolvePropertyCategoryLabel(
    property.propertyType,
    property.propertySubType,
  );

  return (
    <header
      className={cn(
        "border-b border-border-l pb-8 dark:border-border-d",
        className,
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        {property.marketingType && (
          <PropertyTransactionBadge
            isRent={property.marketingType === "miete"}
            className="px-3 py-1.5 text-xs"
          />
        )}
        {typeLabel && (
          <span className="rounded-md border border-border-l px-3 py-1.5 text-xs font-medium text-card-text-l dark:border-border-d dark:text-card-text-d">
            {typeLabel}
          </span>
        )}
        <span className="ml-auto font-mono text-xs text-card-text-l dark:text-card-text-d">
          {resolvePropertyReference(property)}
        </span>
      </div>

      <h1 className="mb-3 font-serif text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl lg:text-[40px]">
        {title}
      </h1>

      {location && (
        <p className="mb-6 flex items-center gap-1.5 text-[15px] text-card-text-l dark:text-card-text-d">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {location}
        </p>
      )}

      <div className="flex flex-wrap items-end justify-between gap-6">
        {price && (
          <div>
            <p className="text-2xl font-bold leading-none text-primary sm:text-3xl">
              {price}
            </p>
            <p className="mt-1.5 text-[13px] text-card-text-l dark:text-card-text-d">
              {property.price.brokerageFree
                ? "Provisionsfrei"
                : "Provision auf Anfrage"}
            </p>
          </div>
        )}
        <PropertyInquiryCta />
      </div>
    </header>
  );
}
