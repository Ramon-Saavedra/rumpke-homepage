"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <h2 className="font-serif text-3xl font-semibold text-foreground">
        Etwas ist schiefgelaufen
      </h2>

      <p className="text-card-text-l dark:text-card-text-d max-w-md">
        Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es
        erneut.
        {error.digest && (
          <span className="mt-2 block text-sm text-card-text-l dark:text-card-text-d">
            Fehler-ID: {error.digest}
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={unstable_retry}
          className={buttonVariants({ variant: "primary" })}
        >
          Erneut versuchen
        </button>
        <Link href="/" className={buttonVariants({ variant: "secondary" })}>
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
