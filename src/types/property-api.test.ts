import {
  validatePropertyDetailDto,
  validatePropertyListResponse,
  validatePublicErrorBody,
  PropertyFetchError,
} from "@/types/property-api";

describe("validatePublicErrorBody", () => {
  it("returns valid public error body", () => {
    const result = validatePublicErrorBody({
      statusCode: 404,
      code: "PROPERTY_NOT_FOUND",
      message: "Not found",
    });
    expect(result).toEqual({
      statusCode: 404,
      code: "PROPERTY_NOT_FOUND",
      message: "Not found",
    });
  });

  it("falls back for non-object input", () => {
    const result = validatePublicErrorBody("invalid");
    expect(result).toEqual({
      statusCode: 502,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unerwarteter Serverfehler.",
    });
  });

  it("falls back for null input", () => {
    const result = validatePublicErrorBody(null);
    expect(result).toEqual({
      statusCode: 502,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unerwarteter Serverfehler.",
    });
  });

  it("falls back for missing fields", () => {
    const result = validatePublicErrorBody({});
    expect(result).toEqual({
      statusCode: 502,
      code: "INTERNAL_SERVER_ERROR",
      message: "Unerwarteter Serverfehler.",
    });
  });
});

describe("validatePropertyDetailDto", () => {
  it("validates a complete detail", () => {
    const result = validatePropertyDetailDto({
      id: "P-001",
      title: "Test",
      description: "Desc",
      locationDescription: null,
      furnishingDescription: null,
      price: {
        salePrice: 250000,
        coldRent: null,
        warmRent: null,
        hoaFee: null,
        additionalCosts: null,
        brokerageFree: false,
      },
      area: {
        livingArea: 120,
        usableArea: null,
        plotArea: null,
      },
      rooms: {
        total: 4,
        bedrooms: null,
        bathrooms: null,
      },
      address: {
        city: "Bawinkel",
        zip: null,
        street: null,
        houseNumber: null,
        country: null,
        latitude: null,
        longitude: null,
      },
      propertyType: "haus",
      propertySubType: null,
      marketingType: "kauf",
      yearBuilt: null,
      floor: null,
      totalFloors: null,
      condition: null,
      balcony: false,
      terrace: false,
      energyCertificateType: null,
      images: [],
    });
    expect(result.id).toBe("P-001");
    expect(result.price.salePrice).toBe(250000);
    expect(result.area.livingArea).toBe(120);
    expect(result.rooms.total).toBe(4);
    expect(result.address.city).toBe("Bawinkel");
  });

  it("falls back brokerageFree to false for non-boolean", () => {
    const result = validatePropertyDetailDto({
      id: "P-001",
      title: null,
      description: null,
      locationDescription: null,
      furnishingDescription: null,
      price: { salePrice: null, coldRent: null, warmRent: null, hoaFee: null, additionalCosts: null, brokerageFree: "not-a-boolean" },
      area: { livingArea: null, usableArea: null, plotArea: null },
      rooms: { total: null, bedrooms: null, bathrooms: null },
      address: { city: null, zip: null, street: null, houseNumber: null, country: null, latitude: null, longitude: null },
      propertyType: null,
      propertySubType: null,
      marketingType: null,
      yearBuilt: null,
      floor: null,
      totalFloors: null,
      condition: null,
      balcony: "not-a-boolean",
      terrace: false,
      energyCertificateType: null,
      images: [],
    });
    expect(result.price.brokerageFree).toBe(false);
    expect(result.balcony).toBe(false);
  });
});

describe("validatePropertyListResponse", () => {
  it("validates a list response", () => {
    const result = validatePropertyListResponse({
      data: [
        {
          id: "P-001",
          title: "Test",
          city: null,
          propertyType: null,
          propertySubType: null,
          marketingType: null,
          salePrice: null,
          coldRent: null,
          livingArea: null,
          rooms: null,
          images: [],
        },
      ],
      pagination: {
        page: 1,
        limit: 12,
        total: 1,
        totalPages: 1,
      },
    });
    expect(result.data).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it("throws for non-object input", () => {
    expect(() => validatePropertyListResponse("invalid")).toThrow(PropertyFetchError);
  });

  it("throws when data is not an array", () => {
    expect(() =>
      validatePropertyListResponse({ data: "not-array", pagination: {} }),
    ).toThrow(PropertyFetchError);
  });
});

describe("PropertyFetchError", () => {
  it("constructs with statusCode, publicCode, and message", () => {
    const error = new PropertyFetchError(503, "PROPERTY_SERVICE_UNAVAILABLE", "Down");
    expect(error).toBeInstanceOf(PropertyFetchError);
    expect(error).toBeInstanceOf(Error);
    expect(error.statusCode).toBe(503);
    expect(error.publicCode).toBe("PROPERTY_SERVICE_UNAVAILABLE");
    expect(error.message).toBe("Down");
    expect(error.name).toBe("PropertyFetchError");
  });
});
