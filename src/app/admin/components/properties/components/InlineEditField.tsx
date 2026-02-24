
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { IoPencil } from "react-icons/io5";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import InputSelect from "./InputSelect";



interface InlineEditFieldProps {
  label: string;
  value: string | number;
  displayValue?: ReactNode;
  type?: "text" | "number" | "select";
  options?: string[];
  required?: boolean;
  onSave: (newValue: string | number) => void;
}


const getYupSchema = (type: "text" | "number" | "select", required?: boolean, options?: string[]) => {
  if (type === "number") {
    let schema = yup.number().typeError("Bitte geben Sie eine Zahl ein.");
    if (required) schema = schema.required("Dieses Feld ist erforderlich.");
    schema = schema.min(0, "Der Wert muss positiv sein.");
    return schema;
  }
  if (type === "select" && options) {
    let schema = yup.string().oneOf(options, "Bitte wählen Sie eine gültige Option.");
    if (required) schema = schema.required("Dieses Feld ist erforderlich.");
    return schema;
  }
  let schema = yup.string();
  if (required) schema = schema.required("Dieses Feld ist erforderlich.");
  return schema;
};

const InlineEditField: React.FC<InlineEditFieldProps> = ({ label, value, displayValue, type = "text", options, required = true, onSave }) => {
  const [editing, setEditing] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);

  const schema = yup.object({
    field: getYupSchema(type, required, options)
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue: setFormValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { field: value }
  });

  useEffect(() => {
    if (!editing) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(event.target as Node)) {
        setEditing(false);
        reset({ field: value });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, value, reset]);

  const onSubmit = (data: { field?: string | number }) => {
    setEditing(false);
    if (data.field !== undefined && data.field !== value) onSave(data.field);
  };

  return (
    <div className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l hover:bg-primary-dark/30 px-2 transition-colors ">
      <span className="font-semibold">{label}</span>
      <div className="flex items-center gap-2" ref={editRef}>
        {editing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 w-full">
            {type === "select" && options ? (
              <InputSelect
                label={label}
                options={options.map(opt => ({ value: opt, label: opt }))}
                error={errors.field?.message as string}
                {...register("field")}
                className="border border-admin-border-l dark:border-admin-border-d rounded px-2 py-1 bg-secondary dark:bg-secondary-dark"
              />
            ) : type === "number" ? (
              <InputNumber
                label={label}
                error={errors.field?.message as string}
                {...register("field")}
                className="border border-admin-border-l dark:border-admin-border-d rounded px-2 py-1 bg-secondary dark:bg-secondary-dark"
              />
            ) : (
              <InputText
                label={label}
                error={errors.field?.message as string}
                {...register("field")}
                className="border border-admin-border-l dark:border-admin-border-d rounded px-2 py-1 bg-secondary dark:bg-secondary-dark"
              />
            )}
            <button
              type="submit"
              className={`ml-2 bg-primary text-white border-none rounded px-2 py-1 font-semibold cursor-pointer ${errors.field ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!!errors.field || !isValid}
            >
              Speichern
            </button>
            {errors.field && (
              <span className="text-xs text-error mt-1 block">{errors.field.message}</span>
            )}
          </form>
        ) : (
          <>
            <span className="font-bold">{displayValue ?? value}</span>
            <button
              onClick={() => setEditing(true)}
              className="ml-2 bg-transparent hover:text-primary border-none cursor-pointer flex items-center"
              title="Bearbeiten"
            >
              <IoPencil className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InlineEditField;
