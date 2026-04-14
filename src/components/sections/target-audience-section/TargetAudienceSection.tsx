import { IoHomeOutline, IoPersonAddOutline, IoKeyOutline } from 'react-icons/io5';
import Title from '@/components/ui/title/Title';
import AudienceCard from './AudienceCard';

const cards = [
  {
    icon: <IoHomeOutline size={20} />,
    number: '01',
    title: 'Eigentümer',
    text: 'Wir unterstützen Eigentümer beim Verkauf oder der Vermietung ihrer Immobilie.',
    linkHref: '/dienstleistungen/verkauf-vermietung',
  },
  {
    icon: <IoPersonAddOutline size={20} />,
    number: '02',
    title: 'Käufer',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
    linkHref: '/kauf',
  },
  {
    icon: <IoKeyOutline size={20} />,
    number: '03',
    title: 'Mieter',
    text: 'Wir helfen Mietern, die passende Immobilie zu finden.',
    linkHref: '/miete',
  },
];

const TargetAudienceSection = () => {
  return (
    <section className="w-full mb-12 rounded px-1 shadow-secondary">
      <div className="container w-full py-10">
        <div className="text-center mb-10">
          <Title variant="h2" size="xl">
            Für wen wir da sind
          </Title>
          <p className="max-w-2xl mx-auto text-base  mt-3 text-card-text-l dark:text-card-text-d">
            Wir bieten individuelle Unterstützung für verschiedene Zielgruppen – damit jeder die passende Lösung findet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <AudienceCard
              key={card.title}
              icon={card.icon}
              number={card.number}
              title={card.title}
              text={card.text}
              linkHref={card.linkHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
