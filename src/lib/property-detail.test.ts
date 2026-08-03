import {
  buildInquiryMessage,
  buildPropertyAddressLines,
  buildPropertyDetailFacts,
  buildPropertyFeatures,
  buildPropertyPriceRows,
  resolvePropertyCoordinates,
  resolvePropertyLocationLabel,
  resolvePropertyLocationPrecision,
  resolvePropertyReference,
  resolvePropertyTitle,
} from "./property-detail";
import type { PropertyDetailDto } from "@/types/property-api";

function makeProperty(
  overrides: Partial<PropertyDetailDto> = {},
): PropertyDetailDto {
  return {
    id: "2026-0006",
    title: "Klassische Stadtvilla",
    description: null,
    locationDescription: null,
    furnishingDescription: null,
    price: {
      salePrice: null,
      coldRent: null,
      warmRent: null,
      hoaFee: null,
      additionalCosts: null,
      brokerageFree: false,
    },
    area: { livingArea: null, usableArea: null, plotArea: null },
    rooms: { total: null, bedrooms: null, bathrooms: null },
    address: {
      city: null,
      zip: null,
      street: null,
      houseNumber: null,
      country: null,
      latitude: null,
      longitude: null,
    },
    propertyType: null,
    propertySubType: null,
    marketingType: null,
    yearBuilt: null,
    floor: null,
    totalFloors: null,
    condition: null,
    balcony: false,
    terrace: false,
    energyCertificateType: null,
    images: [],
    ...overrides,
  };
}

describe("buildPropertyDetailFacts", () => {
  it("returns no facts when nothing is known", () => {
    expect(buildPropertyDetailFacts(makeProperty())).toEqual([]);
  });

  it("builds labelled facts in display order", () => {
    const facts = buildPropertyDetailFacts(
      makeProperty({
        area: { livingArea: 215, usableArea: null, plotArea: 480 },
        rooms: { total: 7, bedrooms: 4, bathrooms: 3 },
        yearBuilt: 1932,
      }),
    );

    expect(facts.map((fact) => fact.label)).toEqual([
      "Wohnfläche",
      "Zimmer gesamt",
      "Schlafzimmer",
      "Badezimmer",
      "Grundstück",
      "Baujahr",
    ]);
    expect(facts[0].value).toBe("215 m²");
    expect(facts[1].value).toBe("7 Zimmer");
    expect(facts[5].value).toBe("1932");
  });

  it("formats the floor label", () => {
    const facts = buildPropertyDetailFacts(makeProperty({ floor: "2" }));
    expect(facts).toEqual([
      { icon: "floor", value: "2. Obergeschoss", label: "Etage" },
    ]);
  });
});

describe("buildPropertyFeatures", () => {
  it("lists only the flags that are set", () => {
    expect(
      buildPropertyFeatures(
        makeProperty({
          balcony: true,
          terrace: false,
          price: {
            salePrice: null,
            coldRent: null,
            warmRent: null,
            hoaFee: null,
            additionalCosts: null,
            brokerageFree: true,
          },
        }),
      ),
    ).toEqual(["Balkon", "Provisionsfrei"]);
  });

  it("returns an empty list when no feature is set", () => {
    expect(buildPropertyFeatures(makeProperty())).toEqual([]);
  });
});

describe("buildPropertyPriceRows", () => {
  it("emphasises the sale price and always states the commission", () => {
    const rows = buildPropertyPriceRows(
      makeProperty({
        marketingType: "kauf",
        price: {
          salePrice: 1890000,
          coldRent: null,
          warmRent: null,
          hoaFee: null,
          additionalCosts: null,
          brokerageFree: false,
        },
      }),
    );

    expect(rows[0].label).toBe("Kaufpreis");
    expect(rows[0].emphasis).toBe(true);
    expect(rows.at(-1)).toEqual({
      label: "Provision",
      value: "Auf Anfrage",
    });
  });

  it("renders rent positions as monthly amounts", () => {
    const rows = buildPropertyPriceRows(
      makeProperty({
        marketingType: "miete",
        price: {
          salePrice: null,
          coldRent: 1200,
          warmRent: 1450,
          hoaFee: null,
          additionalCosts: 250,
          brokerageFree: true,
        },
      }),
    );

    expect(rows.map((row) => row.label)).toEqual([
      "Kaltmiete",
      "Warmmiete",
      "Nebenkosten",
      "Provision",
    ]);
    expect(rows[0].value).toContain("/ Monat");
    expect(rows[0].emphasis).toBe(true);
    expect(rows.at(-1)?.value).toBe("Provisionsfrei");
  });
});

describe("address helpers", () => {
  it("joins street and city lines", () => {
    const property = makeProperty({
      address: {
        city: "München",
        zip: "81679",
        street: "Musterstraße",
        houseNumber: "12",
        country: "DE",
        latitude: 48.1,
        longitude: 11.6,
      },
    });

    expect(buildPropertyAddressLines(property)).toEqual([
      "Musterstraße 12",
      "81679 München",
    ]);
    expect(resolvePropertyLocationLabel(property)).toBe(
      "Musterstraße 12, 81679 München",
    );
    expect(resolvePropertyLocationPrecision(property)).toBe("exact");
    expect(resolvePropertyCoordinates(property)).toEqual({
      lat: 48.1,
      lng: 11.6,
    });
  });

  it("falls back to approximate precision without a street", () => {
    const property = makeProperty({
      address: {
        city: "München",
        zip: null,
        street: "  ",
        houseNumber: null,
        country: null,
        latitude: null,
        longitude: null,
      },
    });

    expect(resolvePropertyLocationLabel(property)).toBe("München");
    expect(resolvePropertyLocationPrecision(property)).toBe("approximate");
    expect(resolvePropertyCoordinates(property)).toBeNull();
  });

  it("ignores null-island coordinates", () => {
    expect(
      resolvePropertyCoordinates(
        makeProperty({
          address: {
            city: null,
            zip: null,
            street: null,
            houseNumber: null,
            country: null,
            latitude: 0,
            longitude: 0,
          },
        }),
      ),
    ).toBeNull();
  });

  it("rejects out-of-range coordinates", () => {
    expect(
      resolvePropertyCoordinates(
        makeProperty({
          address: {
            city: null,
            zip: null,
            street: null,
            houseNumber: null,
            country: null,
            latitude: 200,
            longitude: 200,
          },
        }),
      ),
    ).toBeNull();
    expect(
      resolvePropertyCoordinates(
        makeProperty({
          address: {
            city: null,
            zip: null,
            street: null,
            houseNumber: null,
            country: null,
            latitude: -200,
            longitude: -200,
          },
        }),
      ),
    ).toBeNull();
  });
});

describe("title and reference", () => {
  it("falls back to the id when the title is blank", () => {
    expect(resolvePropertyTitle(makeProperty({ title: "   " }))).toBe(
      "Immobilie 2026-0006",
    );
    expect(resolvePropertyReference(makeProperty())).toBe("Ref. 2026-0006");
  });
});

describe("buildInquiryMessage", () => {
  it("mentions the property in every message variant", () => {
    const property = makeProperty();
    const messages = (
      ["viewing", "expose", "callback", "question"] as const
    ).map((type) => buildInquiryMessage(type, property));

    messages.forEach((message) => {
      expect(message).toContain("Klassische Stadtvilla");
      expect(message).toContain("Ref. 2026-0006");
    });
    expect(messages[0]).toContain("Besichtigungstermin");
    expect(messages[1]).toContain("Exposé");
  });
});
