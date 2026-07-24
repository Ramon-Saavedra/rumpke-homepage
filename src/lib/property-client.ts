import {
  type PropertyListResponse,
  type PropertyDetailDto,
  type PublicErrorBody,
  PropertyFetchError,
  validatePropertyListResponse,
  validatePropertyDetailDto,
  validatePublicErrorBody,
} from '@/types/property-api';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';
import { publicErrorLabel } from '@/lib/property-errors';

async function parsePublicErrorBody(response: Response): Promise<PublicErrorBody> {
  try {
    const body: unknown = await response.json();
    return validatePublicErrorBody(body);
  } catch {
    return {
      statusCode: response.status,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unerwarteter Serverfehler.',
    };
  }
}

async function handleErrorResponse(response: Response): Promise<never> {
  const body = await parsePublicErrorBody(response);
  throw new PropertyFetchError(body.statusCode, body.code, publicErrorLabel(body.code));
}

async function fetchWithErrorHandling(url: string): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url, { cache: 'no-store' });
  } catch {
    throw new PropertyFetchError(
      503,
      'PROPERTY_SERVICE_UNAVAILABLE',
      'Der Immobilienservice ist derzeit nicht verfügbar.',
    );
  }

  if (!res.ok) {
    await handleErrorResponse(res);
  }

  try {
    return await res.json();
  } catch {
    throw new PropertyFetchError(
      502,
      'INTERNAL_SERVER_ERROR',
      'Ungültige Server-Antwort.',
    );
  }
}

export async function getProperties(
  page: number = 1,
  limit: number = 12,
): Promise<PropertyListResponse> {
  const url = `${getApiUrl(API_ENDPOINTS.PROPERTIES)}?page=${page}&limit=${limit}`;
  const data = await fetchWithErrorHandling(url);
  return validatePropertyListResponse(data);
}

export async function getProperty(objektnrExtern: string): Promise<PropertyDetailDto> {
  const url = `${getApiUrl(API_ENDPOINTS.PROPERTIES)}/${encodeURIComponent(objektnrExtern)}`;
  const data = await fetchWithErrorHandling(url);
  return validatePropertyDetailDto(data);
}
