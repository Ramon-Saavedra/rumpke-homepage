import {
  resolvePropertyCategory,
  resolvePropertyCategoryLabel,
  buildPropertyFacts,
  formatFloor,
} from "./property-display";

describe("resolvePropertyCategory", () => {
  it("returns haus for einfamilienhaus sub type", () => {
    expect(resolvePropertyCategory("haus", "einfamilienhaus")).toBe("haus");
  });

  it("returns wohnung for apartment sub type", () => {
    expect(resolvePropertyCategory("wohnung", "apartment")).toBe("wohnung");
  });

  it("returns gewerbe for lager sub type", () => {
    expect(resolvePropertyCategory(null, "lager")).toBe("gewerbe");
  });

  it("returns buero for praxis sub type", () => {
    expect(resolvePropertyCategory(null, "praxis")).toBe("buero");
  });

  it("returns grundstueck for bauland sub type", () => {
    expect(resolvePropertyCategory(null, "bauland")).toBe("grundstueck");
  });

  it("favours sub type over property type", () => {
    expect(resolvePropertyCategory("haus", "lager")).toBe("gewerbe");
  });

  it("falls back to property type when sub type is null", () => {
    expect(resolvePropertyCategory("haus", null)).toBe("haus");
  });

  it("returns null when both are null", () => {
    expect(resolvePropertyCategory(null, null)).toBeNull();
  });

  it("returns null when neither match", () => {
    expect(resolvePropertyCategory("xyz", "abc")).toBeNull();
  });

  it("handles german umlauts in matching", () => {
    expect(resolvePropertyCategory(null, "büro")).toBe("buero");
  });
});

describe("resolvePropertyCategoryLabel", () => {
  it("returns Haus for haus type", () => {
    expect(resolvePropertyCategoryLabel("haus", "einfamilienhaus")).toBe(
      "Haus",
    );
  });

  it("returns Wohnung for wohnung type", () => {
    expect(resolvePropertyCategoryLabel("wohnung", null)).toBe("Wohnung");
  });

  it("returns Gewerbe for gewerbe type", () => {
    expect(resolvePropertyCategoryLabel(null, "lager")).toBe("Gewerbe");
  });

  it("returns null for unknown type", () => {
    expect(resolvePropertyCategoryLabel("xyz", null)).toBeNull();
  });
});

describe("formatFloor", () => {
  it('returns "Erdgeschoss" for "eg"', () => {
    expect(formatFloor("eg")).toBe("Erdgeschoss");
  });

  it('returns "Dachgeschoss" for "dg"', () => {
    expect(formatFloor("dg")).toBe("Dachgeschoss");
  });

  it('returns "Untergeschoss" for "ug"', () => {
    expect(formatFloor("ug")).toBe("Untergeschoss");
  });

  it('returns "1. Obergeschoss" for "1"', () => {
    expect(formatFloor("1")).toBe("1. Obergeschoss");
  });

  it('returns "2. Obergeschoss" for "2.0"', () => {
    expect(formatFloor("2.0")).toBe("2. Obergeschoss");
  });

  it("returns null for null input", () => {
    expect(formatFloor(null)).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(formatFloor("")).toBeNull();
  });

  it("returns null for unrecognized string", () => {
    expect(formatFloor("something-random")).toBeNull();
  });
});

describe("buildPropertyFacts", () => {
  const residentialSource = {
    propertyType: "haus",
    propertySubType: "einfamilienhaus",
    livingArea: 120,
    plotArea: null,
    usableArea: null,
    rooms: 4,
    floor: "eg",
  };

  it("includes area and rooms for residential properties", () => {
    const facts = buildPropertyFacts(residentialSource);
    const icons = facts.map((f) => f.icon);
    expect(icons).toContain("area");
    expect(icons).toContain("rooms");
  });

  it("includes floor for non-grundstueck properties", () => {
    const facts = buildPropertyFacts(residentialSource);
    expect(facts.some((f) => f.icon === "floor")).toBe(true);
  });

  it("excludes floor for grundstueck properties", () => {
    const facts = buildPropertyFacts({
      ...residentialSource,
      propertyType: null,
      propertySubType: "bauland",
    });
    expect(facts.some((f) => f.icon === "floor")).toBe(false);
  });

  it("uses plot area for grundstueck", () => {
    const facts = buildPropertyFacts({
      ...residentialSource,
      propertyType: null,
      propertySubType: "bauland",
      plotArea: 500,
    });
    expect(facts.some((f) => f.icon === "plot")).toBe(true);
    expect(facts.some((f) => f.icon === "area")).toBe(false);
  });

  it("falls back to usable area for buero", () => {
    const facts = buildPropertyFacts({
      ...residentialSource,
      propertyType: null,
      propertySubType: "praxis",
      usableArea: 80,
      livingArea: null,
      rooms: null,
    });
    expect(facts.some((f) => f.icon === "area")).toBe(true);
  });

  it("returns empty array when no data is available", () => {
    const facts = buildPropertyFacts({
      propertyType: "haus",
      propertySubType: null,
      livingArea: null,
      plotArea: null,
      usableArea: null,
      rooms: null,
      floor: null,
    });
    expect(facts).toHaveLength(0);
  });
});
