import React from "react";

export default function () {
  return (
    <section className="mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold  mb-6 text-center">Verkauf & Vermietung von Immobilien</h1>
      <p className="text-base md:text-lg text-center mb-8">
        Ihr Erfolg ist unser Anspruch. Bei Rumpke Immobilien stehen Ihre Immobilienbedürfnisse im Mittelpunkt. Egal, ob Sie eine Immobilie vermieten oder verkaufen möchten – wir bieten Ihnen einen umfassenden Service, der keine Wünsche offenlässt.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Verkauf */}
        <div className=" text-white bg-primary dark:bg-primary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Verkauf – Erreichen Sie den besten Preis</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li><b>Professionelle Immobilienbewertung:</b> Wir ermitteln den aktuellen Marktwert Ihrer Immobilie unter Berücksichtigung aller relevanten Faktoren. Dies bildet die Grundlage für eine erfolgreiche Verkaufsstrategie.</li>
            <li><b>Attraktive Vermarktung:</b> Wir setzen Ihre Immobilie gekonnt in Szene – sei es durch hochwertige Exposés, ansprechende Fotografien oder virtuelle Rundgänge. Unser Ziel ist es, das Interesse potenzieller Käufer zu wecken und eine schnelle Vermarktung zu ermöglichen.</li>
            <li><b>Breite Käuferansprache:</b> Dank unserer umfangreichen Kundenkartei und unserer Online-Präsenz erreichen wir eine große Anzahl von Interessenten. So finden wir schnell den richtigen Käufer für Ihre Immobilie.</li>
            <li><b>Begleitung bis zum Abschluss:</b> Wir stehen Ihnen während des gesamten Verkaufsprozesses zur Seite – von der ersten Besichtigung bis zur finalen Vertragsunterzeichnung. Dabei übernehmen wir die Verhandlungen und sorgen für eine reibungslose Abwicklung.</li>
          </ul>
        </div>
        {/* Vermietung */}
        <div className="  bg-secondary dark:bg-secondary-dark rounded shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold  mb-3">Vermietung – Finden Sie den perfekten Mieter</h2>
          <ul className="list-disc list-inside space-y-2 ">
            <li><b>Marktgerechte Mietpreisfindung:</b> Wir analysieren den Markt und ermitteln den optimalen Mietpreis für Ihre Immobilie. So stellen wir sicher, dass Sie einen fairen Ertrag erzielen.</li>
            <li><b>Gezielte Mieterakquise:</b> Wir vermarkten Ihre Immobilie zielgerichtet und sprechen potenzielle Mieter über unsere vielfältigen Kanäle an. Dabei legen wir besonderen Wert auf eine sorgfältige Auswahl, um den passenden Mieter für Ihr Objekt zu finden.</li>
            <li><b>Rechtssichere Mietverträge:</b> Wir kümmern uns um die Erstellung und Prüfung aller relevanten Vertragsdokumente. So können Sie sicher sein, dass alle rechtlichen Anforderungen erfüllt sind.</li>
            <li><b>Umfassender Service:</b> Bei Rumpke Immobilien profitieren Sie nicht nur von einer professionellen Vermietung, sondern auch von einer umfassenden Übergabe und Abnahme.</li>
          </ul>
        </div>
      </div>

      <div className="bg-primary/10 dark:bg-primary/20 rounded p-6 mb-8">
        <h3 className="text-lg font-bold  mb-2">Warum Rumpke Immobilien?</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-100">
          <li><b>Individuelle Betreuung:</b> Jeder Kunde hat seine eigenen Vorstellungen und Ziele. Deshalb bieten wir maßgeschneiderte Lösungen, die genau auf Ihre Bedürfnisse abgestimmt sind.</li>
          <li><b>Erfahrung und Expertise:</b> Mit der Erfahrung im Immobiliengeschäft kennen wir den Markt und wissen, wie man erfolgreich vermietet und verkauft.</li>
          <li><b>Transparenz und Vertrauen:</b> Unsere Kunden schätzen unsere offene Kommunikation und unsere fairen Konditionen. Bei uns gibt es keine versteckten Kosten – Sie wissen von Anfang an, woran Sie sind.</li>
        </ul>
      </div>

      <div className="text-center mt-8">
        <h4 className="text-lg font-semibold mb-2">Kontaktieren Sie uns noch heute!</h4>
        <p className="mb-2">Haben Sie eine Immobilie, die Sie vermieten oder verkaufen möchten? Lassen Sie uns darüber sprechen. Wir freuen uns darauf, Sie kennenzulernen und gemeinsam den besten Weg für Ihr Immobilienprojekt zu finden.</p>
        <a href="/kontakt" className="inline-block mt-3 px-6 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-primary-dark transition">Kontakt aufnehmen</a>
      </div>
    </section>
  );
}
