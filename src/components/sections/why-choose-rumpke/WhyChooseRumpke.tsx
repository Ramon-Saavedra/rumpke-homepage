"use client";

import { UserCheck, MapPin, Shield, type LucideIcon } from "lucide-react";
import { useScrollVisible } from "@/hooks/useScrollVisible";
import { fadeUp } from "@/lib/animation";

type Feature = {
  readonly number: string;
  readonly Icon: LucideIcon;
  readonly title: string;
  readonly description: string;
};

type Stat = {
  readonly value: string;
  readonly label: string;
};

const features: readonly Feature[] = [
  {
    number: "01",
    Icon: UserCheck,
    title: "Persönlicher Service",
    description:
      "Bei Rumpke Immobilien stehen Sie im Mittelpunkt. Individuelle Beratung und persönliche Begleitung in jedem Schritt Ihres Immobilienprojekts.",
  },
  {
    number: "02",
    Icon: MapPin,
    title: "Lokale Expertise",
    description:
      "Tiefes Verständnis für den regionalen Immobilienmarkt. Wir kennen die Besonderheiten der Region, die Entwicklungen und die Menschen.",
  },
  {
    number: "03",
    Icon: Shield,
    title: "Transparenz & Fairness",
    description:
      "Vertrauen ist die Basis unserer Arbeit. Klare Kommunikation, faire Konditionen und absolute Verlässlichkeit – von Anfang bis Ende.",
  },
];

const stats: readonly Stat[] = [
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "200+", label: "Objekte vermittelt" },
  { value: "100%", label: "Persönliche Betreuung" },
];

const WhyChooseRumpke = () => {
  const { ref, visible } = useScrollVisible<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      aria-label="Warum Rumpke Immobilien"
      className="w-full mb-18 px-2"
    >
      <div className="mx-auto">

        {/* Header */}
        <div className={`mb-6 duration-1000${fadeUp(visible)}`}>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">
            Unsere Stärken
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-4">
            Warum Rumpke Immobilien?
          </h2>
          <p className="text-base text-card-text-l dark:text-card-text-d max-w-xl leading-relaxed">
            Wir verbinden persönliche Nähe mit regionalem Fachwissen – für ein Immobilienerlebnis, das Sie überzeugt.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {features.map((feature, i) => (
            <div
              key={feature.number}
              className={`py-10 duration-700 ${i === 0
                  ? "md:pr-10"
                  : "md:px-10 border-t md:border-t-0 md:border-l border-border-l dark:border-border-d"
                } ${fadeUp(visible)}`}
              style={{ transitionDelay: visible ? `${200 + i * 150}ms` : "0ms" }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>

              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
                {feature.number}
              </p>

              <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 border-t border-border-l dark:border-border-d ${fadeUp(visible)}`}
          style={{ transitionDelay: visible ? "750ms" : "0ms" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 px-2 text-center md:text-left ${i === 0 ? "md:px-0 md:pr-10" : "md:px-10 border-l border-border-l dark:border-border-d"
                }`}
            >
              <span className="block text-3xl sm:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-card-text-l dark:text-card-text-d">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseRumpke;
