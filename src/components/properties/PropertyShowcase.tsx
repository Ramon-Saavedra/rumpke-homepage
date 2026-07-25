import Link from "next/link";
import { ArrowRight, SearchX } from "lucide-react";
import PropertyShowcaseCard from "./PropertyShowcaseCard";
import { selectShowcaseProperties } from "@/lib/property-showcase";
import type { PropertyCardDto } from "@/types/property-api";
import PageContainer from "@/components/layout/page-container/PageContainer";

interface PropertyShowcaseProps {
  readonly properties: readonly PropertyCardDto[];
  /** True when the property service could not be reached. */
  readonly error?: boolean;
}

const CTA_CLASS =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 dark:bg-primary-dark dark:hover:bg-primary";

function ShowcaseEmptyState({ error }: { readonly error: boolean }) {
  const heading = error
    ? "Immobilien derzeit nicht verfügbar"
    : "Aktuell keine passenden Objekte";
  const body = error
    ? "Bitte versuchen Sie es später erneut oder lassen Sie sich persönlich beraten – wir sind gerne für Sie da."
    : "Schauen Sie bald wieder vorbei, oder lassen Sie sich persönlich beraten – wir finden gemeinsam das passende Zuhause.";

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-border-l bg-bgSecondary-l px-8 py-10 text-center dark:border-border-d dark:bg-bgSecondary-d">
      <SearchX
        className="mx-auto mb-3 h-6 w-6 text-card-text-l dark:text-card-text-d"
        aria-hidden="true"
      />
      <h3 className="font-serif text-xl font-semibold text-foreground">
        {heading}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
        {body}
      </p>
      <Link href="/kontakt" className={`mt-5 ${CTA_CLASS}`}>
        Kontakt aufnehmen
      </Link>
    </div>
  );
}

export default function PropertyShowcase({
  properties,
  error = false,
}: PropertyShowcaseProps) {
  const selection = error ? null : selectShowcaseProperties(properties);

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

        {selection ? (
          <>
            <div className="mb-6 flex flex-col gap-6 lg:mb-8 lg:flex-row lg:items-stretch lg:gap-8">
              <PropertyShowcaseCard
                property={selection.featured}
                variant="featured"
                priority
                className="lg:basis-2/3 lg:shrink-0 lg:grow-0"
              />

              {selection.secondary.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex lg:flex-1 lg:flex-col">
                  {selection.secondary.map((property) => (
                    <PropertyShowcaseCard
                      key={property.id}
                      property={property}
                      variant="compact"
                      fill
                    />
                  ))}
                </div>
              )}
            </div>

            {selection.standard.length > 0 && (
              <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:mb-14 lg:gap-8">
                {selection.standard.map((property) => (
                  <PropertyShowcaseCard
                    key={property.id}
                    property={property}
                    variant="standard"
                  />
                ))}
              </div>
            )}

            <div className="border-t border-border-l pt-8 dark:border-border-d">
              <Link href="/objekt" className={`w-full sm:w-auto ${CTA_CLASS}`}>
                Alle Immobilien entdecken
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        ) : (
          <ShowcaseEmptyState error={error} />
        )}
      </PageContainer>
    </section>
  );
}
