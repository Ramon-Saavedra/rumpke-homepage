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
        "rounded-lg border border-border-l bg-bgSecondary-l dark:border-border-d dark:bg-bgSecondary-d",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
