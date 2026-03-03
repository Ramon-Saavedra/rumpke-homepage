import Image from 'next/image';
import Title from '@/components/ui/title/Title';

const features = [
  {
    image: '/imgs/why-choose-1.jpg',
    title: 'Persönlicher Service',
    text: 'Bei Rumpke Immobilien stehen Sie im Mittelpunkt. Wir bieten individuelle Beratung und persönliche Begleitung in jedem Schritt Ihres Immobilienprojekts. Mit uns haben Sie einen verlässlichen Partner an Ihrer Seite, der Ihre Wünsche versteht und umsetzt.',
  },
  {
    image: '/imgs/why-choose-2.jpg',
    title: 'Lokale Expertise',
    text: 'Unser tiefes Verständnis für den regionalen Immobilienmarkt macht den Unterschied. Wir kennen die Besonderheiten der Region, die Entwicklungen und die Menschen. Diese Verwurzelung und unser Engagement für die Gemeinschaft garantieren Ihnen optimale Ergebnisse.',
  },
  {
    image: '/imgs/why-choose-3.jpg',
    title: 'Transparenz & Fairness',
    text: 'Vertrauen ist die Basis unserer Arbeit. Wir kommunizieren klar und ehrlich, bieten faire Konditionen und handeln mit absoluter Verlässlichkeit. Bei uns wissen Sie immer, woran Sie sind – für ein gutes Gefühl von Anfang bis Ende.',
  },
];

const WhyChooseRumpke = () => {
  return (
    <section className="w-full md:py-12 mb-12  border-b border-t border-border-l dark:border-border-d">
      <div className="mx-auto px-4">
        <Title variant="h2" size="xl" align="center">Warum Rumpke Immobilien?</Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col">
              <div className="relative w-full h-64 mb-4 border-3 border-secondary dark:border-secondary-dark">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover opacity-40"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2 text-card-text-l dark:text-card-text-d">
                {feature.title}
              </h2>
              <p className="text-sm text-secondary-l dark:text-secondary-d leading-relaxed">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseRumpke;



