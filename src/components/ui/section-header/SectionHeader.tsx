import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  subtitle,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={cn(alignClass, "mb-10", className)}>
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block",
            eyebrowClassName,
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className={cn(
          "text-3xl sm:text-4xl font-bold leading-tight text-foreground",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-card-text-l dark:text-card-text-d max-w-xl",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
