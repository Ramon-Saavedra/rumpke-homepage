import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import PropertyImage from "./PropertyImage";
import PropertyTransactionBadge from "./PropertyTransactionBadge";
import {
  resolvePropertyCardData,
  resolveShowcaseSpecRows,
} from "@/lib/property-display";
import type { ShowcaseSpecRow } from "@/lib/property-display";
import { groupPropertyImages } from "@/lib/property-images";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

export type FeaturedShowcaseProperty = PropertyCardDto & {
  readonly extraSpecs: readonly ShowcaseSpecRow[];
};

interface PropertyShowcaseFeaturedProps {
  readonly property: FeaturedShowcaseProperty;
}

const MAX_THUMBNAILS = 4;

export default function PropertyShowcaseFeatured({
  property,
}: PropertyShowcaseFeaturedProps) {
  const { title, location, price, isRent, detailUrl, imageAlt } =
    resolvePropertyCardData(property);
  const specs = [...resolveShowcaseSpecRows(property), ...property.extraSpecs];
  const aria = [title, location, price].filter(Boolean).join(", ");

  const [main, ...thumbs] = groupPropertyImages(property.images).photos.slice(
    0,
    1 + MAX_THUMBNAILS,
  );

  return (
    <Link
      href={detailUrl}
      aria-label={aria}
      className="group flex flex-col gap-6 rounded outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:flex-row lg:items-start lg:gap-3"
    >
      <div className="flex flex-1 gap-2 sm:gap-3">
        <div className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded bg-bgSecondary-l sm:aspect-auto sm:h-[320px] lg:h-[400px] dark:bg-bgSecondary-d">
          <PropertyImage
            images={main ? [main] : []}
            alt={imageAlt}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 72vw, 58vw"
            className="h-full w-full"
          />
          {property.marketingType && (
            <PropertyTransactionBadge
              isRent={isRent}
              className="absolute left-2.5 top-2.5 px-2.5 py-1 text-[11px]"
            />
          )}
        </div>

        {thumbs.length > 0 && (
          <div className="hidden w-[26%] shrink-0 grid-rows-2 gap-1.5 self-stretch sm:grid lg:w-[36%] lg:grid-cols-2">
            {thumbs.map((thumb, index) => (
              <div
                key={thumb.id}
                className={cn(
                  "relative overflow-hidden rounded bg-bgSecondary-l dark:bg-bgSecondary-d",
                  index >= 2 && "hidden lg:block",
                )}
              >
                <PropertyImage
                  images={[thumb]}
                  alt={`${imageAlt} – Bild ${index + 2}`}
                  sizes="(max-width: 1024px) 13vw, 18vw"
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-4 rounded bg-bgSecondary-l p-5 sm:min-h-[320px] lg:min-h-[400px] lg:w-[320px] lg:shrink-0 lg:p-6 dark:bg-bgSecondary-d">
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary lg:text-[26px]">
            {title}
          </h3>
          {location && (
            <div className="flex items-center gap-1.5 text-sm text-card-text-l dark:text-card-text-d">
              <MapPin
                className="h-4 w-4 shrink-0 opacity-70"
                aria-hidden="true"
              />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 border-t border-border-l lg:grid-cols-2 lg:gap-x-6 dark:border-border-d">
          {specs.map((spec) => (
            <div
              key={spec.key}
              className="flex items-baseline justify-between gap-3 border-b border-border-l py-2 text-sm dark:border-border-d"
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
            <span className="text-xl font-semibold whitespace-nowrap text-primary">
              {price}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap text-card-text-l underline-offset-4 transition-colors group-hover:text-primary group-hover:underline dark:text-card-text-d">
            Ansehen
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
