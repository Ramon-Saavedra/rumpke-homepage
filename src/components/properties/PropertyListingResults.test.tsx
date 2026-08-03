import "@/test-utils/lucide-mocks";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyListingResults from "./PropertyListingResults";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(id: string): PropertyCardDto {
  return {
    id,
    title: `Objekt ${id}`,
    city: "Bawinkel",
    propertyType: "haus",
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

const empty = {
  headline: "Aktuell keine Häuser zum Kauf verfügbar",
  body: "Gern unterstützen wir Sie persönlich bei Ihrer Suche.",
};

describe("PropertyListingResults", () => {
  it("renders the empty state without results", () => {
    render(
      <PropertyListingResults
        properties={[]}
        marketingType="kauf"
        total={0}
        empty={empty}
        emptyReset={{ href: "/kauf", label: "Alle Immobilien ansehen" }}
      />,
    );
    expect(
      screen.getByRole("heading", { name: empty.headline }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Alle Immobilien ansehen" }),
    ).toHaveAttribute("href", "/kauf");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the featured listing for a single result", () => {
    render(
      <PropertyListingResults
        properties={[makeProperty("A")]}
        marketingType="kauf"
        total={1}
        empty={empty}
      />,
    );
    expect(screen.getByText("Zum Verkauf")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Anfrage senden" }),
    ).toBeInTheDocument();
  });

  it("renders the grid for two or more results", () => {
    render(
      <PropertyListingResults
        properties={[makeProperty("A"), makeProperty("B")]}
        marketingType="kauf"
        total={2}
        empty={empty}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.queryByText("Zum Verkauf")).not.toBeInTheDocument();
  });

  it("keeps the grid when a later page shows a single result of many", () => {
    render(
      <PropertyListingResults
        properties={[makeProperty("M")]}
        marketingType="kauf"
        total={13}
        empty={empty}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText("Zum Verkauf")).not.toBeInTheDocument();
  });

  it("renders the result count when provided", () => {
    render(
      <PropertyListingResults
        properties={[makeProperty("A"), makeProperty("B")]}
        marketingType="kauf"
        total={2}
        context="2 Häuser zum Kauf gefunden"
        empty={empty}
      />,
    );
    expect(screen.getByText("2 Häuser zum Kauf gefunden")).toBeInTheDocument();
  });

  it("suppresses the result count when total is zero", () => {
    render(
      <PropertyListingResults
        properties={[]}
        marketingType="kauf"
        total={0}
        context="Keine passenden Häuser zum Kauf gefunden"
        empty={empty}
      />,
    );
    expect(
      screen.queryByText("Keine passenden Häuser zum Kauf gefunden"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: empty.headline }),
    ).toBeInTheDocument();
  });
});
