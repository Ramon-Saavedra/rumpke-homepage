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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AudienceCard from './AudienceCard';

const mockIcon = <svg data-testid="mock-icon" />;

describe('AudienceCard', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Test text" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('renders title correctly', () => {
      render(<AudienceCard icon={mockIcon} title="Test Title" text="Test text" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders text correctly', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" />);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders link with default href', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/kontakt');
    });

    it('renders link with custom href', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" linkHref="/custom-link" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/custom-link');
    });
  });

  describe('Props', () => {
    it('accepts icon prop', () => {
      const customIcon = <svg data-testid="custom-icon" aria-label="Custom" />;
      render(<AudienceCard icon={customIcon} title="Title" text="Text" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('accepts title prop', () => {
      render(<AudienceCard icon={mockIcon} title="My Title" text="Text" />);
      expect(screen.getByText('My Title')).toBeInTheDocument();
    });

    it('accepts text prop', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="My description" />);
      expect(screen.getByText('My description')).toBeInTheDocument();
    });

    it('accepts optional linkHref prop', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Text" linkHref="/custom" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/custom');
    });

    it('uses default linkHref when not provided', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Text" />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/kontakt');
    });
  });

  describe('Default LinkHref Behavior', () => {
    it('defaults to /kontakt when linkHref not specified', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/kontakt');
    });

    it('can override default linkHref', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" linkHref="/test" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    });

    it('accepts root path as linkHref', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" linkHref="/" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    it('accepts nested path as linkHref', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" linkHref="/services/details" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/services/details');
    });
  });

  describe('Props Passed to IconCard', () => {
    it('passes icon prop to IconCard', () => {
      const testIcon = <svg data-testid="test-icon" />;
      render(<AudienceCard icon={testIcon} title="Title" text="Text" />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('passes title prop to IconCard', () => {
      render(<AudienceCard icon={mockIcon} title="Passed Title" text="Text" />);
      expect(screen.getByText('Passed Title')).toBeInTheDocument();
    });

    it('passes text prop to IconCard', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Passed text" />);
      expect(screen.getByText('Passed text')).toBeInTheDocument();
    });

    it('passes linkHref prop as link to IconCard', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Text" linkHref="/passed-link" />);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/passed-link');
    });

    it('passes all props correctly together', () => {
      const icon = <svg data-testid="complete-icon" />;
      render(
        <AudienceCard
          icon={icon}
          title="Complete Title"
          text="Complete description"
          linkHref="/complete"
        />
      );
      expect(screen.getByTestId('complete-icon')).toBeInTheDocument();
      expect(screen.getByText('Complete Title')).toBeInTheDocument();
      expect(screen.getByText('Complete description')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/complete');
    });
  });

  describe('Integration with IconCard', () => {
    it('renders IconCard component', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('icon is rendered inside IconCard', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Text" />);
      const iconCard = screen.getByTestId('icon-card');
      const icon = screen.getByTestId('mock-icon');
      expect(iconCard).toContainElement(icon);
    });

    it('all content is rendered inside IconCard', () => {
      render(<AudienceCard icon={mockIcon} title="Card Title" text="Card text" />);
      const iconCard = screen.getByTestId('icon-card');
      expect(iconCard).toContainElement(screen.getByText('Card Title'));
      expect(iconCard).toContainElement(screen.getByText('Card text'));
      expect(iconCard).toContainElement(screen.getByRole('link'));
    });
  });

  describe('Different Icon Types', () => {
    it('renders with React Icons component', () => {
      const reactIcon = <svg data-testid="react-icon" className="icon-class" />;
      render(<AudienceCard icon={reactIcon} title="Title" text="Text" />);
      expect(screen.getByTestId('react-icon')).toBeInTheDocument();
    });

    it('renders with Lucide icon component', () => {
      const lucideIcon = <svg data-testid="lucide-icon" className="lucide" />;
      render(<AudienceCard icon={lucideIcon} title="Title" text="Text" />);
      expect(screen.getByTestId('lucide-icon')).toBeInTheDocument();
    });

    it('renders with custom SVG', () => {
      const customSvg = (
        <svg data-testid="custom-svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
        </svg>
      );
      render(<AudienceCard icon={customSvg} title="Title" text="Text" />);
      expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
    });
  });

  describe('Content Variations', () => {
    it('renders with short title', () => {
      render(<AudienceCard icon={mockIcon} title="Test" text="Description" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders with long title', () => {
      const longTitle = 'This is a very long title that contains multiple words and describes something';
      render(<AudienceCard icon={mockIcon} title={longTitle} text="Text" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders with short text', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Short" />);
      expect(screen.getByText('Short')).toBeInTheDocument();
    });

    it('renders with long text', () => {
      const longText = 'This is a very long description that explains in detail what this audience card is about and provides comprehensive information.';
      render(<AudienceCard icon={mockIcon} title="Title" text={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('renders with German umlauts in title', () => {
      render(<AudienceCard icon={mockIcon} title="Eigentümer" text="Text" />);
      expect(screen.getByText('Eigentümer')).toBeInTheDocument();
    });

    it('renders with German umlauts in text', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Für Käufer und Mieter" />);
      expect(screen.getByText('Für Käufer und Mieter')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty string in title', () => {
      render(<AudienceCard icon={mockIcon} title="" text="Text" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('handles empty string in text', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="" />);
      expect(screen.getByTestId('icon-card')).toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      render(<AudienceCard icon={mockIcon} title="Title & More" text="Text" />);
      expect(screen.getByText('Title & More')).toBeInTheDocument();
    });

    it('handles special characters in text', () => {
      render(<AudienceCard icon={mockIcon} title="Title" text="Text with & special <> chars" />);
      expect(screen.getByText('Text with & special <> chars')).toBeInTheDocument();
    });

    it('handles title with line breaks', () => {
      render(<AudienceCard icon={mockIcon} title="Title\nWith\nBreaks" text="Text" />);
      expect(screen.getByText(/Title.*With.*Breaks/)).toBeInTheDocument();
    });
  });
});
