import PageContainer from "@/components/layout/page-container/PageContainer";
import PropertiesGridSkeleton from "@/components/properties/skeletons/PropertiesGridSkeleton";
import PropertyListingHeaderSkeleton from "@/components/properties/skeletons/PropertyListingHeaderSkeleton";
import SkeletonRegion from "@/components/ui/skeleton/SkeletonRegion";

export default function Loading() {
  return (
    <SkeletonRegion label="Immobilien werden geladen">
      <PageContainer>
        <PropertyListingHeaderSkeleton align="center" className="mb-12" />
        <PropertiesGridSkeleton count={12} withRegion={false} />
      </PageContainer>
    </SkeletonRegion>
  );
}
