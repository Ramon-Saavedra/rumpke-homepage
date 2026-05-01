jest.mock('lucide-react', () => ({
  Home: () => <svg data-testid="home-icon" />,
  Building2: () => <svg data-testid="building2-icon" />,
  BarChart3: () => <svg data-testid="barchart3-icon" />,
  ArrowRight: () => <svg data-testid="arrow-icon" />,
}));

import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicesSection from './ServicesSection';

const getServiceLink = (href: string) => {
  const links = screen.getAllByRole('link');
  return links.find((link) => link.getAttribute('href') === href);
};

describe('ServicesSection', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders main title', () => {
      render(<ServicesSection />);
      expect(screen.getByRole('heading', { level: 2, name: 'Unsere Leistungen' })).toBeInTheDocument();
    });

    it('renders eyebrow label', () => {
      render(<ServicesSection />);
      expect(screen.getByText('Was wir bieten')).toBeInTheDocument();
    });

    it('renders exactly 3 service cards', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });

    it('does not render the old service image', () => {
      render(<ServicesSection />);
      expect(screen.queryByAltText('Rumpke Immobilien Dienstleistungen')).not.toBeInTheDocument();
    });
  });

  describe('Service Cards Content', () => {
    it('renders "Verkaufen" card with correct content', () => {
      render(<ServicesSection />);
      const verkaufenLink = getServiceLink('/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLink).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Verkaufen' })).toBeInTheDocument();
      expect(within(verkaufenLink as HTMLElement).getByText(/optimalen Verkaufspreis/)).toBeInTheDocument();
    });

    it('renders "Vermieten" card with correct content', () => {
      render(<ServicesSection />);
      const cards = screen.getAllByRole('link');
      const vermietenCard = cards.find((card) =>
        within(card).queryByRole('heading', { level: 3, name: 'Vermieten' })
      );
      expect(vermietenCard).toBeInTheDocument();
      expect(within(vermietenCard as HTMLElement).getByText(/zuverlässige Mieter/)).toBeInTheDocument();
    });

    it('renders "Bewertungen" card with correct content', () => {
      render(<ServicesSection />);
      const bewertungenLink = getServiceLink('/dienstleistungen/immobilienbewertung');
      expect(bewertungenLink).toBeInTheDocument();
      expect(within(bewertungenLink as HTMLElement).getByRole('heading', { level: 3, name: 'Bewertungen' })).toBeInTheDocument();
      expect(within(bewertungenLink as HTMLElement).getByText(/Immobilienbewertung ist die Basis/)).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders "Verkaufen" link with correct href', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const verkaufenLinks = links.filter((l) => l.getAttribute('href') === '/dienstleistungen/verkauf-vermietung');
      expect(verkaufenLinks.length).toBeGreaterThanOrEqual(1);
    });

    it('renders "Bewertungen" link with correct href', () => {
      render(<ServicesSection />);
      const bewertungenLink = getServiceLink('/dienstleistungen/immobilienbewertung');
      expect(bewertungenLink).toBeInTheDocument();
      expect(bewertungenLink).toHaveAttribute('href', '/dienstleistungen/immobilienbewertung');
    });

    it('renders exactly 3 navigation links', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });

    it('all service links point to /dienstleistungen routes', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link.getAttribute('href')).toMatch(/^\/dienstleistungen\//);
      });
    });
  });

  describe('Icons', () => {
    it('renders Home icon for "Verkaufen" service', () => {
      render(<ServicesSection />);
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });

    it('renders Building2 icon for "Vermieten" service', () => {
      render(<ServicesSection />);
      expect(screen.getByTestId('building2-icon')).toBeInTheDocument();
    });

    it('renders BarChart3 icon for "Bewertungen" service', () => {
      render(<ServicesSection />);
      expect(screen.getByTestId('barchart3-icon')).toBeInTheDocument();
    });
  });

  describe('Image', () => {
    it('does not render any image in the redesigned section', () => {
      render(<ServicesSection />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('section has correct styling classes', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      expect(section).toHaveClass('w-full', 'mb-12');
    });

    it('renders all service titles in correct order', () => {
      render(<ServicesSection />);
      const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
      expect(titles).toEqual(['Verkaufen', 'Vermieten', 'Bewertungen']);
    });

    it('renders services in a bordered list container', () => {
      render(<ServicesSection />);
      const section = document.querySelector('section');
      const container = section?.querySelector('div:last-child');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('border-t');
    });
  });

  describe('Service Data Validation', () => {
    it('all service links have unique titles', () => {
      render(<ServicesSection />);
      const links = screen.getAllByRole('link');
      const titles = links.map((link) => {
        const heading = link.querySelector('h3');
        return heading?.textContent;
      });
      expect(titles).toEqual(['Verkaufen', 'Vermieten', 'Bewertungen']);
    });

    it('services are rendered in the defined order', () => {
      render(<ServicesSection />);
      const order = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
      expect(order).toEqual(['Verkaufen', 'Vermieten', 'Bewertungen']);
    });
  });
});
