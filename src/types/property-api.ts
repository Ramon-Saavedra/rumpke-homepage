export interface PropertyImageDto {
  readonly id: string;
  readonly url: string;
  readonly title: string | null;
  readonly type: string | null;
  readonly position: number;
}

export interface PropertyCardDto {
  readonly id: string;
  readonly title: string | null;
  readonly city: string | null;
  readonly propertyType: string | null;
  readonly propertySubType: string | null;
  readonly marketingType: string | null;
  readonly salePrice: number | null;
  readonly coldRent: number | null;
  readonly livingArea: number | null;
  readonly rooms: number | null;
  readonly images: readonly PropertyImageDto[];
}

export interface Pagination {
  readonly page: number;
  readonly limit: number;
  readonly total: number;
  readonly totalPages: number;
}

export interface PropertyListResponse {
  readonly data: readonly PropertyCardDto[];
  readonly pagination: Pagination;
}

export interface PriceDetail {
  readonly salePrice: number | null;
  readonly coldRent: number | null;
  readonly warmRent: number | null;
  readonly hoaFee: number | null;
  readonly additionalCosts: number | null;
  readonly brokerageFree: boolean;
}

export interface AreaDetail {
  readonly livingArea: number | null;
  readonly usableArea: number | null;
  readonly plotArea: number | null;
}

export interface RoomsDetail {
  readonly total: number | null;
  readonly bedrooms: number | null;
  readonly bathrooms: number | null;
}

export interface AddressDetail {
  readonly city: string | null;
  readonly zip: string | null;
  readonly street: string | null;
  readonly houseNumber: string | null;
  readonly country: string | null;
  readonly latitude: number | null;
  readonly longitude: number | null;
}

export interface PropertyDetailDto {
  readonly id: string;
  readonly title: string | null;
  readonly description: string | null;
  readonly locationDescription: string | null;
  readonly furnishingDescription: string | null;
  readonly price: PriceDetail;
  readonly area: AreaDetail;
  readonly rooms: RoomsDetail;
  readonly address: AddressDetail;
  readonly propertyType: string | null;
  readonly propertySubType: string | null;
  readonly marketingType: string | null;
  readonly yearBuilt: number | null;
  readonly floor: string | null;
  readonly totalFloors: number | null;
  readonly condition: string | null;
  readonly balcony: boolean;
  readonly terrace: boolean;
  readonly energyCertificateType: string | null;
  readonly images: readonly PropertyImageDto[];
}

export interface PublicErrorBody {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
}

export const PUBLIC_ERROR_CODES = [
  'VALIDATION_ERROR',
  'PROPERTY_NOT_FOUND',
  'PROPERTY_SERVICE_DISABLED',
  'PROPERTY_SERVICE_UNAVAILABLE',
  'INTERNAL_SERVER_ERROR',
] as const;

export type PublicErrorCode = (typeof PUBLIC_ERROR_CODES)[number];

export class PropertyFetchError extends Error {
  public readonly statusCode: number;
  public readonly publicCode: PublicErrorCode;

  constructor(statusCode: number, publicCode: PublicErrorCode, message: string) {
    super(message);
    this.name = 'PropertyFetchError';
    this.statusCode = statusCode;
    this.publicCode = publicCode;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNumberOrNull(value: unknown): value is number | null {
  if (value === null) return true;
  return typeof value === 'number' && Number.isFinite(value);
}

function isStringOrNull(value: unknown): value is string | null {
  if (value === null) return true;
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function validatePriceDetail(data: unknown): PriceDetail {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid price detail in response');
  }
  return {
    salePrice: isNumberOrNull(data['salePrice']) ? data['salePrice'] : null,
    coldRent: isNumberOrNull(data['coldRent']) ? data['coldRent'] : null,
    warmRent: isNumberOrNull(data['warmRent']) ? data['warmRent'] : null,
    hoaFee: isNumberOrNull(data['hoaFee']) ? data['hoaFee'] : null,
    additionalCosts: isNumberOrNull(data['additionalCosts']) ? data['additionalCosts'] : null,
    brokerageFree: isBoolean(data['brokerageFree']) ? data['brokerageFree'] : false,
  };
}

function validateAreaDetail(data: unknown): AreaDetail {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid area detail in response');
  }
  return {
    livingArea: isNumberOrNull(data['livingArea']) ? data['livingArea'] : null,
    usableArea: isNumberOrNull(data['usableArea']) ? data['usableArea'] : null,
    plotArea: isNumberOrNull(data['plotArea']) ? data['plotArea'] : null,
  };
}

function validateRoomsDetail(data: unknown): RoomsDetail {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid rooms detail in response');
  }
  return {
    total: isNumberOrNull(data['total']) ? data['total'] : null,
    bedrooms: isNumberOrNull(data['bedrooms']) ? data['bedrooms'] : null,
    bathrooms: isNumberOrNull(data['bathrooms']) ? data['bathrooms'] : null,
  };
}

