import PropertySpotlightCard from "./PropertySpotlightCard";
import PropertyShowcaseEmpty from "./PropertyShowcaseEmpty";
import {
  AnchorRow,
  PanoramaAnchor,
  ShowcaseSection,
  StandardRow,
} from "./showcase-layout";
import {
  selectShowcaseLayout,
  layoutHasListingCta,
} from "@/lib/property-showcase";
import type { ShowcaseLayout } from "@/lib/property-showcase";
import type { PropertyCardDto } from "@/types/property-api";

interface PropertyShowcaseProps {
  readonly properties: readonly PropertyCardDto[];
  readonly error?: boolean;
}

function ShowcaseComposition({ layout }: { readonly layout: ShowcaseLayout }) {
  switch (layout.kind) {
    case "empty":
      return <PropertyShowcaseEmpty />;

    case "spotlight":
      return <PropertySpotlightCard property={layout.featured} />;

    case "duo":
      return <StandardRow properties={layout.standard} priorityFirst />;

    case "anchor":
      return (
        <AnchorRow featured={layout.featured} secondary={layout.secondary} />
      );

    case "panorama":
      return (
        <>
          <PanoramaAnchor featured={layout.featured} className="mb-6 lg:mb-8" />
          <StandardRow properties={layout.standard} />
        </>
      );

    case "composition":
      return (
        <>
          <AnchorRow
            featured={layout.featured}
            secondary={layout.secondary}
            className="mb-6 lg:mb-8"
          />
          <StandardRow properties={layout.standard} />
        </>
      );
  }
}

export default function PropertyShowcase({
  properties,
  error = false,
}: PropertyShowcaseProps) {
  const layout = selectShowcaseLayout(error ? [] : properties);

  return (
    <ShowcaseSection
      withListingCta={!error && layoutHasListingCta(layout.kind)}
    >
      {error ? (
        <PropertyShowcaseEmpty error />
      ) : (
        <ShowcaseComposition layout={layout} />
      )}
    </ShowcaseSection>
  );
}
