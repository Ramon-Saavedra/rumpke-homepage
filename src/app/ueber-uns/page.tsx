import Image from "next/image";
import Title from "@/components/ui/title/Title";

export default function UeberUnsPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 bg-secondary dark:bg-secondary-dark px-4 mb-12">
      <div className="mb-12">
        <Title variant="h1" align="center" size="xl">
          Über mich
        </Title>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <div className="relative w-full max-w-md mx-auto overflow-hidden border border-border-l dark:border-border-d bg-card-l dark:bg-card-d">
            <Image
              src="/imgs/personal-service-pic.jpeg"
              alt="Ann-Christin Rumpke Portrait"
              width={384}
              height={512}
              className="object-cover w-full h-full"
              style={{ height: "auto" }}
              priority
            />
          </div>
          <div className="mt-6 text-center">
            <h2 className="font-semibold text-xl text-card-text-l dark:text-card-text-d">
              Ann-Christin Rumpke
            </h2>
            <p className="text-sm text-secondary-l dark:text-secondary-d mt-1">
              Immobilienmaklerin & Wertermittlerin
            </p>
          </div>
        </div>
        <div className="w-full space-y-6 flex flex-col">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-card-text-l dark:text-card-text-d">
              Mein Name ist Ann-Christin Rumpke, und ich bin eine erfahrene Immobilienmaklerin mit langjähriger Erfahrung in der Immobilienbranche. Angefangen habe ich mit der WEG- und Mietverwaltung im Angestelltenverhältnis und mich nun dazu entschieden mich hauptsächlich auf die Tätigkeit als Immobilienmaklerin und Wertermittlerin zu spezialisieren.
            </p>

            <p className="text-base leading-relaxed text-card-text-l dark:text-card-text-d">
              Die Prüfung zur Immobilienmaklerin und Wertermittlerin habe ich bei der Industrie- und Handelskammer Niedersachsen erfolgreich abgelegt und bin nun den Schritt in die Selbstständigkeit gegangen. Mein eigenes Büro habe ich im Sommer eröffnet und freue mich nun darauf, meine Expertise als Immobilienmaklerin im Emsland und der Grafschaft Bentheim anzubieten.
            </p>
          </div>

          <div className="mt-8 p-6 bg-secondary dark:bg-secondary-dark border border-border-l dark:border-border-d space-y-4">
            <p className="italic text-base leading-relaxed text-card-text-l dark:text-card-text-d">
              &bdquo;Mein Ansatz ist authentisch, kompetent und echt. Ich sehe mich nicht nur als Maklerin, sondern als Dienstleister, der Ihnen bei allen Fragen rund um die Immobilie zur Seite steht. Egal, ob Sie eine Immobilie kaufen, verkaufen oder bewerten möchten, ich bin für Sie da.&ldquo;
            </p>

            <p className="italic text-base leading-relaxed text-card-text-l dark:text-card-text-d">
              &bdquo;In allen Unternehmensbereichen arbeite ich mit einem Netzwerk von spezialisierten Experten zusammen, um sicherzustellen, dass Sie die bestmögliche Unterstützung erhalten.&ldquo;
            </p>

            <p className="italic text-base leading-relaxed text-card-text-l dark:text-card-text-d">
              &bdquo;Für mich gibt es kein &bdquo;geht nicht&ldquo; – wir finden einen Weg und auch die Lösung für Ihre individuellen Bedürfnisse. Lassen Sie uns gemeinsam die richtige Immobilie für Sie finden oder den bestmöglichen Preis für Ihre Immobilie erzielen.&ldquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
