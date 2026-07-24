import type { PublicErrorCode } from '@/types/property-api';

const ERROR_LABELS: Record<PublicErrorCode, string> = {
  VALIDATION_ERROR: 'Ungültige Anfrage.',
  PROPERTY_NOT_FOUND: 'Immobilie nicht gefunden.',
  PROPERTY_SERVICE_DISABLED: 'Der Immobilienservice ist derzeit deaktiviert.',
  PROPERTY_SERVICE_UNAVAILABLE: 'Der Immobilienservice ist derzeit nicht verfügbar.',
  INTERNAL_SERVER_ERROR: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
};

export function publicErrorLabel(code: PublicErrorCode): string {
  return ERROR_LABELS[code];
}

export const DEFAULT_ERROR_LABEL = ERROR_LABELS.INTERNAL_SERVER_ERROR;
