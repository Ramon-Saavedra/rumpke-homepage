import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LegalDocumentLayout, { LegalSection } from "./LegalDocumentLayout";

const defaultProps = {
  eyebrow: "Rechtliches",
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG",
  effectiveDate: "01.01.2024",
  readingTime: "2 Minuten",
  toc: [
    { id: "section-1", label: "Abschnitt 1" },
    { id: "section-2", label: "Abschnitt 2" },
  ],
};

describe("LegalDocumentLayout", () => {
  it("renders title as h1", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(
      screen.getByRole("heading", { level: 1, name: "Impressum" }),
    ).toBeInTheDocument();
  });

  it("renders eyebrow text", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByText("Rechtliches")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByText("Angaben gemäß § 5 TMG")).toBeInTheDocument();
  });

  it("renders effectiveDate", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByText("01.01.2024")).toBeInTheDocument();
  });

  it("renders readingTime", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByText("2 Minuten")).toBeInTheDocument();
  });

  it("renders TOC anchor links with correct hrefs", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByRole("link", { name: /abschnitt 1/i })).toHaveAttribute(
      "href",
      "#section-1",
    );
    expect(screen.getByRole("link", { name: /abschnitt 2/i })).toHaveAttribute(
      "href",
      "#section-2",
    );
  });

  it("renders children content", () => {
    render(
      <LegalDocumentLayout {...defaultProps}>
        <p>My Content</p>
      </LegalDocumentLayout>,
    );
    expect(screen.getByText("My Content")).toBeInTheDocument();
  });
});

describe("LegalSection", () => {
  it("renders title as h2", () => {
    render(
      <LegalSection id="test" title="Test Section">
        <p>Body</p>
      </LegalSection>,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Test Section" }),
    ).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <LegalSection id="test" title="Title" description="Section desc">
        <p>Body</p>
      </LegalSection>,
    );
    expect(screen.getByText("Section desc")).toBeInTheDocument();
  });

  it("does not render description paragraph when not provided", () => {
    const { container } = render(
      <LegalSection id="test" title="Title">
        <p>Body</p>
      </LegalSection>,
    );
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("renders children", () => {
    render(
      <LegalSection id="test" title="Title">
        <p>Body text</p>
      </LegalSection>,
    );
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("sets correct id on section element", () => {
    const { container } = render(
      <LegalSection id="my-section" title="Title">
        <p>Body</p>
      </LegalSection>,
    );
    expect(container.querySelector("section")).toHaveAttribute(
      "id",
      "my-section",
    );
  });

  it("sets aria-labelledby matching the heading id", () => {
    const { container } = render(
      <LegalSection id="my-section" title="Title">
        <p>Body</p>
      </LegalSection>,
    );
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "my-section-title");
  });
});
