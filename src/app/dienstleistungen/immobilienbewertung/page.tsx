import type { Metadata } from "next";
import ContactButton from "@/components/ui/contact-button/ContactButton";
import ProcessSteps from "@/components/ui/process-steps/ProcessSteps";
import InfoCard from "@/components/ui/info-card/InfoCard";
import AdvantagesSection from "@/components/ui/advantages-section/AdvantagesSection";
import {
  defaultOpenGraphMetadata,
  defaultTwitterMetadata,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Immobilienbewertung",
  description:
    "Präzise Wertermittlung Ihrer Immobilie durch erfahrene Experten im Emsland – fundiert, transparent und marktgerecht.",
  alternates: { canonical: "/dienstleistungen/immobilienbewertung" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Immobilienbewertung",
    description:
      "Präzise Wertermittlung Ihrer Immobilie durch erfahrene Experten im Emsland – fundiert, transparent und marktgerecht.",
    url: "/dienstleistungen/immobilienbewertung",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Immobilienbewertung",
    description:
      "Präzise Wertermittlung Ihrer Immobilie durch erfahrene Experten im Emsland – fundiert, transparent und marktgerecht.",
  },
};

const valuationSteps = [
  {
    id: "consultation",
    title: "Erstgespräch und Objektbesichtigung",
    description:
      "Wir beginnen mit einem persönlichen Gespräch, in dem wir Ihre Wünsche und Ziele besprechen. Anschließend nehmen wir eine detaillierte Besichtigung Ihrer Immobilie vor, um alle relevanten Merkmale zu erfassen.",
  },
  {
    id: "analysis",
    title: "Marktanalyse",
    description:
      "Wir nutzen aktuelle Marktdaten und unsere umfassende Kenntnis der regionalen Gegebenheiten, um den Marktwert Ihrer Immobilie präzise zu bestimmen.",
  },
  {
    id: "report",
    title: "Bewertungsbericht",
    description:
      "Sie erhalten von uns eine detaillierte Einschätzung mit einer fundierten Preisempfehlung und auch eine Einschätzung der Vermarktungschancen.",
  },
  {
    id: "recommendation",
    title: "Beratung und Handlungsempfehlung",
    description:
      "Auf Basis der Bewertung besprechen wir mit Ihnen die nächsten Schritte und geben Ihnen konkrete Empfehlungen, wie Sie den Wert Ihrer Immobilie optimal nutzen können.",
  },
] as const;

