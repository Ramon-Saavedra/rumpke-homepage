import "@/test-utils/lucide-mocks";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ShowcaseSection, emptySlots } from "./showcase-layout";

describe("ShowcaseSection", () => {
  it("renders heading", () => {
    render(
      <ShowcaseSection withListingCta>
        <p>content</p>
      </ShowcaseSection>,
    );
    expect(
      screen.getByRole("heading", {
        name: "Handverlesene Immobilien in Ihrer Nähe",
      }),
    ).toBeInTheDocument();
  });

  it("renders listing CTA when withListingCta is true", () => {
    render(
      <ShowcaseSection withListingCta>
        <p>content</p>
      </ShowcaseSection>,
    );
    expect(screen.getByText("Alle Immobilien entdecken")).toBeInTheDocument();
  });

  it("does not render listing CTA when withListingCta is false", () => {
    render(
      <ShowcaseSection withListingCta={false}>
        <p>content</p>
      </ShowcaseSection>,
    );
    expect(
      screen.queryByText("Alle Immobilien entdecken"),
    ).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <ShowcaseSection withListingCta>
        <p>test child</p>
      </ShowcaseSection>,
    );
    expect(screen.getByText("test child")).toBeInTheDocument();
  });
});

describe("emptySlots", () => {
  it("returns array of undefined slots", () => {
    const slots = emptySlots(3);
    expect(slots).toHaveLength(3);
    expect(slots).toEqual([undefined, undefined, undefined]);
  });

  it("returns empty array for count 0", () => {
    const slots = emptySlots(0);
    expect(slots).toHaveLength(0);
  });
});
