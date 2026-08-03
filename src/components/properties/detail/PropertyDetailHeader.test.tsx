import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockRequestInquiry = jest.fn();
jest.mock("./PropertyInquiryContext", () => {
  const actual = jest.requireActual("react");
  return {
    usePropertyInquiry: () => ({ requestInquiry: mockRequestInquiry }),
    PropertyInquiryContext: actual.createContext(null),
  };
});

import PropertyDetailHeader from "./PropertyDetailHeader";
import type { PropertyDetailDto } from "@/types/property-api";

function makeProperty(
  overrides: Partial<PropertyDetailDto> = {},
): PropertyDetailDto {
  return {
    id: "P-001",
    title: "Modernes Einfamilienhaus",
    description: "Ein schönes Haus mit Garten.",
    locationDescription: "Ruhige Lage am Stadtrand.",
    furnishingDescription: "Hochwertige Ausstattung.",
    price: {
      salePrice: 450000,
      coldRent: null,
      warmRent: null,
      hoaFee: null,
      additionalCosts: null,
      brokerageFree: false,
    },
    area: { livingArea: 140, usableArea: null, plotArea: 600 },
    rooms: { total: 5, bedrooms: 3, bathrooms: 2 },
    address: {
      city: "München",
      zip: "80331",
      street: "Musterstraße",
      houseNumber: "12",
      country: "Deutschland",
      latitude: null,
      longitude: null,
    },
    propertyType: "Haus",
    propertySubType: null,
    marketingType: "kauf",
    yearBuilt: 2005,
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

describe("PropertyDetailHeader", () => {
  it("renders the property title", () => {
    render(<PropertyDetailHeader property={makeProperty()} />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("Modernes Einfamilienhaus");
  });

  it("renders the price in the smaller responsive text classes", () => {
    render(<PropertyDetailHeader property={makeProperty()} />);
    const price = screen.getByText(/450\.000/);
    expect(price).toHaveClass("text-2xl");
    expect(price).toHaveClass("sm:text-3xl");
  });

  it("does not include the removed larger text size classes", () => {
    render(<PropertyDetailHeader property={makeProperty()} />);
    const price = screen.getByText(/450\.000/);
    expect(price).not.toHaveClass("text-3xl");
    expect(price).not.toHaveClass("sm:text-4xl");
  });

  it("renders the kaufen badge for a sale property", () => {
    render(<PropertyDetailHeader property={makeProperty({ marketingType: "kauf" })} />);
    expect(screen.getByText("Kaufen")).toBeInTheDocument();
  });

  it("renders the mieten badge for a rental property", () => {
    render(
      <PropertyDetailHeader
        property={makeProperty({
          marketingType: "miete",
          price: {
            salePrice: null,
            coldRent: 1200,
            warmRent: 1400,
            hoaFee: null,
            additionalCosts: 200,
            brokerageFree: true,
          },
        })}
      />,
    );
    expect(screen.getByText("Mieten")).toBeInTheDocument();
  });

  it("shows cold rent for a rental", () => {
    render(
      <PropertyDetailHeader
        property={makeProperty({
          marketingType: "miete",
          price: {
            salePrice: null,
            coldRent: 950,
            warmRent: 1150,
            hoaFee: null,
            additionalCosts: 200,
            brokerageFree: false,
          },
        })}
      />,
    );
    expect(screen.getByText(/950/)).toBeInTheDocument();
  });

  it("shows Provisionsfrei when brokerageFree is true", () => {
    render(
      <PropertyDetailHeader
        property={makeProperty({
          price: {
            salePrice: 450000,
            coldRent: null,
            warmRent: null,
            hoaFee: null,
            additionalCosts: null,
            brokerageFree: true,
          },
        })}
      />,
    );
    expect(screen.getByText("Provisionsfrei")).toBeInTheDocument();
  });

  it("shows Provision auf Anfrage when brokerageFree is false", () => {
    render(
      <PropertyDetailHeader
        property={makeProperty({
          price: {
            salePrice: 450000,
            coldRent: null,
            warmRent: null,
            hoaFee: null,
            additionalCosts: null,
            brokerageFree: false,
          },
        })}
      />,
    );
    expect(screen.getByText("Provision auf Anfrage")).toBeInTheDocument();
  });

  it("renders the location with address", () => {
    render(<PropertyDetailHeader property={makeProperty()} />);
    expect(screen.getByText(/Musterstraße 12, 80331 München/)).toBeInTheDocument();
  });

  it("renders the property type label", () => {
    render(<PropertyDetailHeader property={makeProperty()} />);
    expect(screen.getByText("Haus")).toBeInTheDocument();
  });

  it("resolves raw propertySubType to category label", () => {
    render(
      <PropertyDetailHeader
        property={makeProperty({
          propertyType: null,
          propertySubType: "lager_mit_freiflaeche",
        })}
      />,
    );
    expect(screen.getByText("Gewerbe")).toBeInTheDocument();
  });

  it("renders the property reference number", () => {
    render(<PropertyDetailHeader property={makeProperty({ id: "2026-0006" })} />);
    expect(screen.getByText(/2026-0006/)).toBeInTheDocument();
  });
});
