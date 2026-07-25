"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/properties/ImagePlaceholder";
import type { PropertyImageDto } from "@/types/property-api";
import { SKELETON_BLOCK } from "@/lib/skeleton-classes";

interface PropertyImageProps {
  readonly images: readonly PropertyImageDto[];
  readonly alt: string;
  readonly className?: string;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly fill?: boolean;
}

const ALLOWED_IMAGE_HOSTS = new Set(["image.onoffice.de", "smart.onoffice.de"]);

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

function getFirstValidImage(
  images: readonly PropertyImageDto[],
): PropertyImageDto | null {
  if (images.length === 0) return null;
  const first = images[0];
  if (typeof first.url !== "string" || first.url.length === 0) return null;
  if (!isValidImageUrl(first.url)) return null;
  return first;
}

function resolveImageAlt(image: PropertyImageDto, fallbackAlt: string): string {
  return image.title ?? fallbackAlt;
}

function Skeleton({ className }: { readonly className: string }) {
  return (
    <div className={`${SKELETON_BLOCK} ${className}`} aria-hidden="true" />
  );
}

export default function PropertyImage({
  images,
  alt,
  className = "",
  priority = false,
  sizes,
  fill = true,
}: PropertyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const validImage = getFirstValidImage(images);

  if (!validImage || hasError) {
    return <ImagePlaceholder label={alt} className={className} />;
  }

  const imageAlt = resolveImageAlt(validImage, alt);
  const resolvedSizes =
    sizes ?? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <div className={`relative ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 z-10" />}
      <Image
        src={validImage.url}
        alt={imageAlt}
        fill={fill}
        sizes={resolvedSizes}
        className="object-cover"
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
