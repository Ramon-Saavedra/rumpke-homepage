import {
  resolveTileUrl,
  resolveTileAttribution,
  isValidCoordinate,
  buildGoogleMapsUrl,
} from "./map-tiles";

describe("resolveTileUrl", () => {
  it("returns a MapTiler URL when NEXT_PUBLIC_MAP_TILER_KEY is set", () => {
    process.env.NEXT_PUBLIC_MAP_TILER_KEY = "test-key-123";
    const url = resolveTileUrl();
    expect(url).toBe(
      "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=test-key-123",
    );
    delete process.env.NEXT_PUBLIC_MAP_TILER_KEY;
  });

  it("returns OpenStreetMap URL as fallback when key is not set", () => {
    delete process.env.NEXT_PUBLIC_MAP_TILER_KEY;
    const url = resolveTileUrl();
    expect(url).toBe("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  });
});

describe("resolveTileAttribution", () => {
  it("includes OpenStreetMap attribution", () => {
    const attr = resolveTileAttribution();
    expect(attr).toContain("OpenStreetMap");
    expect(attr).toContain("openstreetmap.org/copyright");
  });
});

describe("isValidCoordinate", () => {
  it("accepts valid coordinates", () => {
    expect(isValidCoordinate(51.1657, 10.4515)).toBe(true);
    expect(isValidCoordinate(-90, -180)).toBe(true);
    expect(isValidCoordinate(90, 180)).toBe(true);
  });

  it("rejects out-of-range coordinates", () => {
    expect(isValidCoordinate(91, 0)).toBe(false);
    expect(isValidCoordinate(-91, 0)).toBe(false);
    expect(isValidCoordinate(0, 181)).toBe(false);
    expect(isValidCoordinate(0, -181)).toBe(false);
  });
});

describe("buildGoogleMapsUrl", () => {
  it("builds a Google Maps URL with encoded coordinates", () => {
    const url = buildGoogleMapsUrl(52.5200, 13.4050);
    expect(url).toBe("https://www.google.com/maps?q=52.52%2C13.405");
  });
});
