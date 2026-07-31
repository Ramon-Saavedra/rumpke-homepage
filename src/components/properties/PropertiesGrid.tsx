import PropertyCard from "./PropertyCard";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

interface PropertiesGridProps {
  readonly properties: readonly PropertyCardDto[];
  readonly className?: string;
}

export default function PropertiesGrid({
  properties,
  className,
}: PropertiesGridProps) {
  if (properties.length === 0) return null;

  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {properties.map((property, index) => (
        <li key={property.id} className="flex">
          <PropertyCard
            property={property}
            preload={index === 0}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}
