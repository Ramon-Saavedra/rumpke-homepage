import type { Metadata } from "next";
import BackHomeButton from "@/components/features/back-home-buttom/BackHomeButton";
import { IoCallOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5";
import ContactForm from "@/components/features/contact-form/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nehmen Sie Kontakt mit Rumpke Immobilien auf. Erreichbar per Telefon, E-Mail oder persönlich in Bawinkel.",
};

export default function KontaktPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
      <BackHomeButton />

      <section
        aria-labelledby="contact-heading"
        className="mt-4 grid grid-cols-1 lg:grid-cols-[44%_1fr] min-h-130 border border-border-l dark:border-border-d overflow-hidden rounded-sm"
      >

        {/* Left panel – content */}
        <div className="bg-bgSecondary-l dark:bg-bgSecondary-d flex flex-col justify-center px-10 py-14 border-b lg:border-b-0 lg:border-r border-border-l dark:border-border-d">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">
            Rumpke Immobilien
          </p>
          <h1
            id="contact-heading"
            className="text-4xl font-bold leading-tight mb-3"
          >
            Sprechen wir.
          </h1>
          <p className="text-sm text-card-text-l dark:text-card-text-d mb-10 leading-relaxed">
            Wir sind für Sie da — gerne persönlich,<br className="hidden sm:block" /> per Telefon oder per E-Mail.
          </p>

          <div className="w-12 h-px bg-primary mb-10" aria-hidden="true" />

          <address className="not-italic space-y-4">
            <a
              href="tel:+491723244468"
              className="flex items-center gap-3 text-sm text-card-text-l dark:text-card-text-d hover:text-primary transition-colors group"
            >
              <IoCallOutline size={15} className="text-primary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>0172 – 32 444 68</span>
            </a>
            <a
              href="tel:+4959634599970"
              className="flex items-center gap-3 text-sm text-card-text-l dark:text-card-text-d hover:text-primary transition-colors group"
            >
              <IoCallOutline size={15} className="text-primary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>05963 – 45 999 70</span>
            </a>
            <a
              href="mailto:info@rumpke-immobilien.de"
              className="flex items-center gap-3 text-sm text-card-text-l dark:text-card-text-d hover:text-primary transition-colors group"
            >
              <IoMailOutline size={15} className="text-primary shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>info@rumpke-immobilien.de</span>
            </a>

            <hr className="border-0 h-px bg-border-l dark:bg-border-d my-2" aria-hidden="true" />

            <div className="flex items-start gap-3 text-sm text-card-text-l dark:text-card-text-d">
              <IoLocationOutline size={15} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>Römerstraße 9, 40811 Lingen</span>
            </div>
          </address>
        </div>

        {/* Right panel – decorative */}
        <div className="relative flex items-center justify-center bg-primary-surface dark:bg-bg-d overflow-hidden min-h-64 lg:min-h-0">
          {/* Outer circle */}
          <div
            className="absolute rounded-full w-105 h-105 bg-primary opacity-10 dark:opacity-5"
            aria-hidden="true"
          />
          {/* Inner circle */}
          <div
            className="absolute rounded-full w-60 h-60 bg-primary opacity-15 dark:opacity-10"
            aria-hidden="true"
          />

          {/* Person card */}
          <div className="relative z-10 bg-bgSecondary-l dark:bg-bgSecondary-d shadow-lg overflow-hidden rounded-sm w-52">
            <div className="h-0.5 w-full bg-primary" aria-hidden="true" />
            <div className="px-5 py-5">
              <p className="text-sm font-semibold leading-snug">Ann-Christin Rumpke</p>
              <p className="text-xs text-card-text-l dark:text-card-text-d mt-1.5 leading-snug">
                Immobilienmaklerin &amp;<br />Wertermittlerin
              </p>
            </div>
          </div>

          {/* Corner label */}
          <span
            className="absolute top-6 right-6 text-xs font-semibold tracking-widest uppercase text-primary"
            aria-hidden="true"
          >
            Kontakt
          </span>
        </div>
      </section>

      <section
        aria-labelledby="form-heading"
        className="mt-4 mb-8 border border-border-l dark:border-border-d overflow-hidden rounded-sm"
      >
        <ContactForm formHeadingId="form-heading" />
      </section>
    </main>
  );
}
