import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createRef } from "react";
import FloatingInput from "./FloatingInput";

describe("FloatingInput", () => {
  it("renders the label with correct text", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.getByText("Vorname")).toBeInTheDocument();
  });

  it("associates label with input via htmlFor and id", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.getByLabelText(/Vorname/i)).toBeInTheDocument();
  });

  it("shows asterisk indicator when required", () => {
    render(<FloatingInput id="test-input" label="Vorname" required />);
    const asterisk = screen.getByText("*", { selector: "span[aria-hidden]" });
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveAttribute("aria-hidden", "true");
  });

  it("does not show asterisk when not required", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("shows error message when error prop is provided", () => {
    render(
      <FloatingInput id="test-input" label="Vorname" error="Pflichtfeld" />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Pflichtfeld");
  });

  it("does not render error paragraph when no error", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("sets aria-invalid to true when error is present", () => {
    render(
      <FloatingInput id="test-input" label="Vorname" error="Pflichtfeld" />,
    );
    expect(screen.getByLabelText(/Vorname/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("sets aria-invalid to false when no error", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.getByLabelText(/Vorname/i)).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("sets aria-describedby to error id when error is present", () => {
    render(
      <FloatingInput id="test-input" label="Vorname" error="Pflichtfeld" />,
    );
    expect(screen.getByLabelText(/Vorname/i)).toHaveAttribute(
      "aria-describedby",
      "test-input-error",
    );
  });

  it("does not set aria-describedby when no error", () => {
    render(<FloatingInput id="test-input" label="Vorname" />);
    expect(screen.getByLabelText(/Vorname/i)).not.toHaveAttribute(
      "aria-describedby",
    );
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<FloatingInput id="test-input" label="Vorname" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("passes through additional html attributes", () => {
    render(
      <FloatingInput
        id="test-input"
        label="Vorname"
        type="email"
        maxLength={50}
      />,
    );
    const input = screen.getByLabelText(/Vorname/i);
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("maxLength", "50");
  });
});
