import type { PropertyDetailDto } from "@/types/property-api";
import {
  formatArea,
  formatMonthlyPrice,
  formatPrice,
  formatRooms,
  formatYear,
} from "./property-formatters";
import { formatFloor } from "./property-display";
import { isValidCoordinate } from "./map-tiles";

export type PropertyDetailFactIcon =
  | "living"
  | "usable"
  | "plot"
  | "rooms"
  | "bedrooms"
  | "bathrooms"
  | "year"
  | "floor"
  | "floors"
  | "condition";

export interface PropertyDetailFact {
  readonly icon: PropertyDetailFactIcon;
  readonly value: string;
  readonly label: string;
}

export function buildPropertyDetailFacts(
  property: PropertyDetailDto,
): readonly PropertyDetailFact[] {
  const facts: PropertyDetailFact[] = [];

  if (property.area.livingArea !== null) {
    facts.push({
      icon: "living",
      value: formatArea(property.area.livingArea),
      label: "Wohnfläche",
    });
  }

  if (property.area.usableArea !== null) {
    facts.push({
      icon: "usable",
      value: formatArea(property.area.usableArea),
      label: "Nutzfläche",
    });
  }

  if (property.rooms.total !== null) {
    facts.push({
      icon: "rooms",
      value: formatRooms(property.rooms.total),
      label: "Zimmer gesamt",
    });
  }

  if (property.rooms.bedrooms !== null) {
    facts.push({
      icon: "bedrooms",
      value: String(property.rooms.bedrooms),
      label: "Schlafzimmer",
    });
  }

  if (property.rooms.bathrooms !== null) {
    facts.push({
      icon: "bathrooms",
      value: String(property.rooms.bathrooms),
      label: "Badezimmer",
    });
  }

  if (property.area.plotArea !== null) {
    facts.push({
      icon: "plot",
      value: formatArea(property.area.plotArea),
      label: "Grundstück",
    });
  }

  if (property.yearBuilt !== null) {
    facts.push({
      icon: "year",
      value: formatYear(property.yearBuilt),
      label: "Baujahr",
    });
  }

  const floor = formatFloor(property.floor);
  if (floor !== null) {
    facts.push({ icon: "floor", value: floor, label: "Etage" });
  }

  if (property.totalFloors !== null) {
    facts.push({
      icon: "floors",
      value: String(property.totalFloors),
      label: "Etagen im Haus",
    });
  }

  if (property.condition !== null && property.condition.length > 0) {
    facts.push({
      icon: "condition",
      value: property.condition,
      label: "Zustand",
    });
  }

  return facts;
}

export function buildPropertyFeatures(
  property: PropertyDetailDto,
): readonly string[] {
  const features: string[] = [];
  if (property.balcony) features.push("Balkon");
  if (property.terrace) features.push("Terrasse");
  if (property.price.brokerageFree) features.push("Provisionsfrei");
  return features;
}

export interface PropertyPriceRow {
  readonly label: string;
  readonly value: string;
  readonly emphasis?: boolean;
}

export function buildPropertyPriceRows(
  property: PropertyDetailDto,
): readonly PropertyPriceRow[] {
  const rows: PropertyPriceRow[] = [];
  const { price } = property;
  const isSale = property.marketingType === "kauf";
  const isRent = property.marketingType === "miete";

  if (isSale && price.salePrice !== null) {
    rows.push({
      label: "Kaufpreis",
      value: formatPrice(price.salePrice),
      emphasis: true,
    });
  }

  if (isRent && price.coldRent !== null) {
    rows.push({
      label: "Kaltmiete",
      value: formatMonthlyPrice(price.coldRent),
      emphasis: true,
    });
  }

  if (isRent && price.warmRent !== null) {
    rows.push({
      label: "Warmmiete",
      value: formatMonthlyPrice(price.warmRent),
    });
  }

  if (isRent && price.additionalCosts !== null) {
    rows.push({
      label: "Nebenkosten",
      value: formatMonthlyPrice(price.additionalCosts),
    });
  }

  if (isSale && price.hoaFee !== null) {
    rows.push({
      label: "Hausgeld",
      value: formatMonthlyPrice(price.hoaFee),
    });
  }

  rows.push({
    label: "Provision",
    value: price.brokerageFree ? "Provisionsfrei" : "Auf Anfrage",
  });

  return rows;
}

export function buildPropertyAddressLines(
  property: PropertyDetailDto,
): readonly string[] {
  const { address } = property;
  const lines: string[] = [];

  const street = address.street?.trim() ?? "";
  if (street.length > 0) {
    const houseNumber = address.houseNumber?.trim() ?? "";
    lines.push(houseNumber.length > 0 ? `${street} ${houseNumber}` : street);
  }

  const cityLine = [address.zip, address.city]
    .map((part) => part?.trim() ?? "")
    .filter((part) => part.length > 0)
    .join(" ");
  if (cityLine.length > 0) lines.push(cityLine);

  return lines;
}

export function resolvePropertyLocationLabel(
  property: PropertyDetailDto,
): string | null {
  const lines = buildPropertyAddressLines(property);
  if (lines.length === 0) return null;
  return lines.join(", ");
}

export type PropertyLocationPrecision = "exact" | "approximate";

export function resolvePropertyLocationPrecision(
  property: PropertyDetailDto,
): PropertyLocationPrecision {
  const street = property.address.street?.trim() ?? "";
  return street.length > 0 ? "exact" : "approximate";
}

export interface PropertyCoordinates {
  readonly lat: number;
  readonly lng: number;
}

export function resolvePropertyCoordinates(
  property: PropertyDetailDto,
): PropertyCoordinates | null {
  const { latitude, longitude } = property.address;
  if (latitude === null || longitude === null) return null;
  if (latitude === 0 && longitude === 0) return null;
  if (!isValidCoordinate(latitude, longitude)) return null;
  return { lat: latitude, lng: longitude };
}

export function resolvePropertyTitle(property: PropertyDetailDto): string {
  const title = property.title?.trim() ?? "";
  return title.length > 0 ? title : `Immobilie ${property.id}`;
}

export function resolvePropertyReference(property: PropertyDetailDto): string {
  return `Ref. ${property.id}`;
}

export const PROPERTY_INQUIRY_TYPES = [
  { id: "viewing", label: "Besichtigung" },
  { id: "expose", label: "Exposé" },
  { id: "callback", label: "Rückruf" },
  { id: "question", label: "Frage" },
] as const;

export type PropertyInquiryType = (typeof PROPERTY_INQUIRY_TYPES)[number]["id"];

const INQUIRY_MESSAGES: Record<
  PropertyInquiryType,
  (subject: string) => string
> = {
  viewing: (subject) =>
    `Ich interessiere mich für einen Besichtigungstermin für ${subject} und freue mich über eine Terminvereinbarung.`,
  expose: (subject) =>
    `Bitte senden Sie mir das ausführliche Exposé zu ${subject} zu.`,
  callback: (subject) =>
    `Bitte rufen Sie mich zu ${subject} zurück, ich habe noch offene Fragen.`,
  question: (subject) =>
    `Ich habe eine Frage zu ${subject} und freue mich über eine Rückmeldung.`,
};

export function buildInquiryMessage(
  type: PropertyInquiryType,
  property: PropertyDetailDto,
): string {
  const subject = `dem Objekt „${resolvePropertyTitle(property)}“ (${resolvePropertyReference(property)})`;
  return INQUIRY_MESSAGES[type](subject);
}
