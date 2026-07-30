export const VALID_TYPES = [
  "haeuser",
  "wohnungen",
  "gewerbeimmobilien",
  "grundstueck",
  "sonstige",
] as const;

export type PropertyType = (typeof VALID_TYPES)[number];

export type MarketingType = "kauf" | "miete";

export const PROPERTY_TYPE_FILTERS = {
  haeuser: "haus",
  wohnungen: "wohnung",
  gewerbeimmobilien: "gewerbe",
  grundstueck: "grundstueck",
  sonstige: "sonstige",
} as const satisfies Record<PropertyType, string>;

export type PropertyTypeFilter =
  (typeof PROPERTY_TYPE_FILTERS)[PropertyType];

export const TYPE_LABELS: Record<PropertyType, string> = {
  haeuser: "Häuser",
  wohnungen: "Wohnungen",
  gewerbeimmobilien: "Gewerbeimmobilien",
  grundstueck: "Grundstück",
  sonstige: "Sonstige",
};

export const TYPE_LABELS_PLURAL: Record<PropertyType, string> = {
  haeuser: "Häuser",
  wohnungen: "Wohnungen",
  gewerbeimmobilien: "Gewerbeimmobilien",
  grundstueck: "Grundstücke",
  sonstige: "sonstigen Objekte",
};

export const TYPE_DESCRIPTIONS: Record<PropertyType, string> = {
  haeuser: "Finden Sie Ihr Traumhaus zum Kaufen oder Mieten",
  wohnungen: "Entdecken Sie passende Wohnungen zum Kaufen oder Mieten",
  gewerbeimmobilien: "Gewerbeimmobilien für Ihre geschäftlichen Anforderungen",
  grundstueck: "Grundstücke für Ihr Bauvorhaben oder Ihre Investition",
  sonstige: "Weitere Immobilienangebote für besondere Anforderungen",
};

export const TYPE_DESCRIPTIONS_KAUF: Record<PropertyType, string> = {
  haeuser: "Einfamilienhäuser, Reihenhäuser, Villen",
  wohnungen: "Eigentumswohnungen, Apartments",
  gewerbeimmobilien: "Büros, Lagerhallen, Geschäfte",
  grundstueck: "Baugrundstücke, Ackerland",
  sonstige: "Weitere Immobilientypen",
};

export const TYPE_DESCRIPTIONS_MIETE: Record<PropertyType, string> = {
  haeuser: "Einfamilienhäuser, Reihenhäuser, Villen",
  wohnungen: "Mietwohnungen, Apartments",
  gewerbeimmobilien: "Büros, Lagerhallen, Geschäfte",
  grundstueck: "Pachtgrundstücke, Land",
  sonstige: "Weitere Immobilientypen",
};

export const TRANSACTION_LABELS = {
  kauf: "Kaufen",
  miete: "Mieten",
} as const;

export function isValidType(type: string): type is PropertyType {
  return VALID_TYPES.includes(type as PropertyType);
}

export function getPropertyTypes(basePath: "kauf" | "miete") {
  const descriptions =
    basePath === "kauf" ? TYPE_DESCRIPTIONS_KAUF : TYPE_DESCRIPTIONS_MIETE;

  return VALID_TYPES.map((type) => ({
    slug: type,
    label: TYPE_LABELS[type],
    description: descriptions[type],
  }));
}
