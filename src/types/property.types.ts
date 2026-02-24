export type PropertyStatus =
  | 'PUBLISHED'
  | 'RESERVED'
  | 'SOLD'
  | 'RENTED'
  | 'DRAFT'
  | 'HIDDEN';

export type PropertyOperation =
  | 'SELL'
  | 'RENT';

export type PropertyType =
  | 'WOHNUNG'
  | 'HAUS'
  | 'GEWERBE'
  | 'GRUNDSTUECK'
  | 'SONSTIGE';

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  caption?: string;
  width?: number;
  height?: number;
}

export interface PropertyBase {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: PropertyStatus;
  operation: PropertyOperation;
  type: PropertyType;
  price_amount?: number;
  price_currency: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyLocation {
  address?: string;
  city?: string;
  postal_code?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface PropertySpecs {
  area_sqm?: number;
  rooms?: number;
  bathrooms?: number;
  bedrooms?: number;
  floor?: number;
  total_floors?: number;
  year_built?: number;
  year_renovated?: number;
  parking_spaces?: number;
  has_balcony?: boolean;
  has_terrace?: boolean;
  has_garden?: boolean;
  has_elevator?: boolean;
  has_basement?: boolean;
}

export interface PropertyFinancials {
  rent_amount?: number;
  deposit?: number;
  additional_costs?: number;
  heating_costs?: number;
  commission?: number;
}

export interface PropertyDetails extends PropertyBase {
  main_image?: string;
  images: PropertyImage[];
  location?: PropertyLocation;
  specs?: PropertySpecs;
  financials?: PropertyFinancials;
  available_from?: string;
  furnished?: boolean;
  features?: string[];
  tags?: string[];
  agent_id?: string;
  energy_class?: string;
  heating_type?: string;
  view_count?: number;
  favorite_count?: number;
}

export interface PropertyCard {
  id: string;
  slug: string;
  title: string;
  operationType: PropertyOperation;
  image: string;
  images: string[];
  price?: string;
  type?: PropertyType;
  city?: string;
  area_sqm?: number;
  rooms?: number;
  available_from?: string;
  deposit?: number;
  furnished?: boolean;
  status?: PropertyStatus;
}

export interface PropertyListItem {
  id: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  operation: PropertyOperation;
  type: PropertyType;
  price_amount?: number;
  city?: string;
  created_at: string;
}

export interface PropertyPayload {
  title: string;
  description?: string;
  status: PropertyStatus;
  operation: PropertyOperation;
  type: PropertyType;
  price_amount?: number;
  price_currency?: string;
  main_image?: string;
  location?: Partial<PropertyLocation>;
  specs?: Partial<PropertySpecs>;
  financials?: Partial<PropertyFinancials>;
  available_from?: string;
  furnished?: boolean;
  features?: string[];
  tags?: string[];
  agent_id?: string;
  energy_class?: string;
  heating_type?: string;
}

export interface PropertyFilters {
  status?: PropertyStatus | PropertyStatus[];
  operation?: PropertyOperation;
  type?: PropertyType | PropertyType[];
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  min_rooms?: number;
  max_rooms?: number;
  city?: string;
  postal_code?: string;
  search?: string;
  agent_id?: string;
  furnished?: boolean;
}

export type PropertySortField =
  | 'created_at'
  | 'updated_at'
  | 'price_amount'
  | 'area_sqm'
  | 'rooms'
  | 'title';

export type PropertySortOrder = 'asc' | 'desc';

export interface PropertySort {
  field: PropertySortField;
  order: PropertySortOrder;
}
