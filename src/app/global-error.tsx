'use client'

import { useEffect } from 'react'
import './globals.css'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }, [error])

  return (
    <html lang="de">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4 bg-bgSecondary-l dark:bg-bgSecondary-d text-foreground">
          <h2 className="text-3xl font-bold">Kritischer Fehler</h2>

          <p className="max-w-md text-card-text-l dark:text-card-text-d">
            Ein schwerwiegender Fehler ist aufgetreten. Die Seite konnte nicht geladen werden.
            {error.digest && (
              <span className="block text-sm mt-2 text-card-text-l dark:text-card-text-d">
                Fehler-ID: {error.digest}
              </span>
            )}
          </p>

          <button
            onClick={unstable_retry}
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  )
}
