

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;

jest.mock('@/components/branding/logo/RumpkeLogo', () => {
  return function MockRumpkeLogo() {
    return <div data-testid="rumpke-logo">RumpkeLogo</div>;
  };
});

jest.mock('@/components/ui/contact-button/ContactButton', () => {
  return function MockContactButton() {
    return <button data-testid="contact-button">Contact</button>;
  };
});

interface MockTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  variant?: string;
  size?: string;
  align?: string;
  className?: string;
  subtitleClassName?: string;
}

jest.mock('@/components/ui/title/Title', () => {
  return function MockTitle({ children, subtitle, className }: MockTitleProps) {
    return (
      <div data-testid="title" className={className}>
        <h1>{children}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroVideo from '@/components/hero/HeroVideo';

describe('HeroVideo', () => {
  const defaultProps = {
    videoSrc: '/media/test-video.mp4',
    poster: '/imgs/test-poster.jpg',
    alt: 'Test video description',
  };

  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<HeroVideo {...defaultProps} />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders the video element with correct attributes', () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector('video');

      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', defaultProps.videoSrc);
      expect(video).toHaveAttribute('poster', defaultProps.poster);
      expect(video).toHaveAttribute('autoplay');
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('playsinline');
    });

    it('renders video without poster when not provided', () => {
      const propsWithoutPoster = {
        videoSrc: defaultProps.videoSrc,
        alt: defaultProps.alt,
      };
      render(<HeroVideo {...propsWithoutPoster} />);
      const video = document.querySelector('video');

      expect(video).toBeInTheDocument();
      expect(video).not.toHaveAttribute('poster');
    });

    it('displays the RumpkeLogo component', () => {
      render(<HeroVideo {...defaultProps} />);
      expect(screen.getByTestId('rumpke-logo')).toBeInTheDocument();
    });

    it('displays the Title component with correct text', () => {
      render(<HeroVideo {...defaultProps} />);
      const title = screen.getByTestId('title');

      expect(title).toBeInTheDocument();
      expect(screen.getByText('Rumpke Immobilien')).toBeInTheDocument();
    });

    it('displays the ContactButton component', () => {
      render(<HeroVideo {...defaultProps} />);
      expect(screen.getByTestId('contact-button')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('video has aria-label attribute', () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector('video');

      expect(video).toHaveAttribute('aria-label', defaultProps.alt);
    });

    it('section element exists and contains video', () => {
      render(<HeroVideo {...defaultProps} />);
      const section = document.querySelector('section');
      const video = document.querySelector('video');

      expect(section).toBeInTheDocument();
      expect(section).toContainElement(video);
    });
  });

  describe('Layout', () => {
    it('applies correct CSS classes to video element', () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector('video');

      expect(video).toHaveClass('w-full', 'object-cover');
    });

    it('logo container has correct positioning classes', () => {
      render(<HeroVideo {...defaultProps} />);
      const logoContainer = screen.getByTestId('rumpke-logo').parentElement;

      expect(logoContainer).toHaveClass('absolute', 'top-0', 'z-10');
    });

    it('title container has correct positioning classes', () => {
      render(<HeroVideo {...defaultProps} />);
      const titleContainer = screen.getByTestId('title').parentElement;

      expect(titleContainer).toHaveClass('absolute', 'inset-0', 'z-20');
    });

    it('contact button container has correct positioning classes', () => {
      render(<HeroVideo {...defaultProps} />);
      const contactContainer = screen.getByTestId('contact-button').parentElement;

      expect(contactContainer).toHaveClass('absolute', 'bottom-0', 'right-0', 'z-20');
    });
  });

  describe('Props handling', () => {
    it('handles different videoSrc values', () => {
      const customSrc = '/media/custom-video.webm';
      render(<HeroVideo {...defaultProps} videoSrc={customSrc} />);
      const video = document.querySelector('video');

      expect(video).toHaveAttribute('src', customSrc);
    });

    it('handles different alt text values', () => {
      const customAlt = 'Custom video description for accessibility';
      render(<HeroVideo {...defaultProps} alt={customAlt} />);
      const video = document.querySelector('video');

      expect(video).toHaveAttribute('aria-label', customAlt);
    });

    it('handles different poster values', () => {
      const customPoster = '/imgs/custom-poster.webp';
      render(<HeroVideo {...defaultProps} poster={customPoster} />);
      const video = document.querySelector('video');

      expect(video).toHaveAttribute('poster', customPoster);
    });
  });

  describe('Performance optimization', () => {
    it('sets up IntersectionObserver on mount', () => {
      render(<HeroVideo {...defaultProps} />);

      expect(mockIntersectionObserver).toHaveBeenCalled();
    });

    it('observes the video element', () => {
      const observeMock = jest.fn();
      mockIntersectionObserver.mockReturnValueOnce({
        observe: observeMock,
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      });

      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector('video');

      expect(observeMock).toHaveBeenCalledWith(video);
    });

    it('video element has ref attached', () => {
      render(<HeroVideo {...defaultProps} />);
      const video = document.querySelector('video');

      expect(video).toBeInTheDocument();
    });
  });
});
