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

function listingCta() {
  return screen.queryByRole("link", { name: /Alle Immobilien entdecken/ });
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

  it("renders the CTA to the full listing", () => {
    render(<PropertyShowcase properties={makeList(6)} />);
    expect(listingCta()).toHaveAttribute("href", "/objekt");
  });

  it("renders every selected property as a card", () => {
    render(<PropertyShowcase properties={makeList(6)} />);
    expect(screen.getAllByRole("link")).toHaveLength(7);
  });

  it("caps the composition at six cards", () => {
    render(<PropertyShowcase properties={makeList(12)} />);
    expect(screen.getAllByRole("link")).toHaveLength(7);
  });

  it("renders all five properties when only five are available", () => {
    render(<PropertyShowcase properties={makeList(5)} />);
    expect(screen.getByText("Objekt 5")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(6);
  });

  it("renders four properties without dropping to the empty state", () => {
    render(<PropertyShowcase properties={makeList(4)} />);
    expect(screen.getByText("Objekt 4")).toBeInTheDocument();
    expect(listingCta()).toBeInTheDocument();
  });

  it("renders three properties as the anchor row", () => {
    render(<PropertyShowcase properties={makeList(3)} />);
    expect(screen.getByText("Objekt 3")).toBeInTheDocument();
    expect(listingCta()).toBeInTheDocument();
  });

  it("gives two properties equal weight", () => {
    render(<PropertyShowcase properties={makeList(2)} />);
    expect(screen.getAllByRole("heading", { level: 4 })).toHaveLength(2);
    expect(screen.queryByRole("heading", { level: 3 })).not.toBeInTheDocument();
    expect(listingCta()).toBeInTheDocument();
  });

  it("renders a single property as a spotlight with its own CTA", () => {
    render(<PropertyShowcase properties={makeList(1)} />);
    expect(screen.getByText("Objekt ansehen")).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
  });

  it("shows the editorial notice when no property is available", () => {
    render(<PropertyShowcase properties={[]} />);
    expect(
      screen.getByText("Neue Objekte in Vorbereitung"),
    ).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Suchauftrag anlegen" }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("shows the service-unavailable message when there is an error", () => {
    render(<PropertyShowcase properties={makeList(6)} error />);
    expect(
      screen.getByText("Immobilien derzeit nicht verfügbar"),
    ).toBeInTheDocument();
    expect(listingCta()).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
  });
});
