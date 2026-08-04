jest.mock("lucide-react", () => ({
  TrendingUp: ({
    className,
    strokeWidth,
    size,
    "aria-hidden": ariaHidden,
  }: {
    className?: string;
    strokeWidth?: number;
    size?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }) => (
    <svg
      data-testid="service-icon"
      className={className}
      data-stroke-width={strokeWidth}
      data-size={size}
      aria-hidden={ariaHidden}
    />
  ),
  ArrowRight: ({
    "aria-hidden": ariaHidden,
  }: {
    "aria-hidden"?: boolean | "true" | "false";
  }) => <svg data-testid="arrow-icon" aria-hidden={ariaHidden} />,
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TrendingUp } from "lucide-react";
import ServiceCard from "./ServiceCard";

const renderCard = (
  props: Partial<React.ComponentProps<typeof ServiceCard>> = {},
) =>
  render(
    <ServiceCard
      title="Verkaufen"
      text="Persönliche Verkaufsberatung"
      link="/dienstleistungen/verkauf-vermietung"
      icon={TrendingUp}
      {...props}
    />,
  );

describe("ServiceCard", () => {
  it("renders all service information inside one link", () => {
    renderCard();

    const link = screen.getByRole("link", { name: /Verkaufen/ });
    expect(link).toHaveAttribute(
      "href",
      "/dienstleistungen/verkauf-vermietung",
    );
    expect(link).toHaveTextContent("Persönliche Verkaufsberatung");
    expect(link).toHaveTextContent("Mehr erfahren");
  });

  it("uses a level 3 heading for the service title", () => {
    renderCard({ title: "Vermieten" });

    expect(
      screen.getByRole("heading", { level: 3, name: "Vermieten" }),
    ).toBeInTheDocument();
  });

  it("renders the supplied icon as decorative content", () => {
    renderCard();

    expect(screen.getByTestId("service-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByTestId("arrow-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
