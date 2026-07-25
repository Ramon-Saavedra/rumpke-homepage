import { DoorOpen, LandPlot, Layers, Ruler } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PropertyFact, PropertyFactIcon } from "@/lib/property-display";
import { cn } from "@/lib/utils";

const FACT_ICONS: Record<PropertyFactIcon, LucideIcon> = {
  area: Ruler,
  plot: LandPlot,
  rooms: DoorOpen,
  floor: Layers,
};

export type PropertyFactsSize = "sm" | "xs";

interface PropertyFactsProps {
  readonly facts: readonly PropertyFact[];
  readonly size?: PropertyFactsSize;
  readonly className?: string;
}

const SIZES: Record<
  PropertyFactsSize,
  { readonly row: string; readonly icon: string }
> = {
  sm: { row: "gap-x-4 gap-y-1 text-[13px]", icon: "h-3.5 w-3.5" },
  xs: { row: "gap-x-2.5 gap-y-0.5 text-[11px]", icon: "h-3 w-3" },
};

export default function PropertyFacts({
  facts,
  size = "sm",
  className,
}: PropertyFactsProps) {
  if (facts.length === 0) return null;

  const style = SIZES[size];

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center text-card-text-l dark:text-card-text-d",
        style.row,
        className,
      )}
    >
      {facts.map((fact) => {
        const Icon = FACT_ICONS[fact.icon];
        return (
          <li
            key={`${fact.icon}-${fact.value}`}
            className="flex items-center gap-1.5"
          >
            <Icon
              className={cn("shrink-0 opacity-70", style.icon)}
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">{fact.value}</span>
          </li>
        );
      })}
    </ul>
  );
}
