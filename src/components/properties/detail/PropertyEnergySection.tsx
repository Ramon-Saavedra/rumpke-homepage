import { Zap } from "lucide-react";
import PropertyDetailSection from "./PropertyDetailSection";
import type { PropertyDetailDto } from "@/types/property-api";
import { formatYear } from "@/lib/property-formatters";

interface PropertyEnergySectionProps {
  readonly property: PropertyDetailDto;
}

export default function PropertyEnergySection({
  property,
}: PropertyEnergySectionProps) {
  const certificateType = property.energyCertificateType;
  if (!certificateType) return null;

  const entries: readonly { label: string; value: string }[] = [
    { label: "Ausweistyp", value: certificateType },
    ...(property.yearBuilt !== null
      ? [{ label: "Baujahr", value: formatYear(property.yearBuilt) }]
      : []),
  ];

  return (
    <PropertyDetailSection title="Energieausweis">
      <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Zap className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
        </span>
        <dl className="grid min-w-55 flex-1 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-6 gap-y-2.5 text-sm">
          {entries.map((entry) => (
            <div key={entry.label}>
              <dt className="text-card-text-l dark:text-card-text-d">
                {entry.label}
              </dt>
              <dd className="font-medium">{entry.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </PropertyDetailSection>
  );
}
