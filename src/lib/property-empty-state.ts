import {
  TYPE_LABELS_PLURAL,
  type MarketingType,
  type PropertyType,
} from "@/types/property-types";

export interface EmptyStateCopy {
  readonly headline: string;
  readonly body: string;
}

const TRANSACTION_SUFFIX: Record<MarketingType, string> = {
  kauf: "zum Kauf",
  miete: "zur Miete",
};

const CATEGORY_BODY =
  "Derzeit haben wir keine passenden Objekte in dieser Kategorie im Angebot. Gern unterstützen wir Sie persönlich bei Ihrer Suche.";

const TRANSACTION_BODY: Record<MarketingType, string> = {
  kauf: "Derzeit haben wir keine passenden Objekte zum Kauf im Angebot. Gern unterstützen wir Sie persönlich bei Ihrer Suche oder informieren Sie, sobald ein passendes Objekt verfügbar ist.",
  miete:
    "Derzeit haben wir keine passenden Objekte zur Miete im Angebot. Gern unterstützen wir Sie persönlich bei Ihrer Suche oder informieren Sie, sobald ein passendes Objekt verfügbar ist.",
};

export const SERVICE_ERROR_COPY: EmptyStateCopy = {
  headline: "Immobilien derzeit nicht verfügbar",
  body: "Der Objektbestand lässt sich gerade nicht laden. Bitte versuchen Sie es später erneut – oder lassen Sie sich direkt persönlich beraten.",
};

export function categoryEmptyStateCopy(
  propertyType: PropertyType,
  marketingType?: MarketingType,
): EmptyStateCopy {
  const label = TYPE_LABELS_PLURAL[propertyType];

  if (!marketingType) {
    return {
      headline: `Aktuell keine ${label} verfügbar`,
      body: CATEGORY_BODY,
    };
  }

  return {
    headline: `Aktuell keine ${label} ${TRANSACTION_SUFFIX[marketingType]} verfügbar`,
    body: TRANSACTION_BODY[marketingType],
  };
}
