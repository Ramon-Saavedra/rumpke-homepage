import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { Compass } from "lucide-react";
import WhatMattersCard from "./WhatMattersCard";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("lucide-react", () => ({
  ArrowUpRight: () => <svg data-testid="arrow-up-right" />,
  Compass: () => <svg data-testid="icon-compass" />,
}));

describe("WhatMattersCard", () => {
  it("renders title, description and CTA", () => {
    render(
      <WhatMattersCard
        title="Klarheit vor dem nächsten Schritt"
        description="Eine fundierte Einordnung Ihrer Möglichkeiten."
        href="/kontakt"
        ctaLabel="Gespräch anfragen"
        Icon={Compass}
      />
    );

    expect(
      screen.getByText("Klarheit vor dem nächsten Schritt")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Eine fundierte Einordnung Ihrer Möglichkeiten.")
    ).toBeInTheDocument();
    expect(screen.getByText("Gespräch anfragen")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Klarheit vor dem nächsten Schritt - Gespräch anfragen",
      })
    ).toHaveAttribute("href", "/kontakt");
  });

  it("applies an accessible label to the link", () => {
    render(
      <WhatMattersCard
        title="Persönliche Begleitung"
        description="Persönlich und klar."
        href="/ueber-uns"
        ctaLabel="Über Rumpke Immobilien"
        Icon={Compass}
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "aria-label",
      "Persönliche Begleitung - Über Rumpke Immobilien"
    );
  });

  it("renders the icon and the CTA arrow", () => {
    render(
      <WhatMattersCard
        title="Regional stark"
        description="Mit Nähe zur Region."
        href="/auf-karte-erkunden"
        ctaLabel="Region entdecken"
        Icon={Compass}
      />
    );

    expect(screen.getByTestId("icon-compass")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-up-right")).toBeInTheDocument();
  });
});
