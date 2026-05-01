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

const ServicesSection = () => {
  return (
    <section
      aria-label="Unsere Leistungen"
      className="mb-12 w-full"
    >
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">
          Was wir bieten
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground">
          Unsere Leistungen
        </h2>
      </div>
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

