import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyShowcase from "./PropertyShowcase";
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

describe("PropertyShowcase", () => {
  it("always renders the section heading", () => {
    render(<PropertyShowcase properties={makeList(6)} />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Handverlesene Immobilien in Ihrer Nähe",
      }),
    ).toBeInTheDocument();
  });

  it("renders the CTA to the full listing when enough properties exist", () => {
    render(<PropertyShowcase properties={makeList(6)} />);
    const cta = screen.getByRole("link", { name: /Alle Immobilien entdecken/ });
    expect(cta).toHaveAttribute("href", "/objekt");
  });

  it("renders every selected property as a card", () => {
    render(<PropertyShowcase properties={makeList(6)} />);
    // 6 property cards + 1 CTA link.
    expect(screen.getAllByRole("link")).toHaveLength(7);
  });

  it("shows the empty state when fewer than three properties are available", () => {
    render(<PropertyShowcase properties={makeList(2)} />);
    expect(
      screen.getByText("Aktuell keine passenden Objekte"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Alle Immobilien entdecken/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("shows the service-unavailable message when there is an error", () => {
    render(<PropertyShowcase properties={makeList(6)} error />);
    expect(
      screen.getByText("Immobilien derzeit nicht verfügbar"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Alle Immobilien entdecken/ }),
    ).not.toBeInTheDocument();
  });
});
