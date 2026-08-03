"use client";

import { useState } from "react";
import PropertyDetailSection from "./PropertyDetailSection";
import PropertyImage from "@/components/properties/PropertyImage";
import PropertyLightbox from "./PropertyLightbox";
import { Maximize2 } from "lucide-react";
import type { PropertyImageDto } from "@/types/property-api";

interface PropertyFloorplansSectionProps {
  readonly floorplans: readonly PropertyImageDto[];
}

export default function PropertyFloorplansSection({
  floorplans,
}: PropertyFloorplansSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (floorplans.length === 0) return null;

  return (
    <PropertyDetailSection title="Grundrisse">
      <ul className="flex flex-wrap gap-5">
        {floorplans.map((floorplan, index) => (
          <li key={floorplan.id} className="min-w-70 flex-1">
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative h-60 w-full cursor-pointer overflow-hidden border border-border-l dark:border-border-d"
              aria-label={`${floorplan.title ?? `Grundriss ${index + 1}`} vergrößern`}
            >
              <PropertyImage
                images={[floorplan]}
                alt={floorplan.title ?? `Grundriss ${index + 1}`}
                className="h-full w-full bg-bgSecondary-l dark:bg-bgSecondary-d"
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100 group-focus-visible:bg-black/25 group-focus-visible:opacity-100">
                <Maximize2 className="h-6 w-6 text-white drop-shadow" aria-hidden="true" />
              </span>
            </button>
            <p className="mt-2 text-[13px] text-card-text-l dark:text-card-text-d">
              {floorplan.title ?? `Grundriss ${index + 1}`}
            </p>
          </li>
        ))}
      </ul>

      {activeIndex !== null && (
        <PropertyLightbox
          images={floorplans}
          activeIndex={activeIndex}
          alt={floorplans[activeIndex]?.title ?? "Grundriss"}
          onClose={() => setActiveIndex(null)}
          onSelect={setActiveIndex}
        />
      )}
    </PropertyDetailSection>
  );
}
