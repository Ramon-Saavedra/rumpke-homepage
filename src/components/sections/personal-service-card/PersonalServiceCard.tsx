
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HeartHandshake, MapPinned, BadgeCheck, type LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/section-header/SectionHeader";

type Feature = {
  readonly Icon: LucideIcon;
  readonly title: string;
  readonly description: string;
};

const features: readonly Feature[] = [
  {
    Icon: HeartHandshake,
    title: "Persönlicher Service",
    description:
      "Ich nehme mir Zeit für Sie und Ihre individuellen Wünsche. Jeder Kunde wird von einem festen Ansprechpartner betreut, der ihn während des gesamten Prozesses begleitet.",
  },
  {
    Icon: MapPinned,
    title: "Lokale Expertise",
    description:
      "Als erfahrene Immobilienmaklerin kenne ich den regionalen Markt und seine Besonderheiten. Nutzen Sie unser Netzwerk und unser Know-how zu Ihrem Vorteil.",
  },
  {
    Icon: BadgeCheck,
    title: "Transparenz und Vertrauen",
    description:
      "Bei uns gibt es keine versteckten Kosten. Wir legen Wert auf eine offene Kommunikation und faire Konditionen.",
  },
];

const PersonalServiceCard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Personal Service"
      className="w-full px-4 sm:px-6 py-12 mb-24"
    >
      <div className="mx-auto grid lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-x-10 items-center">

        {/* ── Left: content ── */}
        <div
          className={`flex flex-col gap-0 transition-[opacity,transform] duration-700 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          <SectionHeader
            eyebrow="Über mich"
            title="Ann-Christin Rumpke"
            className="mb-10"
          />

          {/* Feature list */}
          <div className="flex flex-col">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex gap-4 border-t border-border-l dark:border-border-d py-6 transition-[opacity,transform] duration-500 ease-out ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: visible ? `${200 + i * 120}ms` : "0ms" }}
              >
                <div className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <f.Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold mb-2 text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-border-l dark:border-border-d" />
          </div>

          {/* CTA */}
          <div
            className={`mt-8 transition-[opacity,transform] duration-500 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: visible ? "600ms" : "0ms" }}
          >
            <Link
              href="/ueber-uns"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold text-sm tracking-wide rounded hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors duration-300 group"
            >
              Mehr erfahren
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ── Center: vertical separator (desktop only) ── */}
        <div
          className={`hidden lg:flex flex-col items-center self-stretch py-4 transition-opacity duration-700 ease-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
          aria-hidden="true"
        >
          <div className="flex-1 w-px bg-primary/25" />
          <div className="my-3 w-1.5 h-1.5 rounded-full bg-primary/60" />
          <div className="flex-1 w-px bg-primary/25" />
        </div>

        {/* ── Right: image ── */}
        <div
          className={`flex justify-center lg:justify-end transition-[opacity,transform] duration-700 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="relative w-full max-w-xs">
            {/* Offset border frame */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/50 dark:border-primary/40 rounded pointer-events-none z-0" />

            {/* Image */}
            <div className="relative h-96 lg:h-105 rounded overflow-hidden shadow-lg z-10">
              <Image
                src="/imgs/personal-service-pic.jpeg"
                alt="Ann-Christin Rumpke Portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 320px, 384px"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PersonalServiceCard;
