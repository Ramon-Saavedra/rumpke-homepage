'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h2 className="text-3xl font-bold text-text-l dark:text-text-d">
        Etwas ist schiefgelaufen
      </h2>

      <p className="text-card-text-l dark:text-card-text-d max-w-md">
        Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.
        {error.digest && (
          <span className="block text-sm mt-2 text-secondary-l dark:text-secondary-d">
            Fehler-ID: {error.digest}
          </span>
        )}
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={unstable_retry}
          className="px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
        >
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="px-6 py-2 border border-border-l dark:border-border-d rounded hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors text-text-l dark:text-text-d"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  )
}
