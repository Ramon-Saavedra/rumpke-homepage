import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhatMattersNowSection from "./WhatMattersNowSection";

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

  it("renders all four visitor scenarios", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByText("Ich möchte meine Immobilie verkaufen."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ich suche ein neues Zuhause."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ich habe eine Immobilie geerbt."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ich möchte den aktuellen Marktwert erfahren."),
    ).toBeInTheDocument();
  });

  it("links scenarios to the correct pages", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByRole("link", {
        name: /Ich möchte meine Immobilie verkaufen/i,
      }),
    ).toHaveAttribute("href", "/dienstleistungen/verkauf-vermietung");
    expect(
      screen.getByRole("link", { name: /Ich suche ein neues Zuhause/i }),
    ).toHaveAttribute("href", "/kauf");
  });

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
