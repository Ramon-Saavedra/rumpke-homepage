export interface ContactFormPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  consentAccepted: boolean;
  company?: string;
  honeypot?: string;
  sourcePage?: string;
}

export interface ContactApiFieldErrors {
  [field: string]: string[];
}

export class ContactSubmitError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly fieldErrors?: ContactApiFieldErrors,
    public readonly globalError?: string,
  ) {
    super(globalError ?? 'Ein Fehler ist aufgetreten.');
    this.name = 'ContactSubmitError';
  }
}
