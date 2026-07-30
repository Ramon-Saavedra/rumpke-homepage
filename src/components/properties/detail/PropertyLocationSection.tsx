import { MapPin, ShieldCheck } from "lucide-react";
import PropertyDetailSection from "./PropertyDetailSection";
import PropertyLocationPlaceholder from "./PropertyLocationPlaceholder";
import type { PropertyDetailDto } from "@/types/property-api";
import {
  resolvePropertyCoordinates,
  resolvePropertyLocationLabel,
  resolvePropertyLocationPrecision,
} from "@/lib/property-detail";

interface PropertyLocationSectionProps {
  readonly property: PropertyDetailDto;
}

export default function PropertyLocationSection({
  property,
}: PropertyLocationSectionProps) {
  const address = resolvePropertyLocationLabel(property);
  const coordinates = resolvePropertyCoordinates(property);
  const isExact = resolvePropertyLocationPrecision(property) === "exact";

  if (!property.locationDescription && !address && coordinates === null) {
    return null;
  }

  return (
    <PropertyDetailSection title="Lage">
      {property.locationDescription && (
        <p className="mb-5 whitespace-pre-line text-base leading-relaxed text-card-text-l dark:text-card-text-d">
          {property.locationDescription}
        </p>
      )}

      <PropertyLocationPlaceholder isExact={isExact} />

      {address && isExact && (
        <p className="mt-3 flex items-center gap-2 text-sm text-card-text-l dark:text-card-text-d">
          <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {address}
        </p>
      )}

      {!isExact && (
        <p className="mt-3 flex items-start gap-2 text-sm text-card-text-l dark:text-card-text-d">
          <ShieldCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>
            {address ? `${address} — ungefähre Lage. ` : "Ungefähre Lage. "}
            Die genaue Adresse teilen wir Ihnen nach Terminvereinbarung mit.
          </span>
        </p>
      )}
    </PropertyDetailSection>
  );
}
