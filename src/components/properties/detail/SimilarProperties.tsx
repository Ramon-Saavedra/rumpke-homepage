import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PropertyShowcaseCard from "@/components/properties/PropertyShowcaseCard";
import { getProperties } from "@/lib/property-client";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

interface SimilarPropertiesProps {
  readonly propertyId: string;
  readonly marketingType: string | null;
  readonly city: string | null;
  readonly priceValue: number | null;
  readonly className?: string;
}

const MAX_SIMILAR = 3;
const POOL_SIZE = 50;
const PRICE_TOLERANCE_PCT = 0.25;

export function resolveMarketingType(value: string | null): "kauf" | "miete" | undefined {
  if (value === "kauf" || value === "miete") return value;
  return undefined;
}

export function resolveOverviewUrl(marketingType: string | null): string {
  if (marketingType === "miete") return "/miete";
  if (marketingType === "kauf") return "/kauf";
  return "/objekt";
}

export function resolveCardPrice(candidate: PropertyCardDto, marketingType: string | null): number | null {
  if (marketingType === "miete") return candidate.coldRent;
  return candidate.salePrice;
}

export function isSimilar(
  candidate: PropertyCardDto,
  marketingType: string | null,
  city: string | null,
  priceValue: number | null,
): boolean {
  if (city !== null && candidate.city !== city) return false;

  if (priceValue !== null && priceValue > 0) {
    const cardPrice = resolveCardPrice(candidate, marketingType);
    if (cardPrice === null || cardPrice <= 0) return false;
    const pctDiff = Math.abs(cardPrice - priceValue) / priceValue;
    if (pctDiff > PRICE_TOLERANCE_PCT) return false;
  }

  return true;
}

export function priceDistance(
  candidate: PropertyCardDto,
  marketingType: string | null,
  priceValue: number | null,
): number {
  if (priceValue === null || priceValue <= 0) return Infinity;
  const cardPrice = resolveCardPrice(candidate, marketingType);
  if (cardPrice === null || cardPrice <= 0) return Infinity;
  return Math.abs(cardPrice - priceValue);
}

export async function loadSimilar(
  propertyId: string,
  marketingType: string | null,
  city: string | null,
  priceValue: number | null,
): Promise<readonly PropertyCardDto[]> {
  try {
    const mt = resolveMarketingType(marketingType);
    const response = await getProperties({
      limit: POOL_SIZE,
      marketingType: mt,
    });

    return response.data
      .filter((candidate) => candidate.id !== propertyId)
      .filter((candidate) => isSimilar(candidate, marketingType, city, priceValue))
      .sort((a, b) => priceDistance(a, marketingType, priceValue) - priceDistance(b, marketingType, priceValue))
      .slice(0, MAX_SIMILAR);
  } catch {
    return [];
  }
}

export default async function SimilarProperties({
  propertyId,
  marketingType,
  city,
  priceValue,
  className,
}: SimilarPropertiesProps) {
  const properties = await loadSimilar(propertyId, marketingType, city, priceValue);

  if (properties.length === 0) return null;

  return (
    <section
      aria-labelledby="aehnliche-immobilien"
      className={cn(
        "border-t border-border-l pt-8 dark:border-border-d",
        className,
      )}
    >
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <h2
          id="aehnliche-immobilien"
          className="font-serif text-2xl font-semibold leading-[1.15] text-foreground sm:text-3xl"
        >
          Ähnliche Immobilien
        </h2>
        <Link
          href={resolveOverviewUrl(marketingType)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Alle Immobilien ansehen
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyShowcaseCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
