import React from "react";

export default function () {
  return (
    <section className="mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold  mb-6 text-center">Unsere Leistungen im Bereich Immobilieneinkauf</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-10">

        <div className=" text-white rounded shadow p-6 flex flex-col bg-primary dark:bg-primary-dark">
          <h2 className="text-xl font-semibold  mb-3">Persönliche Beratung</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li><b>Bedarfsanalyse:</b> Wir nehmen uns Zeit, um Ihre individuellen Wünsche und Anforderungen zu verstehen. Ob Wohnimmobilie oder Gewerbeobjekt, wir stellen sicher, dass die Immobilie perfekt zu Ihnen passt.</li>
            <li><b>Marktkenntnis:</b> Dank unserer umfassenden Marktkenntnisse und unserem regionalen Netzwerk können wir Ihnen Immobilien anbieten, die oft gar nicht erst auf den öffentlichen Markt gelangen.</li>
          </ul>
        </div>

        <div className=" bg-secondary dark:bg-secondary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Objektsuche und Auswahl</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li><b>Gezielte Immobiliensuche:</b> Auf Basis Ihrer Vorstellungen suchen wir gezielt nach passenden Immobilien. Dabei greifen wir auf unser Netzwerk und unsere Datenbanken zurück.</li>
            <li><b>Exklusive Angebote:</b> Oftmals haben wir Zugang zu exklusiven Immobilienangeboten, die noch nicht auf dem freien Markt verfügbar sind. So bieten wir Ihnen die besten Chancen, Ihr Traumobjekt zu finden.</li>
            <li><b>Objektbesichtigungen:</b> Wir organisieren und begleiten Sie zu den Besichtigungen der ausgewählten Immobilien und beraten Sie umfassend vor Ort.</li>
          </ul>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mb-10">

        <div className=" bg-secondary dark:bg-secondary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Preisverhandlung und Kaufabwicklung</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
            <li><b>Verhandlungsführung:</b> Wir vertreten Ihre Interessen und führen die Preisverhandlungen mit dem Verkäufer. Unser Ziel ist es, den besten Kaufpreis für Sie zu erzielen.</li>
            <li><b>Kaufvertragsprüfung:</b> Wir überprüfen den Kaufvertrag auf Herz und Nieren, um sicherzustellen, dass alle rechtlichen Aspekte zu Ihren Gunsten geklärt sind.</li>
            <li><b>Finanzierungsberatung:</b> Wir unterstützen Sie bei der Suche nach der passenden Finanzierungslösung und stehen Ihnen während des gesamten Prozesses zur Seite.</li>
          </ul>
        </div>
        {/* After-Sales-Service */}
        <div className=" text-white bg-primary dark:bg-primary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">After-Sales-Service</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li><b>Übergabe und Nachbetreuung:</b> Auch nach dem Kauf lassen wir Sie nicht allein. Wir begleiten Sie bei der Schlüsselübergabe und stehen Ihnen für alle weiteren Fragen zur Verfügung.</li>
            <li><b>Renovierungs- und Umbauberatung:</b> Sollten Sie Renovierungs- oder Umbaupläne haben, vermitteln wir Ihnen gerne zuverlässige Handwerker und beraten Sie zu den möglichen Maßnahmen.</li>
          </ul>
        </div>
      </div>
      <div className="bg-primary/10 dark:bg-primary/20 rounded p-6 mb-8">
        <h3 className="text-lg font-bold  mb-2">Starten Sie Ihr Immobilienprojekt mit uns!</h3>
        <p className="mb-2">Sind Sie auf der Suche nach der perfekten Immobilie? Lassen Sie uns darüber sprechen. Kontaktieren Sie uns noch heute für eine unverbindliche Beratung. Wir freuen uns darauf, Ihnen bei Ihrem Immobilieneinkauf zur Seite zu stehen.</p>
        <a href="/kontakt" className="inline-block mt-3 px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary-dark transition">Jetzt Beratung anfragen</a>
      </div>
    </section>
  );
}
