import {
  groupPropertyImages,
  isValidImageUrl,
  resolveFirstValidImage,
  resolveValidImages,
} from "./property-images";
import type { PropertyImageDto } from "@/types/property-api";

function makeImage(overrides: Partial<PropertyImageDto> = {}): PropertyImageDto {
  return {
    id: "img-1",
    url: "https://image.onoffice.de/photo1.jpg",
    title: null,
    type: "Foto",
    position: 0,
    ...overrides,
  };
}

describe("isValidImageUrl", () => {
  it("accepts allowed https hosts", () => {
    expect(isValidImageUrl("https://image.onoffice.de/a.jpg")).toBe(true);
    expect(isValidImageUrl("https://smart.onoffice.de/a.jpg")).toBe(true);
  });

  it("rejects other hosts, http and malformed urls", () => {
    expect(isValidImageUrl("https://evil.example.com/a.jpg")).toBe(false);
    expect(isValidImageUrl("http://image.onoffice.de/a.jpg")).toBe(false);
    expect(isValidImageUrl("not-a-url")).toBe(false);
  });
});

describe("resolveValidImages", () => {
  it("drops images with invalid or empty urls", () => {
    const images = [
      makeImage({ id: "a" }),
      makeImage({ id: "b", url: "" }),
      makeImage({ id: "c", url: "https://evil.example.com/x.jpg" }),
    ];
    expect(resolveValidImages(images).map((image) => image.id)).toEqual(["a"]);
  });
});

describe("resolveFirstValidImage", () => {
  it("returns null for an empty list", () => {
    expect(resolveFirstValidImage([])).toBeNull();
  });

  it("returns null when the first image is not valid", () => {
    expect(
      resolveFirstValidImage([
        makeImage({ url: "https://evil.example.com/x.jpg" }),
        makeImage({ id: "b" }),
      ]),
    ).toBeNull();
  });

  it("returns the first image when it is valid", () => {
    expect(resolveFirstValidImage([makeImage({ id: "a" })])?.id).toBe("a");
  });
});

describe("groupPropertyImages", () => {
  it("splits floorplans from photos and sorts by position", () => {
    const images = [
      makeImage({ id: "photo-2", position: 2 }),
      makeImage({ id: "plan", type: "Grundriss", position: 1 }),
      makeImage({ id: "photo-1", position: 0 }),
      makeImage({ id: "broken", url: "http://image.onoffice.de/x.jpg" }),
    ];

    const { photos, floorplans } = groupPropertyImages(images);

    expect(photos.map((image) => image.id)).toEqual(["photo-1", "photo-2"]);
    expect(floorplans.map((image) => image.id)).toEqual(["plan"]);
  });

  it("treats a missing type as a photo", () => {
    const { photos, floorplans } = groupPropertyImages([
      makeImage({ id: "a", type: null }),
    ]);
    expect(photos).toHaveLength(1);
    expect(floorplans).toHaveLength(0);
  });
});
