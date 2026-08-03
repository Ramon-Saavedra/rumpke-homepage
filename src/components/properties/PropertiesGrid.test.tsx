import "@/test-utils/lucide-mocks";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertiesGrid from "./PropertiesGrid";
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

describe("PropertiesGrid", () => {
  it("renders one card per property", () => {
    render(
      <PropertiesGrid
        properties={[makeProperty("A"), makeProperty("B"), makeProperty("C")]}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: /Objekt A/ })).toHaveAttribute(
      "href",
      "/objekt/A",
    );
  });

  it("renders nothing without properties", () => {
    const { container } = render(<PropertiesGrid properties={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
