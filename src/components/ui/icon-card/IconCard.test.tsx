jest.mock('next/link', () => {
  return function MockLink({ children, href, className }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconCard from './IconCard';

const mockIcon = <svg data-testid="mock-icon" />;

describe('IconCard', () => {
  describe('Rendering', () => {
    it('renders without errors', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Test Title"
          text="Test description text"
          link="/test-link"
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Test Title"
          text="Test text"
          link="/test"
        />
      );
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('renders title', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="My Card Title"
          text="Description"
          link="/link"
        />
      );
      expect(screen.getByText('My Card Title')).toBeInTheDocument();
    });

    it('renders description text', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="This is a detailed description of the card content"
          link="/link"
        />
      );
      expect(screen.getByText('This is a detailed description of the card content')).toBeInTheDocument();
    });

    it('renders as a link', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/my-custom-link"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/my-custom-link');
    });
  });

  describe('Props', () => {
    it('accepts and renders custom icon', () => {
      const customIcon = <svg data-testid="custom-icon" aria-label="Custom Icon" />;
      render(
        <IconCard
          icon={customIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('accepts different title values', () => {
      const { rerender } = render(
        <IconCard
          icon={mockIcon}
          title="First Title"
          text="Text"
          link="/link"
        />
      );
      expect(screen.getByText('First Title')).toBeInTheDocument();

      rerender(
        <IconCard
          icon={mockIcon}
          title="Second Title"
          text="Text"
          link="/link"
        />
      );
      expect(screen.getByText('Second Title')).toBeInTheDocument();
    });

    it('accepts different text values', () => {
      const { rerender } = render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="First description"
          link="/link"
        />
      );
      expect(screen.getByText('First description')).toBeInTheDocument();

      rerender(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Second description"
          link="/link"
        />
      );
      expect(screen.getByText('Second description')).toBeInTheDocument();
    });

    it('accepts different link values', () => {
      const { rerender } = render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/first-link"
        />
      );
      expect(screen.getByRole('link')).toHaveAttribute('href', '/first-link');

      rerender(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/second-link"
        />
      );
      expect(screen.getByRole('link')).toHaveAttribute('href', '/second-link');
    });

    it('accepts optional className prop', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
          className="custom-class"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-class');
    });

    it('works without className prop', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Link Behavior', () => {
    it('renders Next.js Link component', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/test-route"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test-route');
    });

    it('link has correct base classes', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveClass('block', 'group');
    });

    it('entire card is clickable', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Clickable Title"
          text="Clickable text"
          link="/destination"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toContainElement(screen.getByText('Clickable Title'));
      expect(link).toContainElement(screen.getByText('Clickable text'));
    });
  });

  describe('Layout Structure', () => {
    it('has correct container structure', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const link = screen.getByRole('link');
      const container = link.querySelector('div.flex.items-center');
      expect(container).toBeInTheDocument();
    });

    it('icon container has gradient background', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const iconContainer = document.querySelector('.bg-linear-to-br');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass('from-primary', 'to-primary-dark');
    });

    it('icon container is circular', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const iconContainer = document.querySelector('.rounded-full');
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass('w-14', 'h-14');
    });

    it('has text content container', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const textContainer = document.querySelector('.flex.flex-col');
      expect(textContainer).toBeInTheDocument();
      expect(textContainer).toHaveClass('flex-1', 'ml-5');
    });

    it('title is rendered as h3', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Heading Text"
          text="Text"
          link="/link"
        />
      );
      const title = screen.getByText('Heading Text');
      expect(title.tagName).toBe('H3');
    });

    it('description is rendered as p', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Paragraph text"
          link="/link"
        />
      );
      const description = screen.getByText('Paragraph text');
      expect(description.tagName).toBe('P');
    });
  });

  describe('Styling Classes', () => {
    it('card has correct background classes', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const card = document.querySelector('.bg-card-l');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('dark:bg-card-d');
    });

    it('card has border classes', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const card = document.querySelector('.border');
      expect(card).toHaveClass('border-border-l', 'dark:border-border-d');
    });

    it('card has rounded corners', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const card = document.querySelector('.rounded');
      expect(card).toBeInTheDocument();
    });

    it('card has hover shadow classes', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const card = document.querySelector('.hover\\:shadow');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('dark:hover:shadow-primary-dark');
    });

    it('title has correct text styling', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Styled Title"
          text="Text"
          link="/link"
        />
      );
      const title = screen.getByText('Styled Title');
      expect(title).toHaveClass('font-semibold', 'text-lg', 'mb-1');
      expect(title).toHaveClass('text-card-text-l', 'dark:text-card-text-d');
    });

    it('description has correct text styling', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Styled description"
          link="/link"
        />
      );
      const description = screen.getByText('Styled description');
      expect(description).toHaveClass('text-sm', 'leading-relaxed');
      expect(description).toHaveClass('text-secondary-l', 'dark:text-secondary-d');
    });
  });

  describe('Accessibility', () => {
    it('title is semantically correct heading', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Accessible Title"
          text="Text"
          link="/link"
        />
      );
      const title = screen.getByText('Accessible Title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H3');
    });

    it('link is keyboard accessible', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('card has minimum height for tap targets', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const card = document.querySelector('.min-h-28');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('displays all content elements together', () => {
      render(
        <IconCard
          icon={<svg data-testid="complete-icon" />}
          title="Complete Card"
          text="Complete description text"
          link="/complete"
        />
      );
      expect(screen.getByTestId('complete-icon')).toBeInTheDocument();
      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('Complete description text')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/complete');
    });

    it('maintains layout hierarchy', () => {
      render(
        <IconCard
          icon={mockIcon}
          title="Title"
          text="Text"
          link="/link"
        />
      );
      const link = screen.getByRole('link');
      const title = screen.getByText('Title');
      const text = screen.getByText('Text');

      expect(link).toContainElement(title);
      expect(link).toContainElement(text);
    });
  });
});
