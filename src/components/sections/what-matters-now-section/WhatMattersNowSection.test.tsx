import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhatMattersNowSection from "./WhatMattersNowSection";

const scenarios = [
  [
    "Verkaufen",
    "Ich möchte meine Immobilie verkaufen.",
    "/dienstleistungen/verkauf-vermietung",
  ],
  ["Kaufen", "Ich suche ein neues Zuhause.", "/kauf"],
  ["Erbschaft", "Ich habe eine Immobilie geerbt.", "/kontakt"],
  [
    "Bewertung",
    "Ich möchte den aktuellen Marktwert erfahren.",
    "/dienstleistungen/immobilienbewertung",
  ],
] as const;

describe("WhatMattersNowSection", () => {
  it("renders the eyebrow and heading", () => {
    render(<WhatMattersNowSection />);

    expect(screen.getByText("Persönliche Begleitung")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Was führt Sie zu uns?" }),
    ).toBeInTheDocument();
  });

  it("renders the introduction text", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByText(/Jeder Weg beginnt mit einem Gespräch/i),
    ).toBeInTheDocument();
  });

  it.each(scenarios)(
    "links the %s scenario to the correct page",
    (kicker, label, href) => {
      render(<WhatMattersNowSection />);

      expect(
        screen.getByRole("link", { name: `${kicker} ${label}` }),
      ).toHaveAttribute("href", href);
    },
  );

  it("links the CTA to the contact page", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByRole("link", { name: /Ein Gespräch in Ruhe beginnen/i }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("has an accessible navigation label for the scenarios list", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByRole("navigation", { name: "Ihre Situation" }),
    ).toBeInTheDocument();
  });
});
