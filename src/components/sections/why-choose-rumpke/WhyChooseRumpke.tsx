import { IoPersonCircleOutline, IoLocationOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';
import Title from '@/components/ui/title/Title';

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
    <section className="w-full py-4 rounded overflow-hidden bg-secondary dark:bg-secondary-dark mb-12">
      <div className="max-w-3xl mx-auto">
        <Title variant="h2" size="xl" align="center">Warum Rumpke Immobilien?</Title>
        <div className="flex flex-col gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4 dark:bg-bg-d bg-bg-l lg:rounded p-4">
              <div className="shrink-0 ">
                {feature.icon}
              </div>
              <div>
                <div className="font-semibold text-lg mb-1 ">{feature.title}</div>
                <div className="text-sm ">{feature.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRumpke;



