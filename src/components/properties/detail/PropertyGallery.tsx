"use client";

import { useState } from "react";
import { Images, Maximize2 } from "lucide-react";
import ImagePlaceholder from "@/components/properties/ImagePlaceholder";
import PropertyImage from "@/components/properties/PropertyImage";
import PropertyLightbox from "./PropertyLightbox";
import type { PropertyImageDto } from "@/types/property-api";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  readonly images: readonly PropertyImageDto[];
  readonly alt: string;
  readonly className?: string;
}

const GRID_HEIGHT = "h-[clamp(320px,38vw,520px)]";

function gridColumns(count: number): string {
  if (count === 1) return "md:grid-cols-1";
  if (count === 2) return "md:grid-cols-[2fr_1fr]";
  if (count < 5) return "md:grid-cols-[2fr_1fr] md:grid-rows-2";
  return "md:grid-cols-[2fr_1fr_1fr] md:grid-rows-2";
}

export default function PropertyGallery({
  images,
  alt,
  className,
}: PropertyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <ImagePlaceholder
        label="Für dieses Objekt sind aktuell keine Fotos hinterlegt"
        className={cn("aspect-[16/9] w-full md:aspect-[21/9]", className)}
      />
    );
  }

  const hero = images[0];
  const secondaryLimit = images.length >= 5 ? 4 : 2;
  const secondary = images.slice(1, 1 + secondaryLimit);
  const remaining = images.length - 1 - secondary.length;

  return (
    <section aria-label="Bildergalerie" className={cn("relative", className)}>
      <div className="flex snap-x snap-mandatory gap-1 overflow-x-auto md:hidden">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setLightboxIndex(index)}
            aria-label={`Bild ${index + 1} von ${images.length} vergrößern`}
            className="relative aspect-[4/3] w-[88%] shrink-0 cursor-pointer snap-center overflow-hidden"
          >
            <PropertyImage
              images={[image]}
              alt={alt}
              className="h-full w-full"
              priority={index === 0}
              sizes="88vw"
            />
          </button>
        ))}
      </div>

      <div
        className={cn(
          "hidden gap-1 overflow-hidden md:grid",
          GRID_HEIGHT,
          gridColumns(images.length),
        )}
      >
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label="Titelbild vergrößern"
          className={cn(
            "relative cursor-pointer overflow-hidden",
            images.length > 2 && "md:row-span-2",
          )}
        >
          <PropertyImage
            images={[hero]}
            alt={alt}
            className="h-full w-full"
            priority
            sizes="(max-width: 1280px) 60vw, 780px"
          />
        </button>

        {secondary.map((image, index) => {
          const imageIndex = index + 1;
          const isLast = index === secondary.length - 1;
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setLightboxIndex(imageIndex)}
              aria-label={`Bild ${imageIndex + 1} von ${images.length} vergrößern`}
              className="relative cursor-pointer overflow-hidden"
            >
              <PropertyImage
                images={[image]}
                alt={alt}
                className="h-full w-full"
                sizes="(max-width: 1280px) 30vw, 340px"
              />
              {isLast && remaining > 0 && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-xl font-semibold text-white">
                  +{remaining}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setLightboxIndex(0)}
        className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-full bg-black/60 px-4 py-2.5 text-[13px] font-medium text-white hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
      >
        {images.length > 1 ? (
          <>
            <Images className="h-4 w-4" aria-hidden="true" />
            Alle Bilder ansehen ({images.length})
          </>
        ) : (
          <>
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            Bild vergrößern
          </>
        )}
      </button>

      {lightboxIndex !== null && (
        <PropertyLightbox
          images={images}
          activeIndex={lightboxIndex}
          alt={alt}
          onClose={() => setLightboxIndex(null)}
          onSelect={setLightboxIndex}
        />
      )}
    </section>
  );
}
