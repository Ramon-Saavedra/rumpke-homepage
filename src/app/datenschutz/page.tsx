import type { Metadata } from "next";
import LegalDocumentLayout, {
  LegalSection,
} from "@/components/sections/legal-document/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Rumpke Immobilien mit Angaben zu Verarbeitung, Speicherdauer und Betroffenenrechten.",
};

const toc = [
  { id: "allgemeine-hinweise", label: "Allgemeine Hinweise" },
  { id: "datenverwendung", label: "Datenverwendung" },
  { id: "kontaktformular", label: "Kontaktformular" },
  { id: "google-maps", label: "Google Maps" },
  { id: "sicherheit", label: "Sicherheit & Speicherdauer" },
  { id: "rechte", label: "Betroffenenrechte" },
  { id: "beschwerde", label: "Beschwerderecht" },
  { id: "gueltigkeit", label: "Gültigkeit & Änderungen" },
] as const;

const erasureReasons = [
  "Ihre personenbezogenen Daten sind für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig.",
  "Sie widerrufen Ihre Einwilligung, auf die sich die Verarbeitung gemäß Art. 6 Abs. 1 lit. a oder Art. 9 Abs. 2 lit. a DSGVO stützte, und es fehlt an einer anderweitigen Rechtsgrundlage für die Verarbeitung.",
  "Sie legen gemäß Art. 21 Abs. 1 DSGVO Widerspruch gegen die Verarbeitung ein und es liegen keine vorrangigen berechtigten Gründe für die Verarbeitung vor, oder Sie legen gemäß Art. 21 Abs. 2 DSGVO Widerspruch gegen die Verarbeitung ein.",
  "Die personenbezogenen Daten wurden unrechtmäßig verarbeitet.",
  "Die Löschung der personenbezogenen Daten ist zur Erfüllung einer rechtlichen Verpflichtung nach dem Unionsrecht oder dem Recht des Mitgliedstaates erforderlich, dem wir unterliegen.",
  "Die personenbezogenen Daten wurden in Bezug auf angebotene Dienste der Informationsgesellschaft gemäß Art. 8 Abs. 1 DSGVO erhoben.",
] as const;

const erasureExceptions = [
  "zur Ausübung des Rechts auf freie Meinungsäußerung und Information",
  "zur Erfüllung einer rechtlichen Verpflichtung oder zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt",
  "aus Gründen des öffentlichen Interesses im Bereich der öffentlichen Gesundheit gemäß Art. 9 Abs. 2 lit. h und i sowie Art. 9 Abs. 3 DSGVO",
  "für im öffentlichen Interesse liegende Archivzwecke, wissenschaftliche oder historische Forschungszwecke oder für statistische Zwecke gemäß Art. 89 Abs. 1 DSGVO",
  "zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen",
] as const;

const restrictionCases = [
  "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung zu verlangen.",
  "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah oder geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
  "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung zu verlangen.",
  "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung zu verlangen.",
] as const;

const automatedDecisionCases = [
  "für den Abschluss oder die Erfüllung eines Vertrags zwischen Ihnen und uns erforderlich ist",
  "aufgrund von Rechtsvorschriften der Union oder der Mitgliedstaaten zulässig ist und diese angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten enthalten",
  "mit Ihrer ausdrücklichen Einwilligung erfolgt",
] as const;

