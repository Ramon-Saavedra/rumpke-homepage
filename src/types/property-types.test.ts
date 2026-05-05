import { VALID_TYPES, isValidType, getPropertyTypes } from "./property-types";

describe("isValidType", () => {
  it("returns true for all valid types", () => {
    VALID_TYPES.forEach((type) => {
      expect(isValidType(type)).toBe(true);
    });
  });

  it("returns false for empty string", () => {
    expect(isValidType("")).toBe(false);
  });

  it("returns false for unknown strings", () => {
    expect(isValidType("unknown")).toBe(false);
  });

  it("is case-sensitive", () => {
    expect(isValidType("Haeuser")).toBe(false);
  });
});

describe("getPropertyTypes", () => {
  it("returns one entry per valid type", () => {
    expect(getPropertyTypes("kauf")).toHaveLength(VALID_TYPES.length);
    expect(getPropertyTypes("miete")).toHaveLength(VALID_TYPES.length);
  });

  it("each entry contains slug, label and description", () => {
    getPropertyTypes("kauf").forEach(({ slug, label, description }) => {
      expect(VALID_TYPES).toContain(slug);
      expect(label.length).toBeGreaterThan(0);
      expect(description.length).toBeGreaterThan(0);
    });
  });

  it("uses kauf descriptions when basePath is kauf", () => {
    const result = getPropertyTypes("kauf");
    const wohnungen = result.find((r) => r.slug === "wohnungen");
    expect(wohnungen?.description).toBe("Eigentumswohnungen, Apartments");
  });

  it("uses miete descriptions when basePath is miete", () => {
    const result = getPropertyTypes("miete");
    const wohnungen = result.find((r) => r.slug === "wohnungen");
    expect(wohnungen?.description).toBe("Mietwohnungen, Apartments");
  });
});
