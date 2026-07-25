import { formatArea, formatRooms } from "./property-formatters";

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
