import type { CSSProperties } from "react";

const SKELETON_MOTION =
  "motion-safe:animate-pulse motion-safe:[animation-delay:var(--skeleton-delay,0ms)]";

export const SKELETON_BLOCK = `bg-Bghover-l dark:bg-Bghover-d ${SKELETON_MOTION}`;

export const SKELETON_BLOCK_ON_MEDIA = `bg-bgSecondary-l/75 dark:bg-bgSecondary-d/75 ${SKELETON_MOTION}`;

const SKELETON_STAGGER_STEP_MS = 150;

const SKELETON_STAGGER_CYCLE = 4;

type SkeletonDelayStyle = CSSProperties & {
  "--skeleton-delay": string;
};

export function skeletonDelayStyle(index: number): SkeletonDelayStyle {
  const delay = (index % SKELETON_STAGGER_CYCLE) * SKELETON_STAGGER_STEP_MS;
  return { "--skeleton-delay": `${delay}ms` };
}
