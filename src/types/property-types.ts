export const VALID_TYPES = ["haus", "wohnung", "gewerbe", "grundstueck", "sonstige"] as const;

export type PropertyType = typeof VALID_TYPES[number];

export const TYPE_LABELS: Record<PropertyType, string> = {
  haus: "Haus",
  wohnung: "Wohnung",
  gewerbe: "Gewerbe",
  grundstueck: "Grundstück",
  sonstige: "Sonstige",
};

export const TYPE_LABELS_PLURAL: Record<PropertyType, string> = {
  haus: "Häuser",
  wohnung: "Wohnungen",
  gewerbe: "Gewerbe",
  grundstueck: "Grundstücke",
  sonstige: "Sonstige",
};

export const TYPE_DESCRIPTIONS: Record<PropertyType, string> = {
  haus: "Finden Sie Ihr Traumhaus zum Kaufen oder Mieten",
  wohnung: "Entdecken Sie passende Wohnungen zum Kaufen oder Mieten",
  gewerbe: "Gewerbeobjekte für Ihre geschäftlichen Anforderungen",
  grundstueck: "Grundstücke für Ihr Bauvorhaben oder Ihre Investition",
  sonstige: "Weitere Immobilienangebote für besondere Anforderungen",
};

export const TYPE_DESCRIPTIONS_KAUF: Record<PropertyType, string> = {
  haus: "Einfamilienhäuser, Reihenhäuser, Villen",
  wohnung: "Eigentumswohnungen, Apartments",
  gewerbe: "Büros, Lagerhallen, Geschäfte",
  grundstueck: "Baugrundstücke, Ackerland",
  sonstige: "Weitere Immobilientypen",
};

export const TYPE_DESCRIPTIONS_MIETE: Record<PropertyType, string> = {
  haus: "Einfamilienhäuser, Reihenhäuser, Villen",
  wohnung: "Mietwohnungen, Apartments",
  gewerbe: "Büros, Lagerhallen, Geschäfte",
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
  const descriptions = basePath === "kauf" ? TYPE_DESCRIPTIONS_KAUF : TYPE_DESCRIPTIONS_MIETE;

  return VALID_TYPES.map(type => ({
    slug: type,
    label: TYPE_LABELS[type],
    description: descriptions[type],
  }));
}
