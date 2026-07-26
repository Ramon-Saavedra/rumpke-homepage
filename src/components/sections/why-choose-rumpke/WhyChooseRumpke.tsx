"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollVisible } from "@/hooks/useScrollVisible";
import { fadeUp, staggerDelay } from "@/lib/animation";
import SectionHeader from "@/components/ui/section-header/SectionHeader";
import PortraitImage from "@/components/ui/portrait-image/PortraitImage";

type Pillar = {
  readonly title: string;
  readonly description: string;
};

const pillars: readonly Pillar[] = [
  {
    title: "Persönlicher Service",
    description:
      "Sie stehen im Mittelpunkt unserer Arbeit. Ein fester Ansprechpartner begleitet Sie persönlich durch jeden Schritt Ihres Immobilienprojekts — aufmerksam, verlässlich und ganz auf Ihre Wünsche eingestellt.",
  },
  {
    title: "Lokale Expertise",
    description:
      "Wir kennen diese Region — ihre Straßen, ihre Entwicklungen, ihre Menschen. Dieses gewachsene Wissen und unser Netzwerk vor Ort werden zum Vorteil für Ihr Projekt.",
  },
  {
    title: "Transparenz und Vertrauen",
    description:
      "Klare Kommunikation, faire Konditionen, keine versteckten Kosten. Bei uns wissen Sie von Anfang bis Ende, woran Sie sind.",
  },
] as const;

export default function WhyChooseRumpke() {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      aria-labelledby="why-choose-rumpke-title"
      className="mb-24 pt-6 pb-12 sm:py-12"
    >
      <div className="flex flex-wrap items-start gap-8 sm:gap-10 lg:gap-14 xl:gap-20">
        <div
          className={`w-full flex-[1_1_300px] duration-700 sm:max-w-72 lg:max-w-90 ${fadeUp(visible)}`}
          style={{ transitionDelay: staggerDelay(visible, 60) }}
        >
          <PortraitImage
            src="/imgs/Rumke_Immobilien-059.jpg"
            alt="Ann-Christin Rumpke, persönliche Ansprechpartnerin bei Rumpke Immobilien"
            caption="Ann-Christin Rumpke — Ihre Ansprechpartnerin"
            aspectRatio="aspect-[4/3] sm:aspect-4/5"
            imageClassName="motion-safe:animate-kenburns"
            objectPosition="object-[50%_20%] sm:object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 288px, 360px"
          />
        </div>

        <div className="min-w-65 flex-[2_1_340px]">
          <div
            className={`duration-700 ${fadeUp(visible)}`}
            style={{ transitionDelay: staggerDelay(visible, 140) }}
          >
            <SectionHeader
              eyebrow="— Warum Rumpke Immobilien —"
              titleId="why-choose-rumpke-title"
              title="Vertrauen beginnt mit einem Menschen — nicht mit einem Unternehmen."
              className="mb-6 sm:mb-8 lg:mb-10"
              eyebrowClassName="mb-3 font-normal tracking-[0.16em] text-card-text-l dark:text-card-text-d sm:mb-4"
              titleClassName="max-w-160 font-serif text-[clamp(1.75rem,3.6vw,2.875rem)] font-medium leading-[1.3]"
            />
          </div>

          <ul>
            {pillars.map((pillar, index) => (
              <li
                key={pillar.title}
                className={`flex flex-wrap gap-x-8 gap-y-1 border-t border-border-l pt-5 pb-5 duration-700 first:border-t-0 first:pt-0 dark:border-border-d ${fadeUp(visible)}`}
                style={{
                  transitionDelay: staggerDelay(visible, 220, 80, index),
                }}
              >
                <h3 className="w-full shrink-0 font-serif text-[22px] font-semibold text-foreground sm:w-50">
                  {pillar.title}
                </h3>
                <p className="min-w-70 flex-1 text-[15.5px] leading-[1.75] text-card-text-l dark:text-card-text-d">
                  {pillar.description}
                </p>
              </li>
            ))}
          </ul>

          <Link
            href="/ueber-uns"
            className={`group mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-primary duration-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-l dark:focus-visible:ring-offset-bg-d sm:mt-8 ${fadeUp(visible)}`}
            style={{ transitionDelay: staggerDelay(visible, 460) }}
          >
            Mehr erfahren
            <ArrowRight
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