export default function ImmobilienbewertungPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="mb-4 text-center font-serif text-3xl font-semibold md:text-4xl">
          Immobilienbewertung
        </h1>
        <p className="text-lg text-center text-card-text-l dark:text-card-text-d">
          Der erste Schritt zu Ihrem Erfolg
        </p>
        <p className="text-center mt-4 max-w-3xl mx-auto">
          Eine präzise Immobilienbewertung ist entscheidend, wenn es darum geht,
          den richtigen Verkaufspreis zu erzielen oder eine fundierte
          Entscheidung über Ihre Immobilie zu treffen. Bei Rumpke Immobilien
          bieten wir Ihnen eine professionelle und transparente Bewertung Ihrer
          Immobilie, die auf fundierten Marktkenntnissen und langjähriger
          Erfahrung basiert.
        </p>
      </div>

      <div className="space-y-12">
        {/* Warum professionelle Bewertung Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">
              Warum eine professionelle Immobilienbewertung?
            </h2>
            <p className="leading-relaxed">
              Der Wert Ihrer Immobilie wird durch eine Vielzahl von Faktoren
              beeinflusst. Wir analysieren all diese Aspekte, um den optimalen
              Preis zu ermitteln:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              title="Marktorientierte Preisfindung"
              description="Lage, Zustand, Größe, Ausstattung und vieles mehr – wir analysieren all diese Aspekte und vergleichen sie mit aktuellen Marktdaten, um den optimalen Preis zu ermitteln."
            />
            <InfoCard
              title="Vermeidung von Fehleinschätzungen"
              description="Eine zu hohe oder zu niedrige Preisvorstellung kann zu Verzögerungen oder Verlusten führen. Mit unserer Expertise stellen wir sicher, dass Ihre Immobilie weder unter Wert noch überteuert angeboten wird."
            />
            <InfoCard
              title="Fundierte Entscheidungsgrundlage"
              description="Ob Verkauf, Vermietung oder Finanzierung – eine präzise Bewertung gibt Ihnen die Sicherheit, die richtigen Entscheidungen zu treffen."
            />
            <InfoCard
              title="Maximierung des Verkaufserlöses"
              description="Eine realistische Bewertung zieht die richtigen Käufer an und ermöglicht schnellere Verkaufsabschlüsse zum bestmöglichen Preis."
            />
          </div>
        </section>

        {/* Bewertungsprozess Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">
              Unser Bewertungsprozess
            </h2>
            <p className="leading-relaxed">
              Wir führen eine umfassende Analyse durch, um den wahren Wert Ihrer
              Immobilie zu ermitteln:
            </p>
          </div>

          <ProcessSteps steps={valuationSteps} />
        </section>

        {/* Was wir bewerten Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">
              Was wir bei der Bewertung berücksichtigen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d">
              <h3 className="mb-3 font-serif text-lg font-semibold">
                Objektmerkmale
              </h3>
              <ul className="text-sm text-card-text-l dark:text-card-text-d space-y-2">
                <li>• Größe und Grundriss</li>
                <li>• Baujahr und Zustand</li>
                <li>• Ausstattungsqualität</li>
                <li>• Energieeffizienz</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d">
              <h3 className="mb-3 font-serif text-lg font-semibold">Lage</h3>
              <ul className="text-sm text-card-text-l dark:text-card-text-d space-y-2">
                <li>• Mikro- und Makrolage</li>
                <li>• Infrastruktur</li>
                <li>• Verkehrsanbindung</li>
                <li>• Entwicklungspotenzial</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border-l bg-bgSecondary-l p-6 dark:border-border-d dark:bg-bgSecondary-d">
              <h3 className="mb-3 font-serif text-lg font-semibold">
                Marktfaktoren
              </h3>
              <ul className="text-sm text-card-text-l dark:text-card-text-d space-y-2">
                <li>• Vergleichspreise</li>
                <li>• Angebot und Nachfrage</li>
                <li>• Markttrends</li>
                <li>• Wirtschaftliche Entwicklung</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vorteile Section */}
        <AdvantagesSection
          title="Ihre Vorteile bei unserer Bewertung"
          items={[
            {
              title: "Kostenlose Erstberatung",
              description:
                "Wir bieten Ihnen eine unverbindliche Erstberatung an, in der wir Ihre Situation analysieren und Ihnen erste Einschätzungen geben.",
            },
            {
              title: "Lokale Marktkenntnisse",
              description:
                "Unsere langjährige Erfahrung im regionalen Immobilienmarkt ermöglicht uns präzise und realistische Bewertungen.",
            },
            {
              title: "Transparenz und Nachvollziehbarkeit",
              description:
                "Wir erklären Ihnen ausführlich, wie sich der Wert Ihrer Immobilie zusammensetzt und welche Faktoren eine Rolle spielen.",
            },
          ]}
        />

        {/* CTA Section */}
        <section className="text-center py-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            Möchten Sie den Wert Ihrer Immobilie erfahren?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Vereinbaren Sie noch heute einen Termin für eine unverbindliche
            Erstberatung. Wir freuen uns darauf, Sie kennenzulernen und Ihnen
            mit unserer Expertise zur Seite zu stehen.
          </p>
          <ContactButton text="Jetzt Termin vereinbaren" />
        </section>
      </div>
    </div>
  );
}
