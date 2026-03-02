import { IoPersonCircleOutline, IoLocationOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import Title from '@/components/ui/title/Title';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <IoPersonCircleOutline size={24} />,
    title: 'Persönlicher Service',
    text: 'Individuelle Beratung und Begleitung – persönlich, nahbar und zuverlässig.',
  },
  {
    icon: <IoLocationOutline size={24} />,
    title: 'Lokale Expertise',
    text: 'Tiefes Verständnis für den regionalen Markt und Ihre Bedürfnisse.',
  },
  {
    icon: <IoShieldCheckmarkOutline size={24} />,
    title: 'Transparenz & Fairness',
    text: 'Klare Kommunikation, faire Konditionen und absolute Verlässlichkeit.',
  },
];

const WhyChooseRumpke = () => {
  return (
    <section className="w-full md:py-12 mb-12 lg:rounded shadow-secondary">
      <div className="mx-auto">
        <Title variant="h2" size="xl" align="center">Warum Rumpke Immobilien?</Title>
        <div className="flex flex-col gap-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRumpke;



