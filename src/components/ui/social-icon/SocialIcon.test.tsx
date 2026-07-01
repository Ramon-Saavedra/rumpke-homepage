import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialIcon from './SocialIcon';

describe('SocialIcon', () => {
  const defaultProps = {
    href: 'https://example.com',
    ariaLabel: 'Facebook',
    icon: <svg data-testid="icon" />,
    tooltipText: 'Facebook',
    bgColor: '#1877F3',
  };

  it('renders a link with correct href', () => {
    render(<SocialIcon {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders aria-label on the link', () => {
    render(<SocialIcon {...defaultProps} />);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Facebook');
  });

  it('renders the icon', () => {
    render(<SocialIcon {...defaultProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders tooltip text', () => {
    render(<SocialIcon {...defaultProps} />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('applies bgColor as inline style on tooltip', () => {
    render(<SocialIcon {...defaultProps} />);
    expect(screen.getByText('Facebook')).toHaveStyle({ backgroundColor: '#1877F3' });
  });

  it('applies target attribute when provided', () => {
    render(<SocialIcon {...defaultProps} target="_blank" />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('applies custom className to list item', () => {
    render(<SocialIcon {...defaultProps} className="custom-class" />);
    const li = screen.getByRole('listitem');
    expect(li).toHaveClass('custom-class');
  });
});
