import "@/test-utils/lucide-mocks";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertySpotlightCard from "./PropertySpotlightCard";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(
  overrides: Partial<PropertyCardDto> = {},
): PropertyCardDto {
  return {
    id: "P-001",
    title: "Schönes Haus am See",
    city: "Bawinkel",
    propertyType: "haus",
    propertySubType: "einfamilienhaus",
    marketingType: "kauf",
    salePrice: 350000,
    coldRent: null,
    livingArea: 140,
    plotArea: null,
    usableArea: null,
    rooms: 5,
    floor: null,
    images: [],
    ...overrides,
  };
}

describe("PropertySpotlightCard", () => {
  describe("Loading state", () => {
    it("renders skeleton when isLoading is true", () => {
      const { container } = render(<PropertySpotlightCard isLoading />);
      expect(
        container.querySelector('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe("Empty state", () => {
    it("renders skeleton when property is undefined", () => {
      const { container } = render(<PropertySpotlightCard />);
      expect(
        container.querySelector('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe("With property", () => {
    it("renders the CTA link", () => {
      render(<PropertySpotlightCard property={makeProperty()} />);
      expect(screen.getByText("Objekt ansehen")).toBeInTheDocument();
    });

    it("renders Kaufen badge for kauf", () => {
      render(
        <PropertySpotlightCard
          property={makeProperty({ marketingType: "kauf" })}
        />,
      );
      expect(screen.getByText("Kaufen")).toBeInTheDocument();
    });

    it("renders Mieten badge for miete", () => {
      render(
        <PropertySpotlightCard
          property={makeProperty({ marketingType: "miete" })}
        />,
      );
      expect(screen.getByText("Mieten")).toBeInTheDocument();
    });

    it("renders formatted price", () => {
      render(
        <PropertySpotlightCard
          property={makeProperty({ salePrice: 350000 })}
        />,
      );
      expect(screen.getByText(/350\.000/)).toBeInTheDocument();
    });

    it("links to correct objekt page", () => {
      render(
        <PropertySpotlightCard property={makeProperty({ id: "2026-0001" })} />,
      );
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "/objekt/2026-0001",
      );
    });

    it("renders fallback title when title is null", () => {
      render(
        <PropertySpotlightCard
          property={makeProperty({ title: null, id: "ABC" })}
        />,
      );
      expect(screen.getByText("Immobilie ABC")).toBeInTheDocument();
    });
  });
});
