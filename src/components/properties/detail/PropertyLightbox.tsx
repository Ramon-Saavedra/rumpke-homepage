"use client";

import { useEffect, useEffectEvent, useRef, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { PropertyImageDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

interface PropertyLightboxProps {
  readonly images: readonly PropertyImageDto[];
  readonly activeIndex: number;
  readonly alt: string;
  readonly onClose: () => void;
  readonly onSelect: (index: number) => void;
}

const SWIPE_THRESHOLD = 40;

export default function PropertyLightbox({
  images,
  activeIndex,
  alt,
  onClose,
  onSelect,
}: PropertyLightboxProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const hasMultiple = images.length > 1;

  const step = (direction: number) => {
    if (images.length === 0) return;
    onSelect((activeIndex + direction + images.length) % images.length);
  };

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => handleKeyDown(event);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  const activeImage = images[activeIndex];
  if (activeImage === undefined) return null;

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (start === null) return;
    const end = event.changedTouches[0]?.clientX;
    if (end === undefined) return;
    const distance = end - start;
    if (Math.abs(distance) > SWIPE_THRESHOLD) step(distance < 0 ? 1 : -1);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Bildergalerie: ${alt}`}
      className="fixed inset-0 z-[600] flex flex-col bg-black/95"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center justify-between px-6 py-4 text-sm text-white">
        <span aria-live="polite">
          {activeIndex + 1} / {images.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Galerie schließen"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        {hasMultiple && (
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Vorheriges Bild"
            className="absolute left-2 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-3"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        <div className="relative h-full w-full">
          <Image
            src={activeImage.url}
            alt={activeImage.title ?? alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {hasMultiple && (
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Nächstes Bild"
            className="absolute right-2 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-3"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto px-6 pb-6 pt-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Bild ${index + 1} anzeigen`}
              aria-current={index === activeIndex}
              className={cn(
                "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden border-2 transition-opacity",
                index === activeIndex
                  ? "border-white opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
