import {
  type PropertyListResponse,
  type PropertyDetailDto,
  type PublicErrorCode,
  PropertyFetchError,
  validatePropertyListResponse,
  validatePropertyDetailDto,
  validatePublicErrorBody,
  PUBLIC_ERROR_CODES,
} from '@/types/property-api';
import { getApiUrl, API_ENDPOINTS } from '@/lib/api-client';

async function parsePublicErrorBody(response: Response): Promise<{ statusCode: number; code: string; message: string }> {
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

function resolvePublicCode(code: string): PublicErrorCode {
  if ((PUBLIC_ERROR_CODES as readonly string[]).includes(code)) {
    return code as PublicErrorCode;
  }
  return 'INTERNAL_SERVER_ERROR';
}

async function handleErrorResponse(response: Response): Promise<never> {
  const body = await parsePublicErrorBody(response);
  const code = resolvePublicCode(body.code);
  throw new PropertyFetchError(body.statusCode, code, body.message);
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
