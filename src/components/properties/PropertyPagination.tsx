import Link from 'next/link';
import type { Pagination } from '@/types/property-api';

interface PropertyPaginationProps {
  readonly pagination: Pagination;
}

export default function PropertyPagination({ pagination }: PropertyPaginationProps) {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Paginierung" className="flex items-center justify-center gap-2">
      {page > 1 && (
        <Link
          href={`/objekt?page=${page - 1}`}
          className="px-3 py-2 border border-border-l dark:border-border-d rounded text-sm text-text-l dark:text-text-d hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors"
          aria-label="Vorherige Seite"
        >
          Zurück
        </Link>
      )}

      {start > 1 && (
        <>
          <Link
            href="/objekt?page=1"
            className="px-3 py-2 border border-border-l dark:border-border-d rounded text-sm text-text-l dark:text-text-d hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors"
          >
            1
          </Link>
          {start > 2 && (
            <span className="px-2 text-card-text-l dark:text-card-text-d text-sm">…</span>
          )}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`/objekt?page=${p}`}
          className={`px-3 py-2 border rounded text-sm transition-colors ${
            p === page
              ? 'bg-primary text-white border-primary'
              : 'border-border-l dark:border-border-d text-text-l dark:text-text-d hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d'
          }`}
          aria-label={`Seite ${p}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-card-text-l dark:text-card-text-d text-sm">…</span>
          )}
          <Link
            href={`/objekt?page=${totalPages}`}
            className="px-3 py-2 border border-border-l dark:border-border-d rounded text-sm text-text-l dark:text-text-d hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {page < totalPages && (
        <Link
          href={`/objekt?page=${page + 1}`}
          className="px-3 py-2 border border-border-l dark:border-border-d rounded text-sm text-text-l dark:text-text-d hover:bg-bgSecondary-l dark:hover:bg-bgSecondary-d transition-colors"
          aria-label="Nächste Seite"
        >
          Weiter
        </Link>
      )}
    </nav>
  );
}
