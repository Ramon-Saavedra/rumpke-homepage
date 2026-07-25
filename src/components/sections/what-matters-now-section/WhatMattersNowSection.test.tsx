import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhatMattersNowSection from "./WhatMattersNowSection";

describe("WhatMattersNowSection", () => {
  it("renders the eyebrow and both headline lines", () => {
    render(<WhatMattersNowSection />);

    expect(screen.getByText("Persönliche Begleitung")).toBeInTheDocument();
    expect(
      screen.getByText("Sie müssen den nächsten Schritt"),
    ).toBeInTheDocument();
    expect(screen.getByText("nicht allein gehen.")).toBeInTheDocument();
  });

  it("renders the intro copy", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByText(/Bevor es um Zahlen, Termine oder Entscheidungen geht/i),
    ).toBeInTheDocument();
  });

  it("renders the three guidance steps in order", () => {
    render(<WhatMattersNowSection />);

    const steps = ["Verstehen", "Einordnen", "Begleiten"] as const;

    steps.forEach((step) => {
      expect(
        screen.getByRole("heading", { name: step, level: 3 }),
      ).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(steps.length);
  });

  it("links the call to action to the contact page", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByRole("link", { name: /Ein Gespräch in Ruhe beginnen/i }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("renders the portrait with an accessible name and caption", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByAltText(
        "Ann-Christin Rumpke im persönlichen Beratungsgespräch",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ann-Christin Rumpke — Ihre persönliche Ansprechpartnerin",
      ),
    ).toBeInTheDocument();
  });

  it("shows portrait skeleton and aria-busy during loading", () => {
    const { container } = render(<WhatMattersNowSection />);

    const portrait = container.querySelector('[aria-busy="true"]');
    expect(portrait).toBeInTheDocument();
    expect(portrait?.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
