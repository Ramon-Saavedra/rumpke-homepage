import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import type {
  LeadDetails,
  LeadStatusUpdate,
  PropertyDetails,
  PropertyPayload,
  AgentDetails,
  AgentPayload,
} from '@/types';

export async function updateLeadStatus(id: string, status: LeadStatusUpdate['status']): Promise<LeadDetails> {
  return apiFetch<LeadDetails>(`${getApiUrl(API_ENDPOINTS.LEADS)}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function getLeads(): Promise<LeadDetails[]> {
  return apiFetch<LeadDetails[]>(getApiUrl(API_ENDPOINTS.LEADS));
}

export async function deleteProperty(id: string): Promise<void> {
  return apiFetch<void>(`${getApiUrl(API_ENDPOINTS.PROPERTIES)}/${id}`, {
    method: 'DELETE',
  });
}

export async function getPropertyById(id: string): Promise<PropertyDetails> {
  return apiFetch<PropertyDetails>(`${getApiUrl(API_ENDPOINTS.PROPERTIES)}/${id}`);
}

export async function updateProperty(id: string, propertyData: Partial<PropertyPayload>): Promise<PropertyDetails> {
  const payload = { ...propertyData };
  if ('agent_id' in payload) {
    (payload as any).agent = payload.agent_id;
    delete payload.agent_id;
  }

  return apiFetch<PropertyDetails>(`${getApiUrl(API_ENDPOINTS.PROPERTIES)}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function createProperty(propertyData: PropertyPayload): Promise<PropertyDetails> {
  return apiFetch<PropertyDetails>(getApiUrl(API_ENDPOINTS.PROPERTIES), {
    method: 'POST',
    body: JSON.stringify(propertyData),
  });
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers = {
    ...(options.headers || {}),
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || 'API-Anfrage fehlgeschlagen');
    (error as any).response = { data: errorData };
    throw error;
  }
  return res.json();
}

export async function getAgents(): Promise<AgentDetails[]> {
  return apiFetch<AgentDetails[]>(`${getApiUrl(API_ENDPOINTS.AGENTS)}?active=false`);
}

export async function createAgent(agentData: AgentPayload): Promise<AgentDetails> {
  return apiFetch<AgentDetails>(getApiUrl(API_ENDPOINTS.AGENTS), {
    method: 'POST',
    body: JSON.stringify(agentData),
  });
}

export async function deleteAgent(id: string): Promise<void> {
  return apiFetch<void>(`${getApiUrl(API_ENDPOINTS.AGENTS)}/${id}`, {
    method: 'DELETE',
  });
}

export async function editAgent(agentData: AgentDetails): Promise<AgentDetails> {
  const { id, created_at, updated_at, ...allowedFields } = agentData;
  return apiFetch<AgentDetails>(`${getApiUrl(API_ENDPOINTS.AGENTS)}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(allowedFields),
  });
}

export async function getProperties(): Promise<PropertyDetails[]> {
  return apiFetch<PropertyDetails[]>(getApiUrl(API_ENDPOINTS.PROPERTIES));
}



