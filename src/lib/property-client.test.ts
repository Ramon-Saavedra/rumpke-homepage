const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock("@/lib/api-client", () => ({
  getApiUrl: jest.fn(() => "http://localhost:3001/api/v1/properties"),
  API_ENDPOINTS: { PROPERTIES: "/v1/properties" },
}));

import { getProperties, getProperty } from "./property-client";
import { PropertyFetchError } from "@/types/property-api";

function makeResponse(status: number, body: unknown = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

const cardDto = {
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
};

describe("getProperties", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches and validates property list", async () => {
    mockFetch.mockResolvedValueOnce(
      makeResponse(200, {
        data: [cardDto],
        pagination: { page: 1, limit: 12, total: 1, totalPages: 1 },
      }),
    );

    const result = await getProperties(1, 12);
    expect(result.data).toHaveLength(1);
    expect(result.pagination.page).toBe(1);
  });

  it("throws PropertyFetchError on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    await expect(getProperties(1, 12)).rejects.toThrow(PropertyFetchError);
  });

  it("throws PropertyFetchError on non-ok response", async () => {
    mockFetch.mockResolvedValueOnce(
      makeResponse(503, {
        statusCode: 503,
        code: "PROPERTY_SERVICE_DISABLED",
        message: "Service disabled",
      }),
    );
    await expect(getProperties(1, 12)).rejects.toThrow(PropertyFetchError);
  });

  it("throws PropertyFetchError on invalid JSON", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockRejectedValue(new Error("Parse error")),
    } as unknown as Response);
    await expect(getProperties(1, 12)).rejects.toThrow(PropertyFetchError);
  });
});

describe("getProperty", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("fetches and validates property detail", async () => {
    mockFetch.mockResolvedValueOnce(
      makeResponse(200, {
        id: "P-001",
        title: "Test",
        description: null,
        locationDescription: null,
        furnishingDescription: null,
        price: { salePrice: 250000, coldRent: null, warmRent: null, hoaFee: null, additionalCosts: null, brokerageFree: false },
        area: { livingArea: 120, usableArea: null, plotArea: null },
        rooms: { total: 4, bedrooms: null, bathrooms: null },
        address: { city: "Bawinkel", zip: null, street: null, houseNumber: null, country: null, latitude: null, longitude: null },
        propertyType: null,
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
      }),
    );

    const result = await getProperty("P-001");
    expect(result.id).toBe("P-001");
    expect(result.price.salePrice).toBe(250000);
  });

  it("throws PropertyFetchError on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));
    await expect(getProperty("P-001")).rejects.toThrow(PropertyFetchError);
  });
});
