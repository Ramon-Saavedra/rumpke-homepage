'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { contactSchema, type ContactFormValues } from './contactSchema';
import { submitContactForm } from '@/lib/api-client';
import { ContactSubmitError } from '@/types/contact';
import { CONTACT_FORM_LIMITS } from '@/constants/contact';
import FloatingInput from './FloatingInput';
import FloatingTextarea from './FloatingTextarea';

export default function ContactForm({ formHeadingId }: { formHeadingId?: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
      company: '',
      honeypot: '',
      consentAccepted: false,
    },
  });

  const messageValue = useWatch({ control, name: 'message', defaultValue: '' });

  async function onSubmit(data: ContactFormValues) {
    setServerError(null);
    try {
      await submitContactForm({
        ...data,
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/kontakt',
      });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ContactSubmitError) {
        if (err.fieldErrors) {
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof ContactFormValues, { message: messages[0] });
          });
        }
        setServerError(
          err.globalError ?? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
        );
      } else {
        setServerError('Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.');
      }
    }
  }

  return (
    <div className="relative bg-bgSecondary-l dark:bg-bgSecondary-d">
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="__hp_website">Website</label>
        <input
          type="text"
          id="__hp_website"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {submitted ? (
        <div
          className="flex flex-col items-center justify-center text-center gap-5 py-20 px-8"
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={52} className="text-primary" aria-hidden="true" />
          <div>
            <p className="text-lg font-bold mb-2">Vielen Dank!</p>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed max-w-xs mx-auto">
              Wir haben Ihre Anfrage erhalten und melden uns baldmöglichst bei Ihnen.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr]">
          <div className="px-10 py-14 border-b lg:border-b-0 lg:border-r border-border-l dark:border-border-d flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-5">
              Kontakt aufnehmen
            </p>
            <h2 id={formHeadingId} className="text-3xl font-bold leading-tight mb-3">
              Schreiben Sie uns
            </h2>
            <p className="text-sm text-card-text-l dark:text-card-text-d leading-relaxed mb-8">
              Füllen Sie das Formular aus — wir melden uns baldmöglichst bei Ihnen.
            </p>
            <div className="w-12 h-px bg-primary" aria-hidden="true" />
          </div>

          <div className="px-10 py-14">
            <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Kontaktformular">
              <p className="text-xs text-card-text-l dark:text-card-text-d mb-6">
                Pflichtfelder sind mit <span aria-hidden="true">*</span> markiert.
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <FloatingInput
                    id="firstName"
                    label="Vorname"
                    required
                    error={errors.firstName?.message}
                    autoComplete="given-name"
                    {...register('firstName')}
                  />
                  <FloatingInput
                    id="lastName"
                    label="Nachname"
                    required
                    error={errors.lastName?.message}
                    autoComplete="family-name"
                    {...register('lastName')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  <FloatingInput
                    id="email"
                    label="E-Mail-Adresse"
                    type="email"
                    required
                    error={errors.email?.message}
                    autoComplete="email"
                    {...register('email')}
                  />
                  <FloatingInput
                    id="phone"
                    label="Telefonnummer"
                    type="tel"
                    error={errors.phone?.message}
                    autoComplete="tel"
                    {...register('phone')}
                  />
                </div>

                <FloatingInput
                  id="company"
                  label="Firma (optional)"
                  error={errors.company?.message}
                  autoComplete="organization"
                  {...register('company')}
                />

                <FloatingTextarea
                  id="message"
                  label="Ihre Nachricht"
                  required
                  rows={5}
                  error={errors.message?.message}
                  charCount={{ current: messageValue.length, max: CONTACT_FORM_LIMITS.MESSAGE_MAX }}
                  {...register('message')}
                />

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consentAccepted"
                      className="mt-0.5 w-4 h-4 shrink-0 accent-primary cursor-pointer"
                      aria-invalid={!!errors.consentAccepted}
                      aria-describedby={errors.consentAccepted ? 'consent-error' : undefined}
                      {...register('consentAccepted')}
                    />
                    <label
                      htmlFor="consentAccepted"
                      className="text-xs text-card-text-l dark:text-card-text-d leading-relaxed cursor-pointer"
                    >
                      Ich stimme der{' '}
                      <a href="/datenschutz" className="text-primary hover:underline">
                        Datenschutzerklärung
                      </a>{' '}
                      zu und bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme
                      gespeichert werden. <span aria-hidden="true">*</span>
                    </label>
                  </div>
                  {errors.consentAccepted && (
                    <p id="consent-error" role="alert" className="text-xs text-error ml-7">
                      {errors.consentAccepted.message}
                    </p>
                  )}
                </div>

                {serverError && (
                  <div role="alert" aria-live="assertive">
                    <p className="text-xs text-error bg-error/10 border border-error/20 rounded-sm px-3 py-2">
                      {serverError}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold',
                    'bg-primary text-white rounded-sm cursor-pointer',
                    'hover:bg-primary-dark',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin shrink-0" aria-hidden="true" />
                      Wird gesendet…
                    </>
                  ) : (
                    <>
                      <Send size={16} aria-hidden="true" />
                      Nachricht senden
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}