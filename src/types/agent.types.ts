export type AgentStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE'
  | 'ARCHIVED';

export type AgentRole =
  | 'AGENT'
  | 'SENIOR_AGENT'
  | 'MANAGER'
  | 'DIRECTOR'
  | 'ADMIN';

export type AgentSpecialization =
  | 'RESIDENTIAL'
  | 'COMMERCIAL'
  | 'LUXURY'
  | 'RENTAL'
  | 'INVESTMENT'
  | 'LAND'
  | 'ALL';

export interface AgentContact {
  email: string;
  phone?: string;
  mobile?: string;
  whatsapp?: string;
  linkedin?: string;
  xing?: string;
  facebook?: string;
  instagram?: string;
}

export interface AgentAddress {
  street?: string;
  city?: string;
  postal_code?: string;
  state?: string;
  country?: string;
}

export interface AgentBase {
  id: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  status: AgentStatus;
  role: AgentRole;
  photo_url?: string;
  contact: AgentContact;
  created_at: string;
  updated_at: string;
}

export interface AgentDetails extends AgentBase {
  title?: string;
  bio?: string;
  languages?: string[];
  specializations?: AgentSpecialization[];
  office_address?: AgentAddress;
  license_number?: string;
  years_experience?: number;
  certifications?: string[];
  availability?: string;
  service_areas?: string[];
  website_url?: string;
  commission_rate?: number;
  featured?: boolean;
  display_order?: number;
  notes?: string;
}

export interface AgentListItem {
  id: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  status: AgentStatus;
  role: AgentRole;
  email: string;
  phone?: string;
  photo_url?: string;
  created_at: string;
}

export interface AgentCard {
  id: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  title?: string;
  photo_url?: string;
  email: string;
  phone?: string;
  mobile?: string;
  specializations?: AgentSpecialization[];
  bio?: string;
  languages?: string[];
}

export interface AgentPayload {
  first_name: string;
  last_name: string;
  display_name?: string;
  status: AgentStatus;
  role: AgentRole;
  title?: string;
  bio?: string;
  photo_url?: string;
  contact: AgentContact;
  office_address?: AgentAddress;
  languages?: string[];
  specializations?: AgentSpecialization[];
  license_number?: string;
  years_experience?: number;
  certifications?: string[];
  availability?: string;
  service_areas?: string[];
  website_url?: string;
  commission_rate?: number;
  featured?: boolean;
  display_order?: number;
  notes?: string;
}

export interface AgentStatistics {
  agent_id: string;
  total_properties: number;
  active_listings: number;
  properties_sold: number;
  properties_rented: number;
  total_leads: number;
  converted_leads: number;
  conversion_rate: number;
  average_response_time: number;
  total_revenue?: number;
  average_property_price?: number;
  satisfaction_rating?: number;
  review_count?: number;
}

export interface AgentFilters {
  status?: AgentStatus | AgentStatus[];
  role?: AgentRole | AgentRole[];
  specialization?: AgentSpecialization | AgentSpecialization[];
  service_area?: string;
  search?: string;
  featured?: boolean;
  active?: boolean;
}

export type AgentSortField =
  | 'created_at'
  | 'updated_at'
  | 'first_name'
  | 'last_name'
  | 'display_order'
  | 'properties_count';

export interface AgentSort {
  field: AgentSortField;
  order: 'asc' | 'desc';
}
