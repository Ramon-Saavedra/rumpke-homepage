jest.mock("lucide-react", () => ({
  Home: () => <svg data-testid="icon-home" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
  ImageOff: () => <svg data-testid="icon-imageoff" />,
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyCard from "./PropertyCard";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(overrides: Partial<PropertyCardDto> = {}): PropertyCardDto {
  return {
    id: "P-001",
    title: "Schönes Haus",
    city: "Bawinkel",
    propertyType: "haus",
    propertySubType: "einfamilienhaus",
    marketingType: "kauf",
    salePrice: 250000,
    coldRent: null,
    livingArea: 120,
    rooms: 4,
    images: [],
    ...overrides,
  };
}

describe("PropertyCard", () => {
  describe("Rendering", () => {
    it("renders title as heading", () => {
      render(<PropertyCard property={makeProperty({ title: "Schönes Haus" })} />);
      expect(
        screen.getByRole("heading", { name: "Schönes Haus" }),
      ).toBeInTheDocument();
    });

    it("renders formatted price for kauf", () => {
      render(<PropertyCard property={makeProperty({ salePrice: 250000, marketingType: "kauf" })} />);
      expect(screen.getByText(/250\.000/)).toBeInTheDocument();
    });

    it("renders formatted price for miete", () => {
      render(<PropertyCard property={makeProperty({ salePrice: null, coldRent: 850, marketingType: "miete" })} />);
      expect(screen.getByText(/850/)).toBeInTheDocument();
    });

    it("renders city when provided", () => {
      render(<PropertyCard property={makeProperty({ city: "Bawinkel" })} />);
      expect(screen.getByText("Bawinkel")).toBeInTheDocument();
    });

    it("does not render city when null", () => {
      render(<PropertyCard property={makeProperty({ city: null })} />);
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);
    });

    it("renders property sub type badge", () => {
      render(<PropertyCard property={makeProperty({ propertySubType: "einfamilienhaus" })} />);
      expect(screen.getByText("einfamilienhaus")).toBeInTheDocument();
    });

    it("renders property type badge when sub type is null", () => {
      render(<PropertyCard property={makeProperty({ propertySubType: null, propertyType: "haus" })} />);
      expect(screen.getByText("haus")).toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("links to correct property page using objektnrExtern", () => {
      render(<PropertyCard property={makeProperty({ id: "P-001" })} />);
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/objekt/P-001",
      );
    });
  });

  describe("Optional fields", () => {
    it("renders rooms when provided", () => {
      render(<PropertyCard property={makeProperty({ rooms: 4 })} />);
      expect(screen.getByText("4 Zimmer")).toBeInTheDocument();
    });

    it("renders living area when provided", () => {
      render(<PropertyCard property={makeProperty({ livingArea: 120 })} />);
      expect(screen.getByText("120 m²")).toBeInTheDocument();
    });

    it("renders Kaufen badge for kauf marketing type", () => {
      render(<PropertyCard property={makeProperty({ marketingType: "kauf" })} />);
      expect(screen.getByText("Kaufen")).toBeInTheDocument();
    });

    it("renders Mieten badge for miete marketing type", () => {
      render(<PropertyCard property={makeProperty({ marketingType: "miete" })} />);
      expect(screen.getByText("Mieten")).toBeInTheDocument();
    });

    it("renders Immobilie fallback title when title is null", () => {
      render(<PropertyCard property={makeProperty({ title: null, id: "ABC-123" })} />);
      expect(screen.getByText("Immobilie ABC-123")).toBeInTheDocument();
    });
  });
});
