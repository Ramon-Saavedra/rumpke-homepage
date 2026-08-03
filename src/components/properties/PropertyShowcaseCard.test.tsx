import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyShowcaseCard from "./PropertyShowcaseCard";
import type { PropertyCardDto } from "@/types/property-api";

function makeProperty(
  overrides: Partial<PropertyCardDto> = {},
): PropertyCardDto {
  return {
    id: "abc-123",
    title: "Modernes Einfamilienhaus mit Garten",
    city: "München-Schwabing",
    propertyType: "Haus",
    propertySubType: null,
    marketingType: "kauf",
    salePrice: 1250000,
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

describe("PropertyShowcaseCard", () => {
  it("renders the title, location and formatted price", () => {
    render(
      <PropertyShowcaseCard property={makeProperty()} variant="standard" />,
    );
    expect(
      screen.getByText("Modernes Einfamilienhaus mit Garten"),
    ).toBeInTheDocument();
    expect(screen.getByText(/München-Schwabing/)).toBeInTheDocument();
    expect(screen.getByText(/1\.250\.000/)).toBeInTheDocument();
  });

  it("links to the object detail page", () => {
    render(<PropertyShowcaseCard property={makeProperty({ id: "obj-9" })} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/objekt/obj-9");
  });

  it("shows the Kaufen badge for a purchase listing", () => {
    render(
      <PropertyShowcaseCard
        property={makeProperty({ marketingType: "kauf" })}
      />,
    );
    expect(screen.getByText("Kaufen")).toBeInTheDocument();
  });

  it("shows the Mieten badge for a rental listing", () => {
    render(
      <PropertyShowcaseCard
        property={makeProperty({
          marketingType: "miete",
          coldRent: 1450,
          salePrice: null,
        })}
      />,
    );
    expect(screen.getByText("Mieten")).toBeInTheDocument();
  });

  it("renders the featured variant title as an h3", () => {
    render(
      <PropertyShowcaseCard property={makeProperty()} variant="featured" />,
    );
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Modernes Einfamilienhaus/,
      }),
    ).toBeInTheDocument();
  });

  it("renders the standard variant title as an h4", () => {
    render(
      <PropertyShowcaseCard property={makeProperty()} variant="standard" />,
    );
    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /Modernes Einfamilienhaus/,
      }),
    ).toBeInTheDocument();
  });

  it("renders a skeleton placeholder without a link when loading", () => {
    const { container } = render(
      <PropertyShowcaseCard property={makeProperty()} isLoading />,
    );
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders a skeleton placeholder when no property is provided", () => {
    const { container } = render(<PropertyShowcaseCard />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
