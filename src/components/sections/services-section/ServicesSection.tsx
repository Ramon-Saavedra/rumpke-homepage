import Title from '@/components/ui/title/Title';
import ServiceCard from './ServiceCard';

type ServiceItem = {
  readonly number: string;
  readonly title: string;
  readonly text: string;
  readonly link: string;
};

const services: readonly ServiceItem[] = [
  {
    number: '01',
    title: 'Verkaufen',
    text: 'Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.',
    link: '/dienstleistungen/verkauf-vermietung',
  },
  {
    number: '02',
    title: 'Kaufen',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
    link: '/dienstleistungen/immobilien-kauf',
  },
  {
    number: '03',
    title: 'Vermieten',
    text: 'Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.',
    link: '/dienstleistungen/immobilienbewertung',
  },
];

const ServicesSection = () => {
  return (
    <section
      aria-label="Unsere Leistungen"
      className="mb-12 w-full border border-border-l bg-bgSecondary-l shadow-secondary dark:border-border-d dark:bg-bgSecondary-d lg:rounded"
    >
      <div className="mx-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
        <Title className="mb-0" variant="h2" size="lg" align="left">
          Unsere Leistungen
        </Title>

        <div className="mt-4 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="border border-border-l bg-bg-l p-3 dark:border-border-d dark:bg-bg-d sm:p-4">
            <ol className="space-y-2.5">
              {services.map((service) => (
                <li
                  key={service.number}
                  className="border border-border-l bg-bgSecondary-l px-3 py-3 dark:border-border-d dark:bg-bgSecondary-d sm:px-4 sm:py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 text-xs font-semibold tracking-[0.24em] text-card-text-l dark:text-card-text-d">
                      {service.number}
                    </span>
                    <span className="min-w-0 text-xs font-semibold uppercase tracking-[0.12em] text-third dark:text-bg-l sm:text-sm">
                      {service.title}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          <div className="border border-border-l bg-bg-l p-3 dark:border-border-d dark:bg-bg-d sm:p-4 lg:p-5">
            <div className="space-y-3 sm:space-y-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  text={service.text}
                  link={service.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

