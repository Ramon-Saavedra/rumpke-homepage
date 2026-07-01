import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroComponent from "./HeroComponent";

describe("HeroComponent", () => {
  it("renders without errors", () => {
    render(<HeroComponent />);
    expect(screen.getByText("HeroComponent")).toBeInTheDocument();
  });
});
