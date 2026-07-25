import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyShowcaseEmpty from "./PropertyShowcaseEmpty";

describe("PropertyShowcaseEmpty", () => {
  describe("Loading state", () => {
    it("renders skeleton when isLoading is true", () => {
      const { container } = render(<PropertyShowcaseEmpty isLoading />);
      expect(
        container.querySelector('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("renders error heading", () => {
      render(<PropertyShowcaseEmpty error />);
      expect(
        screen.getByText("Immobilien derzeit nicht verfügbar"),
      ).toBeInTheDocument();
    });

    it("renders Kontakt aufnehmen CTA", () => {
      render(<PropertyShowcaseEmpty error />);
      expect(screen.getByText("Kontakt aufnehmen")).toBeInTheDocument();
    });

    it("does not render secondary CTA in error state", () => {
      render(<PropertyShowcaseEmpty error />);
      expect(
        screen.queryByText("Persönlich beraten lassen"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Empty state", () => {
    it("renders empty heading", () => {
      render(<PropertyShowcaseEmpty />);
      expect(
        screen.getByText("Neue Objekte in Vorbereitung"),
      ).toBeInTheDocument();
    });

    it("renders Suchauftrag CTA", () => {
      render(<PropertyShowcaseEmpty />);
      expect(screen.getByText("Suchauftrag anlegen")).toBeInTheDocument();
    });

    it("renders secondary CTA", () => {
      render(<PropertyShowcaseEmpty />);
      expect(screen.getByText("Persönlich beraten lassen")).toBeInTheDocument();
    });
  });
});
