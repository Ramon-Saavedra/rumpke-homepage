import React, { useState } from "react";
import Image from "next/image";
import { propertyOptionalGroups } from "./propertyOptionalGroups";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import { useAgents } from "@/app/admin/hooks/agents/components/useAgents";
import ErrorToast from "./ErrorToast";
import InlineEditField from "./InlineEditField";
import SuccessToast from "./SuccessToast";

import { PropertyAdminPanel } from "@/interfaces/PropertyAdminPanel";
import { PiPencilCircleDuotone } from "react-icons/pi";
import Button from "@/components/ui/Button";
import { deleteProperty, updateProperty } from "@/utils/admin-client";
import Link from "next/link";

const statusColorVars: Record<PropertyAdminPanel["status"], string> = {
  PUBLISHED: "var(--color-status-published)",
  RESERVED: "var(--color-status-reserved)",
  SOLD: "var(--color-status-sold)",
  RENTED: "var(--color-status-rented)",
  DRAFT: "var(--color-status-draft)",
  HIDDEN: "var(--color-status-hidden)",
};

const statusLabels: Record<PropertyAdminPanel["status"], string> = {
  PUBLISHED: "Veröffentlicht",
  RESERVED: "Reserviert",
  SOLD: "Verkauft",
  RENTED: "Vermietet",
  DRAFT: "Entwurf",
  HIDDEN: "Versteckt",
};

