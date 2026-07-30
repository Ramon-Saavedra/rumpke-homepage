import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface PropertyBreadcrumbItem {
  readonly name: string;
  readonly item: string;
}

interface PropertyBreadcrumbProps {
  readonly items: readonly PropertyBreadcrumbItem[];
}

export default function PropertyBreadcrumb({ items }: PropertyBreadcrumbProps) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 pt-4 text-[13px] text-card-text-l dark:text-card-text-d"
    >
      {items.map((item, index) => (
        <span key={item.item} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
          {index === lastIndex ? (
            <span
              aria-current="page"
              className="line-clamp-1 font-medium text-foreground"
            >
              {item.name}
            </span>
          ) : (
            <Link href={item.item} className="hover:text-primary">
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
