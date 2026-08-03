import "@testing-library/jest-dom";

const mockGetProperties = jest.fn();
jest.mock("@/lib/property-client", () => ({
  getProperties: (...args: unknown[]) => mockGetProperties(...args),
}));

import {
  isSimilar,
  resolveCardPrice,
  resolveMarketingType,
  resolveOverviewUrl,
  priceDistance,
  loadSimilar,
} from "./SimilarProperties";
import type { PropertyCardDto } from "@/types/property-api";
import type { PropertyListResponse } from "@/types/property-api";

function makeCard(overrides: Partial<PropertyCardDto> = {}): PropertyCardDto {
  return {
    id: "card-1",
    title: "Test Property",
    city: "München",
    propertyType: "Haus",
    propertySubType: null,
    marketingType: "kauf",
    salePrice: 500000,
    coldRent: null,
    livingArea: null,
    plotArea: null,
    usableArea: null,
    rooms: null,
    floor: null,
    latitude: null,
    longitude: null,
    images: [],
    ...overrides,
  };
}

function makeListResponse(
  data: readonly PropertyCardDto[],
  total = data.length,
): PropertyListResponse {
  return {
    data,
    pagination: { page: 1, limit: 50, total, totalPages: 1 },
  };
}

describe("resolveMarketingType", () => {
  it('returns "kauf" for "kauf"', () => {
    expect(resolveMarketingType("kauf")).toBe("kauf");
  });

  it('returns "miete" for "miete"', () => {
    expect(resolveMarketingType("miete")).toBe("miete");
  });

  it("returns undefined for null", () => {
    expect(resolveMarketingType(null)).toBeUndefined();
  });

  it("returns undefined for unknown values", () => {
    expect(resolveMarketingType("lease")).toBeUndefined();
  });
});

describe("resolveOverviewUrl", () => {
  it('returns /kauf for "kauf"', () => {
    expect(resolveOverviewUrl("kauf")).toBe("/kauf");
  });

  it('returns /miete for "miete"', () => {
    expect(resolveOverviewUrl("miete")).toBe("/miete");
  });

  it("returns /objekt for null", () => {
    expect(resolveOverviewUrl(null)).toBe("/objekt");
  });

  it("returns /objekt for unknown values", () => {
    expect(resolveOverviewUrl("lease")).toBe("/objekt");
  });
});

describe("resolveCardPrice", () => {
  it("returns salePrice for kauf", () => {
    const card = makeCard({ salePrice: 500000, coldRent: null });
    expect(resolveCardPrice(card, "kauf")).toBe(500000);
  });

  it("returns coldRent for miete", () => {
    const card = makeCard({ marketingType: "miete", salePrice: null, coldRent: 1200 });
    expect(resolveCardPrice(card, "miete")).toBe(1200);
  });

  it("defaults to salePrice for null marketing type", () => {
    const card = makeCard({ salePrice: 500000, coldRent: 1000 });
    expect(resolveCardPrice(card, null)).toBe(500000);
  });

  it("returns null when both prices are null", () => {
    const card = makeCard({ salePrice: null, coldRent: null });
    expect(resolveCardPrice(card, "kauf")).toBeNull();
  });
});

