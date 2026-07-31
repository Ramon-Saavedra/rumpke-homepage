import Skeleton from "@/components/ui/skeleton/Skeleton";
import { cn } from "@/lib/utils";

interface PropertyListingHeaderSkeletonProps {
  readonly align?: "start" | "center";
  readonly className?: string;
}

export default function PropertyListingHeaderSkeleton({
  align = "start",
  className,
}: PropertyListingHeaderSkeletonProps) {
  const isCentered = align === "center";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col",
        isCentered ? "items-center" : "items-start",
        className,
      )}
    >
      <Skeleton className="h-8 w-64 max-w-full sm:h-9" />
      <Skeleton className="mt-4 h-4 w-72 max-w-full sm:h-5" />
    </div>
  );
}
