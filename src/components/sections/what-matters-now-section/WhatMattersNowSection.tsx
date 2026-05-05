"use client";

import {
  Compass,
  MessageCircleHeart,
  type LucideIcon,
} from "lucide-react";
import { useScrollVisible } from "@/hooks/useScrollVisible";
import { fadeUp } from "@/lib/animation";
import WhatMattersCard from "./WhatMattersCard";

type WhatMattersItem = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly ctaLabel: string;
  readonly Icon: LucideIcon;
};

type WhatMattersPillar = {
  readonly title: string;
  readonly description: string;
};

const items: readonly WhatMattersItem[] = [
  {
    title: "Klarheit vor dem nächsten Schritt",
    description:
      "Ob Verkauf, Kauf oder Bewertung - wir helfen Ihnen, Möglichkeiten realistisch einzuordnen und den nächsten Schritt mit einem sicheren Gefühl zu gehen.",
    href: "/kontakt",
    ctaLabel: "Gespräch anfragen",
    Icon: Compass,
  },
  {
    title: "Persönliche Begleitung statt Standardprozess",
    description:
      "Bei uns haben Sie feste Ansprechpartner, ehrliche Kommunikation und einen Ablauf, der sich an Ihrer Situation orientiert - nicht an einem starren Schema.",
    href: "/ueber-uns",
    ctaLabel: "Über Rumpke Immobilien",
    Icon: MessageCircleHeart,
  },
] as const;

const pillars: readonly WhatMattersPillar[] = [
  {
    title: "Orientierung",
    description:
      "Damit Entscheidungen fundiert, ruhig und nachvollziehbar bleiben.",
  },
  {
    title: "Begleitung",
    description:
      "Mit echter Erreichbarkeit und einem klaren, persönlichen Ablauf.",
  },
] as const;

export default function WhatMattersNowSection() {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      aria-labelledby="what-matters-now-title"
      className="relative mb-12 overflow-hidden border border-border-l dark:border-border-d "
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 "
      />

      <div className="relative grid gap-8 px-5 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10 lg:px-8 lg:py-12">
        <div
          className={`flex flex-col justify-between border-b border-border-l pb-8 duration-700 dark:border-border-d lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10 ${fadeUp(visible)}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Mehr als nur 4 Wände
            </p>
            <h2
              id="what-matters-now-title"
              className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Was Ihnen jetzt wichtig ist
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-card-text-l dark:text-card-text-d">
              Rund um Immobilien geht es selten nur um Zahlen. Oft geht es um
              Klarheit, Vertrauen und das gute Gefühl, die richtige Entscheidung
              zu treffen.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`border border-border-l bg-bg-l px-4 py-4 duration-700 dark:border-border-d dark:bg-bg-d ${fadeUp(visible)}`}
                style={{ transitionDelay: visible ? `${150 + index * 120}ms` : "0ms" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] ">
                  {pillar.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-card-text-l dark:text-card-text-d">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {items.map((item, index) => (
            <WhatMattersCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              ctaLabel={item.ctaLabel}
              Icon={item.Icon}
              className={`duration-700 ${fadeUp(visible)}`}
              style={{ transitionDelay: visible ? `${260 + index * 140}ms` : "0ms" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
