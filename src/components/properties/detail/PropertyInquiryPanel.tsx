"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Send } from "lucide-react";
import FloatingInput from "@/components/features/contact-form/FloatingInput";
import FloatingTextarea from "@/components/features/contact-form/FloatingTextarea";
import {
  contactSchema,
  type ContactFormValues,
} from "@/components/features/contact-form/contactSchema";
import PropertyImage from "@/components/properties/PropertyImage";
import { usePropertyInquiry } from "./PropertyInquiryContext";
import { submitContactForm } from "@/lib/api-client";
import { ContactSubmitError } from "@/types/contact";
import { CONTACT_FORM_LIMITS } from "@/constants/contact";
import {
  PROPERTY_INQUIRY_TYPES,
  buildInquiryMessage,
  resolvePropertyReference,
  resolvePropertyTitle,
  type PropertyInquiryType,
} from "@/lib/property-detail";
import type { PropertyDetailDto } from "@/types/property-api";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button/buttonVariants";

interface PropertyInquiryPanelProps {
  readonly property: PropertyDetailDto;
  readonly className?: string;
}

export default function PropertyInquiryPanel({
  property,
  className,
}: PropertyInquiryPanelProps) {
  const { inquiryType, setInquiryType, panelRef } = usePropertyInquiry();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const title = resolvePropertyTitle(property);
  const reference = resolvePropertyReference(property);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: buildInquiryMessage("viewing", property),
      company: "",
      honeypot: "",
      consentAccepted: false,
    },
  });

  const messageValue = useWatch({ control, name: "message", defaultValue: "" });

  useEffect(() => {
    setValue("message", buildInquiryMessage(inquiryType, property), {
      shouldValidate: false,
    });
  }, [inquiryType, property, setValue]);

  function selectInquiryType(type: PropertyInquiryType) {
    setInquiryType(type);
  }

  async function onSubmit(data: ContactFormValues) {
    setServerError(null);
    try {
      await submitContactForm(
        {
          ...data,
          sourcePage: `/objekt/${property.id}`,
        },
        property.id,
      );
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ContactSubmitError) {
        if (err.fieldErrors) {
          const formFields = new Set<keyof ContactFormValues>([
            "firstName",
            "lastName",
            "email",
            "phone",
            "message",
            "consentAccepted",
            "company",
          ]);
          Object.entries(err.fieldErrors).forEach(([field, messages]) => {
            if (formFields.has(field as keyof ContactFormValues)) {
              setError(field as keyof ContactFormValues, {
                message: messages[0],
              });
            }
          });
        }
        setServerError(
          err.globalError ??
            "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
        );
      } else {
        setServerError(
          "Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.",
        );
      }
    }
  }

  return (
    <div
      ref={panelRef}
      id="objekt-anfrage"
      className={cn(
        "scroll-mt-28 rounded-lg border border-border-l bg-bgSecondary-l p-6 shadow-sm dark:border-border-d dark:bg-bgSecondary-d",
        className,
      )}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-border-l pb-5 dark:border-border-d">
        <div className="h-13 w-13 shrink-0 overflow-hidden rounded">
          <PropertyImage
            images={property.images}
            alt={title}
            className="h-full w-full"
            sizes="52px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-card-text-l dark:text-card-text-d">
            Ihre Anfrage zu
          </p>
          <p className="truncate text-sm font-semibold">
            {title} · {reference}
          </p>
        </div>
      </div>

      {submitted ? (
        <div
          className="flex flex-col items-center gap-4 py-6 text-center"
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={44} className="text-primary" aria-hidden="true" />
          <div>
            <p className="mb-2 font-serif text-xl font-semibold">
              Vielen Dank für Ihre Anfrage
            </p>
            <p className="text-sm leading-relaxed text-card-text-l dark:text-card-text-d">
              Wir haben Ihre Nachricht zu diesem Objekt erhalten und melden uns
              in Kürze persönlich bei Ihnen.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              reset({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: buildInquiryMessage(inquiryType, property),
                company: "",
                honeypot: "",
                consentAccepted: false,
              });
              setSubmitted(false);
            }}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Weitere Anfrage stellen
          </button>
        </div>
      ) : (
        <>
          <h2 className="mb-4 font-serif text-xl font-semibold">
            Kontakt aufnehmen
          </h2>

          <div
            role="group"
            aria-label="Art der Anfrage"
            className="mb-5 flex flex-wrap gap-2"
          >
            {PROPERTY_INQUIRY_TYPES.map((type) => {
              const isActive = type.id === inquiryType;
              return (
                <button
                  key={type.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectInquiryType(type.id)}
                  className={cn(
                    "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-control-border-l hover:border-primary hover:text-primary dark:border-control-border-d",
                  )}
                >
                  {type.label}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            aria-label="Objektanfrage"
          >
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="__hp_objekt">Website</label>
              <input
                type="text"
                id="__hp_objekt"
                tabIndex={-1}
                autoComplete="off"
                {...register("honeypot")}
              />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                <FloatingInput
                  id="inquiry-firstName"
                  label="Vorname"
                  required
                  error={errors.firstName?.message}
                  autoComplete="given-name"
                  {...register("firstName")}
                />
                <FloatingInput
                  id="inquiry-lastName"
                  label="Nachname"
                  required
                  error={errors.lastName?.message}
                  autoComplete="family-name"
                  {...register("lastName")}
                />
              </div>

              <FloatingInput
                id="inquiry-email"
                label="E-Mail-Adresse"
                type="email"
                required
                error={errors.email?.message}
                autoComplete="email"
                {...register("email")}
              />

              <FloatingInput
                id="inquiry-phone"
                label="Telefonnummer (optional)"
                type="tel"
                error={errors.phone?.message}
                autoComplete="tel"
                {...register("phone")}
              />

              <FloatingTextarea
                id="inquiry-message"
                label="Ihre Nachricht"
                required
                rows={5}
                error={errors.message?.message}
                charCount={{
                  current: messageValue.length,
                  max: CONTACT_FORM_LIMITS.MESSAGE_MAX,
                }}
                {...register("message")}
              />

              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="inquiry-consent"
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
                    aria-invalid={!!errors.consentAccepted}
                    aria-describedby={
                      errors.consentAccepted
                        ? "inquiry-consent-error"
                        : undefined
                    }
                    {...register("consentAccepted")}
                  />
                  <label
                    htmlFor="inquiry-consent"
                    className="cursor-pointer text-xs leading-relaxed text-card-text-l dark:text-card-text-d"
                  >
                    Ich habe die{" "}
                    <a
                      href="/datenschutz"
                      className="text-primary hover:underline"
                    >
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und bin mit der Verarbeitung meiner Daten zur
                    Bearbeitung dieser Anfrage einverstanden.{" "}
                    <span aria-hidden="true">*</span>
                  </label>
                </div>
                {errors.consentAccepted && (
                  <p
                    id="inquiry-consent-error"
                    role="alert"
                    className="ml-7 text-xs text-error"
                  >
                    {errors.consentAccepted.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div role="alert" aria-live="assertive">
                  <p className="rounded-md border border-error/20 bg-error/10 px-3 py-2 text-xs text-error">
                    {serverError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "w-full",
                })}
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className="shrink-0 animate-spin"
                      aria-hidden="true"
                    />
                    Wird gesendet…
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Anfrage senden
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
