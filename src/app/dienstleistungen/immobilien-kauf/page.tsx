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
  title: "Immobilienkauf",
  description:
    "Kompetente Begleitung beim Immobilienkauf im Emsland – von der ersten Besichtigung bis zur Schlüsselübergabe mit Rumpke Immobilien.",
  alternates: { canonical: "/dienstleistungen/immobilien-kauf" },
  openGraph: {
    ...defaultOpenGraphMetadata,
    title: "Immobilienkauf",
    description:
      "Kompetente Begleitung beim Immobilienkauf im Emsland – von der ersten Besichtigung bis zur Schlüsselübergabe mit Rumpke Immobilien.",
    url: "/dienstleistungen/immobilien-kauf",
  },
  twitter: {
    ...defaultTwitterMetadata,
    title: "Immobilienkauf",
    description:
      "Kompetente Begleitung beim Immobilienkauf im Emsland – von der ersten Besichtigung bis zur Schlüsselübergabe mit Rumpke Immobilien.",
  },
};

const purchaseSteps = [
  {
    id: "consultation",
    title: "Erstgespräch",
    description:
      "In einem persönlichen Gespräch lernen wir Ihre Bedürfnisse kennen und definieren gemeinsam Ihr Suchprofil.",
  },
  {
    id: "search",
    title: "Immobiliensuche",
    description:
      "Wir suchen gezielt nach passenden Objekten und präsentieren Ihnen regelmäßig neue Angebote, die Ihren Vorstellungen entsprechen.",
  },
  {
    id: "viewings",
    title: "Besichtigungen",
    description:
      "Wir begleiten Sie zu den Besichtigungen und geben Ihnen wertvolle Hinweise zur Immobilie und zum Zustand.",
  },
  {
    id: "negotiation",
    title: "Kaufentscheidung und Verhandlung",
    description:
      "Wenn Sie sich für eine Immobilie entschieden haben, führen wir die Verkaufsverhandlungen und sorgen für die bestmöglichen Konditionen.",
  },
  {
    id: "completion",
    title: "Kaufabschluss",
    description:
      "Wir koordinieren alle notwendigen Schritte und begleiten Sie bis zur Schlüsselübergabe.",
  },
] as const;

export default function ImmobilienKaufPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <h1 className="mb-4 text-center font-serif text-3xl font-semibold md:text-4xl">
          Immobilien-Kauf
        </h1>
        <p className="text-lg text-center text-card-text-l dark:text-card-text-d">
          Ihr Weg zur Traumimmobilie
        </p>
        <p className="text-center mt-4 max-w-3xl mx-auto">
          Der Kauf einer Immobilie ist eine der wichtigsten Entscheidungen im
          Leben. Wir begleiten Sie kompetent und zuverlässig auf diesem Weg –
          von der ersten Besichtigung bis zur Schlüsselübergabe.
        </p>
      </div>

      <div className="space-y-12">
        {/* Unser Service Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">
              Unser Service für Käufer
            </h2>
            <p className="leading-relaxed">
              Bei Rumpke Immobilien profitieren Sie von einem umfassenden
              Rundum-Service, der Ihnen den Immobilienkauf so angenehm wie
              möglich macht:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoCard
              title="Umfassende Beratung"
              description="Wir nehmen uns Zeit, Ihre Wünsche und Anforderungen genau zu verstehen. Ob Wohnung, Haus oder Gewerbeimmobilien – wir finden die passende Immobilie für Sie."
            />
            <InfoCard
              title="Große Auswahl"
              description="Dank unseres breiten Portfolios und unserer umfangreichen Marktkenntnisse haben wir Zugang zu einer Vielzahl von Immobilien. Auch Off-Market-Objekte gehören zu unserem Angebot."
            />
            <InfoCard
              title="Besichtigungstermine"
              description="Wir organisieren für Sie individuelle Besichtigungstermine und begleiten Sie vor Ort. Dabei beantworten wir alle Ihre Fragen rund um die Immobilie."
            />
            <InfoCard
              title="Finanzierungsberatung"
              description="Auf Wunsch vermitteln wir Ihnen Kontakte zu kompetenten Finanzierungspartnern, damit Sie die beste Lösung für Ihre persönliche Situation finden."
            />
            <InfoCard
              title="Verhandlungsführung"
              description="Wir verhandeln in Ihrem Namen mit dem Verkäufer und setzen uns für faire Konditionen ein, damit Sie den bestmöglichen Preis erzielen."
            />
            <InfoCard
              title="Kaufabwicklung"
              description="Von der Vertragsprüfung bis zur Schlüsselübergabe stehen wir Ihnen zur Seite und stellen sicher, dass alles reibungslos abläuft."
            />
          </div>
        </section>

        {/* So funktioniert es Section */}
        <section>
          <div className="mb-6">
            <h2 className="mb-3 font-serif text-2xl font-semibold md:text-3xl">
              So funktioniert der Immobilienkauf mit uns
            </h2>
          </div>

          <ProcessSteps steps={purchaseSteps} />
        </section>

        {/* Warum Rumpke Section */}
        <AdvantagesSection
          title="Warum mit uns kaufen?"
          items={[
            {
              title: "Persönliche Betreuung",
              description:
                "Sie haben bei uns einen festen Ansprechpartner, der Sie während des gesamten Kaufprozesses begleitet und Ihnen jederzeit zur Verfügung steht.",
            },
            {
              title: "Marktkenntnisse",
              description:
                "Dank unserer langjährigen Erfahrung kennen wir den lokalen Immobilienmarkt genau und können Sie optimal beraten.",
            },
            {
              title: "Großes Netzwerk",
              description:
                "Durch unsere ausgezeichneten Kontakte zu Verkäufern, Notaren und Finanzierungspartnern haben Sie Zugang zu exklusiven Angeboten und professioneller Unterstützung.",
            },
          ]}
        />

        {/* CTA Section */}
        <section className="text-center py-8">
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            Bereit für Ihre Traumimmobilie?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute und lassen Sie uns gemeinsam Ihre
            perfekte Immobilie finden. Wir freuen uns darauf, Sie auf Ihrem Weg
            zum neuen Zuhause zu begleiten.
          </p>
          <ContactButton />
        </section>
      </div>
    </div>
  );
}
