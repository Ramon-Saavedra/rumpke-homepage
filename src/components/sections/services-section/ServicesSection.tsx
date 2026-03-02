import Title from '@/components/ui/title/Title';
import ServiceCard from './ServiceCard';

const services = [
  {
    title: 'Verkaufen',
    text: 'Wir begleiten Sie professionell und transparent beim Verkauf Ihrer Immobilie.',
    link: '/dienstleistungen/verkauf-vermietung',
  },
  {
    title: 'Kaufen',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
    link: '/dienstleistungen/immobilien-kauf',
  },
  {
    title: 'Vermieten',
    text: 'Wir unterstützen Sie bei der erfolgreichen Vermietung Ihrer Immobilie.',
    link: '/dienstleistungen/immobilienbewertung',
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full md:py-12 mb-12 lg:rounded shadow-secondary">
      <div className="mx-auto">
        <Title variant="h2" size="xl" align="center">Unsere Leistungen</Title>
        <div className="flex flex-col gap-4">
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
    </section>
  );
};

export default ServicesSection;

