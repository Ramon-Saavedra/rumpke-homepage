import Link from "next/link";
import { MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import type { PropertyCardDto } from "@/types/property-api";
import PropertyFacts from "./PropertyFacts";
import type { PropertyFactsSize } from "./PropertyFacts";
import PropertyTransactionBadge from "./PropertyTransactionBadge";
import { resolvePropertyCardData } from "@/lib/property-display";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/skeleton/Skeleton";

export type PropertyShowcaseVariant = "featured" | "standard" | "compact";

export type PropertyShowcaseMedia = "aspect" | "fill" | "panorama";

interface PropertyShowcaseCardProps {
  readonly property?: PropertyCardDto;
  readonly variant?: PropertyShowcaseVariant;
  readonly media?: PropertyShowcaseMedia;
  readonly priority?: boolean;
  readonly isLoading?: boolean;
  readonly className?: string;
}

interface VariantConfig {
  readonly contentPad: string;
  readonly titleTag: "h3" | "h4";
  readonly titleClass: string;
  readonly titleMargin: string;
  readonly metaClass: string;
  readonly metaIconClass: string;
  readonly hasFooterRule: boolean;
  readonly footerPad: string;
  readonly priceClass: string;
  readonly factsSize: PropertyFactsSize;
  readonly factsMargin: string;
  readonly badgeClass: string;
  readonly badgeOffset: string;
  readonly aspectClass: string;
  readonly sizes: string;
}

const VARIANTS: Record<PropertyShowcaseVariant, VariantConfig> = {
  featured: {
    contentPad: "px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5",
    titleTag: "h3",
    titleClass:
      "font-serif text-[21px] font-semibold leading-tight sm:text-2xl",
    titleMargin: "mb-2",
    metaClass: "mb-3.5 text-sm sm:mb-4",
    metaIconClass: "h-3.5 w-3.5",
    hasFooterRule: true,
    footerPad: "pt-3.5 sm:pt-4",
    priceClass: "text-[17px] sm:text-xl",
    factsSize: "sm",
    factsMargin: "mb-2.5",
    badgeClass: "px-3.5 py-1.5 text-xs",
    badgeOffset: "left-4 top-4",
    aspectClass: "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2]",
    sizes: "(max-width: 1024px) 100vw, 780px",
  },
  standard: {
    contentPad: "px-4 pb-4 pt-3.5 sm:px-[18px] sm:pb-[18px] sm:pt-4",
    titleTag: "h4",
    titleClass: "font-serif text-base font-bold leading-snug",
    titleMargin: "mb-1.5",
    metaClass: "mb-3 text-[13px]",
    metaIconClass: "h-3.5 w-3.5",
    hasFooterRule: true,
    footerPad: "pt-3",
    priceClass: "text-[15px]",
    factsSize: "sm",
    factsMargin: "mb-2",
    badgeClass: "px-2.5 py-1 text-[11px]",
    badgeOffset: "left-3 top-3",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  compact: {
    contentPad: "px-3.5 pb-3 pt-2.5",
    titleTag: "h4",
    titleClass: "font-serif text-sm font-bold leading-snug line-clamp-1",
    titleMargin: "mb-0.5",
    metaClass: "mb-1.5 text-xs",
    metaIconClass: "h-3 w-3",
    hasFooterRule: false,
    footerPad: "pt-2",
    priceClass: "text-[13px]",
    factsSize: "xs",
    factsMargin: "mb-1",
    badgeClass: "px-2.5 py-1 text-[11px]",
    badgeOffset: "left-2.5 top-2.5",
    aspectClass: "aspect-[4/3]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
};

const PANORAMA_ASPECT = "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]";

function imageWrapperClass(
  variant: PropertyShowcaseVariant,
  media: PropertyShowcaseMedia,
): string {
  const base = "relative overflow-hidden";

  if (media === "fill") {
    return cn(
      base,
      VARIANTS[variant].aspectClass,
      "lg:aspect-auto lg:min-h-0 lg:flex-1",
    );
  }
  if (media === "panorama") {
    return cn(base, PANORAMA_ASPECT);
  }
  return cn(base, VARIANTS[variant].aspectClass);
}

const CARD_BASE =
  "flex flex-1 flex-col overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l dark:border-border-d dark:bg-bgSecondary-d";

function ShowcaseCardSkeleton({
  variant,
  media,
  className,
}: {
  readonly variant: PropertyShowcaseVariant;
  readonly media: PropertyShowcaseMedia;
  readonly className?: string;
}) {
  const config = VARIANTS[variant];
  return (
    <div
      className={cn(
        "flex flex-col",
        media === "fill" && "lg:h-full lg:min-h-0 lg:flex-1",
        className,
      )}
      aria-hidden="true"
    >
      <div className={CARD_BASE}>
        <div className={imageWrapperClass(variant, media)}>
          <Skeleton className="h-full w-full" />
          <Skeleton
            tone="onMedia"
            className={cn("absolute h-6 w-20 rounded-md", config.badgeOffset)}
          />
        </div>
        <div className={cn("flex flex-1 flex-col", config.contentPad)}>
          <Skeleton className={cn("h-4 w-[82%]", config.titleMargin)} />
          <Skeleton className={cn("h-3 w-[54%]", config.factsMargin)} />

          <div className={cn("flex items-center gap-1.5", config.metaClass)}>
            <Skeleton
              className={cn("shrink-0 rounded-full", config.metaIconClass)}
            />
            <Skeleton className="h-2.5 w-2/5" />
          </div>

          {config.hasFooterRule ? (
            <div
              className={cn(
                "mt-auto flex items-center justify-between border-t border-border-l dark:border-border-d",
                config.footerPad,
              )}
            >
              <Skeleton className="h-3.5 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
            </div>
          ) : (
            <Skeleton className="mt-auto h-3.5 w-1/4" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PropertyShowcaseCard({
  property,
  variant = "standard",
  media = "aspect",
  priority = false,
  isLoading = false,
  className,
}: PropertyShowcaseCardProps) {
  const config = VARIANTS[variant];

  if (isLoading || !property) {
    return (
      <ShowcaseCardSkeleton
        variant={variant}
        media={media}
        className={className}
      />
    );
  }

  const { title, location, price, isRent, facts, detailUrl, imageAlt } =
    resolvePropertyCardData(property);

  const TitleTag = config.titleTag;

  return (
    <Link
      href={detailUrl}
      className={cn(
        "group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        media === "fill" && "lg:h-full lg:min-h-0 lg:flex-1",
        className,
      )}
    >
      <article
        className={cn(
          CARD_BASE,
          "transition duration-200 group-hover:shadow-lg motion-safe:group-hover:-translate-y-0.5 dark:group-hover:border-card-text-d/30",
        )}
      >
        <div className={imageWrapperClass(variant, media)}>
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            priority={priority}
            sizes={media === "panorama" ? "100vw" : config.sizes}
          />

          {property.marketingType && (
            <PropertyTransactionBadge
              isRent={isRent}
              className={cn("absolute", config.badgeOffset, config.badgeClass)}
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-1 flex-col",
            media === "fill" && "lg:flex-none",
            config.contentPad,
          )}
        >
          <TitleTag
            className={cn(
              config.titleClass,
              config.titleMargin,
              "text-foreground transition-colors group-hover:text-primary",
            )}
          >
            {title}
          </TitleTag>

          <PropertyFacts
            facts={facts}
            size={config.factsSize}
            className={config.factsMargin}
          />

          {location && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-card-text-l dark:text-card-text-d",
                config.metaClass,
              )}
            >
              <MapPin
                className={cn("shrink-0 opacity-70", config.metaIconClass)}
                aria-hidden="true"
              />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}

          {config.hasFooterRule ? (
            <div
              className={cn(
                "mt-auto flex items-center justify-between border-t border-border-l dark:border-border-d",
                config.footerPad,
              )}
            >
              {price && (
                <span
                  className={cn("font-bold text-primary", config.priceClass)}
                >
                  {price}
                </span>
              )}
            </div>
          ) : (
            price && (
              <span
                className={cn(
                  "mt-auto font-bold text-primary",
                  config.priceClass,
                )}
              >
                {price}
              </span>
            )
          )}
        </div>
      </article>
    </Link>
  );
}
