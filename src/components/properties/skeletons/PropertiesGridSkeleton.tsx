import PropertyCardSkeleton from "./PropertyCardSkeleton";
import SkeletonRegion from "@/components/ui/skeleton/SkeletonRegion";

export const PROPERTIES_GRID_SKELETON_LABEL = "Immobilien werden geladen";

interface PropertiesGridSkeletonProps {
  readonly count?: number;
  readonly label?: string;
  readonly withRegion?: boolean;
  readonly className?: string;
}

export default function PropertiesGridSkeleton({
  count = 8,
  label = PROPERTIES_GRID_SKELETON_LABEL,
  withRegion = true,
  className,
}: PropertiesGridSkeletonProps) {
  const safeCount = Number.isFinite(count)
    ? Math.min(24, Math.max(0, Math.floor(count)))
    : 0;
  const slots = Array.from({ length: safeCount }, (_, index) => index);

  const content = (
    <ul
      aria-hidden="true"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {slots.map((slot) => (
        <li key={slot} className="flex">
          <PropertyCardSkeleton delayIndex={slot} className="w-full" />
        </li>
      ))}
    </ul>
  );

  return withRegion ? (
    <SkeletonRegion label={label} className={className}>
      {content}
    </SkeletonRegion>
  ) : (
    content
  );
}
