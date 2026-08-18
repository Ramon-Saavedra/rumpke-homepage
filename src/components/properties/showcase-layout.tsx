import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/page-container/PageContainer";
import { SHOWCASE_CTA_CLASS } from "./showcase-cta";
import { cn } from "@/lib/utils";

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
