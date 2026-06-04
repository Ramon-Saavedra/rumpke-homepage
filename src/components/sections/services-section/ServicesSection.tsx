import ServiceCard from './ServiceCard';

type ServiceItem = {
  readonly title: string;
  readonly text: string;
  readonly link: string;
};

const services: readonly ServiceItem[] = [
  {
    title: 'Verkaufen',
    text: 'Mit fundierten Marktkenntnissen und gezielter Strategie erzielen wir für Sie den optimalen Verkaufspreis – persönlich, transparent und ohne Stress.',
    link: '/dienstleistungen/verkauf-vermietung',
  },
  {
    title: 'Vermieten',
    text: 'Wir finden zuverlässige Mieter für Ihr Objekt, übernehmen die Vermarktung und begleiten Sie sicher durch jeden Schritt des Vermietungsprozesses.',
    link: '/dienstleistungen/verkauf-vermietung',
  },
  {
    title: 'Bewertungen',
    text: 'Eine präzise Immobilienbewertung ist die Basis jeder guten Entscheidung. Wir analysieren den Markt und ermitteln den reellen Wert Ihres Objekts.',
    link: '/dienstleistungen/immobilienbewertung',
  },
];

import SectionHeader from "@/components/ui/section-header/SectionHeader";

const ServicesSection = () => {
  return (
    <section
      aria-label="Unsere Leistungen"
      className="mb-24 w-full px-4 sm:px-6 py-12"
    >
      <SectionHeader
        eyebrow="Was wir bieten"
        title="Unsere Leistungen"
        className="mb-8"
      />
      <div className="border-t border-border-l dark:border-border-d">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            text={service.text}
            link={service.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

