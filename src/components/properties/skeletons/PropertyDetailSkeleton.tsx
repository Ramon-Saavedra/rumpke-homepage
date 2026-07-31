import PageContainer from "@/components/layout/page-container/PageContainer";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import SkeletonRegion from "@/components/ui/skeleton/SkeletonRegion";
import { skeletonDelayStyle } from "@/lib/skeleton-classes";

export const PROPERTY_DETAIL_SKELETON_LABEL = "Immobilie wird geladen";

const BREADCRUMB_SLOTS = [0, 1, 2];
const GALLERY_SECONDARY_SLOTS = [0, 1, 2, 3];
const CORE_FACT_SLOTS = [0, 1, 2, 3, 4];
const TEXT_SECTION_SLOTS = [0, 1, 2];
const CONTACT_ROW_SLOTS = [0, 1];
const INQUIRY_CHIP_SLOTS = [0, 1, 2];

function GallerySkeleton() {
  return (
    <div className="mt-3.5">
      <div className="flex gap-1 overflow-hidden md:hidden">
        <Skeleton className="aspect-[4/3] w-[88%] shrink-0" />
      </div>

      <div className="hidden h-[clamp(320px,38vw,520px)] gap-1 overflow-hidden md:grid md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2">
        <Skeleton className="h-full w-full md:row-span-2" />
        {GALLERY_SECONDARY_SLOTS.map((slot) => (
          <Skeleton
            key={slot}
            className="h-full w-full"
            style={skeletonDelayStyle(slot + 1)}
          />
        ))}
      </div>
    </div>
  );
}

function DetailHeaderSkeleton() {
  return (
    <div className="order-1 border-b border-border-l pb-8 lg:col-span-2 dark:border-border-d">
      <div className="mb-4 flex flex-wrap items-center gap-2.5">
        <Skeleton className="h-7 w-20 rounded-md" />
        <Skeleton className="h-7 w-24 rounded-md" />
        <Skeleton className="ml-auto h-4 w-28" />
      </div>

      <Skeleton className="h-9 w-[85%] sm:h-11 lg:h-12" />
      <Skeleton className="mt-2.5 h-9 w-[55%] sm:h-11 lg:h-12" />

      <div className="mt-5 flex items-center gap-1.5">
        <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-52 max-w-full" />
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Skeleton className="h-9 w-56 max-w-full sm:h-10" />
          <Skeleton className="mt-2 h-3.5 w-36" />
        </div>
        <Skeleton className="h-12 w-52 max-w-full rounded-md" />
      </div>
    </div>
  );
}

function CoreFactsSkeleton() {
  return (
    <div className="order-2 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-5">
      {CORE_FACT_SLOTS.map((slot) => (
        <div
          key={slot}
          className="flex items-start gap-2.5"
          style={skeletonDelayStyle(slot)}
        >
          <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded" />
          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="mt-2 h-3 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TextSectionSkeleton({ lines }: { readonly lines: number }) {
  const rows = Array.from({ length: lines }, (_, index) => index);

  return (
    <div>
      <Skeleton className="h-7 w-52 max-w-full sm:h-8" />
      <div className="mt-4 flex flex-col gap-2.5">
        {rows.map((row) => (
          <Skeleton
            key={row}
            className="h-4 w-full last:w-3/5"
            style={skeletonDelayStyle(row)}
          />
        ))}
      </div>
    </div>
  );
}

function InquiryPanelSkeleton() {
  return (
    <div className="border border-border-l bg-bgSecondary-l p-6 shadow-sm dark:border-border-d dark:bg-bgSecondary-d">
      <div className="mb-5 flex items-center gap-3 border-b border-border-l pb-5 dark:border-border-d">
        <Skeleton className="h-13 w-13 shrink-0" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-4 w-40 max-w-full" />
        </div>
      </div>

      <Skeleton className="h-6 w-44" />

      <div className="mt-4 mb-5 flex flex-wrap gap-2">
        {INQUIRY_CHIP_SLOTS.map((slot) => (
          <Skeleton
            key={slot}
            className="h-9 w-28 rounded-full"
            style={skeletonDelayStyle(slot)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
          <Skeleton className="h-14 w-full rounded-md" />
          <Skeleton className="h-14 w-full rounded-md" />
        </div>
        <Skeleton className="h-14 w-full rounded-md" />
        <Skeleton className="h-14 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />

        <div className="flex items-start gap-3">
          <Skeleton className="mt-0.5 h-4 w-4 shrink-0 rounded" />
          <div className="flex-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>
        </div>

        <Skeleton className="h-13 w-full rounded-md" />
      </div>
    </div>
  );
}

function ContactCardSkeleton() {
  return (
    <div className="mt-5 border border-border-l bg-bgSecondary-l p-5 dark:border-border-d dark:bg-bgSecondary-d">
      <div className="flex items-center gap-3.5">
        <Skeleton className="h-11 w-11 shrink-0" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-48 max-w-full" />
          <Skeleton className="mt-2 h-3 w-32" />
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-2">
        {CONTACT_ROW_SLOTS.map((slot) => (
          <div key={slot} className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
            <Skeleton className="h-4 w-40 max-w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PropertyDetailSkeleton() {
  return (
    <SkeletonRegion label={PROPERTY_DETAIL_SKELETON_LABEL}>
      <PageContainer className="pb-28 lg:pb-20">
        <div aria-hidden="true">
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {BREADCRUMB_SLOTS.map((slot) => (
              <Skeleton key={slot} className="h-3.5 w-20" />
            ))}
          </div>

          <GallerySkeleton />

          <div className="mt-8 grid grid-cols-1 items-start gap-8 md:gap-10 lg:grid-cols-[2fr_1fr] lg:gap-14">
            <DetailHeaderSkeleton />

            <CoreFactsSkeleton />

            <div className="order-3 min-w-0 space-y-11 md:order-4 lg:order-3">
              {TEXT_SECTION_SLOTS.map((slot) => (
                <TextSectionSkeleton key={slot} lines={slot === 0 ? 6 : 4} />
              ))}
            </div>

            <div className="order-4 min-w-0 md:order-3 lg:order-4">
              <InquiryPanelSkeleton />
              <ContactCardSkeleton />
            </div>
          </div>
        </div>
      </PageContainer>
    </SkeletonRegion>
  );
}
