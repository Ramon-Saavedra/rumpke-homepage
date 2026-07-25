"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollVisible } from "@/hooks/useScrollVisible";
import { fadeUp, staggerDelay } from "@/lib/animation";
import SectionHeader from "@/components/ui/section-header/SectionHeader";
import { SKELETON_BLOCK } from "@/lib/skeleton-classes";

type GuidanceStep = {
  readonly title: string;
  readonly description: string;
};

const steps: readonly GuidanceStep[] = [
  {
    title: "Verstehen",
    description:
      "Wir nehmen uns Zeit, Ihre Situation wirklich zu verstehen – ohne Eile, ohne Standardfragen.",
  },
  {
    title: "Einordnen",
    description:
      "Aus vielen offenen Fragen wird eine klare Übersicht: was jetzt wichtig ist, und was warten kann.",
  },
  {
    title: "Begleiten",
    description:
      "Ein fester Ansprechpartner bleibt an Ihrer Seite – von der ersten Frage bis zur Entscheidung.",
  },
] as const;

export default function WhatMattersNowSection() {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold: 0.12 });
  const [portraitLoading, setPortraitLoading] = useState(true);
  const [portraitError, setPortraitError] = useState(false);

  return (
    <section
      ref={ref}
      aria-labelledby="what-matters-now-title"
      className="mb-24 overflow-hidden border border-border-l bg-bgSecondary-l px-5 py-6 dark:border-border-d dark:bg-bgSecondary-d sm:px-8 sm:py-8 lg:px-10 lg:py-10"
    >
      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.68fr] lg:items-stretch lg:gap-10">
        <div className="order-2 md:order-1">
          <SectionHeader
            eyebrow="Persönliche Begleitung"
            titleId="what-matters-now-title"
            title={
              <>
                <span className="block text-[clamp(1.625rem,2.8vw,2.25rem)] font-normal">
                  Sie müssen den nächsten Schritt
                </span>
                <span className="block text-[clamp(1.875rem,3.2vw,2.625rem)] font-extrabold">
                  nicht allein gehen.
                </span>
              </>
            }
            subtitle="Bevor es um Zahlen, Termine oder Entscheidungen geht, hören wir zu. Damit Sie wissen, woran Sie sind – und wer an Ihrer Seite steht."
            className={`mb-6 duration-700 sm:mb-8 ${fadeUp(visible)}`}
            eyebrowClassName="mb-3 font-heading tracking-[0.16em] sm:mb-4"
            titleClassName="font-heading leading-[1.1] tracking-[-0.01em]"
            subtitleClassName="mt-3 max-w-[46ch] leading-[1.6]"
          />

          <div
            aria-hidden="true"
            className={`mb-5 h-px bg-border-l duration-700 dark:bg-border-d sm:mb-6 ${fadeUp(visible)}`}
            style={{ transitionDelay: staggerDelay(visible, 180) }}
          />

          <ul className="flex flex-col gap-5 lg:flex-row lg:gap-0">
            {steps.map((item, index) => (
              <li
                key={item.title}
                className={`flex-1 border-t border-border-l pt-5 duration-700 dark:border-border-d lg:border-t-0 lg:border-l lg:px-6 lg:pt-0 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0 ${fadeUp(visible)}`}
                style={{
                  transitionDelay: staggerDelay(visible, 240, 80, index),
                }}
              >
                <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-normal text-card-text-l dark:text-card-text-d">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          <div
            className={`mt-7 flex flex-col items-start gap-3 duration-700 sm:mt-8 ${fadeUp(visible)}`}
            style={{ transitionDelay: staggerDelay(visible, 420) }}
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-heading text-sm font-semibold text-primary transition-colors duration-200 hover:bg-Bghover-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-l dark:hover:bg-Bghover-d dark:focus-visible:ring-offset-bg-d"
            >
              Ein Gespräch in Ruhe beginnen
              <span aria-hidden="true">→</span>
            </Link>
            <span className="text-xs text-card-text-l dark:text-card-text-d">
              Unverbindlich und persönlich – auch bei Ihnen vor Ort möglich.
            </span>
          </div>
        </div>

        <div
          className={`order-1 flex flex-col duration-700 md:order-2 ${fadeUp(visible)}`}
          style={{ transitionDelay: staggerDelay(visible, 140) }}
        >
          <div
            className="relative aspect-square w-full overflow-hidden shadow-lg sm:aspect-3/2 lg:aspect-auto lg:min-h-0 lg:flex-1"
            aria-busy={portraitLoading && !portraitError}
          >
            {portraitLoading && !portraitError && (
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-10 ${SKELETON_BLOCK}`}
              />
            )}
            {!portraitError ? (
              <Image
                src="/imgs/personal-service-pic.jpeg"
                alt="Ann-Christin Rumpke im persönlichen Beratungsgespräch"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 30vw"
                loading="lazy"
                onLoad={() => setPortraitLoading(false)}
                onError={() => {
                  setPortraitLoading(false);
                  setPortraitError(true);
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-bgSecondary-l text-sm text-card-text-l dark:bg-bgSecondary-d dark:text-card-text-d">
                Bild nicht verfügbar
              </div>
            )}
          </div>
          <p className="mt-3 font-heading text-xs tracking-wider text-card-text-l dark:text-card-text-d">
            Ann-Christin Rumpke — Ihre persönliche Ansprechpartnerin
          </p>
        </div>
      </div>
    </section>
  );
}
