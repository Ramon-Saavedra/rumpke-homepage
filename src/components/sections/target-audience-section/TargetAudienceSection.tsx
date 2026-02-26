import Image from 'next/image';
import { IoHomeOutline, IoPersonAddOutline, IoKeyOutline, IoArrowForward } from 'react-icons/io5';
import Link from 'next/link';

const cards = [
  {
    icon: <IoHomeOutline size={24} className="" />,
    title: 'Eigentümer',
    text: 'Wir unterstützen Eigentümer beim Verkauf oder der Vermietung ihrer Immobilie.',
  },
  {
    icon: <IoPersonAddOutline size={24} className="" />,
    title: 'Käufer',
    text: 'Finden Sie mit uns Ihr neues Zuhause oder Ihre nächste Investition.',
  },
  {
    icon: <IoKeyOutline size={24} className="" />,
    title: 'Mieter',
    text: 'Wir helfen Mietern, die passende Immobilie zu finden.',
  },
];

const TargetAudienceSection = () => {
  return (
    <section className="w-full md:py-2 mb-12 lg:rounded lg:p-4 p-2 bg-secondary dark:bg-secondary-dark shadow-secondary">
      <div className="grid gap-2 lg:grid-cols-2 items-stretch ">
        <div className="order-1 lg:order-2 flex flex-col items-center justify-center w-full mb-8 md:mb-0 ">
          <div className="w-full max-w-md flex flex-col items-center justify-center h-full">
            <Image
              src="/imgs/whyTrustUsPic-2.jpg"
              alt="Für wen wir da sind"
              width={500}
              height={500}
              className="md:rounded object-cover max-w-full shadow-lg"
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
        <div className="order-2 lg:order-1 flex flex-col  justify-center w-full max-w-md mx-auto h-full rounded">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Für wen wir da sind</h2>
          <p className="mb-6 text-base sm:text-lg px-2 sm:px-0 text-card-text-l dark:text-card-text-d">
            Wir bieten individuelle Unterstützung für verschiedene Zielgruppen – damit jeder die passende Lösung findet.
          </p>
          <div className="flex flex-col gap-8 w-full h-full">
            {cards.map((card, idx) => (
              <div
                key={card.title}
                className="flex items-center w-full h-full lg:rounded px-2 dark:bg-bg-d bg-bg-l"
                style={{ flex: 1 }}
              >
                <div className="flex min-w-11">
                  {card.icon}
                </div>
                <div className="flex flex-col flex-1 ml-4">
                  <div className="font-semibold text-base mb-1">{card.title}</div>
                  <div className="text-sm  mb-0">{card.text}</div>
                </div>
                <div className="flex items-center ml-4">
                  <Link href="/kontakt" aria-label="Kontakt aufnehmen">
                    <IoArrowForward size={18} className=" cursor-pointer p-0 bg-transparent hover:scale-125 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