const rights = [
  {
    title: "Widerrufsrecht",
    paragraphs: [
      "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sofern die Verarbeitung Ihrer Daten auf Ihrer Einwilligung beruht, haben Sie das Recht, eine einmal erteilte Einwilligung in die Verarbeitung von Daten gemäß Art. 7 Abs. 3 DSGVO jederzeit mit Wirkung für die Zukunft zu widerrufen.",
      "Durch den Widerruf wird die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung nicht berührt. Eine Speicherung für Abrechnungs- und buchhalterische Zwecke bleibt von einem Widerruf unberührt.",
    ],
  },
  {
    title: "Auskunftsrecht",
    paragraphs: [
      "Gemäß Art. 15 DSGVO können Sie eine Bestätigung darüber verlangen, ob wir personenbezogene Daten zu Ihrer Person verarbeiten. Liegt eine solche Verarbeitung vor, haben Sie Anspruch auf Auskunft über die verarbeiteten Daten, die Verarbeitungszwecke, Empfänger oder Empfängerkategorien, Speicherdauer, Herkunft der Daten, bestehende Rechte sowie Informationen über automatisierte Entscheidungsfindungen einschließlich Profiling.",
    ],
  },
  {
    title: "Recht auf Berichtigung",
    paragraphs: [
      "Gemäß Art. 16 DSGVO haben Sie das Recht, die unverzügliche Berichtigung unrichtiger personenbezogener Daten oder die Vervollständigung unvollständiger Daten zu verlangen.",
    ],
  },
  {
    title: "Recht auf Löschung",
    paragraphs: [
      "Gemäß Art. 17 DSGVO können Sie die Löschung Ihrer personenbezogenen Daten verlangen, sofern einer der folgenden Gründe vorliegt:",
    ],
    listItems: erasureReasons,
    closing:
      "Wurden personenbezogene Daten öffentlich gemacht und sind wir zu deren Löschung verpflichtet, treffen wir unter Berücksichtigung der verfügbaren Technologie und der Implementierungskosten angemessene Maßnahmen, um andere Verantwortliche über Ihr Löschungsverlangen zu informieren.",
  },
  {
    title: "Ausnahmen vom Recht auf Löschung",
    paragraphs: [
      "Das Recht auf Löschung besteht nicht, soweit die Verarbeitung erforderlich ist:",
    ],
    listItems: erasureExceptions,
  },
  {
    title: "Recht auf Einschränkung der Verarbeitung",
    paragraphs: [
      "Gemäß Art. 18 DSGVO können Sie die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen. Hierzu können Sie sich jederzeit an die im Impressum angegebene Adresse wenden. Das Recht besteht insbesondere in folgenden Fällen:",
    ],
    listItems: restrictionCases,
    closing:
      "Wenn die Verarbeitung eingeschränkt wurde, dürfen diese Daten - von ihrer Speicherung abgesehen - nur mit Ihrer Einwilligung, zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen, zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses verarbeitet werden.",
  },
  {
    title: "Recht auf Unterrichtung",
    paragraphs: [
      "Haben Sie ein Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung geltend gemacht, sind wir verpflichtet, allen Empfängern, denen Ihre personenbezogenen Daten offengelegt wurden, diese Änderung mitzuteilen, sofern dies nicht unmöglich oder mit unverhältnismäßigem Aufwand verbunden ist.",
    ],
  },
  {
    title:
      "Recht, nicht einer ausschließlich automatisierten Entscheidung unterworfen zu werden",
    paragraphs: [
      "Gemäß Art. 22 DSGVO haben Sie das Recht, nicht einer ausschließlich auf automatisierter Verarbeitung - einschließlich Profiling - beruhenden Entscheidung unterworfen zu werden, die Ihnen gegenüber rechtliche Wirkung entfaltet oder Sie in ähnlicher Weise erheblich beeinträchtigt.",
      "Dies gilt nicht, wenn die Entscheidung:",
    ],
    listItems: automatedDecisionCases,
    closing:
      "In den zulässigen Fällen treffen wir angemessene Maßnahmen zur Wahrung Ihrer Rechte und Freiheiten, einschließlich des Rechts auf Eingreifen einer Person, auf Darlegung des eigenen Standpunkts und auf Anfechtung der Entscheidung.",
  },
  {
    title: "Recht auf Datenübertragbarkeit",
    paragraphs: [
      "Sofern die Verarbeitung auf Ihrer Einwilligung oder auf einem Vertrag beruht und mithilfe automatisierter Verfahren erfolgt, haben Sie gemäß Art. 20 DSGVO das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen, soweit dies technisch machbar ist.",
    ],
  },
  {
    title: "Widerspruchsrecht",
    paragraphs: [
      "Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung nach Art. 6 Abs. 1 lit. f DSGVO stützen, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch gegen die Verarbeitung einzulegen.",
      "Werden personenbezogene Daten verarbeitet, um Direktwerbung zu betreiben, können Sie jederzeit Widerspruch gegen diese Verarbeitung einlegen. Nach Ihrem Widerspruch werden Ihre Daten nicht mehr für Zwecke der Direktwerbung verwendet.",
      "Im Zusammenhang mit der Nutzung von Diensten der Informationsgesellschaft können Sie Ihr Widerspruchsrecht auch mittels automatisierter Verfahren ausüben, bei denen technische Spezifikationen verwendet werden.",
    ],
  },
] as const;

