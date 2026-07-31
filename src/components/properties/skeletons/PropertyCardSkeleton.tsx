import Skeleton from "@/components/ui/skeleton/Skeleton";
import { skeletonDelayStyle } from "@/lib/skeleton-classes";
import { cn } from "@/lib/utils";

interface PropertyCardSkeletonProps {
  readonly delayIndex?: number;
  readonly className?: string;
}

export default function PropertyCardSkeleton({
  delayIndex = 0,
  className,
}: PropertyCardSkeletonProps) {
  return (
    <article
      aria-hidden="true"
      style={skeletonDelayStyle(delayIndex)}
      className={cn(
        "flex flex-1 flex-col overflow-hidden rounded border border-border-l bg-bgSecondary-l shadow-md dark:border-border-d dark:bg-bgSecondary-d",
        className,
      )}
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden">
        <Skeleton className="h-full w-full" />
        <Skeleton
          tone="onMedia"
          className="absolute top-3 left-3 h-6 w-20 rounded"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <Skeleton className="h-4 w-[82%]" />
        <Skeleton className="mt-2 h-4 w-[54%]" />

        <div className="mt-3 flex items-center gap-1.5">
          <Skeleton className="h-3 w-3 shrink-0 rounded-full" />
          <Skeleton className="h-2.5 w-24" />
        </div>

        <div className="mt-3.5 flex items-center gap-3.5">
          <Skeleton className="h-2.5 w-12" />
          <Skeleton className="h-2.5 w-14" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border-l pt-3 dark:border-border-d">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
      </div>
    </article>
  );
}
