import type { CSSProperties } from "react";
import {
  SKELETON_BLOCK,
  SKELETON_BLOCK_ON_MEDIA,
} from "@/lib/skeleton-classes";
import { cn } from "@/lib/utils";

export type SkeletonTone = "default" | "onMedia";

interface SkeletonProps {
  readonly tone?: SkeletonTone;
  readonly className?: string;
  readonly style?: CSSProperties;
}

const TONE_CLASS: Record<SkeletonTone, string> = {
  default: SKELETON_BLOCK,
  onMedia: SKELETON_BLOCK_ON_MEDIA,
};

export default function Skeleton({
  tone = "default",
  className,
  style,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(TONE_CLASS[tone], className)}
      style={style}
    />
  );
}
