"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollVisible } from "@/hooks/useScrollVisible";
import { fadeUp, staggerDelay } from "@/lib/animation";

type Scenario = {
  readonly label: string;
  readonly href: string;
};

const scenarios: readonly Scenario[] = [
  {
    label: "Ich möchte meine Immobilie verkaufen.",
    href: "/dienstleistungen/verkauf-vermietung",
  },
  {
    label: "Ich suche ein neues Zuhause.",
    href: "/kauf",
  },
  {
    label: "Ich habe eine Immobilie geerbt.",
    href: "/kontakt",
  },
  {
    label: "Ich möchte den aktuellen Marktwert erfahren.",
    href: "/dienstleistungen/immobilienbewertung",
  },
] as const;

export default function WhatMattersNowSection() {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      aria-labelledby="what-matters-now-title"
      className="mb-24 py-12"
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 60) }}
      >
        Persönliche Begleitung
      </p>

      <h2
        id="what-matters-now-title"
        className={`mt-4 font-serif text-[clamp(1.625rem,2.8vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground sm:mt-5 ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 120) }}
      >
        Was führt Sie zu uns?
      </h2>

      <p
        className={`mt-4 max-w-[52ch] text-[15px] leading-relaxed text-card-text-l dark:text-card-text-d sm:mt-5 sm:text-base ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 180) }}
      >
        Jeder Weg beginnt mit einem Gespräch. Erzählen Sie uns, wo Sie stehen —
        wir finden gemeinsam den nächsten Schritt.
      </p>

      <div
        aria-hidden="true"
        className={`mt-8 border-t border-border-l dark:border-border-d ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 220) }}
      />

      <nav
        aria-label="Ihre Situation"
        className={`mt-6 flex flex-col sm:mt-8 ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 260) }}
      >
        {scenarios.map((scenario, index) => (
          <Link
            key={scenario.label}
            href={scenario.href}
            className="group flex items-center justify-between border-b border-border-l/60 py-5 transition-colors first:border-t first:border-border-l/60 dark:border-border-d/60 dark:first:border-border-d/60 sm:py-6"
            style={{
              transitionDelay: staggerDelay(visible, 300, 90, index),
            }}
          >
            <span className="text-[15px] leading-snug text-foreground transition-colors group-hover:text-primary sm:text-base">
              {scenario.label}
            </span>
            <ArrowRight
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="ml-4 shrink-0 text-card-text-l opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-primary dark:text-card-text-d"
            />
          </Link>
        ))}
      </nav>

      <div
        className={`mt-8 sm:mt-10 ${fadeUp(visible)}`}
        style={{ transitionDelay: staggerDelay(visible, 480) }}
      >
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2 text-sm font-medium text-card-text-l transition-colors hover:text-primary dark:text-card-text-d dark:hover:text-primary"
        >
          <span>Ein Gespräch in Ruhe beginnen</span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
