import "@/test-utils/lucide-mocks";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyFeaturedListing from "./PropertyFeaturedListing";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(
  overrides: Partial<PropertyCardDto> = {},
): PropertyCardDto {
  return {
    id: "P-001",
    title: "Modernes Einfamilienhaus",
    city: "Bawinkel",
    propertyType: "haus",
    propertySubType: "einfamilienhaus",
    marketingType: "kauf",
    salePrice: 250000,
    coldRent: null,
    livingArea: 142,
    plotArea: null,
    usableArea: null,
    rooms: 5,
    floor: null,
    latitude: null,
    longitude: null,
    images: [],
    ...overrides,
  };
}

describe("PropertyFeaturedListing", () => {
  it("renders the title as a heading linking to the detail page", () => {
    render(<PropertyFeaturedListing property={makeProperty()} />);
    expect(
      screen.getByRole("heading", { name: "Modernes Einfamilienhaus" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Modernes Einfamilienhaus" }),
    ).toHaveAttribute("href", "/objekt/P-001");
  });

  it("labels the offer and price for a sale", () => {
    render(<PropertyFeaturedListing property={makeProperty()} />);
    expect(screen.getByText("Zum Verkauf")).toBeInTheDocument();
    expect(screen.getByText("Kaufpreis")).toBeInTheDocument();
    expect(screen.getByText(/250\.000/)).toBeInTheDocument();
  });

  it("labels the offer and price for a rental", () => {
    render(
      <PropertyFeaturedListing
        property={makeProperty({
          marketingType: "miete",
          salePrice: null,
          coldRent: 850,
        })}
      />,
    );
    expect(screen.getByText("Zur Miete")).toBeInTheDocument();
    expect(screen.getByText("Kaltmiete")).toBeInTheDocument();
  });

  it("links the inquiry CTA to the detail page inquiry panel", () => {
    render(<PropertyFeaturedListing property={makeProperty()} />);
    expect(
      screen.getByRole("link", { name: "Anfrage senden" }),
    ).toHaveAttribute("href", "/objekt/P-001#objekt-anfrage");
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("shows the photo count only for galleries", () => {
    const images = [
      { id: "1", url: "https://image.onoffice.de/a.jpg", title: null, type: null, position: 1 },
      { id: "2", url: "https://image.onoffice.de/b.jpg", title: null, type: null, position: 2 },
    ];
    render(<PropertyFeaturedListing property={makeProperty({ images })} />);
    expect(screen.getByText(/2 Fotos/)).toBeInTheDocument();
  });

  it("omits the photo count for a single image", () => {
    render(<PropertyFeaturedListing property={makeProperty()} />);
    expect(screen.queryByText(/Fotos/)).not.toBeInTheDocument();
  });
});
