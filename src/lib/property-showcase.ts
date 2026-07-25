import type { PropertyCardDto } from "@/types/property-api";

export interface ShowcaseSelection {
  /** The anchor object rendered large with editorial styling. */
  readonly featured: PropertyCardDto;
  /** Up to two secondary objects rendered as compact cards beside the anchor. */
  readonly secondary: readonly PropertyCardDto[];
  /** Up to three balanced objects rendered in the closing row. */
  readonly standard: readonly PropertyCardDto[];
}

/** Minimum objects required to compose the showcase; below this we show the empty state. */
export const SHOWCASE_MIN_PROPERTIES = 3;

/**
 * Splits the fetched properties into the showcase composition:
 * 1 featured + up to 2 secondary + up to 3 standard (six objects total).
 *
 * The first property is treated as the anchor ("Top-Objekt" or newest update).
 * Returns null when fewer than {@link SHOWCASE_MIN_PROPERTIES} are available so
 * the caller can render the empty state instead of a half-filled grid.
 */
export function selectShowcaseProperties(
  properties: readonly PropertyCardDto[],
): ShowcaseSelection | null {
  if (properties.length < SHOWCASE_MIN_PROPERTIES) {
    return null;
  }

  const [featured, ...rest] = properties;

  return {
    featured,
    secondary: rest.slice(0, 2),
    standard: rest.slice(2, 5),
  };
}
