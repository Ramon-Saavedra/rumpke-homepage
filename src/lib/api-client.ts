export enum API_ENDPOINTS {
  PROPERTIES = "/v1/properties",
}

export enum LEADS_ENDPOINTS {
  CONTACT = "/v1/leads/contact",
}

export function getApiUrl(endpoint: API_ENDPOINTS | LEADS_ENDPOINTS): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  return `${baseUrl}${endpoint}`;
}

import type {
  ContactFormPayload,
  ContactApiFieldErrors,
} from "@/types/contact";
import { ContactSubmitError } from "@/types/contact";

function parseNestFieldErrors(
  body: unknown,
): ContactApiFieldErrors | undefined {
  if (typeof body !== "object" || body === null) return undefined;
  const obj = body as Record<string, unknown>;

  if (
    typeof obj.fieldErrors === "object" &&
    obj.fieldErrors !== null &&
    !Array.isArray(obj.fieldErrors)
  ) {
    return obj.fieldErrors as ContactApiFieldErrors;
  }

  if (Array.isArray(obj.message) && obj.message.length > 0) {
    const errors: ContactApiFieldErrors = {};
    for (const msg of obj.message) {
      if (typeof msg !== "string") continue;
      const spaceIdx = msg.indexOf(" ");
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

const FIELD_ERROR_MAP: Record<string, string> = {
  name: "firstName",
  consent: "consentAccepted",
  source: "sourcePage",
};

function mapFieldErrors(errors: ContactApiFieldErrors): ContactApiFieldErrors {
  const mapped: ContactApiFieldErrors = {};
  for (const [field, messages] of Object.entries(errors)) {
    const mappedField = FIELD_ERROR_MAP[field] ?? field;
    if (!mapped[mappedField]) mapped[mappedField] = [];
    mapped[mappedField].push(...messages);
  }
  return mapped;
}

type LeadType = "CONTACT" | "VALUATION" | "VISIT_REQUEST";

interface CreateLeadPayload {
  type: LeadType;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  source?: string;
  property_id?: string;
}

export async function submitContactForm(
  data: ContactFormPayload,
  propertyId?: string,
): Promise<void> {
  const url = getApiUrl(LEADS_ENDPOINTS.CONTACT);

  const backendPayload: CreateLeadPayload = {
    type: "CONTACT",
    name: `${data.firstName} ${data.lastName}`.trim(),
    email: data.email,
    phone: data.phone ?? "",
    message: data.message,
    consent: data.consentAccepted,
    source: data.sourcePage,
    ...(propertyId && { property_id: propertyId }),
  };

  let res: Response;

  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backendPayload),
    });
  } catch {
    throw new ContactSubmitError(
      0,
      undefined,
      "Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.",
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
      "Serverfehler. Bitte versuchen Sie es später erneut.",
    );
  }

  if (res.status === 400) {
    const rawFieldErrors = parseNestFieldErrors(body);
    const fieldErrors = rawFieldErrors
      ? mapFieldErrors(rawFieldErrors)
      : undefined;
    throw new ContactSubmitError(
      400,
      fieldErrors,
      fieldErrors
        ? undefined
        : "Ungültige Eingaben. Bitte überprüfen Sie Ihre Angaben.",
    );
  }

  if (res.status === 429) {
    throw new ContactSubmitError(
      429,
      undefined,
      "Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut.",
    );
  }

  throw new ContactSubmitError(
    res.status,
    undefined,
    "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
  );
}
