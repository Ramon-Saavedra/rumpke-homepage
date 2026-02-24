'use client';

import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ImageUrlOrUploadInput from '../../hooks/properties/components/ImageUrlOrUploadInput';

import { createAgent } from '@/utils/admin-client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { IoArrowBackOutline, IoSaveOutline, IoSchoolOutline } from 'react-icons/io5';
import { languages, languageOptions } from '@/app/admin/hooks/multilingualField/components/useMultilingualFields';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AgentInputText from '../../components/agents/components/AgentInputText';
import { useRouter } from 'next/navigation';
import AgentCheckboxBoolean from '../../components/agents/components/AgentCheckboxBoolean';



export default function NewAgentPage() {

  if (typeof window !== 'undefined' && !localStorage.getItem('admin_token')) {
    window.location.replace('/admin/login');
    return null;
  }
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    first_name: yup.string().required("Vorname ist erforderlich"),
    last_name: yup.string().required("Nachname ist erforderlich"),
    email: yup.string().email("Ungültige E-Mail").required("E-Mail ist erforderlich"),
    phone: yup.string().required("Telefon ist erforderlich"),
    mobile: yup.string().notRequired(),
    photo_url: yup.string().url('Foto-URL muss gültig sein').required('Foto-URL ist erforderlich'),
    languages: yup.array().of(yup.string()).min(1, "Mindestens eine Sprache auswählen").required(),
    is_active: yup.boolean().notRequired(),
    is_public: yup.boolean().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError: setFormError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      mobile: "",
      photo_url: '',
      languages: [],
      is_active: false,
      is_public: true,
    },
  });

  useEffect(() => {
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey) {
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  }, [errors]);


  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createAgent(data);
      setSuccess("Makler erfolgreich erstellt!");
      router.push("/admin/agents");
    } catch (err: any) {
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        err.response.data.errors.forEach((error: any, index: number) => {
          if (error.field && error.message) {
            setFormError(error.field as any, { type: "manual", message: error.message });

            if (index === 0) {
              setTimeout(() => {
                const errorElement = document.getElementsByName(error.field)[0];
                if (errorElement) {
                  errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  errorElement.focus();
                }
              }, 100);
            }
          }
        });
      }
      else if (err?.response?.data?.message) {
        const msg = Array.isArray(err.response.data.message)
          ? err.response.data.message.join(' ')
          : err.response.data.message;
        setError(msg);
      }
      else if (err?.message) {
        setError(err.message);
      }
      else {
        setError("API-Anfrage fehlgeschlagen");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/agents"
          className="inline-flex items-center gap-2 hover:text-primary mb-4 text-xs text-primary hover:underline"
        >
          <IoArrowBackOutline />
          <span>Zurück zu Maklern</span>
        </Link>
        <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Neuen Makler erstellen</h1>
        <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
          Fügen Sie einen neuen Immobilienmakler zu Ihrem Team hinzu
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 dark:bg-error/20 border border-error dark:border-error rounded-lg">
          <p className="text-sm text-error dark:text-error">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-secondary dark:bg-secondary-dark rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-admin-text-l dark:text-admin-text-d mb-4">
            Basisinformationen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AgentInputText
              label="Vorname"
              name="first_name"
              required
              register={register}
              error={errors.first_name}
              placeholder="Max"
            />
            <AgentInputText
              label="Nachname"
              name="last_name"
              required
              register={register}
              error={errors.last_name}
              placeholder="Mustermann"
            />
            <AgentInputText
              label="E-Mail"
              name="email"
              type="email"
              required
              register={register}
              error={errors.email}
              placeholder="max@email.de"
            />
            <AgentInputText
              label="Telefon"
              name="phone"
              required
              register={register}
              error={errors.phone}
              placeholder="0123 4567890"
            />
            <AgentInputText
              label="Handy"
              name="mobile"
              type="tel"
              register={register}
              error={errors.mobile}
              placeholder="0176 1234567"
            />
          </div>


          {/* Foto-URL y subida */}
          <div className="mt-4">
            <Controller
              name="photo_url"
              control={control}
              render={({ field }) => (
                <ImageUrlOrUploadInput
                  label="Foto-URL"
                  field={field}
                  error={errors.photo_url}
                  required
                />
              )}
            />
          </div>


          <div className="mt-4 text-black">
            <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2">
              Sprachen *
            </label>
            <Controller
              name="languages"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  instanceId="agent-languages"
                  options={languageOptions}
                  value={languageOptions.filter(opt => field.value?.includes(opt.value))}
                  onChange={(selected) => field.onChange(selected ? selected.map(s => s.value) : [])}
                  placeholder="Sprachen auswählen..."
                  className="react-select-container"
                  classNamePrefix="react-select"
                  formatOptionLabel={(option) => {
                    const [flag, ...rest] = option.label.split(' ');
                    return (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.2em' }}>{flag}</span>
                        <span>{rest.join(' ')}</span>
                      </span>
                    );
                  }}
                />
              )}
            />
            {errors.languages && (
              <p className="text-xs text-error mt-1">{errors.languages.message as string}</p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Wählen Sie alle Sprachen aus, die der Makler spricht
            </p>
          </div>

          {/* Berufsbezeichnung (Mehrsprachig) */}
          <div className="bg-secondary dark:bg-secondary-dark rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <IoSchoolOutline className="text-xl" />
              Berufsbezeichnung (Mehrsprachig)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={`position-${lang.code}`}>
                  <AgentInputText
                    label={`${lang.flag} ${lang.name}`}
                    name={`position_${lang.code}`}
                    register={register}
                    error={(errors as any)[`position_${lang.code}`] as import('react-hook-form').FieldError | undefined}
                    placeholder={`Berufsbezeichnung auf ${lang.name}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Biografie (Mehrsprachig) */}
          <div className="bg-secondary dark:bg-secondary-dark rounded-lg shadow p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-xl">📝</span>
              Biografie (Mehrsprachig)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((lang) => (
                <div key={`bio-${lang.code}`}>
                  <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2">
                    {`${lang.flag} ${lang.name}`}
                  </label>
                  <textarea
                    {...register(`bio_${lang.code}` as any)}
                    className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent min-h-20 resize-vertical"
                    placeholder={`Biografie auf ${lang.name}`}
                  />
                  {(errors as any)[`bio_${lang.code}`] && (
                    <p className="text-xs text-error mt-1">
                      {(errors as any)[`bio_${lang.code}`]?.message}
                    </p>
                  )}
                </div>
              ))}
              {/* Aktiv (Checkbox) */}
              <div className="mt-6">
                <AgentCheckboxBoolean
                  label="Aktiv"
                  name="is_active"
                  register={register}
                  error={(errors as any).is_active}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">
                  Makler kann Anfragen erhalten und kontaktiert werden
                </p>
                <div className="mt-4">
                  <h3 className="text-xs font-semibold text-admin-text-l dark:text-admin-text-d mb-1">Sichtbarkeit</h3>
                  <AgentCheckboxBoolean
                    label="Makler auf der öffentlichen Webseite anzeigen"
                    name="is_public"
                    register={register}
                    error={(errors as any).is_public}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading} variant="primary">
                <IoSaveOutline className="text-xl" />
                <span>{loading ? "Wird erstellt..." : "Makler erstellen"}</span>
              </Button>
              <Link href="/admin/agents">
                <Button type="button" variant="secondary">
                  Abbrechen
                </Button>
              </Link>
            </div>
            {success && (
              <div className="mt-2 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                {success}
              </div>
            )}
            {error && (
              <div className="px-3 py-2 bg-error/10 border border-error text-error rounded text-sm col-span-1">
                {error}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );

}
