
import Image from "next/image";
import Link from "next/link";
import Title from '@/components/ui/title/Title';

const PersonalServiceCard = () => {

  return (
    <section className="w-full md:py-12 mb-12 lg:rounded p-6 bg-bgSecondary-l dark:bg-bgSecondary-d shadow-secondary">
      <div className="mx-auto grid lg:grid-cols-2 lg:max-w-full gap-8 items-center">
        <div className="flex justify-center">
          <div className="relative w-full max-w-xs h-[400px]">
            <Image
              src="/imgs/personal-service-pic.jpeg"
              alt="Ann-Christin Rumpke Portrait"
              fill
              className="object-cover rounded border border-border-l dark:border-border-d"
              sizes="(max-width: 1024px) 320px, 384px"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center h-[400px]">
          <div className="space-y-6">
            <div>
              <Title variant="h2" size="md" className="mb-2">Persönlicher Service</Title>
              <p className="text-sm dark:text-card-text-d text-card-text-l">Ich nehme mir Zeit für Sie und Ihre individuellen Wünsche. Jeder Kunde wird von einem festen Ansprechpartner betreut, der ihn während des gesamten Prozesses begleitet.</p>
            </div>
            <div>
              <Title variant="h2" size="md" className="mb-2">Lokale Expertise</Title>
              <p className="text-sm dark:text-card-text-d text-card-text-l">Als erfahrene Immobilienmaklerin kenne ich den regionalen Markt und seine Besonderheiten. Nutzen Sie unser Netzwerk und unser Know-how zu Ihrem Vorteil.</p>
            </div>
            <div>
              <Title variant="h2" size="md" className="mb-2">Transparenz und Vertrauen</Title>
              <p className="text-sm dark:text-card-text-d text-card-text-l">Bei uns gibt es keine versteckten Kosten. Wir legen Wert auf eine offene Kommunikation und faire Konditionen.</p>
            </div>
            <Link href="/ueber-uns" className="inline-block mt-2 px-6 py-2 bg-primary dark:bg-primary-dark text-white rounded font-semibold shadow hover:bg-primary-dark dark:hover:bg-primary">Über mich</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalServiceCard;
