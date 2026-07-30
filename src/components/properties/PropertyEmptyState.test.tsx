import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyEmptyState from "./PropertyEmptyState";

const baseProps = {
  headline: "Keine Immobilien",
  body: "Bitte später erneut versuchen.",
};

describe("PropertyEmptyState", () => {
  it("renders headline and body", () => {
    render(<PropertyEmptyState {...baseProps} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Keine Immobilien" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Bitte später erneut versuchen."),
    ).toBeInTheDocument();
  });

  it("renders the default CTAs", () => {
    render(<PropertyEmptyState {...baseProps} />);
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
    expect(
      screen.getByRole("link", { name: "Suchauftrag anfragen" }),
    ).toHaveAttribute("href", "/dienstleistungen/immobilien-kauf");
  });

  it("omits the badge unless badgeText is given", () => {
    const { rerender } = render(<PropertyEmptyState {...baseProps} />);
    expect(screen.queryByText("In Vorbereitung")).not.toBeInTheDocument();

    rerender(<PropertyEmptyState {...baseProps} badgeText="In Vorbereitung" />);
    expect(screen.getByText("In Vorbereitung")).toBeInTheDocument();
  });

  it("renders the reset link when provided", () => {
    render(
      <PropertyEmptyState
        {...baseProps}
        reset={{ href: "/objekt", label: "Alle Filter zurücksetzen" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "Alle Filter zurücksetzen" }),
    ).toHaveAttribute("href", "/objekt");
  });

  it("omits the reset link by default", () => {
    render(<PropertyEmptyState {...baseProps} />);
    expect(
      screen.queryByRole("link", { name: "Alle Filter zurücksetzen" }),
    ).not.toBeInTheDocument();
  });

  it("renders with polite live region by default", () => {
    const { container } = render(
      <PropertyEmptyState {...baseProps} />,
    );
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it("renders rental-specific CTAs when marketingType is miete", () => {
    render(<PropertyEmptyState {...baseProps} marketingType="miete" />);
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
    expect(
      screen.getByRole("link", { name: "Persönlich beraten lassen" }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("renders the skeleton without copy while loading", () => {
    render(<PropertyEmptyState {...baseProps} isLoading />);
    expect(screen.queryByText("Keine Immobilien")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
