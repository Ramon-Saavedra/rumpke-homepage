import type { ReactNode } from "react";

interface SkeletonRegionProps {
  readonly label: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export default function SkeletonRegion({
  label,
  children,
  className,
}: SkeletonRegionProps) {
  return (
    <div
      aria-busy="true"
      aria-label={label}
      role="region"
      className={className}
    >
      <span role="status" aria-live="polite" className="sr-only">
        {label}
      </span>
      {children}
    </div>
  );
}
