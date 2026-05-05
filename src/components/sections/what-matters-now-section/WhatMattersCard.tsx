import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatMattersCardProps = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly ctaLabel: string;
  readonly Icon: LucideIcon;
  readonly className?: string;
  readonly style?: CSSProperties;
};

export default function WhatMattersCard({
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
        <div className="border-b border-border-l px-5 py-5 dark:border-border-d sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/40 bg-bgSecondary-l text-primary dark:bg-bgSecondary-d">
            <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
          </div>
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
