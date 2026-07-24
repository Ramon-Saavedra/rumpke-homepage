import { formatPrice, formatMonthlyPrice, formatArea, formatRooms, formatYear, resolveDisplayPrice } from "./property-formatters";

describe("formatPrice", () => {
  it("formats integer price in EUR", () => {
    const result = formatPrice(250000);
    expect(result).toContain("250.000");
    expect(result).toContain("€");
  });

  it("formats zero", () => {
    const result = formatPrice(0);
    expect(result).toContain("0");
  });
});

describe("formatMonthlyPrice", () => {
  it("appends / Monat suffix", () => {
    const result = formatMonthlyPrice(850);
    expect(result).toContain("850");
    expect(result).toContain("/ Monat");
  });
});

describe("formatArea", () => {
  it("appends m² suffix", () => {
    const result = formatArea(120);
    expect(result).toContain("120");
    expect(result).toContain("m²");
  });

  it("formats decimal area", () => {
    const result = formatArea(120.5);
    expect(result).toContain("120,5");
    expect(result).toContain("m²");
  });
});

describe("formatRooms", () => {
  it("formats rooms in German", () => {
    expect(formatRooms(4)).toBe("4 Zimmer");
    expect(formatRooms(1)).toBe("1 Zimmer");
  });
});

describe("formatYear", () => {
  it("formats year as integer string", () => {
    expect(formatYear(2015)).toBe("2015");
    expect(formatYear(1999.9)).toBe("2000");
  });
});

describe("resolveDisplayPrice", () => {
  it("returns cold rent for miete type", () => {
    const result = resolveDisplayPrice("miete", 250000, 850);
    expect(result).toContain("850");
    expect(result).toContain("/ Monat");
  });

  it("returns sale price for kauf type", () => {
    const result = resolveDisplayPrice("kauf", 250000, 850);
    expect(result).toContain("250.000");
  });

  it("returns cold rent when sale price is null", () => {
    const result = resolveDisplayPrice(null, null, 850);
    expect(result).toContain("850");
    expect(result).toContain("/ Monat");
  });

  it("returns null when all prices are null", () => {
    const result = resolveDisplayPrice(null, null, null);
    expect(result).toBeNull();
  });
});
