'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';
import type { PropertyImageDto } from '@/types/property-api';

interface PropertyImageProps {
  readonly images: readonly PropertyImageDto[];
  readonly alt: string;
  readonly className?: string;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly fill?: boolean;
}

function getFirstValidImage(images: readonly PropertyImageDto[]): PropertyImageDto | null {
  if (images.length === 0) return null;
  const first = images[0];
  if (typeof first.url !== 'string' || first.url.length === 0) return null;
  return first;
}

function resolveImageAlt(image: PropertyImageDto, fallbackAlt: string): string {
  return image.title ?? fallbackAlt;
}

function Placeholder({ alt, className }: { readonly alt: string; readonly className: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-bgSecondary-l dark:bg-bgSecondary-d ${className}`}
      role="img"
      aria-label={alt}
    >
      <ImageOff className="w-12 h-12 text-card-text-l dark:text-card-text-d" aria-hidden="true" />
    </div>
  );
}

function Skeleton({ className }: { readonly className: string }) {
  return (
    <div
      className={`animate-pulse bg-bgSecondary-l dark:bg-bgSecondary-d ${className}`}
      aria-hidden="true"
    />
  );
}

export default function PropertyImage({
  images,
  alt,
  className = '',
  priority = false,
  sizes,
  fill = true,
}: PropertyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const validImage = getFirstValidImage(images);

  if (!validImage || hasError) {
    return <Placeholder alt={alt} className={className} />;
  }

  const imageAlt = resolveImageAlt(validImage, alt);
  const resolvedSizes = sizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';

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
