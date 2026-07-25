import PropertySpotlightCard from "./PropertySpotlightCard";
import PropertyShowcaseEmpty from "./PropertyShowcaseEmpty";
import {
  AnchorRow,
  PanoramaAnchor,
  ShowcaseSection,
  StandardRow,
  emptySlots,
} from "./showcase-layout";
import { layoutHasListingCta } from "@/lib/property-showcase";
import type { ShowcaseLayout } from "@/lib/property-showcase";

export type ShowcaseSkeletonKind = ShowcaseLayout["kind"];

interface PropertyShowcaseSkeletonProps {
  readonly kind?: ShowcaseSkeletonKind;
  readonly standardCount?: 2 | 3;
}

function SkeletonComposition({
  kind,
  standardCount,
}: {
  readonly kind: ShowcaseSkeletonKind;
  readonly standardCount: 2 | 3;
}) {
  switch (kind) {
    case "empty":
      return <PropertyShowcaseEmpty isLoading />;

    case "spotlight":
      return <PropertySpotlightCard isLoading />;

    case "duo":
      return <StandardRow properties={emptySlots(2)} />;

    case "anchor":
      return <AnchorRow featured={undefined} secondary={emptySlots(2)} />;

    case "panorama":
      return (
        <>
          <PanoramaAnchor featured={undefined} className="mb-6 lg:mb-8" />
          <StandardRow properties={emptySlots(3)} />
        </>
      );

    case "composition":
      return (
        <>
          <AnchorRow
            featured={undefined}
            secondary={emptySlots(2)}
            className="mb-6 lg:mb-8"
          />
          <StandardRow properties={emptySlots(standardCount)} />
        </>
      );
  }
}

export default function PropertyShowcaseSkeleton({
  kind = "composition",
  standardCount = 3,
}: PropertyShowcaseSkeletonProps) {
  return (
    <ShowcaseSection withListingCta={layoutHasListingCta(kind)}>
      <SkeletonComposition kind={kind} standardCount={standardCount} />
    </ShowcaseSection>
  );
}
