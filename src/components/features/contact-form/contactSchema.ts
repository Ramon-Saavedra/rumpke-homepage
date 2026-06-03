import { z } from 'zod';
import { CONTACT_FORM_LIMITS as L } from '@/constants/contact';

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(L.FIRST_NAME_MIN, `Mindestens ${L.FIRST_NAME_MIN} Zeichen erforderlich`)
    .max(L.FIRST_NAME_MAX, `Maximal ${L.FIRST_NAME_MAX} Zeichen erlaubt`),
  lastName: z
    .string()
    .min(L.LAST_NAME_MIN, `Mindestens ${L.LAST_NAME_MIN} Zeichen erforderlich`)
    .max(L.LAST_NAME_MAX, `Maximal ${L.LAST_NAME_MAX} Zeichen erlaubt`),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  phone: z
    .string()
    .max(L.PHONE_MAX, `Maximal ${L.PHONE_MAX} Zeichen erlaubt`)
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(L.MESSAGE_MIN, `Mindestens ${L.MESSAGE_MIN} Zeichen erforderlich`)
    .max(L.MESSAGE_MAX, `Maximal ${L.MESSAGE_MAX} Zeichen erlaubt`),
  consentAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    }),
  company: z
    .string()
    .max(L.COMPANY_MAX, `Maximal ${L.COMPANY_MAX} Zeichen erlaubt`)
    .optional()
    .or(z.literal('')),
  honeypot: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
