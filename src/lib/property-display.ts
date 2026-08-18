import { formatArea, formatRooms, formatYear } from "./property-formatters";

export const PROPERTY_CATEGORIES = [
  "haus",
  "wohnung",
  "grundstueck",
  "gewerbe",
  "buero",
] as const;

export type PropertyCategory = (typeof PROPERTY_CATEGORIES)[number];

export const PROPERTY_CATEGORY_LABELS: Record<PropertyCategory, string> = {
  haus: "Haus",
  wohnung: "Wohnung",
  grundstueck: "Grundstück",
  gewerbe: "Gewerbe",
  buero: "Büro",
};

const CATEGORY_TOKENS: readonly (readonly [
  PropertyCategory,
  readonly string[],
])[] = [
  ["buero", ["buero", "office", "praxis", "kanzlei"]],
  [
    "gewerbe",
    [
      "gewerbe",
      "lager",
      "halle",
      "laden",
      "handel",
      "produktion",
      "werkstatt",
      "gastronomie",
      "hotel",
      "industrie",
    ],
  ],
  [
    "grundstueck",
    ["grundstueck", "grundstuck", "bauland", "bauplatz", "acker", "wald"],
  ],
  [
    "wohnung",
    [
      "wohnung",
      "apartment",
      "appartement",
      "penthouse",
      "loft",
      "maisonette",
      "etage",
    ],
  ],
  ["haus", ["haus", "haeus", "villa", "bungalow", "hof"]],
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, "");
}

function matchCategory(value: string | null): PropertyCategory | null {
  if (value === null || value.length === 0) return null;
  const normalized = normalize(value);
  if (normalized.length === 0) return null;

  for (const [category, tokens] of CATEGORY_TOKENS) {
    if (tokens.some((token) => normalized.includes(token))) {
      return category;
    }
  }
  return null;
}

export function resolvePropertyCategory(
  propertyType: string | null,
  propertySubType: string | null,
): PropertyCategory | null {
  return matchCategory(propertySubType) ?? matchCategory(propertyType);
}

export function resolvePropertyCategoryLabel(
  propertyType: string | null,
  propertySubType: string | null,
): string | null {
  const category = resolvePropertyCategory(propertyType, propertySubType);
  return category === null ? null : PROPERTY_CATEGORY_LABELS[category];
}

export type PropertyFactIcon = "area" | "plot" | "rooms" | "floor";

export interface PropertyFact {
  readonly icon: PropertyFactIcon;
  readonly value: string;
}

export interface PropertyFactSource {
  readonly propertyType: string | null;
  readonly propertySubType: string | null;
  readonly livingArea: number | null;
  readonly plotArea: number | null;
  readonly usableArea: number | null;
  readonly rooms: number | null;
  readonly floor: string | null;
}

const FLOOR_LABELS: Readonly<Record<string, string>> = {
  eg: "Erdgeschoss",
  erdgeschoss: "Erdgeschoss",
  parterre: "Erdgeschoss",
  dg: "Dachgeschoss",
  dachgeschoss: "Dachgeschoss",
  ug: "Untergeschoss",
  untergeschoss: "Untergeschoss",
  kg: "Untergeschoss",
  keller: "Untergeschoss",
  souterrain: "Souterrain",
  hochparterre: "Hochparterre",
};

export function formatFloor(value: string | null): string | null {
  if (value === null) return null;

  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  const numeric = Number(trimmed.replace(",", "."));
  if (Number.isFinite(numeric)) {
    if (numeric === 0) return "Erdgeschoss";
    if (numeric < 0) return "Untergeschoss";
    return `${Math.round(numeric)}. Obergeschoss`;
  }

  return FLOOR_LABELS[normalize(trimmed)] ?? null;
}

function areaFact(
  value: number | null,
  suffix: string,
  icon: PropertyFactIcon,
): PropertyFact | null {
  if (value === null) return null;
  const area = formatArea(value);
  return { icon, value: suffix.length === 0 ? area : `${area} ${suffix}` };
}

function residentialFacts(source: PropertyFactSource): readonly PropertyFact[] {
  const facts: PropertyFact[] = [];

  const area = areaFact(source.livingArea ?? source.usableArea, "", "area");
  if (area !== null) facts.push(area);

  if (source.rooms !== null) {
    facts.push({ icon: "rooms", value: formatRooms(source.rooms) });
  }

  return facts;
}

