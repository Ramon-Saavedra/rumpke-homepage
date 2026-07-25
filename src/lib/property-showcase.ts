import type { PropertyCardDto } from "@/types/property-api";

export const SHOWCASE_MAX_PROPERTIES = 6;

export type ShowcaseLayout =
  | { readonly kind: "empty" }
  | { readonly kind: "spotlight"; readonly featured: PropertyCardDto }
  | { readonly kind: "duo"; readonly standard: readonly PropertyCardDto[] }
  | {
      readonly kind: "anchor";
      readonly featured: PropertyCardDto;
      readonly secondary: readonly PropertyCardDto[];
    }
  | {
      readonly kind: "panorama";
      readonly featured: PropertyCardDto;
      readonly standard: readonly PropertyCardDto[];
    }
  | {
      readonly kind: "composition";
      readonly featured: PropertyCardDto;
      readonly secondary: readonly PropertyCardDto[];
      readonly standard: readonly PropertyCardDto[];
    };

export function selectShowcaseLayout(
  properties: readonly PropertyCardDto[],
): ShowcaseLayout {
  const visible = properties.slice(0, SHOWCASE_MAX_PROPERTIES);

  if (visible.length === 0) {
    return { kind: "empty" };
  }

  if (visible.length === 1) {
    return { kind: "spotlight", featured: visible[0] };
  }

  if (visible.length === 2) {
    return { kind: "duo", standard: visible };
  }

  const [featured, ...rest] = visible;

  if (visible.length === 3) {
    return { kind: "anchor", featured, secondary: rest };
  }

  if (visible.length === 4) {
    return { kind: "panorama", featured, standard: rest };
  }

  return {
    kind: "composition",
    featured,
    secondary: rest.slice(0, 2),
    standard: rest.slice(2),
  };
}
