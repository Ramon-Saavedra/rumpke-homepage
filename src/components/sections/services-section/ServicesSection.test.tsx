jest.mock("lucide-react", () => ({
  TrendingUp: () => <svg data-testid="trending-up-icon" />,
  KeyRound: () => <svg data-testid="key-round-icon" />,
  ClipboardCheck: () => <svg data-testid="clipboard-check-icon" />,
  ArrowRight: () => <svg data-testid="arrow-icon" />,
}));

import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ServicesSection from "./ServicesSection";

const expectedServices = [
  {
    title: "Verkaufen",
    text: /optimalen Verkaufspreis/,
    href: "/dienstleistungen/verkauf-vermietung",
    iconTestId: "trending-up-icon",
  },
  {
    title: "Vermieten",
    text: /zuverlässige Mieter/,
    href: "/dienstleistungen/verkauf-vermietung",
    iconTestId: "key-round-icon",
  },
  {
    title: "Bewertungen",
    text: /Immobilienbewertung ist die Basis/,
    href: "/dienstleistungen/immobilienbewertung",
    iconTestId: "clipboard-check-icon",
  },
] as const;

describe("ServicesSection", () => {
  beforeEach(() => render(<ServicesSection />));

  it("exposes the section through its heading", () => {
    const section = screen.getByRole("region", { name: "Unsere Leistungen" });

    expect(section).toBeInTheDocument();
    expect(
      within(section).getByRole("heading", {
        level: 2,
        name: "Unsere Leistungen",
      }),
    ).toHaveAttribute("id", "services-section-title");
    expect(within(section).getByText("Was wir bieten")).toBeInTheDocument();
  });

  it.each(expectedServices)(
    "associates $title with its content, route and icon",
    ({ title, text, href, iconTestId }) => {
      const card = screen.getByRole("link", { name: new RegExp(title) });

      expect(card).toHaveAttribute("href", href);
      expect(
        within(card).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
      expect(within(card).getByText(text)).toBeInTheDocument();
      expect(within(card).getByTestId(iconTestId)).toBeInTheDocument();
      expect(within(card).getByText("Mehr erfahren")).toBeInTheDocument();
    },
  );

  it("renders each service exactly once and in the defined order", () => {
    const cards = screen.getAllByRole("link");
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);

    expect(cards).toHaveLength(expectedServices.length);
    expect(titles).toEqual(expectedServices.map(({ title }) => title));
    expect(screen.getAllByTestId("arrow-icon")).toHaveLength(
      expectedServices.length,
    );
  });
});
