import Link from "next/link";
import type { Pagination } from "@/types/property-api";

interface PropertyPaginationProps {
  readonly pagination: Pagination;
  readonly basePath?: string;
  readonly query?: Record<string, string>;
}

function pageHref(
  basePath: string,
  page: number,
  query: Record<string, string>,
): string {
  const params = new URLSearchParams({ ...query, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

export default function PropertyPagination({
  pagination,
  basePath = "/objekt",
  query = {},
}: PropertyPaginationProps) {
  const { page, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav
      aria-label="Paginierung"
      className="flex max-w-full flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={pageHref(basePath, page - 1, query)}
          className="inline-flex min-h-11 items-center rounded-md border border-control-border-l px-3 py-2 text-sm text-foreground transition-colors hover:bg-bgSecondary-l dark:border-control-border-d dark:hover:bg-bgSecondary-d"
          aria-label="Vorherige Seite"
        >
          Zurück
        </Link>
      )}

      {start > 1 && (
        <>
          <Link
            href={pageHref(basePath, 1, query)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-control-border-l px-3 py-2 text-sm text-foreground transition-colors hover:bg-bgSecondary-l dark:border-control-border-d dark:hover:bg-bgSecondary-d"
          >
            1
          </Link>
          {start > 2 && (
            <span className="px-2 text-card-text-l dark:text-card-text-d text-sm">
              …
            </span>
          )}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(basePath, p, query)}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors ${
            p === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-control-border-l text-foreground hover:bg-bgSecondary-l dark:border-control-border-d dark:hover:bg-bgSecondary-d"
          }`}
          aria-label={`Seite ${p}`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-2 text-card-text-l dark:text-card-text-d text-sm">
              …
            </span>
          )}
          <Link
            href={pageHref(basePath, totalPages, query)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-control-border-l px-3 py-2 text-sm text-foreground transition-colors hover:bg-bgSecondary-l dark:border-control-border-d dark:hover:bg-bgSecondary-d"
          >
            {totalPages}
          </Link>
        </>
      )}

      {page < totalPages && (
        <Link
          href={pageHref(basePath, page + 1, query)}
          className="inline-flex min-h-11 items-center rounded-md border border-control-border-l px-3 py-2 text-sm text-foreground transition-colors hover:bg-bgSecondary-l dark:border-control-border-d dark:hover:bg-bgSecondary-d"
          aria-label="Nächste Seite"
        >
          Weiter
        </Link>
      )}
    </nav>
  );
}
