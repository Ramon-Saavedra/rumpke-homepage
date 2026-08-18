"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyShowcasePanel from "./PropertyShowcasePanel";
import type { PropertyCardDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

interface PropertyShowcaseRailProps {
  readonly properties: readonly PropertyCardDto[];
}

interface RailMetrics {
  readonly scrollLeft: number;
  readonly scrollWidth: number;
  readonly clientWidth: number;
}

const INITIAL_METRICS: RailMetrics = {
  scrollLeft: 0,
  scrollWidth: 0,
  clientWidth: 0,
};

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function PropertyShowcaseRail({
  properties,
}: PropertyShowcaseRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<RailMetrics>(INITIAL_METRICS);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const next: RailMetrics = {
      scrollLeft: el.scrollLeft,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    };
    setMetrics((prev) =>
      prev.scrollLeft === next.scrollLeft &&
      prev.scrollWidth === next.scrollWidth &&
      prev.clientWidth === next.clientWidth
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, properties.length]);

  const step = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const panel = el.firstElementChild as HTMLElement | null;
    const distance = panel
      ? panel.getBoundingClientRect().width
      : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction * distance,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const layout = properties.length === 2 ? "stretch" : "rail";
  const isRail = layout === "rail";

  const overflow = isRail && metrics.scrollWidth > metrics.clientWidth + 4;
  const prevDisabled = metrics.scrollLeft <= 2;
  const nextDisabled =
    metrics.scrollLeft >= metrics.scrollWidth - metrics.clientWidth - 2;
  const progressFraction =
    metrics.scrollWidth > 0
      ? Math.min(1, metrics.clientWidth / metrics.scrollWidth)
      : 1;
  const progress =
    metrics.scrollWidth > metrics.clientWidth
      ? metrics.scrollLeft / (metrics.scrollWidth - metrics.clientWidth)
      : 0;

  return (
    <div>
      <div
        ref={railRef}
        onScroll={isRail ? measure : undefined}
        role={isRail ? "group" : undefined}
        aria-label={
          isRail ? `${properties.length} Immobilien, horizontal scrollbar` : undefined
        }
        tabIndex={isRail ? 0 : undefined}
        className={cn(
          isRail
            ? "no-scrollbar flex snap-x snap-proximity items-start overflow-x-auto overflow-y-hidden scroll-smooth pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            : "flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-0",
        )}
      >
        {properties.map((property, index) => (
          <PropertyShowcasePanel
            key={property.id}
            property={property}
            isFirst={index === 0}
            isLast={index === properties.length - 1}
            layout={layout}
            priority={index === 0}
          />
        ))}
      </div>

      {overflow && (
        <div className="mt-5 hidden items-center gap-4 sm:mt-6 sm:flex">
          <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-border-l dark:bg-border-d">
            <div
              className="absolute inset-y-0 rounded-full bg-primary"
              style={{
                width: `${progressFraction * 100}%`,
                left: `${progress * (100 - progressFraction * 100)}%`,
              }}
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={prevDisabled}
              aria-label="Vorherige Immobilie"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-l text-foreground transition-colors disabled:cursor-default disabled:opacity-40 dark:border-border-d"
            >
              <ChevronLeft className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={nextDisabled}
              aria-label="Nächste Immobilie"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-l text-foreground transition-colors disabled:cursor-default disabled:opacity-40 dark:border-border-d"
            >
              <ChevronRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
