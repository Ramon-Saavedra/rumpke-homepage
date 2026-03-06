import Image from 'next/image';
import { IoHomeOutline, IoPersonAddOutline, IoKeyOutline } from 'react-icons/io5';
import Title from '@/components/ui/title/Title';
import AudienceCard from './AudienceCard';

const cards = [
  {
    icon: <IoHomeOutline size={18} className="" />,
    title: 'Eigentümer',
    text: 'Wir unterstützen Eigentümer beim Verkauf oder der Vermietung ihrer Immobilie.',
  },
  {
    icon: <IoPersonAddOutline size={18} className="" />,
    title: 'Käufer',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
  },
  {
    icon: <IoKeyOutline size={18} className="" />,
    title: 'Mieter',
    text: 'Wir helfen Mietern, die passende Immobilie zu finden.',
  },
];

const TargetAudienceSection = () => {
  return (
    <section className="w-full overflow-hidden pb-4 mb-12 rounded border border-border-l dark:border-border-d bg-bgSecondary-l dark:bg-bgSecondary-d shadow-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Title variant="h2" size="xl" className="py-4 mb-8 bg-secondary dark:bg-secondary-dark text-white px-2">Für wen wir da sind</Title>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-card-text-l dark:text-card-text-d">
            Wir bieten individuelle Unterstützung für verschiedene Zielgruppen – damit jeder die passende Lösung findet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center p-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs h-[380px]">
              <Image
                src="/imgs/personal-service-pic.jpeg"
                alt="Für wen wir da sind"
                fill
                className="rounded object-cover shadow-xl"
                sizes="(max-width: 1024px) 320px, 384px"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center h-[380px] gap-6">
            {cards.map((card) => (
              <AudienceCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
