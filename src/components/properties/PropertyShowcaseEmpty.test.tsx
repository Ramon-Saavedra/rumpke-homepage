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

    it("renders no copy while loading", () => {
      render(<PropertyShowcaseEmpty isLoading />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
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
      expect(
        screen.getByRole("link", { name: "Kontakt aufnehmen" }),
      ).toHaveAttribute("href", "/kontakt");
    });

    it("does not render the status badge in error state", () => {
      render(<PropertyShowcaseEmpty error />);
      expect(
        screen.queryByText("Aktuell in Vorbereitung"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Empty state", () => {
    it("renders empty heading", () => {
      render(<PropertyShowcaseEmpty />);
      expect(
        screen.getByText("Zurzeit sind keine Immobilien veröffentlicht"),
      ).toBeInTheDocument();
    });

    it("renders the status badge", () => {
      render(<PropertyShowcaseEmpty />);
      expect(screen.getByText("Aktuell in Vorbereitung")).toBeInTheDocument();
    });

    it("renders both CTAs", () => {
      render(<PropertyShowcaseEmpty />);
      expect(
        screen.getByRole("link", { name: "Kontakt aufnehmen" }),
      ).toHaveAttribute("href", "/kontakt");
      expect(
        screen.getByRole("link", { name: "Suchauftrag anfragen" }),
      ).toHaveAttribute("href", "/dienstleistungen/immobilien-kauf");
    });
  });
});
