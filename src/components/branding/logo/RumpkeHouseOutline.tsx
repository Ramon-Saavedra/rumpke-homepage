import { cn } from "@/lib/utils";

const HOUSE_OUTLINE_PATH =
  "M22 1012V253L460 22l445 231v759H170V505l447-240 433 235v665H170";

const HOUSE_OUTLINE_LENGTH = 6400;

interface RumpkeHouseOutlineProps {
  readonly animated?: boolean;
  readonly className?: string;
}

export default function RumpkeHouseOutline({
  animated = false,
  className,
}: RumpkeHouseOutlineProps) {
  return (
    <svg
      viewBox="0 0 1100 1213"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block", className)}
    >
      <path
        d={HOUSE_OUTLINE_PATH}
        stroke="currentColor"
        strokeWidth={26}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={animated ? HOUSE_OUTLINE_LENGTH : undefined}
        className={animated ? "motion-safe:animate-house-draw" : undefined}
      />
    </svg>
  );
}
