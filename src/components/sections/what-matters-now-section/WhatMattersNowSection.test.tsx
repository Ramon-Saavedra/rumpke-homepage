import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhatMattersNowSection from "./WhatMattersNowSection";

jest.mock("./WhatMattersCard", () => {
  return function MockWhatMattersCard({
    title,
    description,
    ctaLabel,
  }: {
    title: string;
    description: string;
    ctaLabel: string;
  }) {
    return (
      <div data-testid="what-matters-card">
        <div>{title}</div>
        <div>{description}</div>
        <div>{ctaLabel}</div>
      </div>
    );
  };
});

jest.mock("lucide-react", () => ({
  Compass: () => <svg data-testid="icon-compass" />,
  MapPin: () => <svg data-testid="icon-map-pin" />,
  MessageCircleHeart: () => <svg data-testid="icon-message-heart" />,
}));

describe("WhatMattersNowSection", () => {
  it("renders the section headline and description", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByText("Was Ihnen jetzt wichtig ist")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Rund um Immobilien geht es selten nur um Zahlen/i)
    ).toBeInTheDocument();
  });

  it("renders exactly three cards", () => {
    render(<WhatMattersNowSection />);

    expect(screen.getAllByTestId("what-matters-card")).toHaveLength(3);
  });

  it("renders the three support pillars", () => {
    render(<WhatMattersNowSection />);

    const pillars = [
      "Orientierung",
      "Begleitung",
      "Nähe",
    ] satisfies readonly string[];

    pillars.forEach((pillar) => {
      expect(screen.getByText(pillar)).toBeInTheDocument();
    });
  });

  it("renders the expected card copy", () => {
    render(<WhatMattersNowSection />);

    expect(
      screen.getByText("Klarheit vor dem nächsten Schritt")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Persönliche Begleitung statt Standardprozess")
    ).toBeInTheDocument();
    expect(screen.getByText("Regional stark, menschlich nah")).toBeInTheDocument();
  });
});
