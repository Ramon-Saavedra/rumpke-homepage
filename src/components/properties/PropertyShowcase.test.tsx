import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockGetProperty = jest.fn();
jest.mock("@/lib/property-client", () => ({
  getProperty: (...args: unknown[]) => mockGetProperty(...args),
}));

import PropertyShowcase from "./PropertyShowcase";
import type { PropertyCardDto, PropertyDetailDto } from "@/types/property-api";

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
    latitude: null,
    longitude: null,
    images: [],
  };
}

function makeList(count: number): PropertyCardDto[] {
  return Array.from({ length: count }, (_, i) => makeProperty(String(i + 1)));
}

function makeDetail(id: string): PropertyDetailDto {
  return {
    id,
    title: `Objekt ${id}`,
    description: null,
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
    area: { livingArea: 120, usableArea: null, plotArea: null },
    rooms: { total: 4, bedrooms: null, bathrooms: null },
    address: {
      city: "Lingen",
      zip: null,
      street: null,
      houseNumber: null,
      country: null,
      latitude: null,
      longitude: null,
    },
    propertyType: "Haus",
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
  };
}

function listingCta() {
  return screen.queryByRole("link", { name: /Alle Immobilien entdecken/ });
}

async function renderShowcase(props: {
  readonly properties: readonly PropertyCardDto[];
  readonly error?: boolean;
}) {
  const element = await PropertyShowcase(props);
  render(element);
}

beforeEach(() => {
  mockGetProperty.mockReset();
});

describe("PropertyShowcase", () => {
  it("always renders the section heading", async () => {
    await renderShowcase({ properties: makeList(5) });
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Handverlesene Immobilien in Ihrer Nähe",
      }),
    ).toBeInTheDocument();
  });

  it("renders the CTA to the full listing", async () => {
    await renderShowcase({ properties: makeList(5) });
    expect(listingCta()).toHaveAttribute("href", "/objekt");
  });

  it("caps the rail at five properties", async () => {
    await renderShowcase({ properties: makeList(12) });
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("renders all five properties when only five are available", async () => {
    await renderShowcase({ properties: makeList(5) });
    expect(
      screen.getByRole("heading", { level: 3, name: "Objekt 5" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("renders a horizontal rail for three properties", async () => {
    await renderShowcase({ properties: makeList(3) });
    expect(
      screen.getByRole("heading", { level: 3, name: "Objekt 3" }),
    ).toBeInTheDocument();
    expect(listingCta()).toBeInTheDocument();
  });

  it("gives two properties equal weight with no lone spotlight", async () => {
    await renderShowcase({ properties: makeList(2) });
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2);
    expect(listingCta()).toBeInTheDocument();
  });

  it("renders a single property as a featured spotlight without the listing CTA", async () => {
    mockGetProperty.mockResolvedValueOnce(makeDetail("1"));
    await renderShowcase({ properties: makeList(1) });
    expect(mockGetProperty).toHaveBeenCalledWith("1");
    expect(
      screen.getByRole("heading", { level: 3, name: "Objekt 1" }),
    ).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
  });

  it("falls back to the card data when the property detail fetch fails", async () => {
    mockGetProperty.mockRejectedValueOnce(new Error("network"));
    await renderShowcase({ properties: makeList(1) });
    expect(
      screen.getByRole("heading", { level: 3, name: "Objekt 1" }),
    ).toBeInTheDocument();
  });

  it("shows the editorial notice when no property is available", async () => {
    await renderShowcase({ properties: [] });
    expect(
      screen.getByText("Zurzeit sind keine Immobilien veröffentlicht"),
    ).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Suchauftrag anfragen" }),
    ).toHaveAttribute("href", "/dienstleistungen/immobilien-kauf");
  });

  it("shows the service-unavailable message when there is an error", async () => {
    await renderShowcase({ properties: makeList(6), error: true });
    expect(
      screen.getByText("Immobilien derzeit nicht verfügbar"),
    ).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
  });
});
