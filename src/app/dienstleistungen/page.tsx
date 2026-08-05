import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, Home, ClipboardCheck, Key } from "lucide-react";
import ContactButton from "@/components/ui/contact-button/ContactButton";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Dienstleistungen",
  description:
    "Immobiliendienstleistungen von Rumpke Immobilien – Verkauf, Vermietung, Wertermittlung und Kaufbegleitung im Emsland und der Grafschaft Bentheim.",
  alternates: { canonical: "/dienstleistungen" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Dienstleistungen",
    description:
      "Immobiliendienstleistungen von Rumpke Immobilien – Verkauf, Vermietung, Wertermittlung und Kaufbegleitung im Emsland und der Grafschaft Bentheim.",
    url: "/dienstleistungen",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Dienstleistungen",
    description:
      "Immobiliendienstleistungen von Rumpke Immobilien – Verkauf, Vermietung, Wertermittlung und Kaufbegleitung im Emsland und der Grafschaft Bentheim.",
  },
};

export default function DienstleistungenPage() {
  const services = [
    {
      title: "Verkauf & Vermietung",
      description:
        "Professionelle Vermarktung Ihrer Immobilie. Wir finden den richtigen Käufer oder Mieter für Sie.",
      href: "/dienstleistungen/verkauf-vermietung",
      icon: Home,
    },
    {
      title: "Immobilienbewertung",
      description:
        "Präzise Wertermittlung Ihrer Immobilie durch erfahrene Experten.",
      href: "/dienstleistungen/immobilienbewertung",
      icon: ClipboardCheck,
    },
    {
      title: "Immobilienkauf",
      description:
        "Wir begleiten Sie beim Kauf Ihrer Traumimmobilie von der Suche bis zum Vertragsabschluss.",
      href: "/dienstleistungen/immobilien-kauf",
      icon: Key,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="mb-4 text-center font-serif text-4xl font-semibold">
        Unsere Dienstleistungen
      </h1>
      <p className="text-lg text-center mb-12">
        Professionelle Immobiliendienstleistungen für Ihre individuellen
        Bedürfnisse
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col rounded-lg border border-transparent bg-bgSecondary-l p-6 transition hover:border-border-l hover:shadow-md dark:bg-bgSecondary-d dark:hover:border-border-d"
            >
              <div className="mb-4">
                <IconComponent className="w-6 h-6" />
              </div>
              <h2 className="mb-3 font-serif text-xl font-semibold">
                {service.title}
              </h2>
              <p className="leading-relaxed grow">{service.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 font-medium text-primary hover:text-primary-dark">
                Mehr erfahren
                <TrendingUp className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-lg bg-bgSecondary-l p-6 text-center dark:bg-bgSecondary-d">
        <h3 className="mb-2 font-serif text-xl font-semibold">
          Haben Sie Fragen zu unseren Dienstleistungen?
        </h3>
        <p className="mb-4">
          Kontaktieren Sie uns für eine unverbindliche Beratung.
        </p>
        <ContactButton />
      </div>
    </div>
  );
}
