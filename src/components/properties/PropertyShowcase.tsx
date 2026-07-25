import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PropertyShowcaseCard from "./PropertyShowcaseCard";
import PropertySpotlightCard from "./PropertySpotlightCard";
import PropertyShowcaseEmpty from "./PropertyShowcaseEmpty";
import { selectShowcaseLayout } from "@/lib/property-showcase";
import type { ShowcaseLayout } from "@/lib/property-showcase";
import type { PropertyCardDto } from "@/types/property-api";
import PageContainer from "@/components/layout/page-container/PageContainer";
import { SHOWCASE_CTA_CLASS } from "./showcase-cta";
import { cn } from "@/lib/utils";

interface PropertyShowcaseProps {
  readonly properties: readonly PropertyCardDto[];
  readonly error?: boolean;
}

const ROW_GAP = "gap-6 lg:gap-8";

function AnchorRow({
  featured,
  secondary,
  className,
}: {
  readonly featured: PropertyCardDto;
  readonly secondary: readonly PropertyCardDto[];
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row lg:items-stretch",
        ROW_GAP,
        className,
      )}
    >
      <PropertyShowcaseCard
        property={featured}
        variant="featured"
        priority
        className="lg:w-[61%] lg:shrink-0 lg:grow-0"
      />

      {secondary.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-col lg:gap-5">
          {secondary.map((property) => (
            <PropertyShowcaseCard
              key={property.id}
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

function StandardRow({
  properties,
  className,
}: {
  readonly properties: readonly PropertyCardDto[];
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
      {properties.map((property) => (
        <PropertyShowcaseCard
          key={property.id}
          property={property}
          variant="standard"
        />
      ))}
    </div>
  );
}

function ShowcaseComposition({ layout }: { readonly layout: ShowcaseLayout }) {
  switch (layout.kind) {
    case "empty":
      return <PropertyShowcaseEmpty />;

    case "spotlight":
      return <PropertySpotlightCard property={layout.featured} />;

    case "duo":
      return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2", ROW_GAP)}>
          {layout.standard.map((property, index) => (
            <PropertyShowcaseCard
              key={property.id}
              property={property}
              variant="standard"
              priority={index === 0}
            />
          ))}
        </div>
      );

    case "anchor":
      return (
        <AnchorRow featured={layout.featured} secondary={layout.secondary} />
      );

    case "panorama":
      return (
        <>
          <PropertyShowcaseCard
            property={layout.featured}
            variant="featured"
            media="panorama"
            priority
            className="mb-6 lg:mb-8"
          />
          <StandardRow properties={layout.standard} />
        </>
      );

    case "composition":
      return (
        <>
          <AnchorRow
            featured={layout.featured}
            secondary={layout.secondary}
            className="mb-6 lg:mb-8"
          />
          <StandardRow properties={layout.standard} />
        </>
      );
  }
}

export default function PropertyShowcase({
  properties,
  error = false,
}: PropertyShowcaseProps) {
  const layout = selectShowcaseLayout(error ? [] : properties);
  const showListingCta =
    !error && layout.kind !== "empty" && layout.kind !== "spotlight";

  return (
    <section
      aria-labelledby="showcase-heading"
      className="w-full pt-14 pb-4 lg:pt-20"
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
            Eine kuratierte Auswahl aktueller Angebote – von der Stadtwohnung
            bis zum Landhaus am See.
          </p>
        </div>

        {error ? (
          <PropertyShowcaseEmpty error />
        ) : (
          <ShowcaseComposition layout={layout} />
        )}

        {showListingCta && (
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
