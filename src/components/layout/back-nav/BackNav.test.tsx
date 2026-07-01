jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  ArrowLeft: () => <svg data-testid="arrow-left" />,
}));

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";
import BackNav from "./BackNav";

const mockUsePathname = usePathname as jest.Mock;

describe("BackNav", () => {
  it("shows back link with label on subpage", () => {
    mockUsePathname.mockReturnValue("/kauf/haeuser");
    render(<BackNav basePath="/kauf" backLabel="Zurück zu Kaufen" />);
    expect(
      screen.getByRole("link", { name: /zurück zu kaufen/i }),
    ).toHaveAttribute("href", "/kauf");
  });

  it("shows BackHomeButton on base path", () => {
    mockUsePathname.mockReturnValue("/kauf");
    render(<BackNav basePath="/kauf" backLabel="Zurück" />);
    expect(
      screen.getByRole("link", { name: /startseite/i }),
    ).toBeInTheDocument();
  });

  it("renders ArrowLeft icon on subpage", () => {
    mockUsePathname.mockReturnValue("/kauf/haeuser");
    render(<BackNav basePath="/kauf" backLabel="Zurück" />);
    expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
  });

  it("does not render the back link on base path", () => {
    mockUsePathname.mockReturnValue("/kauf");
    render(<BackNav basePath="/kauf" backLabel="Zurück" />);
    expect(
      screen.queryByRole("link", { name: "Zurück" }),
    ).not.toBeInTheDocument();
  });
});
