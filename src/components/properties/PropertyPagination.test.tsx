import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyPagination from "./PropertyPagination";
import type { Pagination } from "@/types/property-api";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    readonly children: React.ReactNode;
    readonly href: string;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

function makePagination(overrides: Partial<Pagination> = {}): Pagination {
  return {
    page: 1,
    limit: 12,
    total: 50,
    totalPages: 5,
    ...overrides,
  };
}

describe("PropertyPagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <PropertyPagination pagination={makePagination({ totalPages: 1 })} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders page links", () => {
    render(<PropertyPagination pagination={makePagination({ page: 1, totalPages: 3 })} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("highlights current page", () => {
    render(<PropertyPagination pagination={makePagination({ page: 2, totalPages: 3 })} />);
    const currentPage = screen.getByText("2");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("renders back link when not on first page", () => {
    render(<PropertyPagination pagination={makePagination({ page: 3, totalPages: 5 })} />);
    expect(screen.getByText("Zurück")).toBeInTheDocument();
  });

  it("does not render back link on first page", () => {
    render(<PropertyPagination pagination={makePagination({ page: 1, totalPages: 5 })} />);
    expect(screen.queryByText("Zurück")).not.toBeInTheDocument();
  });

  it("renders weiter link when not on last page", () => {
    render(<PropertyPagination pagination={makePagination({ page: 1, totalPages: 5 })} />);
    expect(screen.getByText("Weiter")).toBeInTheDocument();
  });

  it("does not render weiter link on last page", () => {
    render(<PropertyPagination pagination={makePagination({ page: 5, totalPages: 5 })} />);
    expect(screen.queryByText("Weiter")).not.toBeInTheDocument();
  });

  it("renders ellipsis when many pages", () => {
    render(<PropertyPagination pagination={makePagination({ page: 1, totalPages: 20 })} />);
    const ellipses = screen.getAllByText("…");
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it("has navigation aria-label", () => {
    render(<PropertyPagination pagination={makePagination({ totalPages: 5 })} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Paginierung");
  });
});
