import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentLayout, {
  LegalSection,
} from "@/components/sections/legal-document/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Rechtliche Angaben und Anbieterkennzeichnung von Rumpke Immobilien.",
};

const toc = [
  { id: "geltungsbereich", label: "Geltungsbereich" },
  { id: "anbieter", label: "Angaben gemäß § 5 TMG" },
  { id: "aufsicht", label: "Vertretung & Aufsicht" },
  { id: "haftung", label: "Haftung für Inhalte und Links" },
  { id: "gueltigkeit", label: "Gültigkeit" },
] as const;

export default function ImpressumPage() {
  return (
    <LegalDocumentLayout
      eyebrow="Rechtliche Informationen"
      title="Impressum"
      description="Dieses Impressum gilt für die Website von Rumpke Immobilien und die zugehörigen digitalen Auftritte. Alle Angaben basieren auf den veröffentlichten Unternehmensinformationen der bisherigen Website."
      effectiveDate="26.07.2024"
      readingTime="Kompakte Übersicht"
      toc={toc}
    >
      <LegalSection
        id="geltungsbereich"
        title="Geltungsbereich"
        description="Die Anbieterkennzeichnung gilt für die Hauptdomain sowie die aufgeführten digitalen Präsenzen."
      >
        <p>
          Dieses Impressum gilt für alle Angebote unter der Domain{" "}
          <a
            href="https://www.rumpke-immobilien.de"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            www.rumpke-immobilien.de
          </a>{" "}
          inklusive aller Subdomains und Unterseiten.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-border-l bg-bg-l p-4 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Soziale Medien
            </p>
            <ul className="mt-3 space-y-2">
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className="border border-border-l bg-bg-l p-4 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Weitere Hinweise
            </p>
            <p className="mt-3">
              Die Datenschutzerklärung finden Sie auf der separaten Seite{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Datenschutz
              </Link>
              .
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="anbieter"
        title="Angaben gemäß § 5 TMG"
        description="Unternehmens- und Kontaktdaten der verantwortlichen Anbieterin."
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-lg font-semibold text-foreground">
              Rumpke Immobilien
            </p>
            <div className="mt-4 space-y-1">
              <p>Ann-Christin Rumpke</p>
              <p>Haselünner Straße 4-8</p>
              <p>49844 Bawinkel</p>
            </div>
          </div>

          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Kontakt
            </p>
            <div className="mt-4 space-y-3 wrap-break">
              <p>
                Telefon:{" "}
                <a
                  href="tel:+49596345999709"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  +49 (0) 5963-45999709
                </a>
              </p>
              <p>
                E-Mail:{" "}
                <a
                  href="mailto:info@rumpke-immobilien.de"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  info@rumpke-immobilien.de
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/491723244468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  0172 - 3244468
                </a>
              </p>
              <p>
                Kontaktformular:{" "}
                <Link
                  href="/kontakt"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  rumpke-immobilien.de/kontakt
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Umsatzsteuer-Identifikationsnummer
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">
              DE366828289
            </p>
          </div>

          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Vertretungsberechtigte Person
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">
              Ann-Christin Rumpke, Inhaberin
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="aufsicht"
        title="Vertretung und Aufsicht"
        description="Zuständige Stelle für die gewerberechtliche Aufsicht."
      >
        <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Zuständige Aufsichtsbehörde
          </p>
          <div className="mt-4 space-y-1">
            <p className="text-lg font-semibold text-foreground">
              Industrie- und Handelskammer Osnabrück - Emsland - Grafschaft
              Bentheim
            </p>
            <p>Neuer Graben 38</p>
            <p>49074 Osnabrück</p>
            <p>
              <a
                href="https://www.ihk.de/osnabrueck"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                www.ihk.de/osnabrueck
              </a>
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="haftung"
        title="Haftung für Inhalte und externe Links"
        description="Zusammenfassung der veröffentlichten Haftungshinweise der bisherigen Website."
      >
        <p>
          Alle Inhalte dieser Website wurden mit bestem Wissen und größter
          Sorgfalt erstellt. Dennoch übernehmen wir keine Gewähr für
          Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten
          Informationen.
        </p>
        <p>
          Soweit unsere Website Links zu externen Websites Dritter enthält,
          haben wir keinen Einfluss auf deren Inhalte. Für die Richtigkeit
          externer Inhalte übernehmen wir daher keine Gewähr; verantwortlich ist
          ausschließlich der jeweilige Anbieter der verlinkten Seite.
        </p>
        <p>
          Diese Hinweise gelten auch für Verweise und Links, die von
          Fragestellern, Bloggern oder Gästen in Diskussionsforen auf unserer
          Internetseite platziert werden. Wir sind gemäß §§ 8 bis 10 TMG nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung von Informationen nach
          den allgemeinen Gesetzen bleiben hiervon unberührt. Eine Haftung ist
          jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
          Rechtsverletzung möglich. Sobald uns entsprechende Rechtsverletzungen
          bekannt werden, entfernen wir die betroffenen Inhalte unverzüglich.
        </p>
      </LegalSection>

      <LegalSection
        id="gueltigkeit"
        title="Gültigkeit"
        description="Versionierung der auf dieser Seite veröffentlichten Angaben."
      >
        <p>Dieses Impressum gilt in der vorliegenden Fassung ab dem 26.07.2024.</p>
      </LegalSection>
    </LegalDocumentLayout>
  );
}
