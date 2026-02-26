import ContactButton from "@/components/ui/contact-button/ContactButton";
import ServiceCard from "@/components/ui/service-card/ServiceCard";
import AdvantagesSection from "@/components/ui/advantages-section/AdvantagesSection";

export default function VerkaufVermietungPage() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Verkauf und Vermietung von Immobilien
        </h1>
        <p className="text-lg text-center text-card-text-l dark:text-card-text-d">
          Ihr Erfolg ist unser Anspruch
        </p>
        <p className="text-center mt-4  max-w-3xl mx-auto">
          Bei Rumpke Immobilien stehen Ihre Immobilienbedürfnisse im Mittelpunkt. Egal, ob Sie eine Immobilie vermieten oder verkaufen möchten – wir bieten Ihnen einen umfassenden Service, der keine Wünsche offenlässt.
        </p>
      </div>

      <div className="space-y-12">
        {/* Verkauf Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Verkauf – Erreichen Sie den besten Preis
            </h2>
            <p className=" leading-relaxed">
              Der Verkauf einer Immobilie ist eine bedeutende Entscheidung. Mit Rumpke Immobilien an Ihrer Seite erzielen Sie den bestmöglichen Verkaufserlös:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ServiceCard
              title="Professionelle Immobilienbewertung"
              description="Wir ermitteln den aktuellen Marktwert Ihrer Immobilie unter Berücksichtigung aller relevanten Faktoren. Dies bildet die Grundlage für eine erfolgreiche Verkaufsstrategie."
            />
            <ServiceCard
              title="Attraktive Vermarktung"
              description="Wir setzen Ihre Immobilie gekonnt in Szene – sei es durch hochwertige Exposés, ansprechende Fotografien oder virtuelle Rundgänge. Unser Ziel ist es, das Interesse potenzieller Käufer zu wecken und eine schnelle Vermarktung zu ermöglichen."
            />
            <ServiceCard
              title="Breite Käuferansprache"
              description="Dank unserer umfangreichen Kundenkartei und unserer Online-Präsenz erreichen wir eine große Anzahl von Interessenten. So finden wir schnell den richtigen Käufer für Ihre Immobilie."
            />
            <ServiceCard
              title="Begleitung bis zum Abschluss"
              description="Wir stehen Ihnen während des gesamten Verkaufsprozesses zur Seite – von der ersten Besichtigung bis zur finalen Vertragsunterzeichnung. Dabei übernehmen wir die Verhandlungen und sorgen für eine reibungslose Abwicklung."
            />
          </div>
        </section>

        {/* Vermietung Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Vermietung – Finden Sie den perfekten Mieter
            </h2>
            <p className=" leading-relaxed">
              Sie möchten Ihre Immobilie zuverlässig und rentabel vermieten? Wir unterstützen Sie bei jedem Schritt:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ServiceCard
              title="Marktgerechte Mietpreisfindung"
              description="Wir analysieren den Markt und ermitteln den optimalen Mietpreis für Ihre Immobilie. So stellen wir sicher, dass Sie einen fairen Ertrag erzielen."
            />
            <ServiceCard
              title="Gezielte Mieterakquise"
              description="Wir vermarkten Ihre Immobilie zielgerichtet und sprechen potenzielle Mieter über unsere vielfältigen Kanäle an. Dabei legen wir besonderen Wert auf eine sorgfältige Auswahl, um den passenden Mieter für Ihr Objekt zu finden."
            />
            <ServiceCard
              title="Rechtssichere Mietverträge"
              description="Wir kümmern uns um die Erstellung und Prüfung aller relevanten Vertragsdokumente. So können Sie sicher sein, dass alle rechtlichen Anforderungen erfüllt sind."
            />
            <ServiceCard
              title="Umfassender Service"
              description="Bei Rumpke Immobilien profitieren Sie nicht nur von einer professionellen Vermietung, sondern auch von einer umfassenden Übergabe und Abnahme."
            />
          </div>
        </section>

        {/* Warum Rumpke Section */}
        <AdvantagesSection
          title="Warum Rumpke Immobilien?"
          items={[
            {
              title: "Individuelle Betreuung",
              description: "Jeder Kunde hat seine eigenen Vorstellungen und Ziele. Deshalb bieten wir maßgeschneiderte Lösungen, die genau auf Ihre Bedürfnisse abgestimmt sind."
            },
            {
              title: "Erfahrung und Expertise",
              description: "Mit der Erfahrung im Immobiliengeschäft kennen wir den Markt und wissen, wie man erfolgreich vermietet und verkauft."
            },
            {
              title: "Transparenz und Vertrauen",
              description: "Unsere Kunden schätzen unsere offene Kommunikation und unsere fairen Konditionen. Bei uns gibt es keine versteckten Kosten – Sie wissen von Anfang an, woran Sie sind."
            }
          ]}
        />
        {/* CTA Section */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Kontaktieren Sie uns noch heute!</h2>
          <p className=" mb-6 max-w-2xl mx-auto">
            Haben Sie eine Immobilie, die Sie vermieten oder verkaufen möchten? Lassen Sie uns darüber sprechen. Wir freuen uns darauf, Sie kennenzulernen und gemeinsam den besten Weg für Ihr Immobilienprojekt zu finden.
          </p>
          <ContactButton text="Kontakt aufnehmen" />
        </section>
      </div>
    </div>
  );
}
