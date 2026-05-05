jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('react-icons/io5', () => ({
  IoLogoFacebook: () => <svg data-testid="facebook-icon" />,
  IoLogoInstagram: () => <svg data-testid="instagram-icon" />,
  IoLogoLinkedin: () => <svg data-testid="linkedin-icon" />,
  IoLogoWhatsapp: () => <svg data-testid="whatsapp-icon" />,
  IoMailOutline: () => <svg data-testid="mail-icon" />,
  IoCallOutline: () => <svg data-testid="call-icon" />,
  IoLocationOutline: () => <svg data-testid="location-icon" />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  describe('Structure', () => {
    it('renders a <footer> element', () => {
      render(<Footer />);
      expect(document.querySelector('footer')).toBeInTheDocument();
    });

    it('has no hardcoded background class', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer?.className).not.toContain('bg-third');
      expect(footer?.className).not.toContain('bg-primary-dark');
    });

    it('has top-border separator', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer?.className).toContain('border-t');
    });
  });

  describe('Brand & Description', () => {
    it('renders brand name', () => {
      render(<Footer />);
      const names = screen.getAllByText('Rumpke Immobilien');
      expect(names.length).toBeGreaterThan(0);
    });

    it('renders tagline', () => {
      render(<Footer />);
      expect(screen.getByText('Ihr vertrauensvoller Partner für Immobilien in der Region.')).toBeInTheDocument();
    });
  });

  describe('Contact info', () => {
    it('renders address line 1', () => {
      render(<Footer />);
      expect(screen.getByText(/Römerstraße 9/)).toBeInTheDocument();
    });

    it('renders city and postal code', () => {
      render(<Footer />);
      expect(screen.getByText(/40811 Lingen/)).toBeInTheDocument();
    });

    it('renders phone link', () => {
      render(<Footer />);
      const tel = screen.getByRole('link', { name: /05963/ });
      expect(tel).toHaveAttribute('href', 'tel:+4959634599970');
    });

    it('renders email link', () => {
      render(<Footer />);
      const mail = screen.getByRole('link', { name: 'info@rumpke-immobilien.de' });
      expect(mail).toHaveAttribute('href', 'mailto:info@rumpke-immobilien.de');
    });

    it('renders location icon', () => {
      render(<Footer />);
      expect(document.querySelector('[data-testid="location-icon"]')).toBeInTheDocument();
    });

    it('renders call icon', () => {
      render(<Footer />);
      expect(document.querySelector('[data-testid="call-icon"]')).toBeInTheDocument();
    });

    it('renders mail icon', () => {
      render(<Footer />);
      expect(document.querySelector('[data-testid="mail-icon"]')).toBeInTheDocument();
    });
  });

  describe('Social links', () => {
    it('renders Facebook link with target _blank', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Facebook' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders WhatsApp link', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'WhatsApp' });
      expect(link).toHaveAttribute('href', 'https://wa.me/491723244468');
    });

    it('renders Instagram link', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Instagram' });
      expect(link).toHaveAttribute('href', 'https://www.instagram.com/rumpkeimmobilien/');
    });

    it('renders LinkedIn link', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'LinkedIn' });
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/company/rumpke-immobilien');
    });
  });

  describe('Kaufen section', () => {
    it('renders section heading', () => {
      render(<Footer />);
      expect(screen.getByText('Kaufen')).toBeInTheDocument();
    });

    it('renders /kauf link', () => {
      render(<Footer />);
      const link = screen.getByRole('link', { name: 'Alle Kaufimmobilien' });
      expect(link).toHaveAttribute('href', '/kauf');
    });

    it('renders /kauf/haus link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Häuser kaufen' })).toHaveAttribute('href', '/kauf/haus');
    });

    it('renders /kauf/wohnung link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Wohnungen kaufen' })).toHaveAttribute('href', '/kauf/wohnung');
    });
  });

  describe('Mieten section', () => {
    it('renders section heading', () => {
      render(<Footer />);
      expect(screen.getByText('Mieten')).toBeInTheDocument();
    });

    it('renders /miete link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Alle Mietimmobilien' })).toHaveAttribute('href', '/miete');
    });

    it('renders /miete/haus link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Häuser mieten' })).toHaveAttribute('href', '/miete/haus');
    });

    it('renders /miete/wohnung link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Wohnungen mieten' })).toHaveAttribute('href', '/miete/wohnung');
    });
  });

  describe('Dienstleistungen section', () => {
    it('renders section heading', () => {
      render(<Footer />);
      expect(screen.getByText('Dienstleistungen')).toBeInTheDocument();
    });

    it('renders /dienstleistungen link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Alle Dienstleistungen' })).toHaveAttribute('href', '/dienstleistungen');
    });

    it('renders /dienstleistungen/immobilien-kauf link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Immobilien Kauf' })).toHaveAttribute('href', '/dienstleistungen/immobilien-kauf');
    });

    it('renders Verkauf & Vermietung link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Verkauf & Vermietung' })).toHaveAttribute('href', '/dienstleistungen/verkauf-vermietung');
    });

    it('renders /dienstleistungen/immobilienbewertung link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Immobilienbewertung' })).toHaveAttribute('href', '/dienstleistungen/immobilienbewertung');
    });
  });

  describe('Unternehmen section', () => {
    it('renders /ueber-uns link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Über uns' })).toHaveAttribute('href', '/ueber-uns');
    });

    it('renders /kontakt link', () => {
      render(<Footer />);
      const links = screen.getAllByRole('link', { name: 'Kontakt' });
      expect(links[0]).toHaveAttribute('href', '/kontakt');
    });
  });

  describe('Bottom bar', () => {
    it('renders current year in copyright', () => {
      render(<Footer />);
      const year = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    });

    it('renders Alle Rechte vorbehalten', () => {
      render(<Footer />);
      expect(screen.getByText(/Alle Rechte vorbehalten/)).toBeInTheDocument();
    });

    it('renders Impressum link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/impressum');
    });

    it('renders Datenschutz link', () => {
      render(<Footer />);
      expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute('href', '/datenschutz');
    });
  });
});
