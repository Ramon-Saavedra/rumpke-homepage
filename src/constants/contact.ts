export const COMPANY_CONTACT = {
  name: "Rumpke Immobilien",
  phoneHref: "tel:+4959634599970",
  phoneLabel: "05963 – 45 999 70",
  emailHref: "mailto:info@rumpke-immobilien.de",
  emailLabel: "info@rumpke-immobilien.de",
} as const;

export const CONTACT_FORM_LIMITS = {
  FIRST_NAME_MIN: 2,
  FIRST_NAME_MAX: 50,
  LAST_NAME_MIN: 2,
  LAST_NAME_MAX: 50,
  COMPANY_MAX: 100,
  PHONE_MAX: 20,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 1000,
} as const;
