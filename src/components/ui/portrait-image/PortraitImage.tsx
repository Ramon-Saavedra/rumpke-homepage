"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "@/components/ui/skeleton/Skeleton";

interface PortraitImageProps {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly className?: string;
  readonly aspectRatio?: string;
  readonly imageClassName?: string;
  readonly objectPosition?: string;
  readonly sizes?: string;
  readonly loading?: "lazy" | "eager";
  readonly captionClassName?: string;
}

export default function PortraitImage({
  src,
  alt,
  caption,
  className,
  aspectRatio = "aspect-4/5",
  imageClassName,
  objectPosition = "object-top",
  sizes = "(max-width: 640px) 60vw, (max-width: 1024px) 288px, 360px",
  loading = "lazy",
  captionClassName,
}: PortraitImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg ${aspectRatio}`}
        aria-busy={isLoading && !hasError}
      >
        {isLoading && !hasError && (
          <Skeleton className="absolute inset-0 z-10" />
        )}
        {!hasError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover ${objectPosition} ${imageClassName ?? ""}`}
            sizes={sizes}
            loading={loading}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bgSecondary-l text-sm text-card-text-l dark:bg-bgSecondary-d dark:text-card-text-d">
            Bild nicht verfügbar
          </div>
        )}
      </div>
      {caption && (
        <p
          className={
            captionClassName ??
            "mt-3.5 text-[13px] tracking-[0.02em] text-card-text-l dark:text-card-text-d"
          }
        >
          {caption}
        </p>
      )}
    </div>
  );
}
