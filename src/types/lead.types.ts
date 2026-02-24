export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'NEGOTIATING'
  | 'CONVERTED'
  | 'LOST'
  | 'ARCHIVED';

export type LeadSource =
  | 'web'
  | 'email'
  | 'phone'
  | 'referral'
  | 'social'
  | 'other';

export type LeadType =
  | 'CONTACT'
  | 'PROPERTY_INQUIRY'
  | 'VALUATION'
  | 'SELLING'
  | 'BUYING'
  | 'RENTING'
  | 'OTHER';

export type LeadPriority =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'URGENT';

export interface LeadBase {
  id: string;
  type: LeadType;
  status: LeadStatus;
  source: LeadSource;
  priority?: LeadPriority;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface LeadDetails extends LeadBase {
  company?: string;
  property_id?: string;
  agent_id?: string;
  budget_min?: number;
  budget_max?: number;
  preferred_location?: string;
  timeline?: string;
  preferences?: string;
  notes?: string;
  tags?: string[];
  follow_up_date?: string;
  follow_up_count?: number;
  last_contact_date?: string;
  gdpr_consent?: boolean;
  newsletter_opt_in?: boolean;
}

export interface LeadListItem {
  id: string;
  type: LeadType;
  status: LeadStatus;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  property_id?: string;
  created_at: string;
  priority?: LeadPriority;
}

export interface LeadCreatePayload {
  type: LeadType;
  source: LeadSource;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string;
  property_id?: string;
  budget_min?: number;
  budget_max?: number;
  preferred_location?: string;
  timeline?: string;
  preferences?: string;
  gdpr_consent?: boolean;
  newsletter_opt_in?: boolean;
}

export interface LeadUpdatePayload {
  status?: LeadStatus;
  priority?: LeadPriority;
  agent_id?: string;
  notes?: string;
  tags?: string[];
  follow_up_date?: string;
}

export interface LeadStatusUpdate {
  status: LeadStatus;
  notes?: string;
}

export interface LeadFilters {
  status?: LeadStatus | LeadStatus[];
  type?: LeadType | LeadType[];
  source?: LeadSource | LeadSource[];
  priority?: LeadPriority | LeadPriority[];
  agent_id?: string;
  property_id?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
  unassigned?: boolean;
  needs_follow_up?: boolean;
}

export type LeadSortField =
  | 'created_at'
  | 'updated_at'
  | 'last_contact_date'
  | 'first_name'
  | 'priority'
  | 'status';

export interface LeadSort {
  field: LeadSortField;
  order: 'asc' | 'desc';
}

export interface LeadStatistics {
  total: number;
  by_status: Record<LeadStatus, number>;
  by_type: Record<LeadType, number>;
  by_source: Record<LeadSource, number>;
  conversion_rate: number;
  average_response_time: number;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  type: 'status_change' | 'note_added' | 'contact_made' | 'assigned' | 'other';
  description: string;
  user_id?: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}
