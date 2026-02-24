'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import ContactAside from "./ContactAside";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-client";
import type { LeadCreatePayload, LeadType, LeadSource } from "@/types";

export const schema = yup.object().shape({
  type: yup.mixed<LeadType>()
    .oneOf(['CONTACT', 'PROPERTY_INQUIRY', 'VALUATION', 'SELLING', 'BUYING', 'RENTING', 'OTHER'])
    .required(),
  property_id: yup.string().nullable().default(null),
  name: yup.string().required("Name ist erforderlich"),
  email: yup.string().email("Ungültige E-Mail-Adresse").required("E-Mail ist erforderlich"),
  phone: yup.string().required("Telefon ist erforderlich"),
  message: yup.string().required("Nachricht ist erforderlich"),
  consent: yup.boolean().oneOf([true], "Zustimmung ist erforderlich").default(false),
  source: yup.string().nullable().default(null),
});

type LeadFormValues = {
  type: LeadType;
  property_id: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  source: string | null;
};

interface LeadFormProps {
  type?: LeadType;
  propertyId?: string;
  source?: LeadSource;
}

export default function LeadForm({
  type = "CONTACT",
  propertyId = "",
  source = "web"
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<LeadFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      type,
      property_id: propertyId ?? null,
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      source: source ?? null,
    },
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit: SubmitHandler<LeadFormValues> = async (data) => {
    setSubmitSuccess(false);
    setSubmitError("");
    try {
      const [firstName, ...lastNameParts] = data.name.trim().split(/\s+/);
      const lastName = lastNameParts.join(" ") || firstName;

      const payload: LeadCreatePayload = {
        type: data.type,
        source: (data.source as LeadSource) || "web",
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone || undefined,
        message: data.message,
        property_id: data.property_id && data.property_id.length > 0 ? data.property_id : undefined,
        gdpr_consent: data.consent,
      };

      const res = await fetch(getApiUrl(API_ENDPOINTS.LEAD), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      reset({
        type,
        property_id: propertyId || null,
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
        source: source || null,
      });
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Etwas ist schief gelaufen. Bitte versuchen Sie es später erneut.");
    }
  };

  return (
    <>
      <div id="leadform" className="items-stretch w-full h-full">
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between mx-auto bg-secondary dark:bg-secondary-dark px-2 py-4 lg:p-8 lg:rounded border border-card-secondary-bg-l dark:border-card-secondary-bg-d h-full"
          >
            <div>
              <label className="block mb-2 font-semibold text-card-text-d">Art der Anfrage *</label>
              <select
                {...register("type")}
                className="w-full px-4 py-2 border border-card-secondary-bg-d text-card-text-l focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-card-text-d dark:placeholder:text-card-text-d"
              >
                <option value="CONTACT">Kontakt</option>
                <option value="PROPERTY_INQUIRY">Immobilienanfrage</option>
                <option value="VALUATION">Bewertung</option>
                <option value="SELLING">Verkauf</option>
                <option value="BUYING">Kauf</option>
                <option value="RENTING">Miete</option>
              </select>
              {errors.type && <p className="text-error text-xs mt-1">{errors.type.message}</p>}
            </div>
            <input type="hidden" {...register("property_id")} />
            <input type="hidden" {...register("source")} />
            <div>
              <label className="block mb-2 font-semibold text-card-text-d">Name *</label>
              <input
                className="w-full px-4 py-2 border border-card-secondary-bg-d text-card-text-l focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-card-text-d dark:placeholder:text-card-text-d"
                {...register("name")}
              />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-card-text-d">E-Mail *</label>
              <input
                className="w-full px-4 py-2 border border-card-secondary-bg-d text-card-text-l focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-card-text-d dark:placeholder:text-card-text-d"
                {...register("email")}
              />
              {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-card-text-d">Telefon *</label>
              <input
                className="w-full px-4 py-2 border border-card-secondary-bg-d text-card-text-l focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-card-text-d dark:placeholder:text-card-text-d"
                {...register("phone")}
              />
              {errors.phone && <p className="text-error text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-card-text-d">Nachricht *</label>
              <textarea
                className="w-full px-4 py-2 border border-card-secondary-bg-d text-card-text-l focus:outline-none focus:ring-2 focus:ring-primary transition placeholder:text-card-text-d dark:placeholder:text-card-text-d"
                rows={4}
                {...register("message")}
              />
              {errors.message && <p className="text-error text-xs mt-1">{errors.message.message}</p>}
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="consent" className="mr-2 accent-primary border border-card-secondary-bg-d text-card-text-l" {...register("consent")} />
              <label htmlFor="consent" className="text-card-text-l dark:text-card-text-d">
                Ich akzeptiere die Datenschutzerklärung *
              </label>
            </div>
            {errors.consent && <p className="text-error text-xs mt-1">{errors.consent.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-3 font-bold shadow-md disabled:opacity-60
              bg-primary text-white hover:bg-primary-dark
              dark:bg-primary-dark dark:hover:bg-primary dark:text-white cursor-pointer"
            >
              {isSubmitting ? 'Senden...' : 'Absenden'}
            </button>
            {submitSuccess && (
              <p className="text-success text-sm mt-2">Vielen Dank für Ihre Anfrage!</p>
            )}
            {submitError && (
              <p className="text-error text-sm mt-2">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
