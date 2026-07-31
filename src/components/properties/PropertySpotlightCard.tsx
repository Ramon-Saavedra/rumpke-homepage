import Link from "next/link";
import { MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import type { PropertyCardDto } from "@/types/property-api";
import PropertyFacts from "./PropertyFacts";
import { resolveDisplayPrice } from "@/lib/property-formatters";
import { buildPropertyFacts } from "@/lib/property-display";
import { TRANSACTION_LABELS } from "@/types/property-types";
import { SHOWCASE_CTA_COMPACT_GROUP_CLASS } from "./showcase-cta";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/skeleton/Skeleton";

interface PropertySpotlightCardProps {
  readonly property?: PropertyCardDto;
  readonly className?: string;
  readonly isLoading?: boolean;
}

const SPOTLIGHT_CARD_CLASS =
  "flex flex-col overflow-hidden border border-border-l bg-bgSecondary-l sm:flex-row dark:border-border-d dark:bg-bgSecondary-d";

const SPOTLIGHT_MEDIA_CLASS =
  "relative aspect-4/3 overflow-hidden sm:aspect-5/4 sm:w-[54%] sm:shrink-0 lg:aspect-16/10";

const SPOTLIGHT_BODY_CLASS =
  "flex flex-1 flex-col justify-center gap-1 p-6 sm:p-8 lg:p-10";

function SpotlightSkeleton({ className }: { readonly className?: string }) {
  return (
    <div className={cn("block w-full", className)} aria-hidden="true">
      <div className={SPOTLIGHT_CARD_CLASS}>
        <div className={SPOTLIGHT_MEDIA_CLASS}>
          <Skeleton className="h-full w-full" />
        </div>
        <div className={SPOTLIGHT_BODY_CLASS}>
          <Skeleton className="mb-3 h-5 w-16 rounded-md" />
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="mt-3 h-4 w-2/5" />
          <div className="mt-2 flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="mt-4 h-6 w-1/3" />
          <Skeleton className="mt-6 h-10 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function PropertySpotlightCard({
  property,
  className,
  isLoading = false,
}: PropertySpotlightCardProps) {
  if (isLoading || !property) {
    return <SpotlightSkeleton className={className} />;
  }

  const title = property.title ?? `Immobilie ${property.id}`;
  const location = property.city;
  const price = resolveDisplayPrice(
    property.marketingType,
    property.salePrice,
    property.coldRent,
  );
  const isRent = property.marketingType === "miete";
  const facts = buildPropertyFacts(property);

  const imageAlt = [title, location].filter(Boolean).join(", ");

  return (
    <Link
      href={`/objekt/${encodeURIComponent(property.id)}`}
      className={cn(
        "group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      <article
        className={cn(
          SPOTLIGHT_CARD_CLASS,
          "transition duration-200 group-hover:shadow-lg motion-safe:group-hover:-translate-y-0.5 dark:group-hover:border-card-text-d/30",
        )}
      >
        <div className={SPOTLIGHT_MEDIA_CLASS}>
          <PropertyImage
            images={property.images}
            alt={imageAlt}
            className="h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
            priority
            sizes="(max-width: 640px) 100vw, 54vw"
          />
        </div>

        <div className={SPOTLIGHT_BODY_CLASS}>
          {property.marketingType && (
            <span
              className={cn(
                "mb-3 w-fit rounded-md px-3 py-1 text-[11px] font-semibold text-white",
                isRent ? "bg-rent" : "bg-buy",
              )}
            >
              {isRent ? TRANSACTION_LABELS.miete : TRANSACTION_LABELS.kauf}
            </span>
          )}

          <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <PropertyFacts facts={facts} className="mt-3" />

          {location && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-card-text-l dark:text-card-text-d">
              <MapPin
                className="h-3.5 w-3.5 shrink-0 opacity-70"
                aria-hidden="true"
              />
              <span>{location}</span>
            </div>
          )}

          {price && (
            <span className="mt-4 text-xl font-bold text-primary">{price}</span>
          )}

          <span className={cn("mt-6", SHOWCASE_CTA_COMPACT_GROUP_CLASS)}>
            Objekt ansehen
          </span>
        </div>
      </article>
    </Link>
  );
}
