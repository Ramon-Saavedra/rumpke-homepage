import { ShowcaseSection } from "./showcase-layout";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { cn } from "@/lib/utils";

const PLACEHOLDER_PANELS = 3;

function PanelSkeleton({ isFirst }: { readonly isFirst: boolean }) {
  return (
    <div
      className={cn(
        "flex w-[min(78vw,320px)] shrink-0 flex-col gap-3.5 sm:w-auto sm:grid-cols-[176px_minmax(0,180px)] sm:gap-[18px] lg:grid-cols-[244px_minmax(0,252px)] lg:gap-7 sm:grid",
        !isFirst &&
          "border-l border-border-l pl-2.5 sm:pl-[18px] lg:pl-6 dark:border-border-d",
      )}
    >
      <Skeleton className="aspect-[4/3] w-full rounded sm:aspect-auto sm:h-[204px] sm:w-[176px] lg:h-[282px] lg:w-[244px]" />
      <div className="flex flex-col justify-between gap-3 sm:min-h-[204px] lg:min-h-[282px]">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-[85%]" />
          <Skeleton className="h-3.5 w-2/5" />
        </div>
        <div className="flex flex-col gap-2 border-t border-border-l pt-2 dark:border-border-d">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export default function PropertyShowcaseSkeleton() {
  return (
    <ShowcaseSection withListingCta>
      <div
        className="flex items-start overflow-hidden pb-1"
        aria-hidden="true"
      >
        {Array.from({ length: PLACEHOLDER_PANELS }, (_, index) => (
          <PanelSkeleton key={index} isFirst={index === 0} />
        ))}
      </div>
    </ShowcaseSection>
  );
}