describe("isSimilar", () => {
  it("returns true when city matches and price is within tolerance", () => {
    const card = makeCard({ city: "München", salePrice: 520000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(true);
  });

  it("returns false when city differs", () => {
    const card = makeCard({ city: "Berlin", salePrice: 500000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });

  it("returns false when price exceeds upper tolerance", () => {
    const card = makeCard({ city: "München", salePrice: 700000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });

  it("returns false when price is below lower tolerance", () => {
    const card = makeCard({ city: "München", salePrice: 350000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });

  it("returns true at exactly the upper tolerance boundary", () => {
    const card = makeCard({ city: "München", salePrice: 625000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(true);
  });

  it("returns true at exactly the lower tolerance boundary", () => {
    const card = makeCard({ city: "München", salePrice: 375000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(true);
  });

  it("skips city check when reference city is null", () => {
    const card = makeCard({ city: "München", salePrice: 500000 });
    expect(isSimilar(card, "kauf", null, 500000)).toBe(true);
  });

  it("skips price check when priceValue is null", () => {
    const card = makeCard({ city: "München", salePrice: 999999999 });
    expect(isSimilar(card, "kauf", "München", null)).toBe(true);
  });

  it("skips price check when priceValue is zero", () => {
    const card = makeCard({ city: "München", salePrice: 999999999 });
    expect(isSimilar(card, "kauf", "München", 0)).toBe(true);
  });

  it("returns false when card price is null with valid priceValue", () => {
    const card = makeCard({ city: "München", salePrice: null, coldRent: null });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });

  it("returns false when card price is zero with valid priceValue", () => {
    const card = makeCard({ city: "München", salePrice: 0 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });

  it("uses coldRent for miete listings", () => {
    const card = makeCard({
      marketingType: "miete",
      salePrice: null,
      coldRent: 1200,
      city: "München",
    });
    expect(isSimilar(card, "miete", "München", 1100)).toBe(true);
  });

  it("rejects miete candidate with coldRent outside tolerance", () => {
    const card = makeCard({
      marketingType: "miete",
      salePrice: null,
      coldRent: 2000,
      city: "München",
    });
    expect(isSimilar(card, "miete", "München", 1000)).toBe(false);
  });

  it("rejects when both city and price don't match", () => {
    const card = makeCard({ city: "Berlin", salePrice: 700000 });
    expect(isSimilar(card, "kauf", "München", 500000)).toBe(false);
  });
});

describe("priceDistance", () => {
  it("returns absolute price difference", () => {
    const card = makeCard({ salePrice: 520000 });
    expect(priceDistance(card, "kauf", 500000)).toBe(20000);
  });

  it("returns Infinity when priceValue is null", () => {
    const card = makeCard({ salePrice: 520000 });
    expect(priceDistance(card, "kauf", null)).toBe(Infinity);
  });

  it("returns Infinity when priceValue is zero", () => {
    const card = makeCard({ salePrice: 520000 });
    expect(priceDistance(card, "kauf", 0)).toBe(Infinity);
  });

  it("returns Infinity when card price is null", () => {
    const card = makeCard({ salePrice: null, coldRent: null });
    expect(priceDistance(card, "kauf", 500000)).toBe(Infinity);
  });

  it("returns Infinity when card price is zero", () => {
    const card = makeCard({ salePrice: 0 });
    expect(priceDistance(card, "kauf", 500000)).toBe(Infinity);
  });

  it("uses coldRent for miete", () => {
    const card = makeCard({
      marketingType: "miete",
      salePrice: null,
      coldRent: 1200,
    });
    expect(priceDistance(card, "miete", 1000)).toBe(200);
  });
});

describe("loadSimilar", () => {
  beforeEach(() => {
    mockGetProperties.mockReset();
  });

  it("returns empty array when API returns no data", async () => {
    mockGetProperties.mockResolvedValueOnce(makeListResponse([]));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(0);
  });

  it("returns matching properties sorted by price proximity", async () => {
    const farthest = makeCard({ id: "far", title: "Far", city: "München", salePrice: 600000 });
    const closest = makeCard({ id: "close", title: "Close", city: "München", salePrice: 510000 });
    const middle = makeCard({ id: "mid", title: "Mid", city: "München", salePrice: 550000 });

    mockGetProperties.mockResolvedValueOnce(
      makeListResponse([farthest, closest, middle]),
    );

    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result.map((r) => r.id)).toEqual(["close", "mid", "far"]);
  });

  it("excludes the current property", async () => {
    const card = makeCard({ id: "current-id", city: "München", salePrice: 500000 });
    mockGetProperties.mockResolvedValueOnce(makeListResponse([card]));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(0);
  });

  it("filters out properties with different city", async () => {
    const card = makeCard({ id: "berlin", city: "Berlin", salePrice: 500000 });
    mockGetProperties.mockResolvedValueOnce(makeListResponse([card]));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(0);
  });

  it("filters out properties with price outside tolerance", async () => {
    const tooExpensive = makeCard({ id: "expensive", city: "München", salePrice: 700000 });
    const tooCheap = makeCard({ id: "cheap", city: "München", salePrice: 300000 });
    mockGetProperties.mockResolvedValueOnce(makeListResponse([tooExpensive, tooCheap]));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(0);
  });

  it("caps results at MAX_SIMILAR", async () => {
    const cards = Array.from({ length: 10 }, (_, i) =>
      makeCard({ id: `match-${i}`, city: "München", salePrice: 500000 + i * 1000 }),
    );
    mockGetProperties.mockResolvedValueOnce(makeListResponse(cards));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(3);
  });

  it("requests correct API parameters", async () => {
    mockGetProperties.mockResolvedValueOnce(makeListResponse([]));
    await loadSimilar("current-id", "kauf", "München", 500000);
    expect(mockGetProperties).toHaveBeenCalledWith({
      limit: 50,
      marketingType: "kauf",
    });
  });

  it("returns empty array on API error", async () => {
    mockGetProperties.mockRejectedValueOnce(new Error("Network error"));
    const result = await loadSimilar("current-id", "kauf", "München", 500000);
    expect(result).toHaveLength(0);
  });
});
