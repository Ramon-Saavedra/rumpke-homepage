import ContactButton from "@/components/ui/contact-button/ContactButton";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import AdvantagesSection from "@/components/ui/advantages-section/AdvantagesSection";

export default function ImmobilienKaufPage() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Immobilien-Kauf
        </h1>
        <p className="text-lg text-center text-card-text-l dark:text-card-text-d">
          Ihr Weg zur Traumimmobilie
        </p>
        <p className="text-center mt-4 max-w-3xl mx-auto">
          Der Kauf einer Immobilie ist eine der wichtigsten Entscheidungen im Leben. Wir begleiten Sie kompetent und zuverlässig auf diesem Weg – von der ersten Besichtigung bis zur Schlüsselübergabe.
        </p>
      </div>

      <div className="space-y-12">
        {/* Unser Service Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Unser Service für Käufer
            </h2>
            <p className="leading-relaxed">
              Bei Rumpke Immobilien profitieren Sie von einem umfassenden Rundum-Service, der Ihnen den Immobilienkauf so angenehm wie möglich macht:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ServiceCard
              title="Umfassende Beratung"
              description="Wir nehmen uns Zeit, Ihre Wünsche und Anforderungen genau zu verstehen. Ob Wohnung, Haus oder Gewerbeobjekt – wir finden die passende Immobilie für Sie."
            />
            <ServiceCard
              title="Große Auswahl"
              description="Dank unseres breiten Portfolios und unserer umfangreichen Marktkenntnisse haben wir Zugang zu einer Vielzahl von Immobilien. Auch Off-Market-Objekte gehören zu unserem Angebot."
            />
            <ServiceCard
              title="Besichtigungstermine"
              description="Wir organisieren für Sie individuelle Besichtigungstermine und begleiten Sie vor Ort. Dabei beantworten wir alle Ihre Fragen rund um die Immobilie."
            />
            <ServiceCard
              title="Finanzierungsberatung"
              description="Auf Wunsch vermitteln wir Ihnen Kontakte zu kompetenten Finanzierungspartnern, damit Sie die beste Lösung für Ihre persönliche Situation finden."
            />
            <ServiceCard
              title="Verhandlungsführung"
              description="Wir verhandeln in Ihrem Namen mit dem Verkäufer und setzen uns für faire Konditionen ein, damit Sie den bestmöglichen Preis erzielen."
            />
            <ServiceCard
              title="Kaufabwicklung"
              description="Von der Vertragsprüfung bis zur Schlüsselübergabe stehen wir Ihnen zur Seite und stellen sicher, dass alles reibungslos abläuft."
            />
          </div>
        </section>

        {/* So funktioniert es Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              So funktioniert der Immobilienkauf mit uns
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Erstgespräch</h3>
                  <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
                    In einem persönlichen Gespräch lernen wir Ihre Bedürfnisse kennen und definieren gemeinsam Ihr Suchprofil.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Immobiliensuche</h3>
                  <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
                    Wir suchen gezielt nach passenden Objekten und präsentieren Ihnen regelmäßig neue Angebote, die Ihren Vorstellungen entsprechen.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Besichtigungen</h3>
                  <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
                    Wir begleiten Sie zu den Besichtigungen und geben Ihnen wertvolle Hinweise zur Immobilie und zum Zustand.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Kaufentscheidung und Verhandlung</h3>
                  <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
                    Wenn Sie sich für eine Immobilie entschieden haben, führen wir die Verkaufsverhandlungen und sorgen für die bestmöglichen Konditionen.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-bgSecondary-l dark:bg-bgSecondary-d rounded border border-border-l dark:border-border-d">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white font-bold">
                    5
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Kaufabschluss</h3>
                  <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
                    Wir koordinieren alle notwendigen Schritte und begleiten Sie bis zur Schlüsselübergabe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warum Rumpke Section */}
        <AdvantagesSection
          title="Warum mit uns kaufen?"
          items={[
            {
              title: "Persönliche Betreuung",
              description: "Sie haben bei uns einen festen Ansprechpartner, der Sie während des gesamten Kaufprozesses begleitet und Ihnen jederzeit zur Verfügung steht."
            },
            {
              title: "Marktkenntnisse",
              description: "Dank unserer langjährigen Erfahrung kennen wir den lokalen Immobilienmarkt genau und können Sie optimal beraten."
            },
            {
              title: "Großes Netzwerk",
              description: "Durch unsere ausgezeichneten Kontakte zu Verkäufern, Notaren und Finanzierungspartnern haben Sie Zugang zu exklusiven Angeboten und professioneller Unterstützung."
            }
          ]}
        />

        {/* CTA Section */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Bereit für Ihre Traumimmobilie?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Kontaktieren Sie uns noch heute und lassen Sie uns gemeinsam Ihre perfekte Immobilie finden. Wir freuen uns darauf, Sie auf Ihrem Weg zum neuen Zuhause zu begleiten.
          </p>
          <ContactButton />
        </section>
      </div>
    </div>
  );
}
