jest.mock('lucide-react', () => ({
  Home: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="home-icon" className={className} data-stroke-width={strokeWidth} />
  ),
  Building2: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="building2-icon" className={className} data-stroke-width={strokeWidth} />
  ),
  BarChart3: ({ className, strokeWidth }: { className?: string; strokeWidth?: number }) => (
    <svg data-testid="barchart3-icon" className={className} data-stroke-width={strokeWidth} />
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

    it('renders BarChart3 icon for "Bewertungen" title', () => {
      render(<ServiceCard title="Bewertungen" text="Text" link="/link" />);
      expect(screen.getByTestId('barchart3-icon')).toBeInTheDocument();
    });

    it('renders BarChart3 icon for "bewertung" (lowercase)', () => {
      render(<ServiceCard title="bewertung" text="Text" link="/link" />);
      expect(screen.getByTestId('barchart3-icon')).toBeInTheDocument();
    });

    it('renders BarChart3 icon for title containing "bewert"', () => {
      render(<ServiceCard title="Immobilienbewertung Service" text="Text" link="/link" />);
      expect(screen.getByTestId('barchart3-icon')).toBeInTheDocument();
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
    it('renders title, text and link correctly', () => {
      render(<ServiceCard title="Test Title" text="Test description" link="/custom-link" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/custom-link');
    });

    it('renders the arrow icon', () => {
      render(<ServiceCard title="Test" text="Text" link="/test" />);
      expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-icon')).toHaveAttribute('data-stroke-width', '2');
    });

    it('uses correct icon styling classes', () => {
      render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toHaveClass('h-5', 'w-5', 'text-primary');
    });

    it('renders as a link element', () => {
      render(<ServiceCard title="Verkaufen" text="Text" link="/link" />);
      expect(screen.getByRole('link')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/link');
    });
  });

  describe('Edge Cases', () => {
    it('handles title with mixed case correctly', () => {
      render(<ServiceCard title="VeRkAuFeN" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('handles title with extra spaces', () => {
      render(<ServiceCard title="  Vermieten  " text="Text" link="/link" />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('handles title with special characters and "verkauf"', () => {
      render(<ServiceCard title="Verkauf & Beratung" text="Text" link="/link" />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
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
      render(<ServiceCard title="Test" text={longText} link="/test" />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });
});
