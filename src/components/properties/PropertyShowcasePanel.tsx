import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import PropertyTransactionBadge from "./PropertyTransactionBadge";
import {
  resolvePropertyCardData,
  resolveShowcaseSpecRows,
} from "@/lib/property-display";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

export type PropertyShowcasePanelLayout = "stretch" | "rail";

interface PropertyShowcasePanelProps {
  readonly property: PropertyCardDto;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly layout: PropertyShowcasePanelLayout;
  readonly priority?: boolean;
}

export default function PropertyShowcasePanel({
  property,
  isFirst,
  isLast,
  layout,
  priority = false,
}: PropertyShowcasePanelProps) {
  const { title, location, price, isRent, detailUrl, imageAlt } =
    resolvePropertyCardData(property);
  const specs = resolveShowcaseSpecRows(property);
  const aria = [title, location, price].filter(Boolean).join(", ");

  return (
    <article
      className={cn(
        layout === "rail" ? "w-[min(78vw,320px)] shrink-0 sm:w-auto" : "w-full",
        layout === "rail" && "snap-start",
        layout === "rail" &&
          !isFirst &&
          "border-l border-border-l pl-2.5 sm:pl-[18px] lg:pl-6 dark:border-border-d",
        layout === "rail" && !isLast && "pr-2.5 sm:pr-[18px] lg:pr-6",
        layout === "stretch" &&
          !isFirst &&
          "border-t border-border-l pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-[18px] lg:pl-6 dark:border-border-d",
        layout === "stretch" && !isLast && "sm:pr-[18px] lg:pr-6",
      )}
    >
      <Link
        href={detailUrl}
        aria-label={aria}
        className={cn(
          "group flex flex-col gap-3.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary sm:grid sm:items-stretch sm:gap-[18px] lg:gap-7",
          layout === "stretch"
            ? "sm:grid-cols-[176px_minmax(0,1fr)] lg:grid-cols-[244px_minmax(0,1fr)]"
            : "sm:grid-cols-[176px_minmax(0,180px)] lg:grid-cols-[244px_minmax(0,252px)]",
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-bgSecondary-l sm:aspect-auto sm:h-[204px] sm:w-[176px] lg:h-[282px] lg:w-[244px] dark:bg-bgSecondary-d">
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            priority={priority}
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 176px, 244px"
            className="h-full w-full"
          />
          {property.marketingType && (
            <PropertyTransactionBadge
              isRent={isRent}
              className="absolute left-2.5 top-2.5 px-2.5 py-1 text-[11px]"
            />
          )}
        </div>

        <div className="flex min-h-0 flex-col justify-between gap-3 sm:min-h-[204px] lg:min-h-[282px]">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-serif text-[19px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primary sm:text-[18.5px] lg:text-xl">
              {title}
            </h3>
            {location && (
              <div className="flex items-center gap-1.5 text-[13.5px] text-card-text-l dark:text-card-text-d">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 opacity-70"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col border-t border-border-l dark:border-border-d">
            {specs.map((spec) => (
              <div
                key={spec.key}
                className="flex items-baseline justify-between gap-3 border-b border-border-l py-1.5 text-[13px] dark:border-border-d"
              >
                <span className="text-card-text-l dark:text-card-text-d">
                  {spec.key}
                </span>
                <span className="text-right text-foreground">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
            {price && (
              <span className="text-lg font-semibold whitespace-nowrap text-primary">
                {price}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium whitespace-nowrap text-card-text-l underline-offset-4 transition-colors group-hover:text-primary group-hover:underline dark:text-card-text-d">
              Ansehen
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
