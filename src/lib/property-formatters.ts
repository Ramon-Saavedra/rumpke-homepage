const PRICE_FORMATTER = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const AREA_FORMATTER = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return PRICE_FORMATTER.format(value);
}

export function formatMonthlyPrice(value: number): string {
  return `${PRICE_FORMATTER.format(value)} / Monat`;
}

export function formatArea(value: number): string {
  return `${AREA_FORMATTER.format(value)} m²`;
}

export function formatRooms(value: number): string {
  if (value === 1) return '1 Zimmer';
  return `${Math.round(value)} Zimmer`;
}

export function formatYear(value: number): string {
  return String(Math.round(value));
}

export function resolveDisplayPrice(
  marketingType: string | null,
  salePrice: number | null,
  coldRent: number | null,
): string | null {
  if (marketingType === 'miete' && coldRent !== null) {
    return formatMonthlyPrice(coldRent);
  }
  if (salePrice !== null) {
    return formatPrice(salePrice);
  }
  if (coldRent !== null) {
    return formatMonthlyPrice(coldRent);
  }
  return null;
}
