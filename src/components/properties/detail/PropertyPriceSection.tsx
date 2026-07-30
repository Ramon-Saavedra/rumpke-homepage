import PropertyDetailSection from "./PropertyDetailSection";
import type { PropertyPriceRow } from "@/lib/property-detail";
import { cn } from "@/lib/utils";

interface PropertyPriceSectionProps {
  readonly rows: readonly PropertyPriceRow[];
}

export default function PropertyPriceSection({
  rows,
}: PropertyPriceSectionProps) {
  if (rows.length === 0) return null;

  return (
    <PropertyDetailSection title="Wirtschaftliche Angaben">
      <dl>
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center justify-between gap-4 py-3 text-[15px]",
              index < rows.length - 1 &&
                "border-b border-border-l dark:border-border-d",
            )}
          >
            <dt className="text-card-text-l dark:text-card-text-d">
              {row.label}
            </dt>
            <dd
              className={cn(
                "text-right font-semibold",
                row.emphasis && "text-primary",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </PropertyDetailSection>
  );
}
