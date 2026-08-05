"use client";

import "./globals.css";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="de">
      <body>
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bgSecondary-l px-4 text-center text-foreground dark:bg-bgSecondary-d"
        >
          <h2 className="font-serif text-3xl font-semibold">
            Kritischer Fehler
          </h2>

          <p className="max-w-md text-card-text-l dark:text-card-text-d">
            Ein schwerwiegender Fehler ist aufgetreten. Die Seite konnte nicht
            geladen werden.
            {error.digest && (
              <span className="block text-sm mt-2 text-card-text-l dark:text-card-text-d">
                Fehler-ID: {error.digest}
              </span>
            )}
          </p>

          <button
            onClick={unstable_retry}
            className={buttonVariants({ variant: "primary" })}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
