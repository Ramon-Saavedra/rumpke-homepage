jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("swiper/modules", () => ({ Controller: {}, Parallax: {} }));
jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/controller", () => ({}));
jest.mock("swiper/css/parallax", () => ({}));

jest.mock("lucide-react", () => ({
  ChevronLeft: () => <svg data-testid="chevron-left" />,
  ChevronRight: () => <svg data-testid="chevron-right" />,
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TripleSlider from "./TripleSlider";

const mockProperties = [
  {
    id: "1",
    slug: "haus-1",
    title: "Haus 1",
    type: "Haus",
    price: "200.000 €",
    location: "Bawinkel",
    imageUrl: "/img/1.jpg",
  },
  {
    id: "2",
    slug: "haus-2",
    title: "Haus 2",
    type: "Wohnung",
    price: "150.000 €",
    location: "Lingen",
    imageUrl: "/img/2.jpg",
  },
];

describe("TripleSlider", () => {
  it("renders section heading", () => {
    render(<TripleSlider properties={mockProperties} />);
    expect(
      screen.getByRole("heading", { name: /ausgewählte immobilien/i }),
    ).toBeInTheDocument();
  });

  it("renders three swipers (prev, main, next)", () => {
    render(<TripleSlider properties={mockProperties} />);
    expect(screen.getAllByTestId("swiper")).toHaveLength(3);
  });

  it("renders property titles in main swiper", () => {
    render(<TripleSlider properties={mockProperties} />);
    expect(screen.getAllByText("Haus 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Haus 2").length).toBeGreaterThan(0);
  });

  it("renders navigation arrows", () => {
    render(<TripleSlider properties={mockProperties} />);
    expect(screen.getByTestId("chevron-left")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-right")).toBeInTheDocument();
  });

  it("renders property links in main swiper", () => {
    render(<TripleSlider properties={mockProperties} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href"));
    expect(hrefs).toContain("/object/haus-1");
    expect(hrefs).toContain("/object/haus-2");
  });
});
