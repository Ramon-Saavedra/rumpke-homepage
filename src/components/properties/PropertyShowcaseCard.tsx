import Link from "next/link";
import { MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import type { PropertyCardDto } from "@/types/property-api";
import { resolveDisplayPrice, formatArea } from "@/lib/property-formatters";
import { TRANSACTION_LABELS } from "@/types/property-types";
import { cn } from "@/lib/utils";

export type PropertyShowcaseVariant = "featured" | "standard" | "compact";

interface PropertyShowcaseCardProps {
  readonly property?: PropertyCardDto;
  readonly variant?: PropertyShowcaseVariant;
  /** Stretch the image to fill remaining height (used for stacked secondary cards on desktop). */
  readonly fill?: boolean;
  /** Prioritise the image for the LCP anchor card. */
  readonly priority?: boolean;
  /** Render the skeleton placeholder in the exact card geometry (no layout shift). */
  readonly isLoading?: boolean;
  readonly className?: string;
}

interface VariantConfig {
  readonly contentPad: string;
  readonly titleTag: "h3" | "h4";
  readonly titleClass: string;
  readonly titleMargin: string;
  readonly metaClass: string;
  readonly footerPad: string;
  readonly priceClass: string;
  readonly metaRightClass: string;
  readonly roomsLabel: string;
  readonly badgeClass: string;
  readonly sizes: string;
}

const VARIANTS: Record<PropertyShowcaseVariant, VariantConfig> = {
  featured: {
    contentPad: "p-7 sm:p-8",
    titleTag: "h3",
    titleClass: "font-serif text-2xl font-semibold leading-tight sm:text-3xl",
    titleMargin: "mb-2.5",
    metaClass: "mb-5 text-sm",
    footerPad: "pt-4",
    priceClass: "text-xl",
    metaRightClass: "text-sm",
    roomsLabel: "Zimmer",
    badgeClass: "px-3.5 py-1.5 text-xs",
    sizes: "(max-width: 1024px) 100vw, 800px",
  },
  standard: {
    contentPad: "p-4 sm:p-5",
    titleTag: "h4",
    titleClass: "font-sans text-base font-bold leading-snug",
    titleMargin: "mb-1.5",
    metaClass: "mb-3 text-[13px]",
    footerPad: "pt-3",
    priceClass: "text-[15px]",
    metaRightClass: "text-xs",
    roomsLabel: "Zimmer",
    badgeClass: "px-2.5 py-1 text-[11px]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px",
  },
  compact: {
    contentPad: "p-4",
    titleTag: "h4",
    titleClass: "font-sans text-[15px] font-bold leading-snug",
    titleMargin: "mb-1.5",
    metaClass: "mb-2.5 text-xs",
    footerPad: "pt-2.5",
    priceClass: "text-[13.5px]",
    metaRightClass: "text-[11.5px]",
    roomsLabel: "Zi.",
    badgeClass: "px-2.5 py-1 text-[11px]",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px",
  },
};

function imageWrapperClass(
  variant: PropertyShowcaseVariant,
  fill: boolean,
): string {
  if (fill) {
    return "relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0";
  }
  if (variant === "featured") {
    return "relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]";
  }
  return "relative overflow-hidden aspect-[4/3]";
}

const CARD_BASE =
  "flex flex-1 flex-col overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l dark:border-border-d dark:bg-bgSecondary-d";

const SKELETON_BLOCK =
  "rounded bg-Bghover-l dark:bg-Bghover-d motion-safe:animate-pulse";

function Skeleton({
  variant,
  fill,
  className,
}: {
  readonly variant: PropertyShowcaseVariant;
  readonly fill: boolean;
  readonly className?: string;
}) {
  const config = VARIANTS[variant];
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg",
        fill && "lg:h-full lg:flex-1 lg:min-h-0",
        className,
      )}
      aria-hidden="true"
    >
      <div className={CARD_BASE}>
        <div
          className={cn(
            imageWrapperClass(variant, fill),
            SKELETON_BLOCK,
            "rounded-none",
          )}
        />
        <div className={cn("flex flex-1 flex-col", config.contentPad)}>
          <div
            className={cn("h-4 w-3/4", config.titleMargin, SKELETON_BLOCK)}
          />
          <div className={cn("mb-4 h-3 w-2/5", SKELETON_BLOCK)} />
          <div
            className={cn(
              "mt-auto flex items-center justify-between border-t border-border-l dark:border-border-d",
              config.footerPad,
            )}
          >
            <div className={cn("h-3.5 w-1/4", SKELETON_BLOCK)} />
            <div className={cn("h-3 w-1/5", SKELETON_BLOCK)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyShowcaseCard({
  property,
  variant = "standard",
  fill = false,
  priority = false,
  isLoading = false,
  className,
}: PropertyShowcaseCardProps) {
  const config = VARIANTS[variant];

  if (isLoading || !property) {
    return <Skeleton variant={variant} fill={fill} className={className} />;
  }

  const title = property.title ?? `Immobilie ${property.id}`;
  const location = property.city;
  const displayType = property.propertySubType ?? property.propertyType;
  const price = resolveDisplayPrice(
    property.marketingType,
    property.salePrice,
    property.coldRent,
  );
  const isRent = property.marketingType === "miete";

  const metaLeft = [displayType, location].filter(Boolean).join(" · ");
  const areaText =
    property.livingArea !== null ? formatArea(property.livingArea) : null;
  const roomsText =
    property.rooms !== null ? `${property.rooms} ${config.roomsLabel}` : null;
  const metaRight = [areaText, roomsText].filter(Boolean).join(" · ");

  const imageAlt = [title, location].filter(Boolean).join(", ");
  const TitleTag = config.titleTag;

  return (
    <Link
      href={`/objekt/${property.id}`}
      className={cn(
        "group flex flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        fill && "lg:h-full lg:flex-1 lg:min-h-0",
        className,
      )}
    >
      <article
        className={cn(
          CARD_BASE,
          "transition duration-200 group-hover:shadow-lg motion-safe:group-hover:-translate-y-0.5 dark:group-hover:border-card-text-d/30",
        )}
      >
        <div className={imageWrapperClass(variant, fill)}>
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            priority={priority}
            sizes={config.sizes}
          />

          {property.marketingType && (
            <span
              className={cn(
                "absolute left-3 top-3 rounded-md font-semibold text-white",
                config.badgeClass,
                isRent ? "bg-rent" : "bg-buy",
              )}
            >
              {isRent ? TRANSACTION_LABELS.miete : TRANSACTION_LABELS.kauf}
            </span>
          )}
        </div>

        <div className={cn("flex flex-1 flex-col", config.contentPad)}>
          <TitleTag
            className={cn(
              config.titleClass,
              config.titleMargin,
              "text-foreground transition-colors group-hover:text-primary",
            )}
          >
            {title}
          </TitleTag>

          {metaLeft && (
            <div
              className={cn(
                "flex items-center gap-1.5 text-card-text-l dark:text-card-text-d",
                config.metaClass,
              )}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{metaLeft}</span>
            </div>
          )}

          <div
            className={cn(
              "mt-auto flex items-center justify-between border-t border-border-l dark:border-border-d",
              config.footerPad,
            )}
          >
            {price && (
              <span className={cn("font-bold text-primary", config.priceClass)}>
                {price}
              </span>
            )}
            {metaRight && (
              <span
                className={cn(
                  "text-card-text-l dark:text-card-text-d",
                  config.metaRightClass,
                )}
              >
                {metaRight}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
