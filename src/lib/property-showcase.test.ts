import { selectShowcaseProperties } from "./property-showcase";
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
    rooms: 4,
    images: [],
  };
}

function makeList(count: number): PropertyCardDto[] {
  return Array.from({ length: count }, (_, i) => makeProperty(String(i + 1)));
}

describe("selectShowcaseProperties", () => {
  it("returns null when fewer than three properties are available", () => {
    expect(selectShowcaseProperties(makeList(0))).toBeNull();
    expect(selectShowcaseProperties(makeList(1))).toBeNull();
    expect(selectShowcaseProperties(makeList(2))).toBeNull();
  });

  it("uses the first property as the featured anchor", () => {
    const selection = selectShowcaseProperties(makeList(6));
    expect(selection?.featured.id).toBe("1");
  });

  it("splits six properties into 1 featured + 2 secondary + 3 standard", () => {
    const selection = selectShowcaseProperties(makeList(6));
    expect(selection?.secondary.map((p) => p.id)).toEqual(["2", "3"]);
    expect(selection?.standard.map((p) => p.id)).toEqual(["4", "5", "6"]);
  });

  it("fills only the available slots when between three and five properties", () => {
    const three = selectShowcaseProperties(makeList(3));
    expect(three?.secondary).toHaveLength(2);
    expect(three?.standard).toHaveLength(0);

    const four = selectShowcaseProperties(makeList(4));
    expect(four?.secondary).toHaveLength(2);
    expect(four?.standard).toHaveLength(1);
  });

  it("caps the composition at six properties, ignoring extras", () => {
    const selection = selectShowcaseProperties(makeList(12));
    expect(selection?.secondary).toHaveLength(2);
    expect(selection?.standard).toHaveLength(3);
  });
});
