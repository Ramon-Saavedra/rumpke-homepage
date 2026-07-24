import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyImage from "./PropertyImage";
import type { PropertyImageDto } from "@/types/property-api";

function makeImage(overrides: Partial<PropertyImageDto> = {}): PropertyImageDto {
  return {
    id: "img-1",
    url: "https://image.onoffice.de/photo1.jpg",
    title: "Wohnzimmer",
    type: "image/jpeg",
    position: 0,
    ...overrides,
  };
}

describe("PropertyImage", () => {
  describe("Empty images array", () => {
    it("renders placeholder icon", () => {
      render(<PropertyImage images={[]} alt="Test" />);
      const placeholder = screen.getByRole("img");
      expect(placeholder).toBeInTheDocument();
      expect(placeholder).toHaveAttribute("aria-label", "Test");
    });
  });

  describe("With valid image", () => {
    it("renders next/image with correct alt from image title", () => {
      render(
        <PropertyImage
          images={[makeImage({ title: "Wohnzimmer" })]}
          alt="Fallback alt"
        />,
      );
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("alt", "Wohnzimmer");
    });

    it("falls back to alt prop when image title is null", () => {
      render(
        <PropertyImage
          images={[makeImage({ title: null })]}
          alt="Fallback alt"
        />,
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("alt", "Fallback alt");
    });

    it("renders placeholder when first image has empty url", () => {
      render(
        <PropertyImage
          images={[makeImage({ url: "" })]}
          alt="Test"
        />,
      );
      const placeholder = screen.getByRole("img");
      expect(placeholder).toHaveAttribute("aria-label", "Test");
    });

    it("renders only first image from multiple", () => {
      render(
        <PropertyImage
          images={[
            makeImage({ id: "img-1", url: "https://image.onoffice.de/photo1.jpg", title: "First" }),
            makeImage({ id: "img-2", url: "https://image.onoffice.de/photo2.jpg", title: "Second" }),
          ]}
          alt="Fallback"
        />,
      );
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("alt", "First");
    });
  });

  describe("CLS prevention", () => {
    it("wraps image in relative container with className", () => {
      render(
        <PropertyImage
          images={[makeImage()]}
          alt="Test"
          className="h-64 w-full"
        />,
      );
      const container = screen.getByRole("img").parentElement;
      expect(container).toHaveClass("relative");
      expect(container).toHaveClass("h-64");
      expect(container).toHaveClass("w-full");
    });
  });

  describe("Accessibility", () => {
    it("placeholder has role img with aria-label", () => {
      render(<PropertyImage images={[]} alt="Immobilie 2026-0006" />);
      const placeholder = screen.getByRole("img");
      expect(placeholder).toHaveAttribute("aria-label", "Immobilie 2026-0006");
    });

    it("hides placeholder icon from screen readers", () => {
      render(<PropertyImage images={[]} alt="Test" />);
      const container = screen.getByRole("img");
      const icon = container.querySelector('[aria-hidden="true"]');
      expect(icon).toBeInTheDocument();
    });
  });
});
