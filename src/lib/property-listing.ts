import type { MarketingType, PropertyType } from "@/types/property-types";

const TYPE_NOUN_SINGULAR: Record<PropertyType, string> = {
  haeuser: "Haus",
  wohnungen: "Wohnung",
  gewerbeimmobilien: "Gewerbeimmobilie",
  grundstueck: "Grundstück",
  sonstige: "Objekt",
};

const TYPE_NOUN_PLURAL: Record<PropertyType, string> = {
  haeuser: "Häuser",
  wohnungen: "Wohnungen",
  gewerbeimmobilien: "Gewerbeimmobilien",
  grundstueck: "Grundstücke",
  sonstige: "Objekte",
};

const TRANSACTION_SUFFIX: Record<MarketingType, string> = {
  kauf: "zum Kauf",
  miete: "zur Miete",
};

export const MARKETING_VERB: Record<MarketingType, string> = {
  kauf: "kaufen",
  miete: "mieten",
};

export const PRICE_LABEL: Record<MarketingType, string> = {
  kauf: "Kaufpreis",
  miete: "Kaltmiete",
};

export const OFFER_LABEL: Record<MarketingType, string> = {
  kauf: "Zum Verkauf",
  miete: "Zur Miete",
};

export function formatListingCount(
  count: number,
  marketingType: MarketingType,
  propertyType?: PropertyType,
): string {
  const singular = propertyType
    ? TYPE_NOUN_SINGULAR[propertyType]
    : "Immobilie";
  const plural = propertyType ? TYPE_NOUN_PLURAL[propertyType] : "Immobilien";
  const suffix = `${TRANSACTION_SUFFIX[marketingType]} gefunden`;

  if (count === 0) return `Keine passenden ${plural} ${suffix}`;
  if (count === 1) return `1 ${singular} ${suffix}`;
  return `${count} ${plural} ${suffix}`;
}
