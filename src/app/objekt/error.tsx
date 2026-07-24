'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h2 className="text-3xl font-bold text-text-l dark:text-text-d">
        Immobilie nicht verfügbar
      </h2>
      <p className="text-card-text-l dark:text-card-text-d max-w-md">
        Der Immobilienservice ist derzeit nicht erreichbar. Bitte versuchen Sie es später erneut.
      </p>
      <Link
        href="/objekt"
        className="px-6 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
      >
        Zur Übersicht
      </Link>
    </div>
  );
}
