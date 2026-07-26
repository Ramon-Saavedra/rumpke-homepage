import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhyChooseRumpke from "./WhyChooseRumpke";

describe("WhyChooseRumpke", () => {
  describe("Rendering", () => {
    it("labels the section by its headline", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByRole("region", {
          name: /Vertrauen beginnt mit einem Menschen/,
        }),
      ).toBeInTheDocument();
    });

    it("renders the eyebrow", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByText("— Warum Rumpke Immobilien —"),
      ).toBeInTheDocument();
    });

    it("renders the headline as h2", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: "Vertrauen beginnt mit einem Menschen — nicht mit einem Unternehmen.",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Pillars", () => {
    it("renders the three pillars as h3 in order", () => {
      render(<WhyChooseRumpke />);

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings.map((heading) => heading.textContent)).toEqual([
        "Persönlicher Service",
        "Lokale Expertise",
        "Transparenz und Vertrauen",
      ]);
      expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("renders each pillar description", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByText(/Sie stehen im Mittelpunkt unserer Arbeit/),
      ).toBeInTheDocument();
      expect(screen.getByText(/Wir kennen diese Region/)).toBeInTheDocument();
      expect(
        screen.getByText(/Klare Kommunikation, faire Konditionen/),
      ).toBeInTheDocument();
    });
  });

  describe("Portrait", () => {
    it("renders the portrait with an accessible name and caption", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByAltText(
          "Ann-Christin Rumpke, persönliche Ansprechpartnerin bei Rumpke Immobilien",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Ann-Christin Rumpke — Ihre Ansprechpartnerin"),
      ).toBeInTheDocument();
    });

    it("shows the skeleton and aria-busy while loading", () => {
      const { container } = render(<WhyChooseRumpke />);

      const portrait = container.querySelector('[aria-busy="true"]');
      expect(portrait).toBeInTheDocument();
      expect(
        portrait?.querySelector('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });
  });

  describe("Call to action", () => {
    it("links to the about page", () => {
      render(<WhyChooseRumpke />);

      expect(
        screen.getByRole("link", { name: /Mehr erfahren/ }),
      ).toHaveAttribute("href", "/ueber-uns");
    });
  });
});
