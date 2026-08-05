import { ClipboardCheck, KeyRound, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/ui/section-header/SectionHeader";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Verkaufen",
    text: "Mit fundierten Marktkenntnissen und gezielter Strategie erzielen wir für Sie den optimalen Verkaufspreis – persönlich, transparent und ohne Stress.",
    link: "/dienstleistungen/verkauf-vermietung",
    icon: TrendingUp,
  },
  {
    title: "Vermieten",
    text: "Wir finden zuverlässige Mieter für Ihr Objekt, übernehmen die Vermarktung und begleiten Sie sicher durch jeden Schritt des Vermietungsprozesses.",
    link: "/dienstleistungen/verkauf-vermietung",
    icon: KeyRound,
  },
  {
    title: "Bewertungen",
    text: "Eine präzise Immobilienbewertung ist die Basis jeder guten Entscheidung. Wir analysieren den Markt und ermitteln den reellen Wert Ihres Objekts.",
    link: "/dienstleistungen/immobilienbewertung",
    icon: ClipboardCheck,
  },
];

export default function ServicesSection() {
  return (
    <section
      aria-labelledby="services-section-title"
      className="mb-16 py-10 sm:mb-20 sm:py-12"
    >
      <SectionHeader
        eyebrow="Was wir bieten"
        titleId="services-section-title"
        title="Unsere Leistungen"
        className="mb-0 text-center sm:text-left"
        eyebrowClassName="mb-3.5 text-[13px] font-medium tracking-[0.16em]"
        titleClassName="font-serif text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight"
      />

      <div className="mt-9 grid grid-cols-1 gap-x-4 gap-y-4 sm:mt-15 sm:grid-cols-2 lg:-mx-5 lg:grid-cols-3 lg:gap-x-6">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
