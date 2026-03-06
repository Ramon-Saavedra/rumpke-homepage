import Link from "next/link";
import { TrendingUp, Home, ClipboardCheck, Key } from "lucide-react";
import ContactButton from "@/components/ui/contact-button/ContactButton";

export default function DienstleistungenPage() {
  const services = [
    {
      title: "Verkauf & Vermietung",
      description: "Professionelle Vermarktung Ihrer Immobilie. Wir finden den richtigen Käufer oder Mieter für Sie.",
      href: "/dienstleistungen/verkauf-vermietung",
      icon: Home,
    },
    {
      title: "Immobilienbewertung",
      description: "Präzise Wertermittlung Ihrer Immobilie durch erfahrene Experten.",
      href: "/dienstleistungen/immobilienbewertung",
      icon: ClipboardCheck,
    },
    {
      title: "Immobilienkauf",
      description: "Wir begleiten Sie beim Kauf Ihrer Traumimmobilie von der Suche bis zum Vertragsabschluss.",
      href: "/dienstleistungen/immobilien-kauf",
      icon: Key,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Unsere Dienstleistungen
      </h1>
      <p className="text-lg text-center mb-12">
        Professionelle Immobiliendienstleistungen für Ihre individuellen Bedürfnisse
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded hover:shadow-md border border-transparent hover:border-border-l dark:hover:border-border-d"
            >
              <div className="mb-4">
                <IconComponent className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3 ">
                {service.title}
              </h2>
              <p className="leading-relaxed grow">
                {service.description}
              </p>
              <div className="mt-4 text-blue-600 hover:text-blue-800  font-medium inline-flex items-center gap-2">
                Mehr erfahren
                <TrendingUp className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded text-center">
        <h3 className="text-xl font-bold mb-2">
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
