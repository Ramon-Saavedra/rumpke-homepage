import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/section-header/SectionHeader";
import { buttonVariants } from "@/components/ui/button/buttonVariants";
import { cn } from "@/lib/utils";

type Scenario = {
  readonly kicker: string;
  readonly label: string;
  readonly href: string;
};

const scenarios: readonly Scenario[] = [
  {
    kicker: "Verkaufen",
    label: "Ich möchte meine Immobilie verkaufen.",
    href: "/dienstleistungen/verkauf-vermietung",
  },
  {
    kicker: "Kaufen",
    label: "Ich suche ein neues Zuhause.",
    href: "/kauf",
  },
  {
    kicker: "Erbschaft",
    label: "Ich habe eine Immobilie geerbt.",
    href: "/kontakt",
  },
  {
    kicker: "Bewertung",
    label: "Ich möchte den aktuellen Marktwert erfahren.",
    href: "/dienstleistungen/immobilienbewertung",
  },
] as const;

export default function WhatMattersNowSection() {
  return (
    <section
      aria-labelledby="what-matters-now-title"
      className="mb-16 py-10 sm:mb-20 sm:py-12"
    >
      <div className="grid grid-cols-1 items-start gap-10 sm:gap-11 lg:grid-cols-[0.82fr_1fr] lg:gap-16 xl:gap-24">
        <div>
          <SectionHeader
            eyebrow="Persönliche Begleitung"
            titleId="what-matters-now-title"
            title="Was führt Sie zu uns?"
            subtitle="Jeder Weg beginnt mit einem Gespräch. Erzählen Sie uns, wo Sie stehen — wir finden gemeinsam den nächsten Schritt."
            className="mb-6 sm:mb-7"
            eyebrowClassName="mb-3.5 text-[11.5px] tracking-[0.14em] text-primary-dark dark:text-primary sm:mb-4.5 sm:text-[13px] sm:tracking-[0.1em]"
            titleClassName="font-serif text-[clamp(1.875rem,4vw,3rem)] font-semibold leading-[1.12] tracking-tight lg:max-w-[12ch]"
            subtitleClassName="mt-3.5 max-w-[52ch] text-[15px] leading-[1.65] sm:mt-4.5 sm:text-[17px] lg:max-w-[36ch]"
          />

          <Link
            href="/kontakt"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "group w-full sm:w-auto",
            )}
          >
            Ein Gespräch in Ruhe beginnen
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Ihre Situation" className="flex flex-col">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.kicker}
              href={scenario.href}
              className="group relative flex items-center justify-between gap-4 rounded-lg border-t border-border-l px-3 py-5 first:border-t-0 hover:bg-bgSecondary-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-l dark:border-border-d dark:hover:bg-bgSecondary-d dark:focus-visible:ring-offset-bg-d sm:gap-7 sm:px-5 sm:py-6.5"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="flex flex-col gap-1.5">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-primary-dark dark:text-primary sm:text-[11.5px]">
                  {scenario.kicker}
                </span>
                <span className="text-base font-medium leading-snug text-foreground group-hover:text-primary-dark dark:group-hover:text-primary sm:text-lg lg:text-xl">
                  {scenario.label}
                </span>
              </span>
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                className="shrink-0 text-card-text-l group-hover:text-primary dark:text-card-text-d sm:size-5"
              />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
