import PropertiesGridSkeleton from "./skeletons/PropertiesGridSkeleton";
import PropertyListingHeaderSkeleton from "./skeletons/PropertyListingHeaderSkeleton";
import SkeletonRegion from "@/components/ui/skeleton/SkeletonRegion";

export default function PropertyCategoryLoading() {
  return (
    <SkeletonRegion label="Immobilien werden geladen">
      <PropertyListingHeaderSkeleton className="mb-8 sm:mb-10" />
      <PropertiesGridSkeleton count={12} withRegion={false} />
    </SkeletonRegion>
  );
}
