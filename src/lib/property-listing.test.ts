import { formatListingCount } from "./property-listing";

describe("formatListingCount", () => {
  it("describes an empty category result", () => {
    expect(formatListingCount(0, "kauf", "haeuser")).toBe(
      "Keine passenden Häuser zum Kauf gefunden",
    );
  });

  it("uses the singular noun for a single result", () => {
    expect(formatListingCount(1, "kauf", "haeuser")).toBe(
      "1 Haus zum Kauf gefunden",
    );
  });

  it("uses the plural noun for multiple results", () => {
    expect(formatListingCount(8, "miete", "wohnungen")).toBe(
      "8 Wohnungen zur Miete gefunden",
    );
  });

  it("falls back to a generic noun without a property type", () => {
    expect(formatListingCount(1, "miete")).toBe("1 Immobilie zur Miete gefunden");
    expect(formatListingCount(12, "kauf")).toBe(
      "12 Immobilien zum Kauf gefunden",
    );
  });
});
