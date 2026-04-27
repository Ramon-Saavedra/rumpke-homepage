import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatMattersCardProps = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly ctaLabel: string;
  readonly Icon: LucideIcon;
  readonly className?: string;
  readonly style?: CSSProperties;
};

export default function WhatMattersCard({
  number,
  title,
  description,
  href,
  ctaLabel,
  Icon,
  className,
  style,
}: WhatMattersCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${title} - ${ctaLabel}`}
      className={cn(
        "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-l dark:focus-visible:ring-offset-bg-d",
        className
      )}
      style={style}
    >
      <article className="flex h-full flex-col border border-border-l bg-bgSecondary-l hover:border-primary dark:border-border-d dark:bg-bgSecondary-d">
        <div className="flex items-start justify-between gap-4 border-b border-border-l px-5 py-5 dark:border-border-d sm:px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/8 text-primary dark:border-primary/35 dark:bg-primary/12">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-xs font-semibold tracking-[0.24em] text-primary">
            {number}
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
          <h3 className="text-xl font-semibold leading-snug text-foreground">
            {title}
          </h3>
          <p className="mt-4 flex-1 text-sm leading-7 text-card-text-l dark:text-card-text-d">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
            <span>{ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}
