import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyShowcaseCard from "./PropertyShowcaseCard";
import PageContainer from "@/components/layout/page-container/PageContainer";
import { SHOWCASE_CTA_CLASS } from "./showcase-cta";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

export type ShowcaseSlot = PropertyCardDto | undefined;

export const ROW_GAP = "gap-6 lg:gap-8";

export function emptySlots(count: 2 | 3): readonly ShowcaseSlot[] {
  return Array.from({ length: count }, () => undefined);
}

function slotKey(slot: ShowcaseSlot, index: number): string {
  return slot?.id ?? `slot-${index}`;
}

export function ShowcaseSection({
  withListingCta,
  children,
}: {
  readonly withListingCta: boolean;
  readonly children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="showcase-heading"
      className={cn(
        "mb-16 w-full pt-14 sm:mb-20 lg:pt-20",
        withListingCta ? "pb-4" : "pb-14 lg:pb-20",
      )}
    >
      <PageContainer>
        <div className="mb-8 lg:mb-10">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-primary sm:text-[13px]">
            Ausgewählte Objekte
          </span>
          <h2
            id="showcase-heading"
            className="max-w-[20ch] font-serif text-3xl font-semibold leading-[1.15] text-foreground sm:text-4xl lg:text-[40px]"
          >
            Handverlesene Immobilien in Ihrer Nähe
          </h2>
          <p className="mt-3 max-w-[54ch] text-base leading-relaxed text-card-text-l dark:text-card-text-d">
            Eine persönliche Auswahl aktueller Immobilien – sorgfältig
            ausgewählt für unterschiedliche Lebenspläne.
          </p>
        </div>

        {children}

        {withListingCta && (
          <div className="mt-10 border-t border-border-l pt-8 lg:mt-14 dark:border-border-d">
            <Link
              href="/objekt"
              className={`w-full sm:w-auto ${SHOWCASE_CTA_CLASS}`}
            >
              Alle Immobilien entdecken
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </PageContainer>
    </section>
  );
}

export function AnchorRow({
  featured,
  secondary,
  className,
}: {
  readonly featured: ShowcaseSlot;
  readonly secondary: readonly ShowcaseSlot[];
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col lg:h-150 lg:flex-row lg:items-stretch",
        ROW_GAP,
        className,
      )}
    >
      <PropertyShowcaseCard
        property={featured}
        variant="featured"
        media="fill"
        priority
        className="lg:w-[64%] lg:shrink-0 lg:grow-0 lg:basis-auto"
      />

      {secondary.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-col lg:gap-5">
          {secondary.map((property, index) => (
            <PropertyShowcaseCard
              key={slotKey(property, index)}
              property={property}
              variant="compact"
              media="fill"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PanoramaAnchor({
  featured,
  className,
}: {
  readonly featured: ShowcaseSlot;
  readonly className?: string;
}) {
  return (
    <PropertyShowcaseCard
      property={featured}
      variant="featured"
      media="panorama"
      priority
      className={className}
    />
  );
}

export function StandardRow({
  properties,
  priorityFirst = false,
  className,
}: {
  readonly properties: readonly ShowcaseSlot[];
  readonly priorityFirst?: boolean;
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2",
        properties.length >= 3 && "md:grid-cols-3",
        ROW_GAP,
        className,
      )}
    >
      {properties.map((property, index) => (
        <PropertyShowcaseCard
          key={slotKey(property, index)}
          property={property}
          variant="standard"
          priority={priorityFirst && index === 0}
        />
      ))}
    </div>
  );
}
