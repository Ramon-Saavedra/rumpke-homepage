jest.mock('lucide-react', () => ({
  UserCheck: () => <svg data-testid="icon-user-check" />,
  MapPin: () => <svg data-testid="icon-map-pin" />,
  Shield: () => <svg data-testid="icon-shield" />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhyChooseRumpke from './WhyChooseRumpke';

beforeAll(() => {
  global.IntersectionObserver = jest.fn().mockImplementation(
    (cb: IntersectionObserverCallback) => ({
      observe: jest.fn(() =>
        cb(
          [{ isIntersecting: false } as IntersectionObserverEntry],
          {} as IntersectionObserver
        )
      ),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    })
  );
});

describe('WhyChooseRumpke', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<WhyChooseRumpke />);
      expect(document.querySelector('section')).toBeInTheDocument();
    });

    it('has correct aria-label on section', () => {
      render(<WhyChooseRumpke />);
      expect(
        screen.getByRole('region', { name: 'Warum Rumpke Immobilien' })
      ).toBeInTheDocument();
    });

    it('renders eyebrow label', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Unsere Stärken')).toBeInTheDocument();
    });

    it('renders main heading as h2', () => {
      render(<WhyChooseRumpke />);
      expect(
        screen.getByRole('heading', { level: 2, name: 'Warum Rumpke Immobilien?' })
      ).toBeInTheDocument();
    });

    it('renders intro paragraph', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText(/Wir verbinden persönliche Nähe/)).toBeInTheDocument();
    });
  });

  describe('Feature Items', () => {
    it('renders all three feature titles as h3', () => {
      render(<WhyChooseRumpke />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      const titles = headings.map((h) => h.textContent);
      expect(titles).toContain('Persönlicher Service');
      expect(titles).toContain('Lokale Expertise');
      expect(titles).toContain('Transparenz & Fairness');
    });

    it('renders features in correct order', () => {
      render(<WhyChooseRumpke />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings[0]).toHaveTextContent('Persönlicher Service');
      expect(headings[1]).toHaveTextContent('Lokale Expertise');
      expect(headings[2]).toHaveTextContent('Transparenz & Fairness');
    });

    it('renders all three feature descriptions', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText(/stehen Sie im Mittelpunkt/)).toBeInTheDocument();
      expect(screen.getByText(/regionalen Immobilienmarkt/)).toBeInTheDocument();
      expect(screen.getByText(/Vertrauen ist die Basis/)).toBeInTheDocument();
    });

    it('renders all three icons', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByTestId('icon-user-check')).toBeInTheDocument();
      expect(screen.getByTestId('icon-map-pin')).toBeInTheDocument();
      expect(screen.getByTestId('icon-shield')).toBeInTheDocument();
    });
  });

  describe('Stats', () => {
    it('renders all three stat values', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('15+')).toBeInTheDocument();
      expect(screen.getByText('200+')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('renders all three stat labels', () => {
      render(<WhyChooseRumpke />);
      expect(screen.getByText('Jahre Erfahrung')).toBeInTheDocument();
      expect(screen.getByText('Objekte vermittelt')).toBeInTheDocument();
      expect(screen.getByText('Persönliche Betreuung')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('section has padding classes', () => {
      render(<WhyChooseRumpke />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('px-2');
    });

    it('has a grid container', () => {
      render(<WhyChooseRumpke />);
      expect(document.querySelector('.grid')).toBeInTheDocument();
    });

    it('stat cells have px-2 and text-center for mobile', () => {
      render(<WhyChooseRumpke />);
      const statCells = document.querySelectorAll('.py-8');
      statCells.forEach((cell) => {
        expect(cell).toHaveClass('px-2', 'text-center');
      });
    });
  });
});