interface PropertyAdminCardProps {
  property: PropertyAdminPanel;
  onEdit?: () => void;
  expanded?: boolean;
  onExpand?: () => void;
  onCloseExpand?: () => void;
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const PropertyAdminCard: React.FC<PropertyAdminCardProps> = ({ property, onEdit, expanded, onExpand, onCloseExpand }) => {
  const [editValues, setEditValues] = useState(property);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { agents, loading: agentsLoading, error: agentsError } = useAgents();
  const [showOptional, setShowOptional] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const handleInlineSave = async (field: keyof PropertyAdminPanel, value: string | number | boolean) => {
    if (value === "error") {
      setErrorMsg("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    setEditValues(prev => ({ ...prev, [field]: value }));
    try {

      await updateProperty(property.id, { [field]: value });
      setToastMsg(field === "status" ? "Status erfolgreich geändert!" : "Erfolgreich gespeichert!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err: any) {
      setErrorMsg("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
  };


  const optionalFields: Array<{ key: keyof PropertyAdminPanel; label: string }> = [
    { key: "country", label: "Land" },
    { key: "latitude", label: "Breitengrad" },
    { key: "longitude", label: "Längengrad" },
    { key: "usable_area_m2", label: "Nutzfläche (m²)" },
    { key: "plot_area_m2", label: "Grundstücksfläche (m²)" },
    { key: "floor", label: "Etage" },
    { key: "floors_total", label: "Etagen gesamt" },
    { key: "has_elevator", label: "Aufzug" },
    { key: "parking_spaces", label: "Parkplätze" },
    { key: "garage", label: "Garage" },
  ];

  if (typeof expanded !== "undefined" && expanded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="w-full h-full flex flex-col items-center justify-center">

          <div className="relative bg-secondary dark:bg-secondary-dark text-card-text-l dark:text-card-text-d  shadow-2xl px-6 py-2 w-[90%] overflow-y-auto flex flex-col gap-8 rounded">
            <button
              type="button"
              className="mx-auto"
              onClick={onCloseExpand}
              aria-label="Schließen"
            >
              <IoClose className="w-4 h-4 text-primary hover:text-error cursor-pointer" />
            </button>
            <div className="flex justify-between items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {editValues.main_image && editValues.main_image.startsWith('https://images.unsplash.com/') && (
                  <Image
                    src={editValues.main_image}
                    alt="Immobilienfoto"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

            </div>
            <div className="flex gap-16 items-start px-2 rounded">
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-xl font-bold mb-2">Hauptdaten</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 mb-8">
                  <InlineEditField
                    label="Titel"
                    value={editValues.title && editValues.title.trim() !== '' ? editValues.title : "Ohne Titel"}
                    type="text"
                    onSave={val => handleInlineSave('title', val)}
                  />
                  <InlineEditField label="Eingentümer" value={editValues.owner || "-"} type="text" onSave={val => handleInlineSave('owner', val)} />

                  <InlineEditField
                    label="Vermarktungsart"
                    value={editValues.operation === "SELL" ? "Kauf" : "Miete"}
                    displayValue={<span style={{ color: editValues.operation === "SELL" ? 'var(--color-buy)' : 'var(--color-rent)' }}>{editValues.operation === "SELL" ? "Kauf" : "Miete"}</span>}
                    type="select"
                    options={["Kauf", "Miete"]}
                    onSave={val => handleInlineSave('operation', val === "Kauf" ? "SELL" : "RENT")}
                  />
                  <InlineEditField label="Typ" value={capitalize(editValues.type)} type="select" options={["Haus", "Wohnung", "Gewerbe", "Grundstueck", "Sonstige"]} onSave={val => handleInlineSave('type', val)} />
                  <InlineEditField
                    label="Status"
                    value={statusLabels[editValues.status]}
                    type="select"
                    options={Object.values(statusLabels)}
                    onSave={val => {
                      const entry = Object.entries(statusLabels).find(([k, l]) => l === val);
                      if (entry) handleInlineSave('status', entry[0] as PropertyAdminPanel["status"]);
                    }}
                  />
                  <InlineEditField label="Adresse" value={editValues.address_line} type="text" onSave={val => handleInlineSave('address_line', val)} />
                  <InlineEditField label="Stadt" value={editValues.city} type="text" onSave={val => handleInlineSave('city', val)} />
                  <InlineEditField label="PLZ" value={editValues.postal_code} type="text" onSave={val => handleInlineSave('postal_code', val)} />
                  <InlineEditField label="Wohnfläche (m²)" value={editValues.built_area_m2} type="number" onSave={val => handleInlineSave('built_area_m2', val)} />
                  <InlineEditField label="Zimmer" value={editValues.rooms} type="number" onSave={val => handleInlineSave('rooms', val)} />
                  <InlineEditField label="Schlafzimmer" value={editValues.bedrooms} type="number" onSave={val => handleInlineSave('bedrooms', val)} />
                  <InlineEditField label="Badezimmer" value={editValues.bathrooms} type="number" onSave={val => handleInlineSave('bathrooms', val)} />
                  <InlineEditField label="Preis" value={editValues.price_amount} type="number" onSave={val => handleInlineSave('price_amount', val)} />

                  <InlineEditField label="Aufzug" value={editValues.has_elevator === true ? 'Ja' : editValues.has_elevator === false ? 'Nein' : '-'} type="text" onSave={val => handleInlineSave('has_elevator', val === 'Ja')} />
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {propertyOptionalGroups.filter(g => g.title === "Geografische Angaben").map(group => (
                    <div
                      className=" mb-6 bg-green-900/20 p-2 rounded"
                      key={group.title}>
                      <h3 className="font-bold">{group.title}</h3>
                      <div className="flex flex-col gap-0 pt-2 ">
                        {group.fields.map(({ key, label }) => {
                          const value = (editValues as Record<string, any>)[key];
                          let displayValue: string | number = value;
                          if (typeof value === 'boolean') {
                            displayValue = value ? 'Ja' : 'Nein';
                          } else if (value === undefined || value === null || value === '') {
                            displayValue = '-';
                          }
                          return (
                            <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                              <span className="font-semibold">{label}</span>
                              <span className="font-bold">{displayValue}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}


                  {propertyOptionalGroups
                    .filter(g => g.title === "Finanzen & Sonstiges")
                    .map(group => (
                      <div key={group.title} className="mb-6 bg-yellow-900/20 p-2 rounded">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => {
                            const value = (editValues as Record<string, any>)[key];
                            let displayValue: string | number = value;
                            if (typeof value === 'boolean') {
                              displayValue = value ? 'Ja' : 'Nein';
                            } else if (value === undefined || value === null || value === '') {
                              displayValue = '-';
                            }
                            return (
                              <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                                <span className="font-semibold">{label}</span>
                                <span className="font-bold">{displayValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  {propertyOptionalGroups
                    .filter(g => g.title === "Technische Angaben")
                    .map(group => (
                      <div key={group.title} className="mb-6 bg-blue-900/20 p-2 rounded">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => {
                            const value = (editValues as Record<string, any>)[key];
                            let displayValue: string | number = value;
                            if (typeof value === 'boolean') {
                              displayValue = value ? 'Ja' : 'Nein';
                            } else if (value === undefined || value === null || value === '') {
                              displayValue = '-';
                            }
                            return (
                              <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                                <span className="font-semibold">{label}</span>
                                <span className="font-bold">{displayValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                  {propertyOptionalGroups
                    .filter(g => g.title === "Ausstattung & Komfort")
                    .map(group => (
                      <div key={group.title} className="mb-6 bg-red-900/20 p-2 rounded">
                        <h3 className="font-bold">{group.title}</h3>
                        <div className="flex flex-col gap-0 pt-2">
                          {group.fields.map(({ key, label }) => {
                            const value = (editValues as Record<string, any>)[key];
                            let displayValue: string | number = value;
                            if (typeof value === 'boolean') {
                              displayValue = value ? 'Ja' : 'Nein';
                            } else if (value === undefined || value === null || value === '') {
                              displayValue = '-';
                            }
                            return (
                              <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                                <span className="font-semibold">{label}</span>
                                <span className="font-bold">{displayValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2 justify-between">
                <span
                  className="inline-flex items-center justify-center min-w-[90px] h-7 rounded text-xs font-semibold"
                  style={{ background: statusColorVars[editValues.status], color: '#fff', padding: '0 12px' }}
                >
                  {capitalize(statusLabels[editValues.status])}
                </span>
                <Link
                  href={`/admin/properties/edit/${property.id}`}
                  className="bg-blue-400 px-3 py-1 rounded hover:bg-blue-500 cursor-pointer text-white hover:text-gray-300 flex items-center justify-center"
                  title="Bearbeiten"
                >
                  Bearbeiten
                </Link>
              </div>
            </div>
            {showToast && <SuccessToast message={toastMsg} />}
            {showError && <ErrorToast message={errorMsg} />}
          </div>
        </div>
      </div>
    );
  }


  const borderColor = editValues.operation === 'SELL' ? 'var(--color-buy)' : 'var(--color-rent)';


  const agentObj = agents.find(a => a.id === editValues.agent);
  const agentName = agentObj ? `${agentObj.first_name} ${agentObj.last_name}` : "Ohne Namen";

  return (
    <div
      style={{ borderLeft: `2px solid ${borderColor}` }}
      className="rounded shadow-md px-5 py-2 gap-3 min-h-[340px] w-full mx-auto bg-secondary dark:bg-secondary-dark text-card-text-l dark:text-card-text-d"
    >

      {(editValues.created_at || editValues.updated_at) && (
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <div>
            {editValues.created_at && (
              <span>Erstellt am: {new Date(editValues.created_at).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</span>
            )}
          </div>
          <div>
            {editValues.updated_at && (
              <span>Aktualisiert am: {new Date(editValues.updated_at).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</span>
            )}
          </div>
        </div>
      )}
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {editValues.main_image && editValues.main_image.startsWith('https://images.unsplash.com/') && (
            <Image
              src={editValues.main_image}
              alt="Immobilienfoto"
              width={300}
              height={200}
              className="object-cover w-full h-full rounded"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-0">

          <div
            className={`overflow-hidden transition-all  ${showOptional ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="flex flex-col gap-0 pt-2">
              {optionalFields.map(({ key, label }) => (
                <div key={key} className="flex justify-between items-center text-xs py-1 border-b dark:border-admin-border-d border-admin-border-l px-2">
                  <span className="font-semibold">{label}</span>
                  <span className="font-bold">{editValues[key] !== undefined && editValues[key] !== null ? String(editValues[key]) : "-"}</span>
                </div>
              ))}
            </div>
          </div>

          <InlineEditField
            label="Titel"
            value={editValues.title && editValues.title.trim() !== '' ? editValues.title : "Ohne Titel"}
            type="text"
            onSave={val => handleInlineSave('title', val)}
          />

          <InlineEditField label="Eingentümer" value={editValues.owner || "-"} type="text" onSave={val => handleInlineSave('owner', val)} />

          <InlineEditField
            label="Vermarktungsart"
            value={editValues.operation === "SELL" ? "Kauf" : "Miete"}
            displayValue={<span style={{ color: editValues.operation === "SELL" ? 'var(--color-buy)' : 'var(--color-rent)' }}>{editValues.operation === "SELL" ? "Kauf" : "Miete"}</span>}
            type="select"
            options={["Kauf", "Miete"]}
            onSave={val => handleInlineSave('operation', val === "Kauf" ? "SELL" : "RENT")}
          />
          <InlineEditField label="Typ" value={capitalize(editValues.type)} type="select" options={["Haus", "Wohnung", "Gewerbe", "Grundstueck", "Sonstige"]} onSave={val => handleInlineSave('type', val)} />
          <InlineEditField label="Status" value={statusLabels[editValues.status]} type="select" options={Object.values(statusLabels)} onSave={val => {
            const entry = Object.entries(statusLabels).find(([k, l]) => l === val);
            if (entry) handleInlineSave('status', entry[0] as PropertyAdminPanel["status"]);
          }} />
          <InlineEditField label="Adresse" value={editValues.address_line} type="text" onSave={val => handleInlineSave('address_line', val)} />
          <InlineEditField label="Stadt" value={editValues.city} type="text" onSave={val => handleInlineSave('city', val)} />
          <InlineEditField label="PLZ" value={editValues.postal_code} type="text" onSave={val => handleInlineSave('postal_code', val)} />
          <InlineEditField label="Wohnfläche (m²)" value={editValues.built_area_m2} type="number" onSave={val => handleInlineSave('built_area_m2', val)} />
          <InlineEditField label="Zimmer" value={editValues.rooms} type="number" onSave={val => handleInlineSave('rooms', val)} />
          <InlineEditField label="Schlafzimmer" value={editValues.bedrooms} type="number" onSave={val => handleInlineSave('bedrooms', val)} />
          <InlineEditField label="Badezimmer" value={editValues.bathrooms} type="number" onSave={val => handleInlineSave('bathrooms', val)} />
          <InlineEditField label="Preis" value={editValues.price_amount} type="number" onSave={val => handleInlineSave('price_amount', val)} />
          {/* <InlineEditField label="Währung" value={editValues.currency} type="select" options={["EUR", "USD", "CHF"]} onSave={val => handleInlineSave('currency', val)} /> */}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2 justify-between">
          <span
            className="inline-flex items-center justify-center min-w-[90px] h-7 rounded text-xs font-semibold"
            style={{ background: statusColorVars[editValues.status], color: '#fff', padding: '0 12px' }}
          >
            {capitalize(statusLabels[editValues.status])}
          </span>
          <div className="flex gap-2">

            <Link
              href={`/admin/properties/edit/${property.id}`}
              className=" bg-blue-400 px-3 py-1 rounded hover:bg-blue-500 cursor-pointer text-white hover:text-gray-300 flex items-center justify-center"
              title="Bearbeiten"
            >
              Bearbeiten
            </Link>
            <Button variant="danger" onClick={() => setShowConfirm(true)}>Löschen</Button>
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg flex flex-col items-center gap-4">
                  <span className="text-sm font-semibold">Sind Sie sicher, dass Sie diese Immobilie löschen möchten?</span>
                  <div className="flex gap-4">
                    <Button variant="danger" onClick={async () => {
                      try {
                        await deleteProperty(property.id);
                        setToastMsg("Immobilie erfolgreich gelöscht.");
                        setShowToast(true);
                        setShowConfirm(false);
                      } catch (err) {
                        setErrorMsg("Fehler beim Löschen der Immobilie.");
                        setShowError(true);
                        setShowConfirm(false);
                      }
                    }}>Ja, löschen</Button>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>Abbrechen</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          className="mx-auto flex items-center gap-1 text-xs text-primary hover:underline cursor-pointer  dark:hover:bg-Bghover-d hover:bg-Bghover-l rounded px-2 py-1"
          onClick={onExpand}
          aria-label="Mehr anzeigen"
        >
          <IoChevronDown className="w-4 h-4" />
        </button>
      </div>
      {showToast && <SuccessToast message={toastMsg} />}
      {showError && <ErrorToast message={errorMsg} />}
    </div>
  );
};

export default PropertyAdminCard;
