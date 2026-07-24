export enum API_ENDPOINTS {
  PROPERTIES = '/v1/properties',
}

export enum LEADS_ENDPOINTS {
  CONTACT = '/v1/leads/contact',
}

export function getApiUrl(endpoint: API_ENDPOINTS | LEADS_ENDPOINTS): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  return `${baseUrl}${endpoint}`;
}

import type { ContactFormPayload, ContactApiFieldErrors } from '@/types/contact';
import { ContactSubmitError } from '@/types/contact';

interface NestValidationBody {
  statusCode: number;
  message: string | string[];
  fieldErrors?: Record<string, string[]>;
  error?: string;
}

function parseNestFieldErrors(body: NestValidationBody): ContactApiFieldErrors | undefined {
  if (body.fieldErrors && typeof body.fieldErrors === 'object') {
    return body.fieldErrors;
  }
  if (Array.isArray(body.message) && body.message.length > 0) {
    const errors: ContactApiFieldErrors = {};
    for (const msg of body.message) {
      const spaceIdx = msg.indexOf(' ');
      if (spaceIdx > 0) {
        const field = msg.slice(0, spaceIdx);
        if (!errors[field]) errors[field] = [];
        errors[field].push(msg);
      }
    }
    return Object.keys(errors).length > 0 ? errors : undefined;
  }
  return undefined;
}

export async function submitContactForm(data: ContactFormPayload): Promise<void> {
  const url = getApiUrl(LEADS_ENDPOINTS.CONTACT);
  let res: Response;

  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ContactSubmitError(
      0,
      undefined,
      'Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.',
    );
  }

  if (res.ok) return;

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    throw new ContactSubmitError(
      res.status,
      undefined,
      'Serverfehler. Bitte versuchen Sie es später erneut.',
    );
  }

  if (res.status === 400) {
    const fieldErrors = parseNestFieldErrors(body as NestValidationBody);
    throw new ContactSubmitError(
      400,
      fieldErrors,
      fieldErrors ? undefined : 'Ungültige Eingaben. Bitte überprüfen Sie Ihre Angaben.',
    );
  }

  if (res.status === 429) {
    throw new ContactSubmitError(
      429,
      undefined,
      'Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut.',
    );
  }

  throw new ContactSubmitError(
    res.status,
    undefined,
    'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
  );
}