function validateAddressDetail(data: unknown): AddressDetail {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid address detail in response');
  }
  return {
    city: isStringOrNull(data['city']) ? data['city'] : null,
    zip: isStringOrNull(data['zip']) ? data['zip'] : null,
    street: isStringOrNull(data['street']) ? data['street'] : null,
    houseNumber: isStringOrNull(data['houseNumber']) ? data['houseNumber'] : null,
    country: isStringOrNull(data['country']) ? data['country'] : null,
    latitude: isNumberOrNull(data['latitude']) ? data['latitude'] : null,
    longitude: isNumberOrNull(data['longitude']) ? data['longitude'] : null,
  };
}

function validatePropertyImageDto(item: unknown): PropertyImageDto {
  if (!isRecord(item)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid image item in response');
  }
  return {
    id: typeof item['id'] === 'string' ? item['id'] : '',
    url: typeof item['url'] === 'string' ? item['url'] : '',
    title: isStringOrNull(item['title']) ? item['title'] : null,
    type: isStringOrNull(item['type']) ? item['type'] : null,
    position: typeof item['position'] === 'number' ? item['position'] : 0,
  };
}

function validatePropertyImages(data: unknown): readonly PropertyImageDto[] {
  if (Array.isArray(data)) {
    return data.map((item: unknown) => validatePropertyImageDto(item));
  }
  return [];
}

function validatePropertyCardDto(data: unknown): PropertyCardDto {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid property card in response');
  }
  return {
    id: typeof data['id'] === 'string' ? data['id'] : '',
    title: isStringOrNull(data['title']) ? data['title'] : null,
    city: isStringOrNull(data['city']) ? data['city'] : null,
    propertyType: isStringOrNull(data['propertyType']) ? data['propertyType'] : null,
    propertySubType: isStringOrNull(data['propertySubType']) ? data['propertySubType'] : null,
    marketingType: isStringOrNull(data['marketingType']) ? data['marketingType'] : null,
    salePrice: isNumberOrNull(data['salePrice']) ? data['salePrice'] : null,
    coldRent: isNumberOrNull(data['coldRent']) ? data['coldRent'] : null,
    livingArea: isNumberOrNull(data['livingArea']) ? data['livingArea'] : null,
    rooms: isNumberOrNull(data['rooms']) ? data['rooms'] : null,
    images: validatePropertyImages(data['images']),
  };
}

function validatePagination(data: unknown): Pagination {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid pagination in response');
  }
  return {
    page: typeof data['page'] === 'number' ? data['page'] : 1,
    limit: typeof data['limit'] === 'number' ? data['limit'] : 12,
    total: typeof data['total'] === 'number' ? data['total'] : 0,
    totalPages: typeof data['totalPages'] === 'number' ? data['totalPages'] : 1,
  };
}

export function validatePropertyListResponse(data: unknown): PropertyListResponse {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid property list response');
  }
  const rawData = data['data'];
  if (!Array.isArray(rawData)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid data array in response');
  }
  return {
    data: rawData.map((item: unknown) => validatePropertyCardDto(item)),
    pagination: validatePagination(data['pagination']),
  };
}

export function validatePropertyDetailDto(data: unknown): PropertyDetailDto {
  if (!isRecord(data)) {
    throw new PropertyFetchError(502, 'INTERNAL_SERVER_ERROR', 'Invalid property detail response');
  }
  return {
    id: typeof data['id'] === 'string' ? data['id'] : '',
    title: isStringOrNull(data['title']) ? data['title'] : null,
    description: isStringOrNull(data['description']) ? data['description'] : null,
    locationDescription: isStringOrNull(data['locationDescription']) ? data['locationDescription'] : null,
    furnishingDescription: isStringOrNull(data['furnishingDescription']) ? data['furnishingDescription'] : null,
    price: validatePriceDetail(data['price']),
    area: validateAreaDetail(data['area']),
    rooms: validateRoomsDetail(data['rooms']),
    address: validateAddressDetail(data['address']),
    propertyType: isStringOrNull(data['propertyType']) ? data['propertyType'] : null,
    propertySubType: isStringOrNull(data['propertySubType']) ? data['propertySubType'] : null,
    marketingType: isStringOrNull(data['marketingType']) ? data['marketingType'] : null,
    yearBuilt: isNumberOrNull(data['yearBuilt']) ? data['yearBuilt'] : null,
    floor: isStringOrNull(data['floor']) ? data['floor'] : null,
    totalFloors: isNumberOrNull(data['totalFloors']) ? data['totalFloors'] : null,
    condition: isStringOrNull(data['condition']) ? data['condition'] : null,
    balcony: isBoolean(data['balcony']) ? data['balcony'] : false,
    terrace: isBoolean(data['terrace']) ? data['terrace'] : false,
    energyCertificateType: isStringOrNull(data['energyCertificateType']) ? data['energyCertificateType'] : null,
    images: validatePropertyImages(data['images']),
  };
}

export function validatePublicErrorBody(data: unknown): PublicErrorBody {
  if (!isRecord(data)) {
    return {
      statusCode: 502,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unerwarteter Serverfehler.',
    };
  }
  return {
    statusCode: typeof data['statusCode'] === 'number' ? data['statusCode'] : 502,
    code: typeof data['code'] === 'string' ? data['code'] : 'INTERNAL_SERVER_ERROR',
    message: typeof data['message'] === 'string' ? data['message'] : 'Unerwarteter Serverfehler.',
  };
}
