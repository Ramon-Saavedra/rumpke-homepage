import Link from "next/link";
import { Mail, RotateCcw, Search, SearchX } from "lucide-react";
import {
  PROPERTY_CTA_CLASS,
  PROPERTY_CTA_SECONDARY_CLASS,
} from "./property-cta";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import type { MarketingType } from "@/types/property-types";

export interface EmptyStateAction {
  readonly href: string;
  readonly label: string;
}

interface PropertyEmptyStateProps {
  readonly headline?: string;
  readonly body?: string;
  readonly marketingType?: MarketingType;
  readonly reset?: EmptyStateAction;
  readonly primary?: EmptyStateAction;
  readonly secondary?: EmptyStateAction;
  readonly isLoading?: boolean;
  readonly showIcon?: boolean;
  readonly className?: string;
}

const CARD_CLASS =
  "flex w-full flex-col items-center justify-center rounded border border-border-l bg-bgSecondary-l px-[22px] py-9 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:px-11 sm:py-12 lg:px-16 lg:py-14 dark:border-border-d dark:bg-bgSecondary-d dark:shadow-none";

const CARD_MIN_HEIGHT = "min-h-[280px] sm:min-h-[320px] lg:min-h-[340px]";

function defaultPrimary(): EmptyStateAction {
  return {
    href: "/kontakt",
    label: "Kontakt aufnehmen",
  };
}

function defaultSecondary(marketingType?: MarketingType): EmptyStateAction {
  if (marketingType === "miete") {
    return {
      href: "/kontakt",
      label: "Persönlich beraten lassen",
    };
  }
  return {
    href: "/dienstleistungen/immobilien-kauf",
    label: "Suchauftrag anfragen",
  };
}

function EmptyStateSkeleton({ className }: { readonly className?: string }) {
  return (
    <div
      className={cn(CARD_CLASS, CARD_MIN_HEIGHT, className)}
      aria-hidden="true"
    >
      <Skeleton className="h-6 w-48 rounded-full" />
      <Skeleton className="mt-5 h-7 w-4/5 max-w-[480px]" />
      <Skeleton className="mt-3 h-4 w-full max-w-[440px]" />
      <Skeleton className="mt-2 h-4 w-3/5 max-w-[440px]" />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-12 w-52 rounded-full" />
        <Skeleton className="h-12 w-52 rounded-full" />
      </div>
    </div>
  );
}

export default function PropertyEmptyState({
  headline,
  body,
  marketingType,
  reset,
  primary,
  secondary,
  isLoading = false,
  showIcon = false,
  className,
}: PropertyEmptyStateProps) {
  if (isLoading) {
    return <EmptyStateSkeleton className={className} />;
  }

  const resolvedPrimary = primary ?? defaultPrimary();
  const resolvedSecondary = secondary ?? defaultSecondary(marketingType);

  return (
    <div
      className={cn(CARD_CLASS, CARD_MIN_HEIGHT, className)}
      aria-live="polite"
    >
      {showIcon && (
        <span
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <SearchX className="h-6 w-6" />
        </span>
      )}

      {headline && (
        <h3 className="mb-2.5 max-w-[480px] font-serif text-[21px] font-semibold leading-[1.25] text-foreground sm:text-2xl lg:text-[27px]">
          {headline}
        </h3>
      )}

      {body && (
        <p className="mb-6 max-w-[440px] text-sm leading-relaxed text-card-text-l sm:text-[15px] dark:text-card-text-d">
          {body}
        </p>
      )}

      {reset && (
        <Link
          href={reset.href}
          className="mb-5 inline-flex items-center gap-1.5 rounded-sm text-[13.5px] font-semibold text-primary underline decoration-primary/35 underline-offset-[3px] transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          {reset.label}
        </Link>
      )}

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {resolvedPrimary && (
          <Link
            href={resolvedPrimary.href}
            className={cn("w-full sm:w-auto", PROPERTY_CTA_CLASS)}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {resolvedPrimary.label}
          </Link>
        )}
        {resolvedSecondary && (
          <Link
            href={resolvedSecondary.href}
            className={cn("w-full sm:w-auto", PROPERTY_CTA_SECONDARY_CLASS)}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {resolvedSecondary.label}
          </Link>
        )}
      </div>
    </div>
  );
}
