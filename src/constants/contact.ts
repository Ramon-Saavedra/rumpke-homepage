export const COMPANY_CONTACT = {
  name: "Rumpke Immobilien",
  phoneHref: "tel:+491723244468",
  phoneLabel: "01723244468",
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
