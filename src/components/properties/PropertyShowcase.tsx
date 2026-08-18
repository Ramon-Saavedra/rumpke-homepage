import PropertyShowcaseEmpty from "./PropertyShowcaseEmpty";
import PropertyShowcaseFeatured from "./PropertyShowcaseFeatured";
import PropertyShowcaseRail from "./PropertyShowcaseRail";
import { ShowcaseSection } from "./showcase-layout";
import { getProperty } from "@/lib/property-client";
import { resolveFeaturedExtraSpecRows } from "@/lib/property-display";
import type { FeaturedShowcaseProperty } from "./PropertyShowcaseFeatured";
import type { PropertyCardDto } from "@/types/property-api";

export const SHOWCASE_MAX_PROPERTIES = 5;

interface PropertyShowcaseProps {
  readonly properties: readonly PropertyCardDto[];
  readonly error?: boolean;
}

// The list endpoint truncates each card to one image and omits facts like
// year built or condition; the detail endpoint carries the full gallery and
// data, which the featured layout uses for thumbnails and extra spec rows.
async function resolveFeaturedProperty(
  property: PropertyCardDto,
): Promise<FeaturedShowcaseProperty> {
  try {
    const detail = await getProperty(property.id);
    return {
      ...property,
      images: detail.images,
      extraSpecs: resolveFeaturedExtraSpecRows(detail),
    };
  } catch {
    return { ...property, extraSpecs: [] };
  }
}

export default async function PropertyShowcase({
  properties,
  error = false,
}: PropertyShowcaseProps) {
  const visible = error ? [] : properties.slice(0, SHOWCASE_MAX_PROPERTIES);
  const featured =
    visible.length === 1 ? await resolveFeaturedProperty(visible[0]) : null;

  return (
    <ShowcaseSection withListingCta={!error && visible.length >= 2}>
      {error ? (
        <PropertyShowcaseEmpty error />
      ) : visible.length === 0 ? (
        <PropertyShowcaseEmpty />
      ) : featured ? (
        <PropertyShowcaseFeatured property={featured} />
      ) : (
        <PropertyShowcaseRail properties={visible} />
      )}
    </ShowcaseSection>
  );
}
