export interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  { label: 'Häuser', href: '/kategorie/haeuser' },
  { label: 'Wohnungen', href: '/kategorie/wohnungen' },
  { label: 'Gewerbeimmobilien', href: '/kategorie/gewerbeimmobilien' },
  { label: 'Grundstücke', href: '/kategorie/grundstueck' },
  { label: 'Dienstleistungen', href: '/dienstleistungen' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Werde Tippgeber', href: 'https://www.ichschenkedirwas.de/', external: true },
] as const;

export const DRAWER_LINKS: readonly NavLink[] = [
  { label: 'Start', href: '/' },
  { label: 'Kaufen', href: '/kauf' },
  { label: 'Mieten', href: '/miete' },
  { label: 'Häuser', href: '/kategorie/haeuser' },
  { label: 'Wohnungen', href: '/kategorie/wohnungen' },
  { label: 'Gewerbeimmobilien', href: '/kategorie/gewerbeimmobilien' },
  { label: 'Grundstück', href: '/kategorie/grundstueck' },
  { label: 'Beratung', href: '/dienstleistungen' },
  { label: 'Über uns', href: '/ueber-uns' },
] as const;

export const CATEGORY_NAV_LINKS: readonly NavLink[] = [
  { label: 'Häuser', href: '/kategorie/haeuser' },
  { label: 'Wohnungen', href: '/kategorie/wohnungen' },
  { label: 'Gewerbeimmobilien', href: '/kategorie/gewerbeimmobilien' },
  { label: 'Grundstück', href: '/kategorie/grundstueck' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Werde Tippgeber', href: 'https://www.ichschenkedirwas.de/', external: true },
] as const;

export const FOOTER_BUY_LINKS: readonly NavLink[] = [
  { label: 'Alle Kaufimmobilien', href: '/kauf' },
  { label: 'Häuser kaufen', href: '/kauf/haeuser' },
  { label: 'Wohnungen kaufen', href: '/kauf/wohnungen' },
] as const;

export const FOOTER_RENT_LINKS: readonly NavLink[] = [
  { label: 'Alle Mietimmobilien', href: '/miete' },
  { label: 'Häuser mieten', href: '/miete/haeuser' },
  { label: 'Wohnungen mieten', href: '/miete/wohnungen' },
] as const;

export const FOOTER_SERVICES_LINKS: readonly NavLink[] = [
  { label: 'Alle Dienstleistungen', href: '/dienstleistungen' },
  { label: 'Immobilien Kauf', href: '/dienstleistungen/immobilien-kauf' },
  { label: 'Verkauf & Vermietung', href: '/dienstleistungen/verkauf-vermietung' },
  { label: 'Immobilienbewertung', href: '/dienstleistungen/immobilienbewertung' },
] as const;

export const FOOTER_COMPANY_LINKS: readonly NavLink[] = [
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Kontakt', href: '/kontakt' },
] as const;
