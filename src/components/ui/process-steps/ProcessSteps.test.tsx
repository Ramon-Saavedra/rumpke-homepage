import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProcessSteps from "./ProcessSteps";

describe("ProcessSteps", () => {
  it("renders numbered steps in order", () => {
    render(
      <ProcessSteps
        steps={[
          {
            id: "first",
            title: "Erster Schritt",
            description: "Erste Beschreibung",
          },
          {
            id: "second",
            title: "Zweiter Schritt",
            description: "Zweite Beschreibung",
          },
        ]}
      />,
    );

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("1Erster SchrittErste Beschreibung");
    expect(items[1]).toHaveTextContent("2Zweiter SchrittZweite Beschreibung");
  });
});
