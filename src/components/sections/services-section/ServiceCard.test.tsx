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
  ArrowRight: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="arrow-icon" className={className} data-stroke-width={strokeWidth} />
  ),
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
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

  describe('Rendering and structure', () => {
    it('renders title, text, cta and link correctly', () => {
      render(<ServiceCard title="Test Title" text="Test description" link="/custom-link" />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByText('Mehr erfahren')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/custom-link');
    });

    it('renders the cta arrow icon', () => {
      render(<ServiceCard title="Test" text="Text" link="/test" />);

      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-icon')).toHaveAttribute('data-stroke-width', '2');
    });

    it('uses the updated card and icon styling classes', () => {
      const { container } = render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);

      expect(screen.getByTestId('home-icon')).toHaveClass('h-5', 'w-5', 'text-card-text-l', 'dark:text-card-text-d');

      const article = container.querySelector('article');
      expect(article).toHaveClass('border', 'border-border-l', 'bg-bg-l', 'dark:border-border-d', 'dark:bg-bg-d');
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
