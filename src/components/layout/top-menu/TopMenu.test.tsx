import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Topmenu from "@/components/layout/top-menu/TopMenu";
import { useUiStore } from "@/store/ui/ui-store";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("@/components/branding/logo/RumpkeLogo", () => ({
  __esModule: true,
  default: () => <div data-testid="rumpke-logo">RumpkeLogo</div>,
}));

describe("TopMenu", () => {
  beforeEach(() => {
    useUiStore.setState({ isSidebarOpen: false });
  });

  describe("Rendering", () => {
    it("renders the logo", () => {
      render(<Topmenu />);
      expect(screen.getAllByTestId("rumpke-logo").length).toBeGreaterThan(0);
    });

    it("renders the real desktop navigation links", () => {
      render(<Topmenu />);
      ["Häuser", "Wohnungen", "Gewerbeimmobilien", "Grundstücke", "Dienstleistungen", "Über uns", "Werde Tippgeber"].forEach(
        (label) => expect(screen.getByText(label)).toBeInTheDocument()
      );
    });

    it("renders a single CTA", () => {
      render(<Topmenu />);
      const cta = screen.getByText("Kontakt aufnehmen");
      expect(cta).toBeInTheDocument();
      expect(cta.closest("a")).toHaveAttribute("href", "/kontakt");
    });

    it("shows the mobile menu (hamburger) button", () => {
      render(<Topmenu />);
      expect(screen.getByTestId("menu-btn")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("links point to the correct routes", () => {
      render(<Topmenu />);
      expect(screen.getByText("Häuser").closest("a")).toHaveAttribute("href", "/kategorie/haeuser");
      expect(screen.getByText("Grundstücke").closest("a")).toHaveAttribute("href", "/kategorie/grundstueck");
      expect(screen.getByText("Dienstleistungen").closest("a")).toHaveAttribute("href", "/dienstleistungen");
      expect(screen.getByText("Über uns").closest("a")).toHaveAttribute("href", "/ueber-uns");
      const tippgeber = screen.getByText("Werde Tippgeber").closest("a");
      expect(tippgeber).toHaveAttribute("href", "https://www.ichschenkedirwas.de/");
      expect(tippgeber).toHaveAttribute("target", "_blank");
    });
  });

  describe("Interaction", () => {
    it("hamburger opens the drawer via the ui store", () => {
      render(<Topmenu />);
      expect(useUiStore.getState().isSidebarOpen).toBe(false);
      fireEvent.click(screen.getByTestId("menu-btn"));
      expect(useUiStore.getState().isSidebarOpen).toBe(true);
    });
  });
});
