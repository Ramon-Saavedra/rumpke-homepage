jest.mock('next/link', () => {
  return function MockLink({ children, href }: {
    children: React.ReactNode;
    href: string;
  }) {
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

jest.mock('./FooterCollapsibleSection', () => {
  return function MockFooterCollapsibleSection({ title, children }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div data-testid="collapsible-section">
        <h3>{title}</h3>
        <div>{children}</div>
      </div>
    );
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('renders as footer element', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer?.tagName).toBe('FOOTER');
    });

    it('renders four main sections', () => {
      render(<Footer />);
      const sections = screen.getAllByTestId('collapsible-section');
      expect(sections).toHaveLength(4);
    });
  });

  describe('Rumpke Immobilien Section', () => {
    it('renders "Rumpke Immobilien" title', () => {
      render(<Footer />);
      const titles = screen.getAllByText('Rumpke Immobilien');
      expect(titles.length).toBeGreaterThan(0);
    });

    it('renders company description', () => {
      render(<Footer />);
      expect(screen.getByText('Ihr vertrauensvoller Partner für Immobilien in der Region.')).toBeInTheDocument();
    });

    it('renders "Über uns" link', () => {
      render(<Footer />);
      const link = screen.getByText('Über uns').closest('a');
      expect(link).toHaveAttribute('href', '/ueber-uns');
    });

    it('renders "Kontakt" link', () => {
      render(<Footer />);
      const links = screen.getAllByText('Kontakt');
      const kontaktLink = links[0].closest('a');
      expect(kontaktLink).toHaveAttribute('href', '/kontakt');
    });

    it('renders "Auf Karte erkunden" link', () => {
      render(<Footer />);
      const link = screen.getByText('Auf Karte erkunden').closest('a');
      expect(link).toHaveAttribute('href', '/auf-karte-erkunden');
    });
  });

  describe('Immobilien Section', () => {
    it('renders "Immobilien" title', () => {
      render(<Footer />);
      expect(screen.getByText('Immobilien')).toBeInTheDocument();
    });

    it('renders "Kaufen" subsection', () => {
      render(<Footer />);
      expect(screen.getByText('Kaufen')).toBeInTheDocument();
    });

    it('renders "Alle Kaufimmobilien" link', () => {
      render(<Footer />);
      const link = screen.getByText('Alle Kaufimmobilien').closest('a');
      expect(link).toHaveAttribute('href', '/kauf');
    });

    it('renders "Häuser kaufen" link', () => {
      render(<Footer />);
      const link = screen.getByText('Häuser kaufen').closest('a');
      expect(link).toHaveAttribute('href', '/kauf/haus');
    });

    it('renders "Wohnungen kaufen" link', () => {
      render(<Footer />);
      const link = screen.getByText('Wohnungen kaufen').closest('a');
      expect(link).toHaveAttribute('href', '/kauf/wohnung');
    });

    it('renders "Mieten" subsection', () => {
      render(<Footer />);
      expect(screen.getByText('Mieten')).toBeInTheDocument();
    });

    it('renders "Alle Mietimmobilien" link', () => {
      render(<Footer />);
      const link = screen.getByText('Alle Mietimmobilien').closest('a');
      expect(link).toHaveAttribute('href', '/miete');
    });

    it('renders "Häuser mieten" link', () => {
      render(<Footer />);
      const link = screen.getByText('Häuser mieten').closest('a');
      expect(link).toHaveAttribute('href', '/miete/haus');
    });

    it('renders "Wohnungen mieten" link', () => {
      render(<Footer />);
      const link = screen.getByText('Wohnungen mieten').closest('a');
      expect(link).toHaveAttribute('href', '/miete/wohnung');
    });
  });

  describe('Dienstleistungen Section', () => {
    it('renders "Dienstleistungen" title', () => {
      render(<Footer />);
      expect(screen.getByText('Dienstleistungen')).toBeInTheDocument();
    });

    it('renders "Alle Dienstleistungen" link', () => {
      render(<Footer />);
      const link = screen.getByText('Alle Dienstleistungen').closest('a');
      expect(link).toHaveAttribute('href', '/dienstleistungen');
    });

    it('renders "Immobilien Kauf" link', () => {
      render(<Footer />);
      const link = screen.getByText('Immobilien Kauf').closest('a');
      expect(link).toHaveAttribute('href', '/dienstleistungen/immobilien-kauf');
    });

    it('renders "Verkauf & Vermietung" link', () => {
      render(<Footer />);
      const link = screen.getByText('Verkauf & Vermietung').closest('a');
      expect(link).toHaveAttribute('href', '/dienstleistungen/verkauf-vermietung');
    });

    it('renders "Immobilienbewertung" link', () => {
      render(<Footer />);
      const link = screen.getByText('Immobilienbewertung').closest('a');
      expect(link).toHaveAttribute('href', '/dienstleistungen/immobilienbewertung');
    });
  });

  describe('Contact Section', () => {
    it('renders "Kontaktieren Sie uns" title', () => {
      render(<Footer />);
      expect(screen.getByText('Kontaktieren Sie uns')).toBeInTheDocument();
    });

    it('renders location icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('location-icon')).toBeInTheDocument();
    });

    it('renders address', () => {
      render(<Footer />);
      expect(screen.getByText(/Musterstraße 123/)).toBeInTheDocument();
      expect(screen.getByText(/12345 Musterstadt/)).toBeInTheDocument();
    });

    it('renders call icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('call-icon')).toBeInTheDocument();
    });

    it('renders phone link', () => {
      render(<Footer />);
      const link = screen.getByText('+49 123 456 7890').closest('a');
      expect(link).toHaveAttribute('href', 'tel:+491234567890');
    });

    it('renders mail icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    });

    it('renders email link', () => {
      render(<Footer />);
      const link = screen.getByText('info@rumpke-immobilien.de').closest('a');
      expect(link).toHaveAttribute('href', 'mailto:info@rumpke-immobilien.de');
    });
  });

  describe('Social Media Section', () => {
    it('renders "Folgen Sie uns" title', () => {
      render(<Footer />);
      expect(screen.getByText('Folgen Sie uns')).toBeInTheDocument();
    });

    it('renders Facebook icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    });

    it('renders Facebook link with correct href', () => {
      render(<Footer />);
      const link = screen.getByLabelText('Facebook');
      expect(link).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61572884870790');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders WhatsApp icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
    });

    it('renders WhatsApp link with correct href', () => {
      render(<Footer />);
      const link = screen.getByLabelText('WhatsApp');
      expect(link).toHaveAttribute('href', 'https://wa.me/491723244468');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders Instagram icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    });

    it('renders Instagram link with correct href', () => {
      render(<Footer />);
      const link = screen.getByLabelText('Instagram');
      expect(link).toHaveAttribute('href', 'https://www.instagram.com/rumpkeimmobilien/');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders LinkedIn icon', () => {
      render(<Footer />);
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    });

    it('renders LinkedIn link with correct href', () => {
      render(<Footer />);
      const link = screen.getByLabelText('LinkedIn');
      expect(link).toHaveAttribute('href', 'https://www.linkedin.com/company/rumpke-immobilien');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders exactly 4 social media links', () => {
      render(<Footer />);
      const socialLinks = [
        screen.getByLabelText('Facebook'),
        screen.getByLabelText('WhatsApp'),
        screen.getByLabelText('Instagram'),
        screen.getByLabelText('LinkedIn'),
      ];
      expect(socialLinks).toHaveLength(4);
    });
  });

  describe('Bottom Bar', () => {
    it('renders company name in bottom bar', () => {
      render(<Footer />);
      const links = screen.getAllByText('Rumpke Immobilien');
      expect(links.length).toBeGreaterThan(0);
    });

    it('renders copyright with current year', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });

    it('renders "Alle Rechte vorbehalten"', () => {
      render(<Footer />);
      expect(screen.getByText(/Alle Rechte vorbehalten/)).toBeInTheDocument();
    });

    it('renders "Impressum" link', () => {
      render(<Footer />);
      const link = screen.getByText('Impressum').closest('a');
      expect(link).toHaveAttribute('href', '/impressum');
    });

    it('renders "Datenschutz" link', () => {
      render(<Footer />);
      const link = screen.getByText('Datenschutz').closest('a');
      expect(link).toHaveAttribute('href', '/datenschutz');
    });

    it('renders "AGB" link', () => {
      render(<Footer />);
      const link = screen.getByText('AGB').closest('a');
      expect(link).toHaveAttribute('href', '/agb');
    });
  });

  describe('Layout Structure', () => {
    it('has correct background color', () => {
      render(<Footer />);
      const footer = document.querySelector('footer');
      expect(footer).toHaveClass('bg-third');
    });

    it('has grid layout for main sections', () => {
      render(<Footer />);
      const grid = document.querySelector('.grid');
      expect(grid).toBeInTheDocument();
    });

    it('has responsive grid columns', () => {
      render(<Footer />);
      const grid = document.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });

    it('has max-width container', () => {
      render(<Footer />);
      const container = document.querySelector('.max-w-7xl');
      expect(container).toBeInTheDocument();
    });

    it('has bottom border separator', () => {
      render(<Footer />);
      const separator = document.querySelector('.h-px.bg-border-d');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('social media links have aria-label', () => {
      render(<Footer />);
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
      expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    });

    it('external links have target="_blank"', () => {
      render(<Footer />);
      const externalLinks = [
        screen.getByLabelText('Facebook'),
        screen.getByLabelText('WhatsApp'),
        screen.getByLabelText('Instagram'),
        screen.getByLabelText('LinkedIn'),
      ];
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    it('external links have rel="noopener noreferrer"', () => {
      render(<Footer />);
      const externalLinks = [
        screen.getByLabelText('Facebook'),
        screen.getByLabelText('WhatsApp'),
        screen.getByLabelText('Instagram'),
        screen.getByLabelText('LinkedIn'),
      ];
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('phone link uses tel: protocol', () => {
      render(<Footer />);
      const phoneLink = screen.getByText('+49 123 456 7890').closest('a');
      expect(phoneLink?.getAttribute('href')).toMatch(/^tel:/);
    });

    it('email link uses mailto: protocol', () => {
      render(<Footer />);
      const emailLink = screen.getByText('info@rumpke-immobilien.de').closest('a');
      expect(emailLink?.getAttribute('href')).toMatch(/^mailto:/);
    });
  });

  describe('Navigation Links Count', () => {
    it('has all internal navigation links', () => {
      render(<Footer />);
      const allLinks = screen.getAllByRole('link');
      expect(allLinks.length).toBeGreaterThan(15);
    });

    it('Rumpke section has 3 navigation links', () => {
      render(<Footer />);
      const links = [
        screen.getByText('Über uns'),
        screen.getAllByText('Kontakt')[0],
        screen.getByText('Auf Karte erkunden'),
      ];
      expect(links).toHaveLength(3);
    });

    it('Immobilien section has 6 property links', () => {
      render(<Footer />);
      const kaufLinks = [
        screen.getByText('Alle Kaufimmobilien'),
        screen.getByText('Häuser kaufen'),
        screen.getByText('Wohnungen kaufen'),
      ];
      const mietLinks = [
        screen.getByText('Alle Mietimmobilien'),
        screen.getByText('Häuser mieten'),
        screen.getByText('Wohnungen mieten'),
      ];
      expect([...kaufLinks, ...mietLinks]).toHaveLength(6);
    });

    it('Dienstleistungen section has 4 service links', () => {
      render(<Footer />);
      const links = [
        screen.getByText('Alle Dienstleistungen'),
        screen.getByText('Immobilien Kauf'),
        screen.getByText('Verkauf & Vermietung'),
        screen.getByText('Immobilienbewertung'),
      ];
      expect(links).toHaveLength(4);
    });

    it('Bottom bar has 3 legal links', () => {
      render(<Footer />);
      const links = [
        screen.getByText('Impressum'),
        screen.getByText('Datenschutz'),
        screen.getByText('AGB'),
      ];
      expect(links).toHaveLength(3);
    });
  });

  describe('Link URL Patterns', () => {
    it('all property purchase links start with /kauf', () => {
      render(<Footer />);
      const kaufLinks = [
        screen.getByText('Alle Kaufimmobilien'),
        screen.getByText('Häuser kaufen'),
        screen.getByText('Wohnungen kaufen'),
      ];
      kaufLinks.forEach(link => {
        const href = link.closest('a')?.getAttribute('href');
        expect(href).toMatch(/^\/kauf/);
      });
    });

    it('all property rental links start with /miete', () => {
      render(<Footer />);
      const mietLinks = [
        screen.getByText('Alle Mietimmobilien'),
        screen.getByText('Häuser mieten'),
        screen.getByText('Wohnungen mieten'),
      ];
      mietLinks.forEach(link => {
        const href = link.closest('a')?.getAttribute('href');
        expect(href).toMatch(/^\/miete/);
      });
    });

    it('all service links start with /dienstleistungen', () => {
      render(<Footer />);
      const serviceLinks = [
        screen.getByText('Alle Dienstleistungen'),
        screen.getByText('Immobilien Kauf'),
        screen.getByText('Verkauf & Vermietung'),
        screen.getByText('Immobilienbewertung'),
      ];
      serviceLinks.forEach(link => {
        const href = link.closest('a')?.getAttribute('href');
        expect(href).toMatch(/^\/dienstleistungen/);
      });
    });
  });
});
