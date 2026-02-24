"use client";

import Link from 'next/link';
import { IoAddOutline, IoCreateOutline, IoTrashOutline, IoPersonOutline, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useAgents, Agent } from '@/app/admin/hooks/agents/components/useAgents';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { languageOptions } from '@/app/admin/hooks/multilingualField/components/useMultilingualFields';
import Button from '@/components/ui/Button';

export default function AgentsTableClient({ initialAgents }: { initialAgents: Agent[] }) {
  const {
    agents,
    loading,
    error,
    editAgent,
    editAgentStatus,
    deleteAgent,
    deleteAgentStatus,
    fetchAgents,
  } = useAgents(initialAgents);


  const [editForm, setEditForm] = useState<Agent | null>(null);
  const [deleteModal, setDeleteModal] = useState<Agent | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (editAgentStatus === 'success') {
      setToast({ message: 'Makler erfolgreich aktualisiert', type: 'success' });
    } else if (editAgentStatus === 'error') {
      setToast({ message: 'Fehler beim Aktualisieren des Maklers', type: 'error' });
    }
  }, [editAgentStatus]);

  useEffect(() => {
    if (deleteAgentStatus === 'success') {
      setToast({ message: 'Makler erfolgreich gelöscht', type: 'success' });
    } else if (deleteAgentStatus === 'error') {
      setToast({ message: 'Fehler beim Löschen des Maklers', type: 'error' });
    }
  }, [deleteAgentStatus]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOpenEdit = (agent: Agent) => {
    setEditForm({ ...agent });
  };

  const handleCloseEdit = () => {
    setEditForm(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSave = () => {
    if (editForm) {
      editAgent(editForm);
      handleCloseEdit();
    }
  };

  return (
    <div>

      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-2 py-1 rounded-lg shadow-lg animate-slide-in ${toast.type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
          }`}>
          {toast.type === 'success' ? (
            <IoCheckmarkCircle className="text-2xl" />
          ) : (
            <IoCloseCircle className="text-2xl" />
          )}
          <span className="font-medium">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-admin-text-l dark:text-admin-text-d">Makler</h1>
          <p className="text-sm text-admin-text-l dark:text-admin-text-d mt-1">
            Verwalten Sie Ihre Immobilienmakler
          </p>
        </div>
        <Link href="/admin/agents/new">
          <Button variant="primary" className="flex items-center">
            <IoAddOutline className="" />
            <IoPersonOutline className="" />
          </Button>
        </Link>
      </div>

      <div className="bg-secondary dark:bg-secondary-dark rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary dark:bg-secondary-dark border-b border-admin-border-l dark:border-admin-border-d">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-text-l dark:text-admin-text-d uppercase tracking-wider">
                  Makler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-text-l dark:text-admin-text-d uppercase tracking-wider">
                  Kontakt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-text-l dark:text-admin-text-d uppercase tracking-wider">
                  Sprachen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-admin-text-l dark:text-admin-text-d uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-admin-text-l dark:text-admin-text-d uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-l dark:divide-admin-border-d">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Lade...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} className="text-center py-8 text-error">{error instanceof Error ? error.message : String(error)}</td></tr>
              ) : agents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-admin-text-l dark:text-admin-text-d">
                    Keine Makler gefunden. Erstellen Sie Ihren ersten Makler, um zu beginnen.
                  </td>
                </tr>
              ) : (
                agents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-admin-hover-l dark:hover:bg-admin-hover-d">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {agent.photo_url && (
                          <img
                            src={agent.photo_url}
                            alt={`${agent.first_name} ${agent.last_name}`}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-admin-text-l dark:text-admin-text-d">
                            {agent.first_name} {agent.last_name}
                          </div>
                          {agent.position_de && (
                            <div className="text-xs text-admin-text-l dark:text-admin-text-d">
                              {agent.position_de}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-admin-text-l dark:text-admin-text-d">{agent.email}</div>
                      <div className="text-xs text-admin-text-l dark:text-admin-text-d">{agent.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {agent.languages?.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-1 text-[10px] bg-admin-hover-l dark:bg-admin-hover-d text-admin-text-l dark:text-admin-text-d rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${agent.is_active
                          ? 'bg-primary text-admin-text-d font-bold'
                          : 'bg-admin-hover-l dark:bg-admin-hover-d text-admin-text-l dark:text-admin-text-d'
                          }`}
                      >
                        {agent.is_active ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-admin-text-l dark:text-admin-text-d hover:text-primary hover:bg-admin-hover-l dark:hover:bg-admin-hover-d rounded transition-colors cursor-pointer"
                          title="Bearbeiten"
                          onClick={() => handleOpenEdit(agent)}
                        >
                          <IoCreateOutline className="text-lg" />
                        </button>
                        <button
                          className="p-2 text-admin-text-l dark:text-admin-text-d hover:text-red-600 hover:bg-admin-hover-l dark:hover:bg-admin-hover-d rounded transition-colors cursor-pointer"
                          title="Löschen"
                          onClick={() => setDeleteModal(agent)}
                        >
                          <IoTrashOutline className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-admin-text-l dark:text-admin-text-d hover:text-gray-700" onClick={handleCloseEdit}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-admin-text-l dark:text-admin-text-d">Makler bearbeiten</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Vorname</label>
                <input
                  type="text"
                  name="first_name"
                  value={editForm.first_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Nachname</label>
                <input
                  type="text"
                  name="last_name"
                  value={editForm.last_name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Telefon</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Foto-URL</label>
                <input
                  type="text"
                  name="photo_url"
                  value={editForm.photo_url || ''}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Berufsbezeichnung (DE)</label>
                <input
                  type="text"
                  name="position_de"
                  value={editForm.position_de || ''}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Sprachen</label>
                <Select
                  isMulti
                  options={languageOptions}
                  value={languageOptions.filter(opt => editForm.languages?.includes(opt.value))}
                  onChange={selected =>
                    setEditForm({
                      ...editForm,
                      languages: selected ? selected.map(s => s.value) : [],
                    })
                  }
                  className="react-select-container text-black"
                  classNamePrefix="react-select"
                  placeholder="Sprachen auswählen..."
                  formatOptionLabel={option => (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.2em' }}>{option.flag}</span>
                      <span>{option.value}</span>
                    </span>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Aktiv</label>
                <select
                  name="is_active"
                  value={editForm.is_active ? 'true' : 'false'}
                  onChange={e =>
                    setEditForm({
                      ...editForm,
                      is_active: e.target.value === 'true',
                    })
                  }
                  className="w-full px-3 py-2 border rounded text-gray-600"
                >
                  <option value="true">Aktiv</option>
                  <option value="false">Inaktiv</option>
                </select>
              </div>

            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={handleCloseEdit}>Abbrechen</Button>
              <Button variant="primary" onClick={handleEditSave}>Speichern</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-admin-text-l dark:text-admin-text-d hover:text-gray-700" onClick={() => setDeleteModal(null)}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-admin-text-l dark:text-admin-text-d">Makler löschen</h2>
            <p className="mb-4">Sind Sie sicher, dass Sie <span className="font-semibold">{deleteModal.first_name} {deleteModal.last_name}</span> löschen möchten?</p>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setDeleteModal(null)}>Abbrechen</Button>
              <Button variant="danger" onClick={() => { deleteAgent(deleteModal.id); setDeleteModal(null); }}>Löschen</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
