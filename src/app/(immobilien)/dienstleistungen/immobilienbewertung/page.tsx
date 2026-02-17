import React from "react";

export default function ImmobilienbewertungPage() {
  return (
    <section className=" mx-auto ">
      <h1 className="text md:text-3xl font-bold  mb-6 text-center">Immobilienbewertung – Der erste Schritt zu Ihrem Erfolg</h1>
      <p className="text-base md:text-lg text-center mb-8 text-gray-800 dark:text-gray-200">
        Eine präzise Immobilienbewertung ist entscheidend, wenn es darum geht, den richtigen Verkaufspreis zu erzielen oder eine fundierte Entscheidung über Ihre Immobilie zu treffen. Bei Rumpke Immobilien bieten wir Ihnen eine professionelle und transparente Bewertung Ihrer Immobilie, die auf fundierten Marktkenntnissen und langjähriger Erfahrung basiert.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Warum eine professionelle Immobilienbewertung? */}
        <div className=" text-white bg-primary dark:bg-primary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Warum eine professionelle Immobilienbewertung?</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li><b>Marktorientierte Preisfindung:</b> Der Wert Ihrer Immobilie wird durch eine Vielzahl von Faktoren beeinflusst – Lage, Zustand, Größe, Ausstattung und vieles mehr. Wir analysieren all diese Aspekte und vergleichen sie mit aktuellen Marktdaten, um den optimalen Preis zu ermitteln.</li>
            <li><b>Vermeidung von Fehleinschätzungen:</b> Eine zu hohe oder zu niedrige Preisvorstellung kann zu Verzögerungen oder Verlusten führen. Mit unserer Expertise stellen wir sicher, dass Ihre Immobilie weder unter Wert noch überteuert angeboten wird.</li>
            <li><b>Fundierte Entscheidungsgrundlage:</b> Ob Verkauf, Vermietung oder Finanzierung – eine präzise Bewertung gibt Ihnen die Sicherheit, die richtigen Entscheidungen zu treffen.</li>
          </ul>
        </div>
        {/* Bewertungsprozess */}
        <div className=" bg-secondary dark:bg-secondary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Unser Bewertungsprozess</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li><b>Erstgespräch und Objektbesichtigung:</b> Wir beginnen mit einem persönlichen Gespräch, in dem wir Ihre Wünsche und Ziele besprechen. Anschließend nehmen wir eine detaillierte Besichtigung Ihrer Immobilie vor, um alle relevanten Merkmale zu erfassen.</li>
            <li><b>Marktanalyse:</b> Wir nutzen aktuelle Marktdaten und unsere umfassende Kenntnis der regionalen Gegebenheiten, um den Marktwert Ihrer Immobilie präzise zu bestimmen.</li>
            <li><b>Bewertungsbericht:</b> Sie erhalten von uns eine Einschätzung mit einer Preisempfehlung und auch eine Einschätzung der Vermarktungschancen.</li>
            <li><b>Beratung und Handlungsempfehlung:</b> Auf Basis der Bewertung besprechen wir mit Ihnen die nächsten Schritte und geben Ihnen konkrete Empfehlungen, wie Sie den Wert Ihrer Immobilie optimal nutzen können.</li>
          </ul>
        </div>
      </div>

      <div className="bg-primary/10 dark:bg-primary/20 rounded p-6 mb-8">
        <h3 className="text-lg font-bold  mb-2">Kontaktieren Sie uns für eine unverbindliche Beratung</h3>
        <p className="mb-2">Möchten Sie den Wert Ihrer Immobilie erfahren? Vereinbaren Sie noch heute einen Termin für eine unverbindliche Erstberatung. Wir freuen uns darauf, Sie kennenzulernen und Ihnen mit unserer Expertise zur Seite zu stehen.</p>
        <a href="/kontakt" className="inline-block mt-3 px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary-dark transition">Jetzt Termin vereinbaren</a>
      </div>
    </section>
  );
}
