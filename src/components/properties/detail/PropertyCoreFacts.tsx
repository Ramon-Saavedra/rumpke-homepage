import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  DoorOpen,
  LandPlot,
  Layers,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  PropertyDetailFact,
  PropertyDetailFactIcon,
} from "@/lib/property-detail";
import { cn } from "@/lib/utils";

const FACT_ICONS: Record<PropertyDetailFactIcon, LucideIcon> = {
  living: Ruler,
  usable: Ruler,
  plot: LandPlot,
  rooms: DoorOpen,
  bedrooms: BedDouble,
  bathrooms: Bath,
  year: CalendarDays,
  floor: Layers,
  floors: Building2,
  condition: ShieldCheck,
};

interface PropertyCoreFactsProps {
  readonly facts: readonly PropertyDetailFact[];
  readonly className?: string;
}

export default function PropertyCoreFacts({
  facts,
  className,
}: PropertyCoreFactsProps) {
  if (facts.length === 0) return null;

  return (
    <section
      aria-label="Eckdaten"
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {facts.map((fact) => {
        const Icon = FACT_ICONS[fact.icon];
        return (
          <div
            key={`${fact.icon}-${fact.label}`}
            className="flex items-start gap-2.5"
          >
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-primary"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="truncate text-base font-semibold">
                {fact.value}
              </div>
              <div className="truncate text-xs text-card-text-l dark:text-card-text-d">
                {fact.label}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
