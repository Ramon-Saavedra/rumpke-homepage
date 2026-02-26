
import Image from "next/image";
import Link from "next/link";

const PersonalServiceCard = () => {
  return (
    <section className="flex flex-col xl:flex-row items-center md:items-start gap-8 rounded py-4 bg-secondary dark:bg-secondary-dark md:px-4 mb-12">
      <div className="w-full md:w-auto flex items-center justify-center px-1 mx-auto">
        <Image
          src="/imgs/personal-service-pic.jpeg"
          alt="Ann-Christin Rumpke Portrait"
          width={320}
          height={320}
          className="object-cover w-full sm:w-full md:w-80 lg:h-90 rounded"
          priority
        />
      </div>
      <div className="px-2 sm:p-0 flex flex-col justify-between w-full h-full">
        <div>
          <div className="space-y-4 ">
            <h2 className="text-base md:text-lg font-bold  mb-2">Persönlicher Service</h2>
            <p className="text-base mb-4 dark:text-card-text-d text-card-text-l">Ich nehme mir Zeit für Sie und Ihre individuellen Wünsche. Jeder Kunde wird von einem festen Ansprechpartner betreut, der ihn während des gesamten Prozesses begleitet.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-bold  mb-2">Lokale Expertise</h2>
            <p className="text-base mb-4 dark:text-card-text-d text-card-text-l">Als erfahrene Immobilienmaklerin kenne ich den regionalen Markt und seine Besonderheiten. Nutzen Sie unser Netzwerk und unser Know-how zu Ihrem Vorteil.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-base md:text-lg font-bold  mb-2">Transparenz und Vertrauen</h2>
            <p className="text-base mb-4 dark:text-card-text-d text-card-text-l">Bei uns gibt es keine versteckten Kosten. Wir legen Wert auf eine offene Kommunikation und faire Konditionen.</p>
          </div>
        </div>
        <div className="flex items-end">
          <Link href="/ueber-uns" className="inline-block mt-4 px-6 py-2 bg-primary dark:bg-primary-dark text-white rounded font-semibold shadow hover:bg-primary-dark dark:hover:bg-primary text-center w-fit">Über mich</Link>
        </div>
      </div>
    </section>
  );
};

export default PersonalServiceCard;
