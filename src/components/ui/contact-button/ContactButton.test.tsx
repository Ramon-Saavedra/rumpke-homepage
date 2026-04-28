import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactButton from '@/components/ui/contact-button/ContactButton';

describe('ContactButton', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<ContactButton />);
      const button = screen.getByRole('link');
      expect(button).toBeInTheDocument();
    });

    it('renders with default text', () => {
      render(<ContactButton />);
      expect(screen.getByText('Kontakt')).toBeInTheDocument();
    });

    it('renders as a Next.js Link component', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      expect(link.tagName).toBe('A');
    });
  });

  describe('Default props', () => {
    it('has default href="/kontakt"', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/kontakt');
    });

    it('has default text "Kontakt"', () => {
      render(<ContactButton />);
      expect(screen.getByText('Kontakt')).toBeInTheDocument();
    });
  });

  describe('Custom props', () => {
    it('renders with custom text', () => {
      const customText = 'Kontaktieren Sie uns jetzt';
      render(<ContactButton text={customText} />);
      expect(screen.getByText(customText)).toBeInTheDocument();
      expect(screen.queryByText('Kontakt')).not.toBeInTheDocument();
    });

    it('renders with custom href', () => {
      const customHref = '/custom-contact';
      render(<ContactButton href={customHref} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', customHref);
    });

    it('applies custom className', () => {
      const customClass = 'custom-test-class';
      render(<ContactButton className={customClass} />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass(customClass);
    });

    it('renders with all custom props', () => {
      const props = {
        text: 'Custom Text',
        href: '/custom-page',
        className: 'custom-class'
      };
      render(<ContactButton {...props} />);
      const link = screen.getByRole('link');

      expect(screen.getByText(props.text)).toBeInTheDocument();
      expect(link).toHaveAttribute('href', props.href);
      expect(link).toHaveClass(props.className);
    });
  });

  describe('Styling', () => {
    it('has base styling classes', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('inline-flex');
      expect(link).toHaveClass('items-center');
      expect(link).toHaveClass('gap-1');
      expect(link).toHaveClass('px-3');
      expect(link).toHaveClass('py-1.5');
      expect(link).toHaveClass('rounded-md');
    });

    it('has background color classes', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('bg-white');
      expect(link).toHaveClass('dark:bg-primary-dark');
    });

    it('has text color classes', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      // El color de texto se aplica por hover, no por defecto
      expect(link).toHaveClass('hover:text-white');
      expect(link).toHaveClass('dark:hover:text-white');
    });

    it('has shadow and hover classes', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('shadow-sm');
      expect(link).toHaveClass('hover:bg-primary');
      expect(link).toHaveClass('hover:text-white');
      expect(link).toHaveClass('dark:hover:bg-primary-dark');
      expect(link).toHaveClass('dark:hover:text-white');
    });

    it('preserves base classes when custom className is added', () => {
      render(<ContactButton className="extra-class" />);
      const link = screen.getByRole('link');
      expect(link).toHaveClass('inline-flex');
      expect(link).toHaveClass('bg-white');
      expect(link).toHaveClass('extra-class');
    });
  });

  describe('Accessibility', () => {
    it('is accessible as a link', () => {
      render(<ContactButton />);
      const link = screen.getByRole('link', { name: /kontakt/i });
      expect(link).toBeInTheDocument();
    });

    it('has accessible text with custom text prop', () => {
      const customText = 'Contact us now';
      render(<ContactButton text={customText} />);
      const link = screen.getByRole('link', { name: customText });
      expect(link).toBeInTheDocument();
    });
  });

  describe('Props combinations', () => {
    it('works with only text prop', () => {
      render(<ContactButton text="New Text" />);
      const link = screen.getByRole('link');
      expect(screen.getByText('New Text')).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/kontakt');
    });

    it('works with only href prop', () => {
      render(<ContactButton href="/new-page" />);
      const link = screen.getByRole('link');
      expect(screen.getByText('Kontakt')).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/new-page');
    });

    it('works with only className prop', () => {
      render(<ContactButton className="test-class" />);
      const link = screen.getByRole('link');
      expect(screen.getByText('Kontakt')).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/kontakt');
      expect(link).toHaveClass('test-class');
    });

  describe('Icon', () => {
    it('renders the lucide Mail icon', () => {
      render(<ContactButton />);
      // El icono de lucide tiene class "lucide lucide-mail"
      const icon = document.querySelector('svg.lucide-mail');
      expect(icon).toBeInTheDocument();
    });
  });
  });
});
