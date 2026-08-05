// NOTE: Next.js <Link> also constructs an IntersectionObserver (for prefetch),
// so we share a single observe mock across every observer created in a render
// and assert against it, rather than relying on construction order.
const observeMock = jest.fn();
const mockIntersectionObserver = jest.fn(() => ({
  observe: observeMock,
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
window.IntersectionObserver =
  mockIntersectionObserver as unknown as typeof IntersectionObserver;

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroVideo from "@/components/hero/HeroVideo";

describe("HeroVideo", () => {
  const defaultProps = {
    videoSrc: "/media/test-video.mp4",
    poster: "/imgs/test-poster.jpg",
    alt: "Test video description",
  };

  describe("Rendering", () => {
    it("renders the hero section with the site-hero id", () => {
      render(<HeroVideo {...defaultProps} />);
      const section = document.querySelector("section#site-hero");
      expect(section).toBeInTheDocument();
    });

    it("renders the video element with correct attributes", () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector("video");

      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute("src", defaultProps.videoSrc);
      expect(video).toHaveAttribute("poster", defaultProps.poster);
      expect(video).not.toHaveAttribute("autoplay");
      expect(video).toHaveAttribute("loop");
      expect(video).toHaveAttribute("playsinline");
    });

    it("renders video without poster when not provided", () => {
      const { poster, ...propsWithoutPoster } = defaultProps;
      void poster;
      render(<HeroVideo {...propsWithoutPoster} />);
      const video = document.querySelector("video");

      expect(video).toBeInTheDocument();
      expect(video).not.toHaveAttribute("poster");
    });

    it("displays the headline and supporting sentence", () => {
      render(<HeroVideo {...defaultProps} />);
      expect(screen.getByText("Mehr als nur vier Wände.")).toBeInTheDocument();
      expect(
        screen.getByText(/Wir begleiten Menschen beim Kauf/i),
      ).toBeInTheDocument();
    });

    it("renders the two CTAs with the correct routes", () => {
      render(<HeroVideo {...defaultProps} />);
      const primary = screen.getByText("Immobilien entdecken").closest("a");
      const secondary = screen.getByText("Immobilie bewerten").closest("a");

      expect(primary).toHaveAttribute("href", "/kauf");
      expect(secondary).toHaveAttribute(
        "href",
        "/dienstleistungen/immobilienbewertung",
      );
    });
  });

  describe("Accessibility", () => {
    it("video has aria-label attribute", () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector("video");
      expect(video).toHaveAttribute("aria-label", defaultProps.alt);
    });
  });

  describe("Performance optimization", () => {
    it("sets up IntersectionObserver on mount", () => {
      render(<HeroVideo {...defaultProps} />);
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it("observes the video element", () => {
      const { container } = render(<HeroVideo {...defaultProps} />);
      const video = container.querySelector("video");
      expect(observeMock.mock.calls.some((call) => call[0] === video)).toBe(
        true,
      );
    });

    it("pauses when reduced motion becomes preferred", () => {
      let matches = false;
      let onChange: (() => void) | undefined;
      const matchMedia = jest.spyOn(window, "matchMedia").mockImplementation(
        (query) =>
          ({
            get matches() {
              return matches;
            },
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: (_type: string, listener: EventListener) => {
              onChange = () => listener(new Event("change"));
            },
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }) as MediaQueryList,
      );
      const play = jest
        .spyOn(HTMLMediaElement.prototype, "play")
        .mockResolvedValue();
      const pause = jest
        .spyOn(HTMLMediaElement.prototype, "pause")
        .mockImplementation(() => {});
      render(<HeroVideo {...defaultProps} />);

      matches = true;
      onChange?.();
      expect(pause).toHaveBeenCalled();

      play.mockRestore();
      pause.mockRestore();
      matchMedia.mockRestore();
    });
  });
});
