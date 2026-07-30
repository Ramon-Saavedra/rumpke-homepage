import type { PropertyImageDto } from "@/types/property-api";

const ALLOWED_IMAGE_HOSTS = new Set(["image.onoffice.de", "smart.onoffice.de"]);

const FLOORPLAN_TOKENS = ["grundriss", "floorplan", "lageplan"];

export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(parsed.hostname)
    );
  } catch {
    return false;
  }
}

export function resolveValidImages(
  images: readonly PropertyImageDto[],
): readonly PropertyImageDto[] {
  return images.filter(
    (image) =>
      typeof image.url === "string" &&
      image.url.length > 0 &&
      isValidImageUrl(image.url),
  );
}

export function resolveFirstValidImage(
  images: readonly PropertyImageDto[],
): PropertyImageDto | null {
  const first = images[0];
  if (first === undefined) return null;
  if (typeof first.url !== "string" || first.url.length === 0) return null;
  if (!isValidImageUrl(first.url)) return null;
  return first;
}

function isFloorplan(image: PropertyImageDto): boolean {
  const type = image.type;
  if (type === null || type.length === 0) return false;
  const normalized = type.toLowerCase();
  return FLOORPLAN_TOKENS.some((token) => normalized.includes(token));
}

export interface PropertyImageGroups {
  readonly photos: readonly PropertyImageDto[];
  readonly floorplans: readonly PropertyImageDto[];
}

export function groupPropertyImages(
  images: readonly PropertyImageDto[],
): PropertyImageGroups {
  const valid = [...resolveValidImages(images)].sort(
    (a, b) => a.position - b.position,
  );

  return {
    photos: valid.filter((image) => !isFloorplan(image)),
    floorplans: valid.filter(isFloorplan),
  };
}
