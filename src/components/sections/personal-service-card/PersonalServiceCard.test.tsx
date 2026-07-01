jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockImage(props: {
    src?: string;
    alt?: string;
    className?: string;
    loading?: "eager" | "lazy";
    sizes?: string;
    fill?: boolean;
  }) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        loading={props.loading}
        sizes={props.sizes}
      />
    );
  },
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonalServiceCard from "./PersonalServiceCard";

beforeAll(() => {
  global.IntersectionObserver = jest
    .fn()
    .mockImplementation((cb: IntersectionObserverCallback) => ({
      observe: jest.fn(() =>
        cb(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver,
        ),
      ),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }));
});

describe("PersonalServiceCard", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      render(<PersonalServiceCard />);
      expect(document.querySelector("section")).toBeInTheDocument();
    });

    it("has correct aria-label on section", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByRole("region", { name: "Personal Service" }),
      ).toBeInTheDocument();
    });

    it('renders section label "Über mich"', () => {
      render(<PersonalServiceCard />);
      expect(screen.getByText("Über mich")).toBeInTheDocument();
    });

    it('renders main heading "Ann-Christin Rumpke"', () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByRole("heading", { level: 2, name: "Ann-Christin Rumpke" }),
      ).toBeInTheDocument();
    });

    it("renders portrait image", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByAltText("Ann-Christin Rumpke Portrait"),
      ).toBeInTheDocument();
    });

    it("renders CTA link to /ueber-uns", () => {
      render(<PersonalServiceCard />);
      const link = screen.getByRole("link", { name: /Mehr erfahren/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/ueber-uns");
    });
  });

  describe("Feature List", () => {
    it("renders all three feature titles as h3 headings", () => {
      render(<PersonalServiceCard />);
      const headings = screen.getAllByRole("heading", { level: 3 });
      const titles = headings.map((h) => h.textContent);
      expect(titles).toContain("Persönlicher Service");
      expect(titles).toContain("Lokale Expertise");
      expect(titles).toContain("Transparenz und Vertrauen");
    });

    it("renders features in correct order", () => {
      render(<PersonalServiceCard />);
      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings[0]).toHaveTextContent("Persönlicher Service");
      expect(headings[1]).toHaveTextContent("Lokale Expertise");
      expect(headings[2]).toHaveTextContent("Transparenz und Vertrauen");
    });

    it("renders all three feature descriptions", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByText(/Ich nehme mir Zeit für Sie/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/kenne ich den regionalen Markt/),
      ).toBeInTheDocument();
      expect(screen.getByText(/keine versteckten Kosten/)).toBeInTheDocument();
    });

    it("renders feature icons", () => {
      render(<PersonalServiceCard />);
      const svgs = document.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgs.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Image", () => {
    it("has correct src", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByAltText("Ann-Christin Rumpke Portrait"),
      ).toHaveAttribute("src", "/imgs/personal-service-pic.jpeg");
    });

    it("has lazy loading", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByAltText("Ann-Christin Rumpke Portrait"),
      ).toHaveAttribute("loading", "lazy");
    });

    it("has sizes attribute", () => {
      render(<PersonalServiceCard />);
      expect(
        screen.getByAltText("Ann-Christin Rumpke Portrait"),
      ).toHaveAttribute("sizes");
    });
  });

  describe("Layout", () => {
    it("section has padding classes", () => {
      render(<PersonalServiceCard />);
      const section = document.querySelector("section");
      expect(section).toHaveClass("px-4", "py-12", "mb-24");
    });

    it("has a grid container", () => {
      render(<PersonalServiceCard />);
      expect(document.querySelector(".grid")).toBeInTheDocument();
    });
  });
});
