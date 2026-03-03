import Image from 'next/image';
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
    <section className="w-full md:py-12 mb-12 lg:rounded">
      <div className="mx-auto  p-4">
        <Title variant="h2" size="xl" align="center">Unsere Leistungen</Title>
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          <div className="flex flex-col gap-4 lg:flex-1">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                text={service.text}
                link={service.link}
              />
            ))}
          </div>
          <div className="relative w-full lg:w-1/2 h-64 lg:h-auto min-h-[300px]">
            <Image
              src="/imgs/service-section-pic.jpg"
              alt="Rumpke Immobilien Dienstleistungen"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

