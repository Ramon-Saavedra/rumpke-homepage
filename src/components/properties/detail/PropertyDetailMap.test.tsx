import { render, screen } from "@testing-library/react";
import PropertyDetailMap from "./PropertyDetailMap";

jest.mock("@/lib/map-tiles", () => ({
  resolveTileUrl: jest.fn(
    () => "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ),
  isValidCoordinate: jest.fn((lat: number, lng: number) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }),
  buildGoogleMapsUrl: jest.fn(
    (lat: number, lng: number) =>
      `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`,
  ),
}));

describe("PropertyDetailMap", () => {
  it("returns null for invalid coordinates", () => {
    const { container } = render(
      <PropertyDetailMap
        coordinates={{ lat: 200, lng: 200 }}
        title="Test"
        isExact={true}
      />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("renders the map container with region role", () => {
    render(
      <PropertyDetailMap
        coordinates={{ lat: 52.52, lng: 13.405 }}
        title="Berlin"
        isExact={true}
      />,
    );
    const region = screen.getByRole("region", {
      name: "Kartenansicht der Immobilie",
    });
    expect(region).toBeInTheDocument();
  });

  it("renders OpenStreetMap attribution", () => {
    render(
      <PropertyDetailMap
        coordinates={{ lat: 52.52, lng: 13.405 }}
        title="Berlin"
        isExact={true}
      />,
    );
    expect(screen.getByText(/OpenStreetMap/)).toBeInTheDocument();
    expect(screen.getByText(/contributors/)).toBeInTheDocument();
  });

  it("does not show tile error message initially", () => {
    render(
      <PropertyDetailMap
        coordinates={{ lat: 52.52, lng: 13.405 }}
        title="Berlin"
        isExact={false}
      />,
    );
    expect(
      screen.queryByText("Karte derzeit nicht verfügbar."),
    ).not.toBeInTheDocument();
  });

  it("renders with approximate coordinates", () => {
    const { container } = render(
      <PropertyDetailMap
        coordinates={{ lat: 48.1, lng: 11.6 }}
        title="München"
        isExact={false}
      />,
    );
    expect(container.querySelector('div[role="region"]')).toBeInTheDocument();
  });

  it("renders with exact coordinates", () => {
    const { container } = render(
      <PropertyDetailMap
        coordinates={{ lat: 51.1657, lng: 10.4515 }}
        title="Deutschland"
        isExact={true}
      />,
    );
    expect(container.querySelector('div[role="region"]')).toBeInTheDocument();
  });
});
