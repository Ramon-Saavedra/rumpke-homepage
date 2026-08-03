export function resolveTileUrl(): string {
  const key = process.env.NEXT_PUBLIC_MAP_TILER_KEY;
  if (key) {
    return `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`;
  }
  return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
}

export function resolveTileAttribution(): string {
  return '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';
}

export function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function buildGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`;
}
