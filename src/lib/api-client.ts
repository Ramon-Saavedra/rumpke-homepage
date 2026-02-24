import { ENV } from '@/config/env';

export const API_ENDPOINTS = {
  PROPERTIES: '/property',
  PROPERTY_BY_ID: (id: string) => `/property/${id}`,
  PROPERTY_BY_SLUG: (slug: string) => `/property/slug/${slug}`,
  LEADS: '/lead',
  LEAD_BY_ID: (id: string) => `/lead/${id}`,
  AGENTS: '/agent',
  AGENT_BY_ID: (id: string) => `/agent/${id}`,
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  DASHBOARD_SUMMARY: '/dashboard/summary',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_STATISTICS: '/admin/statistics',
} as const;

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const cleanBaseUrl = ENV.API_URL.endsWith('/')
    ? ENV.API_URL.slice(0, -1)
    : ENV.API_URL;

  return `${cleanBaseUrl}/${cleanEndpoint}`;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  get isClientError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 400 && this.statusCode < 500;
  }

  get isServerError(): boolean {
    return this.statusCode !== undefined && this.statusCode >= 500;
  }

  get isAuthError(): boolean {
    return this.statusCode === 401;
  }

  get isForbiddenError(): boolean {
    return this.statusCode === 403;
  }

  get isNotFoundError(): boolean {
    return this.statusCode === 404;
  }
}

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

export function getApiHeaders(additionalHeaders?: HeadersInit): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...additionalHeaders,
  };

  return headers;
}

export function getApiRequestOptions(
  method: HttpMethod,
  body?: unknown,
  additionalOptions?: RequestInit
): RequestInit {
  const options: RequestInit = {
    method,
    headers: getApiHeaders(additionalOptions?.headers),
    ...additionalOptions,
  };

  if (body && method !== HTTP_METHODS.GET) {
    options.body = JSON.stringify(body);
  }

  return options;
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
}
