
import Image from 'next/image';

export default function UeberUnsPage() {
  return (
    <section className=" border-admin-text-d/40 dark:border-admin-text-d/10 border mx-auto  py-6 bg-secondary dark:bg-secondary-dark rounded animate-fade-in lg:pl-2">
      <div className="grid lg:grid-cols-2 md:gap-10">
        <div className="flex flex-col">
          <div className="relative w-full md:max-w-md md:mx-auto rounded overflow-hidden flex items-center justify-center shadow-md border border-amber-400/80">
            <Image
              src="/imgs/personal-service-pic.jpeg"
              alt="Ann-Christin Rumpke Portrait"
              width={384}
              height={512}
              className="object-cover w-full h-full"
              style={{ height: 'auto' }}
              priority
            />
          </div>
          <div className="mt-4 text-center">
            <div className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100">Ann-Christin Rumpke</div>
            <div className="text-xs md:text-sm text-gray-500 dark:text-gray-300 tracking-wide">Immobilienmaklerin & Wertermittlerin</div>
          </div>
        </div>
        <div className="w-full space-y-5 mt-4 md:mt-0 flex flex-col items-center md:items-start px-2">
          <h1 className="text-lg md:text-xl font-bold mb-2 tracking-wide text-center md:text-left text-primary">Über mich</h1>
          <p className="text-sm md:text-base font-normal tracking-wide text-center md:text-left">
            Mein Name ist Ann-Christin Rumpke, und ich bin eine erfahrene Immobilienmaklerin mit langjähriger Erfahrung in der Immobilienbranche. Angefangen habe ich mit der WEG- und Mietverwaltung im Angestelltenverhältnis und mich nun dazu entschieden mich hauptsächlich auf die Tätigkeit als Immobilienmaklerin und Wertermittlerin zu spezialisieren.
          </p>
          <p className="text-sm md:text-base font-normal tracking-wide text-center md:text-left max-w-2xl">
            Die Prüfung zur Immobilienmaklerin und Wertermittlerin habe ich bei der Industrie- und Handelskammer Niedersachsen erfolgreich abgelegt und bin nun den Schritt in die Selbstständigkeit gegangen. Mein eigenes Büro habe ich im Sommer eröffnet und freue mich nun darauf, meine Expertise als Immobilienmaklerin im Emsland und der Grafschaft Bentheim anzubieten.
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „Mein Ansatz ist authentisch, kompetent und echt. Ich sehe mich nicht nur als Maklerin, sondern als Dienstleister, der Ihnen bei allen Fragen rund um die Immobilie zur Seite steht.
            Egal, ob Sie eine Immobilie kaufen, verkaufen oder bewerten möchten, ich bin für Sie da.“
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „In allen Unternehmensbereichen arbeite ich mit einem Netzwerk von spezialisierten Experten zusammen, um sicherzustellen, dass Sie die bestmögliche Unterstützung erhalten.“
          </p>
          <p className="italic text-sm md:text-base font-medium tracking-wide text-center md:text-left max-w-2xl">
            „Für mich gibt es kein „geht nicht“ – wir finden einen Weg und auch die Lösung für Ihre individuellen Bedürfnisse.
            Lassen Sie uns gemeinsam die richtige Immobilie für Sie finden oder den bestmöglichen Preis für Ihre Immobilie erzielen.“
          </p>
        </div>
      </div>
    </section>
  );
}
