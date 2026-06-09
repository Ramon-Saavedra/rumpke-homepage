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
        className="mt-4 border border-border-l dark:border-border-d overflow-hidden rounded-sm bg-bgSecondary-l dark:bg-bgSecondary-d px-10 py-14"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">
              Rumpke Immobilien
            </p>
            <h1
              id="contact-heading"
              className="text-4xl font-bold leading-tight mb-3"
            >
              Sprechen wir.
            </h1>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed">
              Wir sind für Sie da — gerne persönlich, per Telefon oder per E-Mail.
            </p>
          </div>

          <address className="not-italic flex flex-col sm:flex-row flex-wrap gap-6 lg:gap-10">
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
            <div className="flex items-start gap-3 text-sm text-card-text-l dark:text-card-text-d">
              <IoLocationOutline size={15} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>Römerstraße 9, 40811 Lingen</span>
            </div>
          </address>
        </div>
      </section>

      <section
        aria-labelledby="form-heading"
        className="mt-4 mb-8 border border-border-l dark:border-border-d overflow-hidden rounded-sm bg-bgSecondary-l dark:bg-bgSecondary-d"
      >
        <ContactForm formHeadingId="form-heading" />
      </section>
    </main>
  );
}

