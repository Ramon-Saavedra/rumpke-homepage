import PropertyDetailSection from "./PropertyDetailSection";
import PropertyImage from "@/components/properties/PropertyImage";
import type { PropertyImageDto } from "@/types/property-api";

interface PropertyFloorplansSectionProps {
  readonly floorplans: readonly PropertyImageDto[];
}

export default function PropertyFloorplansSection({
  floorplans,
}: PropertyFloorplansSectionProps) {
  if (floorplans.length === 0) return null;

  return (
    <PropertyDetailSection title="Grundrisse">
      <ul className="flex flex-wrap gap-5">
        {floorplans.map((floorplan, index) => (
          <li key={floorplan.id} className="min-w-70 flex-1">
            <div className="h-60 overflow-hidden border border-border-l dark:border-border-d">
              <PropertyImage
                images={[floorplan]}
                alt={floorplan.title ?? `Grundriss ${index + 1}`}
                className="h-full w-full bg-bgSecondary-l dark:bg-bgSecondary-d"
                fit="contain"
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
            <p className="mt-2 text-[13px] text-card-text-l dark:text-card-text-d">
              {floorplan.title ?? `Grundriss ${index + 1}`}
            </p>
          </li>
        ))}
      </ul>
    </PropertyDetailSection>
  );
}
