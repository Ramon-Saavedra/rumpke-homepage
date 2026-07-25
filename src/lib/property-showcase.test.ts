import { selectShowcaseLayout } from "./property-showcase";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(id: string): PropertyCardDto {
  return {
    id,
    title: `Objekt ${id}`,
    city: "Lingen",
    propertyType: "Haus",
    propertySubType: null,
    marketingType: "kauf",
    salePrice: 250000,
    coldRent: null,
    livingArea: 120,
    plotArea: null,
    usableArea: null,
    rooms: 4,
    floor: null,
    images: [],
  };
}

function makeList(count: number): PropertyCardDto[] {
  return Array.from({ length: count }, (_, i) => makeProperty(String(i + 1)));
}

describe("selectShowcaseLayout", () => {
  it("returns the empty layout when no property is available", () => {
    expect(selectShowcaseLayout([])).toEqual({ kind: "empty" });
  });

  it("returns the spotlight layout for a single property", () => {
    const layout = selectShowcaseLayout(makeList(1));
    expect(layout.kind).toBe("spotlight");
    if (layout.kind === "spotlight") {
      expect(layout.featured.id).toBe("1");
    }
  });

  it("gives two properties equal weight instead of an anchor", () => {
    const layout = selectShowcaseLayout(makeList(2));
    expect(layout.kind).toBe("duo");
    if (layout.kind === "duo") {
      expect(layout.standard.map((p) => p.id)).toEqual(["1", "2"]);
    }
  });

  it("returns the anchor row alone for three properties", () => {
    const layout = selectShowcaseLayout(makeList(3));
    expect(layout.kind).toBe("anchor");
    if (layout.kind === "anchor") {
      expect(layout.featured.id).toBe("1");
      expect(layout.secondary.map((p) => p.id)).toEqual(["2", "3"]);
    }
  });

  it("spans the anchor across the full width for four properties", () => {
    const layout = selectShowcaseLayout(makeList(4));
    expect(layout.kind).toBe("panorama");
    if (layout.kind === "panorama") {
      expect(layout.featured.id).toBe("1");
      expect(layout.standard.map((p) => p.id)).toEqual(["2", "3", "4"]);
    }
  });

  it("closes the composition with two standard cards for five properties", () => {
    const layout = selectShowcaseLayout(makeList(5));
    expect(layout.kind).toBe("composition");
    if (layout.kind === "composition") {
      expect(layout.secondary.map((p) => p.id)).toEqual(["2", "3"]);
      expect(layout.standard.map((p) => p.id)).toEqual(["4", "5"]);
    }
  });

  it("splits six properties into 1 featured + 2 secondary + 3 standard", () => {
    const layout = selectShowcaseLayout(makeList(6));
    expect(layout.kind).toBe("composition");
    if (layout.kind === "composition") {
      expect(layout.featured.id).toBe("1");
      expect(layout.secondary.map((p) => p.id)).toEqual(["2", "3"]);
      expect(layout.standard.map((p) => p.id)).toEqual(["4", "5", "6"]);
    }
  });

  it("caps the composition at six properties, ignoring extras", () => {
    const layout = selectShowcaseLayout(makeList(12));
    expect(layout.kind).toBe("composition");
    if (layout.kind === "composition") {
      expect(layout.secondary).toHaveLength(2);
      expect(layout.standard).toHaveLength(3);
    }
  });
});
