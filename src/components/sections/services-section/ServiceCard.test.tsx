jest.mock('@/components/ui/icon-card/IconCard', () => {
  return function MockIconCard({ icon, title, text, link }: {
    icon: React.ReactNode;
    title: string;
    text: string;
    link: string;
  }) {
    return (
      <div data-testid="icon-card">
        <div data-testid="icon-container">{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <a href={link}>Link</a>
      </div>
    );
  };
});

jest.mock('lucide-react', () => ({
  Home: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="home-icon" className={className} data-stroke-width={strokeWidth} />
  ),
  Key: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="key-icon" className={className} data-stroke-width={strokeWidth} />
  ),
  Building2: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="building2-icon" className={className} data-stroke-width={strokeWidth} />
  ),
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<ServiceCard title="Test" text="Test text" link="/test" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('renders title correctly', () => {
      render(<ServiceCard title="Test Title" text="Test text" link="/test" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders text correctly', () => {
      render(<ServiceCard title="Test" text="Test description" link="/test" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders link correctly', () => {
      render(<ServiceCard title="Test" text="Text" link="/custom-link" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/custom-link');
    });

    it('renders an icon', () => {
      render(<ServiceCard title="Test" text="Text" link="/test" />);
      const iconContainer = screen.getByTestId('icon-container');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Icon Selection Logic', () => {
    it('renders Home icon for "Verkaufen" title', () => {
      render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Home icon for "verkaufen" (lowercase)', () => {
      render(<ServiceCard title="verkaufen" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Home icon for "VERKAUFEN" (uppercase)', () => {
      render(<ServiceCard title="VERKAUFEN" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Home icon for title containing "verkauf"', () => {
      render(<ServiceCard title="Immobilien Verkauf Service" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Key icon for "Kaufen" title', () => {
      render(<ServiceCard title="Kaufen" text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('renders Key icon for "kaufen" (lowercase)', () => {
      render(<ServiceCard title="kaufen" text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('renders Key icon for "KAUFEN" (uppercase)', () => {
      render(<ServiceCard title="KAUFEN" text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('renders Key icon for title containing "kauf"', () => {
      render(<ServiceCard title="Immobilien Kauf Beratung" text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('renders Building2 icon for "Vermieten" title', () => {
      render(<ServiceCard title="Vermieten" text="Text" link="/link" />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('renders Building2 icon for "vermieten" (lowercase)', () => {
      render(<ServiceCard title="vermieten" text="Text" link="/link" />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('renders Building2 icon for "VERMIETEN" (uppercase)', () => {
      render(<ServiceCard title="VERMIETEN" text="Text" link="/link" />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('renders Building2 icon for title containing "vermiet"', () => {
      render(<ServiceCard title="Wohnung Vermietung" text="Text" link="/link" />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('renders Home icon as default for unmatched title', () => {
      render(<ServiceCard title="Other Service" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Home icon for empty title', () => {
      render(<ServiceCard title="" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });
  });

  describe('Icon Styling', () => {
    it('icon has correct className', () => {
      render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      const icon = screen.getByTestId('home-icon');
      expect(icon).toHaveClass('w-6', 'h-6', 'text-white');
    });

    it('icon has correct strokeWidth', () => {
      render(<ServiceCard title="Kaufen" text="Text" link="/link" />);
      const icon = screen.getByTestId('key-icon');
      expect(icon).toHaveAttribute('data-stroke-width', '2');
    });

    it('all icons have consistent styling', () => {
      const { rerender } = render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      let icon = screen.getByTestId('home-icon');
      expect(icon).toHaveClass('w-6', 'h-6', 'text-white');
      expect(icon).toHaveAttribute('data-stroke-width', '2');

      rerender(<ServiceCard title="Kaufen" text="Text" link="/link" />);
      icon = screen.getByTestId('key-icon');
      expect(icon).toHaveClass('w-6', 'h-6', 'text-white');
      expect(icon).toHaveAttribute('data-stroke-width', '2');

      rerender(<ServiceCard title="Vermieten" text="Text" link="/link" />);
      icon = screen.getByTestId('building2-icon');
      expect(icon).toHaveClass('w-6', 'h-6', 'text-white');
      expect(icon).toHaveAttribute('data-stroke-width', '2');
    });
  });

  describe('Props Passed to IconCard', () => {
    it('passes title prop to IconCard', () => {
      render(<ServiceCard title="My Service" text="Description" link="/link" />);
      expect(screen.getByText('My Service')).toBeInTheDocument();
    });

    it('passes text prop to IconCard', () => {
      render(<ServiceCard title="Title" text="My description text" link="/link" />);
      expect(screen.getByText('My description text')).toBeInTheDocument();
    });

    it('passes link prop to IconCard', () => {
      render(<ServiceCard title="Title" text="Text" link="/my-service-link" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/my-service-link');
    });

    it('passes all props correctly together', () => {
      render(
        <ServiceCard
          title="Complete Service"
          text="Complete description"
          link="/complete-link"
        />
      );
      expect(screen.getByText('Complete Service')).toBeInTheDocument();
      expect(screen.getByText('Complete description')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/complete-link');
    });
  });

  describe('Integration with IconCard', () => {
    it('renders IconCard component', () => {
      render(<ServiceCard title="Test" text="Text" link="/test" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('icon is rendered inside IconCard', () => {
      render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      const iconCard = screen.getByTestId('icon-card');
      const icon = screen.getByTestId('home-icon');
      expect(iconCard).toContainElement(icon);
    });

    it('all content is rendered inside IconCard', () => {
      render(<ServiceCard title="Service Title" text="Service text" link="/link" />);
      const iconCard = screen.getByTestId('icon-card');
      expect(iconCard).toContainElement(screen.getByText('Service Title'));
      expect(iconCard).toContainElement(screen.getByText('Service text'));
      expect(iconCard).toContainElement(screen.getByRole('link'));
    });
  });

  describe('Edge Cases', () => {
    it('handles title with mixed case correctly', () => {
      render(<ServiceCard title="VeRkAuFeN" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('handles title with extra spaces', () => {
      render(<ServiceCard title="  Kaufen  " text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('handles title with special characters and "kauf"', () => {
      render(<ServiceCard title="Kauf & Beratung" text="Text" link="/link" />);
      expect(screen.getByTestId('key-icon')).toBeInTheDocument();
    });

    it('matches first keyword when multiple keywords present', () => {
      render(<ServiceCard title="Verkauf und Vermietung" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders correctly with very long title', () => {
      const longTitle = 'Verkaufen von Immobilien mit professioneller Beratung und Service';
      render(<ServiceCard title={longTitle} text="Text" link="/link" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders correctly with very long text', () => {
      const longText = 'Dies ist eine sehr lange Beschreibung die mehrere Zeilen umfassen kann und viele Details über den Service enthält';
      render(<ServiceCard title="Test" text={longText} link="/link" />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });
});
