import Image from "next/image";
import Link from "next/link";
import { SHOWCASE_CTA_COMPACT_CLASS } from "./showcase-cta";
import { cn } from "@/lib/utils";
import { SKELETON_BLOCK } from "./showcase-skeleton";

interface PropertyShowcaseEmptyProps {
  readonly error?: boolean;
  readonly isLoading?: boolean;
}

const EMPTY_CARD_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col overflow-hidden border border-border-l bg-bgSecondary-l sm:flex-row dark:border-border-d dark:bg-bgSecondary-d";

const EMPTY_MEDIA_CLASS =
  "relative aspect-video w-full sm:aspect-5/4 sm:w-[42%] sm:shrink-0";

const EMPTY_BODY_CLASS = "flex flex-1 flex-col justify-center p-6 sm:p-7";

function EmptySkeleton() {
  return (
    <div className={EMPTY_CARD_CLASS} aria-hidden="true">
      <div className={cn(EMPTY_MEDIA_CLASS, SKELETON_BLOCK)} />
      <div className={EMPTY_BODY_CLASS}>
        <div className={cn("h-6 w-3/5", SKELETON_BLOCK)} />
        <div className={cn("mt-2.5 h-4 w-full", SKELETON_BLOCK)} />
        <div className={cn("mt-1.5 h-4 w-4/5", SKELETON_BLOCK)} />
        <div className={cn("mt-5 h-10 w-44 rounded-full", SKELETON_BLOCK)} />
        <div className={cn("mt-3 h-4 w-36", SKELETON_BLOCK)} />
      </div>
    </div>
  );
}

export default function PropertyShowcaseEmpty({
  error = false,
  isLoading = false,
}: PropertyShowcaseEmptyProps) {
  if (isLoading) {
    return <EmptySkeleton />;
  }

  const heading = error
    ? "Immobilien derzeit nicht verfügbar"
    : "Neue Objekte in Vorbereitung";
  const body = error
    ? "Der Objektbestand lässt sich gerade nicht laden. Versuchen Sie es später erneut – oder lassen Sie sich direkt persönlich beraten."
    : "Aktuell sind alle Objekte vermittelt. Wir bereiten neue Angebote vor – oder finden gemeinsam Ihr passendes Zuhause.";
  const primaryLabel = error ? "Kontakt aufnehmen" : "Suchauftrag anlegen";

  return (
    <div className={EMPTY_CARD_CLASS}>
      <div className={EMPTY_MEDIA_CLASS}>
        <Image
          src="/imgs/contact-our-office.jpg"
          alt="Beratungsbüro von Rumpke Immobilien"
          fill
          sizes="(max-width: 640px) 100vw, 330px"
          className="object-cover"
        />
      </div>

      <div className={EMPTY_BODY_CLASS}>
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
