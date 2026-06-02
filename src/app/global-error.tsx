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
    console.error(error)
  }, [error])

  return (
    <html lang="de">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
          <h2 className="text-3xl font-bold">Kritischer Fehler</h2>

          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            Ein schwerwiegender Fehler ist aufgetreten. Die Seite konnte nicht geladen werden.
            {error.digest && (
              <span className="block text-sm mt-2 text-zinc-500">
                Fehler-ID: {error.digest}
              </span>
            )}
          </p>

          <button
            onClick={unstable_retry}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  )
}
