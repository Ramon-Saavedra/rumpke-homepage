import Image from "next/image";
import Link from "next/link";
import { SHOWCASE_CTA_COMPACT_CLASS } from "./showcase-cta";

interface PropertyShowcaseEmptyProps {
  readonly error?: boolean;
}

export default function PropertyShowcaseEmpty({
  error = false,
}: PropertyShowcaseEmptyProps) {
  const heading = error
    ? "Immobilien derzeit nicht verfügbar"
    : "Neue Objekte in Vorbereitung";
  const body = error
    ? "Der Objektbestand lässt sich gerade nicht laden. Versuchen Sie es später erneut – oder lassen Sie sich direkt persönlich beraten."
    : "Aktuell sind alle Objekte vermittelt. Wir bereiten neue Angebote vor – oder finden gemeinsam Ihr passendes Zuhause.";
  const primaryLabel = error ? "Kontakt aufnehmen" : "Suchauftrag anlegen";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border-l bg-bgSecondary-l sm:flex-row dark:border-border-d dark:bg-bgSecondary-d">
      <div className="relative aspect-[16/9] w-full sm:aspect-[5/4] sm:w-[42%] sm:shrink-0">
        <Image
          src="/imgs/contact-our-office.jpg"
          alt="Beratungsbüro von Rumpke Immobilien"
          fill
          sizes="(max-width: 640px) 100vw, 330px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">
          {heading}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
          {body}
        </p>

        <Link href="/kontakt" className={`mt-5 ${SHOWCASE_CTA_COMPACT_CLASS}`}>
          {primaryLabel}
        </Link>

        {!error && (
          <Link
            href="/dienstleistungen"
            className="mt-3 w-fit text-[13px] font-semibold text-primary underline underline-offset-4 hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Persönlich beraten lassen
          </Link>
        )}
      </div>
    </div>
  );
}
