import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentPanelProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "section";
}

export default function ContentPanel({
  children,
  className,
  as: Tag = "div",
}: ContentPanelProps) {
  return (
    <Tag
      className={cn(
        "bg-bgSecondary-l dark:bg-bgSecondary-d border border-border-l dark:border-border-d",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