export default function DatenschutzPage() {
  return (
    <LegalDocumentLayout
      eyebrow="Datenschutz"
      title="Datenschutzerklärung"
      description="Diese Datenschutzerklärung fasst die auf der bisherigen Website veröffentlichten Hinweise zur Verarbeitung personenbezogener Daten, zu Sicherheitsmaßnahmen und zu Ihren Rechten nach DSGVO zusammen."
      effectiveDate="26.07.2024"
      readingTime="Ausführliche Fassung"
      toc={toc}
    >
      <LegalSection
        id="allgemeine-hinweise"
        title="Allgemeine Hinweise"
        description="Einordnung der Datenverarbeitung und verantwortliche Stelle."
      >
        <p>
          Diese Datenschutzerklärung enthält ausführliche Informationen darüber,
          was mit Ihren persönlichen Daten passiert, wenn Sie unsere Website{" "}
          <a
            href="https://www.rumpke-immobilien.de"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            www.rumpke-immobilien.de
          </a>{" "}
          besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie sich
          persönlich identifizieren können. Wir halten uns bei der Verarbeitung
          streng an die gesetzlichen Bestimmungen, insbesondere an die DSGVO,
          und legen großen Wert darauf, dass Ihr Besuch auf unserer Website
          sicher ist.
        </p>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Verantwortliche Stelle
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-lg font-semibold text-foreground">
                Rumpke Immobilien
              </p>
              <p>Ann-Christin Rumpke</p>
              <p>Haselünner Straße 4-8</p>
              <p>49844 Bawinkel</p>
            </div>
          </div>

          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Direkter Kontakt
            </p>
            <div className="mt-4 space-y-3 wrap-break-word">
              <p>
                <a
                  href="mailto:info@rumpke-immobilien.de"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  info@rumpke-immobilien.de
                </a>
              </p>
              <p>
                <a
                  href="tel:+49596345999709"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  +49 (0) 5963-45999709
                </a>
              </p>
              <p>
                <a
                  href="tel:+491723244468"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  +49 (0) 172-3244468
                </a>
              </p>
            </div>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="datenverwendung"
        title="Datenverwendung und -weitergabe"
        description="Grundsätze zur Nutzung personenbezogener Daten."
      >
        <p>
          Personenbezogene Daten, die Sie uns beispielsweise per E-Mail
          mitteilen, verarbeiten wir ausschließlich zur Korrespondenz mit Ihnen
          und für den Zweck, zu dem Sie uns die Daten zur Verfügung gestellt
          haben.
        </p>
        <p>
          Eine Weitergabe an Dritte erfolgt nicht, sofern keine gesetzliche
          Verpflichtung besteht oder Sie zuvor ausdrücklich eingewilligt haben.
          Zahlungsdaten werden ausschließlich an das mit der Zahlung beauftragte
          Kreditinstitut weitergegeben.
        </p>
        <p>
          Daten, die bei Ihrem Besuch unserer Website automatisch erhoben
          werden, nutzen wir ebenfalls nur zu den in dieser Erklärung genannten
          Zwecken.
        </p>
      </LegalSection>

      <LegalSection
        id="kontaktformular"
        title="Kontaktformular und E-Mail-Anfragen"
        description="Wie wir übermittelte Kontaktdaten verarbeiten."
      >
        <p>
          Wenn Sie mit uns per E-Mail oder über ein Kontaktformular Kontakt
          aufnehmen, speichern wir die übermittelten Daten einschließlich Ihrer
          Kontaktdaten, um Ihre Anfrage zu bearbeiten und für eventuelle
          Anschlussfragen verfügbar zu halten.
        </p>
        <p>
          Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer
          Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Eine bereits erteilte
          Einwilligung können Sie jederzeit formlos per E-Mail widerrufen.
        </p>
        <p>
          Übermittelte Daten verbleiben bei uns, bis Sie uns zur Löschung
          auffordern, Ihre Einwilligung widerrufen oder keine Notwendigkeit der
          Datenspeicherung mehr besteht. Zwingende gesetzliche
          Aufbewahrungsfristen bleiben unberührt.
        </p>
      </LegalSection>

      <LegalSection
        id="google-maps"
        title="Google Maps"
        description="Einbindung des Kartendienstes auf der Website."
      >
        <p>
          Unsere Website nutzt über eine API den Kartendienst Google Maps der
          Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Ireland.
        </p>
        <p>
          Um den Datenschutz zu gewährleisten, ist Google Maps beim ersten
          Besuch deaktiviert. Eine direkte Verbindung zu den Servern von Google
          wird erst hergestellt, wenn Sie die Karte selbst aktivieren. Dadurch
          werden Daten nicht bereits beim ersten Seitenaufruf an Google
          übertragen.
        </p>
        <p>
          Nach der Aktivierung wird Ihre IP-Adresse in der Regel an einen
          Server von Google in den USA übertragen und dort gespeichert. Weitere
          Informationen finden Sie in der{" "}
          <a
            href="https://www.google.de/intl/de/policies/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection
        id="sicherheit"
        title="Sicherheit und Speicherdauer"
        description="Technische Schutzmaßnahmen und Dauer der Datenspeicherung."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              SSL- bzw. TLS-Verschlüsselung
            </p>
            <p className="mt-4">
              Unsere Website nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL- beziehungsweise
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am
              Wechsel von &quot;http://&quot; zu &quot;https://&quot; und am Schloss-Symbol
              in der Browserzeile.
            </p>
          </div>
          <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Speicherdauer
            </p>
            <p className="mt-4">
              Personenbezogene Daten speichern wir nur so lange, bis der Zweck
              erfüllt ist, zu dem sie uns anvertraut wurden. Soweit handels-
              oder steuerrechtliche Aufbewahrungsfristen gelten, kann die
              Speicherdauer für bestimmte Daten bis zu zehn Jahre betragen.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="rechte"
        title="Betroffenenrechte"
        description="Ihre Rechte nach der DSGVO in strukturierter Form."
      >
        <div className="space-y-4">
          {rights.map((right) => (
            <div
              key={right.title}
              className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {right.title}
              </h3>
              <div className="mt-4 space-y-4">
                {right.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {"listItems" in right && right.listItems ? (
                  <ol className="list-decimal space-y-2 pl-5">
                    {right.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}
                {"closing" in right && right.closing ? <p>{right.closing}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </LegalSection>

      <LegalSection
        id="beschwerde"
        title="Beschwerderecht bei der zuständigen Aufsichtsbehörde"
        description="Zuständige Datenschutzaufsicht gemäß Art. 77 DSGVO."
      >
        <p>
          Im Falle von Verstößen gegen die DSGVO steht Betroffenen ein
          Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem
          Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder
          des Orts des mutmaßlichen Verstoßes.
        </p>
        <div className="border border-border-l bg-bg-l p-5 dark:border-border-d dark:bg-bg-d">
          <p className="text-lg font-semibold text-foreground">
            Die Landesbeauftragte für den Datenschutz Niedersachsen
          </p>
          <div className="mt-4 space-y-1">
            <p>Prinzenstraße 5</p>
            <p>30159 Hannover</p>
            <p>
              Telefon:{" "}
              <a
                href="tel:+495111204500"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                05 11/120-45 00
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:poststelle@lfd.niedersachsen.de"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                poststelle@lfd.niedersachsen.de
              </a>
            </p>
            <p>
              Internet:{" "}
              <a
                href="https://lfd.niedersachsen.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                lfd.niedersachsen.de
              </a>
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection
        id="gueltigkeit"
        title="Gültigkeit und Änderungen"
        description="Hinweis zur Versionierung der Datenschutzerklärung."
      >
        <p>
          Diese Datenschutzerklärung gilt ab dem 26. Juli 2024. Wir behalten uns
          das Recht vor, sie jederzeit unter Beachtung der geltenden
          Datenschutzvorschriften zu ändern, etwa zur Einhaltung neuer
          Gesetzesbestimmungen oder wegen Änderungen unserer Website und ihrer
          Dienstleistungen.
        </p>
        <p>
          Maßgeblich ist jeweils die zum Zeitpunkt Ihres Besuchs abrufbare
          Fassung. Sollten Änderungen erfolgen, werden diese auf dieser Seite
          bekannt gegeben.
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
}
