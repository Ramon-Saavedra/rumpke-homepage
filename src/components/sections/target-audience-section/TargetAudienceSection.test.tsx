jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: {
    src?: string;
    alt?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    sizes?: string;
  }) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        className={props.className}
        loading={props.loading}
        sizes={props.sizes}
      />
    );
  },
}));

jest.mock('react-icons/io5', () => ({
  IoHomeOutline: function MockIoHomeOutline() {
    return <span data-testid="icon-home">HomeIcon</span>;
  },
  IoPersonAddOutline: function MockIoPersonAddOutline() {
    return <span data-testid="icon-person">PersonIcon</span>;
  },
  IoKeyOutline: function MockIoKeyOutline() {
    return <span data-testid="icon-key">KeyIcon</span>;
  },
}));

interface MockTitleProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
}

jest.mock('@/components/ui/title/Title', () => {
  return function MockTitle({ children, className }: MockTitleProps) {
    return <h2 className={className} data-testid="title">{children}</h2>;
  };
});

interface MockAudienceCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

jest.mock('./AudienceCard', () => {
  return function MockAudienceCard({ icon, title, text }: MockAudienceCardProps) {
    return (
      <div data-testid="audience-card">
        <div data-testid="card-icon">{icon}</div>
        <div data-testid="card-title">{title}</div>
        <div data-testid="card-text">{text}</div>
      </div>
    );
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TargetAudienceSection from './TargetAudienceSection';

describe('TargetAudienceSection', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<TargetAudienceSection />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders main title', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByText('Für wen wir da sind')).toBeInTheDocument();
    });

    it('renders description text', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByText(/Wir bieten individuelle Unterstützung/i)).toBeInTheDocument();
    });

    it('renders the main image', () => {
      render(<TargetAudienceSection />);
      const image = screen.getByAltText('Für wen wir da sind');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Image component', () => {
    it('has correct src attribute', () => {
      render(<TargetAudienceSection />);
      const image = screen.getByAltText('Für wen wir da sind');
      expect(image).toHaveAttribute('src', '/imgs/personal-service-pic.jpeg');
    });

    it('has correct alt text', () => {
      render(<TargetAudienceSection />);
      const image = screen.getByAltText('Für wen wir da sind');
      expect(image).toBeInTheDocument();
    });

    it('has lazy loading enabled', () => {
      render(<TargetAudienceSection />);
      const image = screen.getByAltText('Für wen wir da sind');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('has correct sizes attribute', () => {
      render(<TargetAudienceSection />);
      const image = screen.getByAltText('Für wen wir da sind');
      expect(image).toHaveAttribute('sizes', '(max-width: 1024px) 320px, 384px');
    });
  });

  describe('AudienceCards', () => {
    it('renders exactly 3 audience cards', () => {
      render(<TargetAudienceSection />);
      const cards = screen.getAllByTestId('audience-card');
      expect(cards).toHaveLength(3);
    });

    it('renders Eigentümer card with correct content', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByText('Eigentümer')).toBeInTheDocument();
      expect(screen.getByText(/Wir unterstützen Eigentümer beim Verkauf/i)).toBeInTheDocument();
    });

    it('renders Käufer card with correct content', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByText('Käufer')).toBeInTheDocument();
      expect(screen.getByText(/Finden Sie mit uns Ihr neues Zuhause/i)).toBeInTheDocument();
    });

    it('renders Mieter card with correct content', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByText('Mieter')).toBeInTheDocument();
      expect(screen.getByText(/Wir helfen Mietern, die passende Immobilie/i)).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders home icon for Eigentümer', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    });

    it('renders person icon for Käufer', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByTestId('icon-person')).toBeInTheDocument();
    });

    it('renders key icon for Mieter', () => {
      render(<TargetAudienceSection />);
      expect(screen.getByTestId('icon-key')).toBeInTheDocument();
    });
  });

  describe('Layout and styling', () => {
    it('has section element with correct classes', () => {
      render(<TargetAudienceSection />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full', 'overflow-hidden', 'pb-4', 'mb-12', 'rounded');
    });

    it('has background color classes', () => {
      render(<TargetAudienceSection />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('bg-bgSecondary-l', 'dark:bg-bgSecondary-d');
    });

    it('has container with correct structure', () => {
      render(<TargetAudienceSection />);
      const container = document.querySelector('.container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container', 'mx-auto');
    });

    it('has grid layout for cards and image', () => {
      render(<TargetAudienceSection />);
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('lg:grid-cols-2', 'gap-12');
    });

    it('image container has correct height', () => {
      render(<TargetAudienceSection />);
      const imageContainer = document.querySelector('.h-95');
      expect(imageContainer).toBeInTheDocument();
    });

    it('cards container has flex column layout', () => {
      render(<TargetAudienceSection />);
      const cardsContainer = document.querySelector('.flex.flex-col.h-95');
      expect(cardsContainer).toBeInTheDocument();
    });
  });

  describe('Content structure', () => {
    it('renders title with correct styling', () => {
      render(<TargetAudienceSection />);
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('py-4', 'mb-8', 'bg-secondary', 'dark:bg-secondary-dark', 'text-white', 'px-2');
    });

    it('description has correct text alignment', () => {
      render(<TargetAudienceSection />);
      const description = screen.getByText(/Wir bieten individuelle Unterstützung/i);
      expect(description.parentElement).toHaveClass('text-center', 'mb-12');
    });

    it('description has max-width constraint', () => {
      render(<TargetAudienceSection />);
      const description = screen.getByText(/Wir bieten individuelle Unterstützung/i);
      expect(description).toHaveClass('max-w-2xl', 'mx-auto');
    });
  });

  describe('Card data integrity', () => {
    it('all cards have unique titles', () => {
      render(<TargetAudienceSection />);
      const titles = [
        screen.getByText('Eigentümer'),
        screen.getByText('Käufer'),
        screen.getByText('Mieter')
      ];
      expect(titles).toHaveLength(3);
    });

    it('cards are rendered in correct order', () => {
      render(<TargetAudienceSection />);
      const cardTitles = screen.getAllByTestId('card-title');
      expect(cardTitles[0]).toHaveTextContent('Eigentümer');
      expect(cardTitles[1]).toHaveTextContent('Käufer');
      expect(cardTitles[2]).toHaveTextContent('Mieter');
    });
  });
});
