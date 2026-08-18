"use client";

import { useState } from "react";
import Image from "next/image";
import ImagePlaceholder from "@/components/properties/ImagePlaceholder";
import type { PropertyImageDto } from "@/types/property-api";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { resolveFirstValidImage } from "@/lib/property-images";

interface PropertyImageProps {
  readonly images: readonly PropertyImageDto[];
  readonly alt: string;
  readonly className?: string;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly fill?: boolean;
}

function resolveImageAlt(image: PropertyImageDto, fallbackAlt: string): string {
  return image.title?.trim() || fallbackAlt;
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

  const validImage = resolveFirstValidImage(images);

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
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