function categoryFacts(
  category: PropertyCategory | null,
  source: PropertyFactSource,
): readonly PropertyFact[] {
  if (category === "grundstueck") {
    const fact = areaFact(
      source.plotArea ?? source.usableArea,
      "Grundstück",
      "plot",
    );
    return fact === null ? [] : [fact];
  }

  if (category === "buero") {
    const fact = areaFact(
      source.usableArea ?? source.livingArea,
      "Bürofläche",
      "area",
    );
    return fact === null ? [] : [fact];
  }

  if (category === "gewerbe") {
    const fact = areaFact(
      source.usableArea ?? source.livingArea,
      "Gewerbefläche",
      "area",
    );
    return fact === null ? [] : [fact];
  }

  if (category === "haus" || category === "wohnung") {
    return residentialFacts(source);
  }

  const residential = residentialFacts(source);
  if (residential.length > 0) return residential;

  const plot = areaFact(source.plotArea, "Grundstück", "plot");
  if (plot !== null) return [plot];

  const usable = areaFact(source.usableArea, "Nutzfläche", "area");
  return usable === null ? [] : [usable];
}

import type { PropertyCardDto, PropertyDetailDto } from "@/types/property-api";
import { resolveDisplayPrice } from "./property-formatters";

export interface PropertyCardData {
  readonly title: string;
  readonly location: string | null;
  readonly price: string | null;
  readonly isRent: boolean;
  readonly facts: readonly PropertyFact[];
  readonly detailUrl: string;
  readonly imageAlt: string;
}

export function resolvePropertyCardData(
  property: PropertyCardDto,
): PropertyCardData {
  const title = property.title ?? `Immobilie ${property.id}`;
  const location = property.city;
  const price = resolveDisplayPrice(
    property.marketingType,
    property.salePrice,
    property.coldRent,
  );
  const isRent = property.marketingType === "miete";
  const facts = buildPropertyFacts(property);
  const detailUrl = `/objekt/${encodeURIComponent(property.id)}`;
  const imageAlt = [title, location].filter(Boolean).join(", ");

  return { title, location, price, isRent, facts, detailUrl, imageAlt };
}

export interface ShowcaseSpecRow {
  readonly key: string;
  readonly value: string;
}

interface ShowcaseAreaSource {
  readonly livingArea: number | null;
  readonly usableArea: number | null;
  readonly plotArea: number | null;
}

// Mirrors categoryFacts' area preference per category, so the showcase's
// "Fläche" row always agrees with what the rest of the site (PropertyCard,
// detail page) shows for the same property.
function resolveShowcaseArea(
  category: PropertyCategory | null,
  source: ShowcaseAreaSource,
): number | null {
  if (category === "grundstueck") {
    return source.plotArea ?? source.usableArea;
  }
  if (category === "buero" || category === "gewerbe") {
    return source.usableArea ?? source.livingArea;
  }
  return source.livingArea ?? source.usableArea ?? source.plotArea;
}

export function resolveShowcaseSpecRows(
  property: PropertyCardDto,
): readonly ShowcaseSpecRow[] {
  const category = resolvePropertyCategory(
    property.propertyType,
    property.propertySubType,
  );
  const type =
    resolvePropertyCategoryLabel(
      property.propertyType,
      property.propertySubType,
    ) ??
    property.propertyType ??
    "–";
  const areaValue = resolveShowcaseArea(category, property);
  const area = areaValue !== null ? formatArea(areaValue) : "–";
  const rooms = property.rooms !== null ? formatRooms(property.rooms) : "–";

  return [
    { key: "Typ", value: type },
    { key: "Fläche", value: area },
    { key: "Zimmer", value: rooms },
  ];
}

const MAX_FEATURED_EXTRA_SPECS = 4;

export function resolveFeaturedExtraSpecRows(
  detail: PropertyDetailDto,
): readonly ShowcaseSpecRow[] {
  const rows: ShowcaseSpecRow[] = [];
  const category = resolvePropertyCategory(
    detail.propertyType,
    detail.propertySubType,
  );
  const shownArea = resolveShowcaseArea(category, detail.area);

  if (detail.yearBuilt !== null) {
    rows.push({ key: "Baujahr", value: formatYear(detail.yearBuilt) });
  }
  if (detail.condition !== null && detail.condition.length > 0) {
    rows.push({ key: "Zustand", value: detail.condition });
  }
  if (detail.rooms.bathrooms !== null) {
    rows.push({ key: "Badezimmer", value: String(detail.rooms.bathrooms) });
  }
  // Skip a "Grundstück" row that would just repeat the plot area already
  // shown as "Fläche" (e.g. land listings with no living/usable area).
  if (detail.area.plotArea !== null && detail.area.plotArea !== shownArea) {
    rows.push({
      key: "Grundstück",
      value: formatArea(detail.area.plotArea),
    });
  }

  return rows.slice(0, MAX_FEATURED_EXTRA_SPECS);
}

export function buildPropertyFacts(
  source: PropertyFactSource,
): readonly PropertyFact[] {
  const category = resolvePropertyCategory(
    source.propertyType,
    source.propertySubType,
  );

  const facts = [...categoryFacts(category, source)];

  if (category !== "grundstueck") {
    const floor = formatFloor(source.floor);
    if (floor !== null) facts.push({ icon: "floor", value: floor });
  }

  return facts;
}
