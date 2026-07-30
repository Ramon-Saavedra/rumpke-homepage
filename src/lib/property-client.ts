import {
  type PropertyListResponse,
  type PropertyDetailDto,
  type PublicErrorBody,
  PropertyFetchError,
  validatePropertyListResponse,
  validatePropertyDetailDto,
  validatePublicErrorBody,
} from "@/types/property-api";
import { getApiUrl, API_ENDPOINTS } from "@/lib/api-client";
import { publicErrorLabel } from "@/lib/property-errors";
import type { PropertyTypeFilter } from "@/types/property-types";

export interface PropertyQuery {
  readonly page?: number;
  readonly limit?: number;
  readonly marketingType?: "kauf" | "miete";
  readonly propertyType?: PropertyTypeFilter;
}

async function parsePublicErrorBody(
  response: Response,
): Promise<PublicErrorBody> {
  try {
    const body: unknown = await response.json();
    return validatePublicErrorBody(body);
  } catch {
    return {
      statusCode: response.status,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unerwarteter Serverfehler.",
    };
  }
}

async function handleErrorResponse(response: Response): Promise<never> {
  const body = await parsePublicErrorBody(response);
  throw new PropertyFetchError(
    body.statusCode,
    body.code,
    publicErrorLabel(body.code),
  );
}

async function fetchWithErrorHandling(url: string): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch {
    throw new PropertyFetchError(
      503,
      "PROPERTY_SERVICE_UNAVAILABLE",
      "Der Immobilienservice ist derzeit nicht verfügbar.",
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
      "INTERNAL_SERVER_ERROR",
      "Ungültige Server-Antwort.",
    );
  }
}

export async function getProperties({
  page = 1,
  limit = 12,
  marketingType,
  propertyType,
}: PropertyQuery = {}): Promise<PropertyListResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (marketingType) searchParams.set("marketingType", marketingType);
  if (propertyType) searchParams.set("propertyType", propertyType);

  const url = `${getApiUrl(API_ENDPOINTS.PROPERTIES)}?${searchParams.toString()}`;
  const data = await fetchWithErrorHandling(url);
  return validatePropertyListResponse(data);
}

export async function getProperty(
  objektnrExtern: string,
): Promise<PropertyDetailDto> {
  const url = `${getApiUrl(API_ENDPOINTS.PROPERTIES)}/${encodeURIComponent(objektnrExtern)}`;
  const data = await fetchWithErrorHandling(url);
  return validatePropertyDetailDto(data);
}
