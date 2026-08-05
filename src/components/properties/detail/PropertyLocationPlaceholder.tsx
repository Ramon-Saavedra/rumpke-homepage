import { MapPin } from "lucide-react";

interface PropertyLocationPlaceholderProps {
  readonly isExact: boolean;
}

const GRID_BACKGROUND =
  "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 64px), repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 64px)";

export default function PropertyLocationPlaceholder({
  isExact,
}: PropertyLocationPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label="Kartenvorschau"
      className="relative h-60 w-full overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l lg:h-72 dark:border-border-d dark:bg-bgSecondary-d"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 text-border-l opacity-70 dark:text-border-d"
        style={{ backgroundImage: GRID_BACKGROUND }}
      />

      {isExact ? (
        <MapPin
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-full fill-primary text-bgSecondary-l dark:text-bgSecondary-d"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-30 w-30 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary bg-primary/10"
        />
      )}
    </div>
  );
}
