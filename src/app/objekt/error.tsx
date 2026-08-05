"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export default function Error() {
  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <h2 className="font-serif text-3xl font-semibold text-foreground">
        Immobilie nicht verfügbar
      </h2>
      <p className="text-card-text-l dark:text-card-text-d max-w-md">
        Der Immobilienservice ist derzeit nicht erreichbar. Bitte versuchen Sie
        es später erneut.
      </p>
      <Link href="/objekt" className={buttonVariants({ variant: "primary" })}>
        Zur Übersicht
      </Link>
    </div>
  );
}
