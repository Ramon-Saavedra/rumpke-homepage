import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterCollapsibleSection from './FooterCollapsibleSection';

describe('FooterCollapsibleSection', () => {
  it('renders title text', () => {
    render(<FooterCollapsibleSection title="Links"><p>Content</p></FooterCollapsibleSection>);
    expect(screen.getAllByText('Links').length).toBeGreaterThan(0);
  });

  it('renders children content', () => {
    render(<FooterCollapsibleSection title="Links"><p>Content</p></FooterCollapsibleSection>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('mobile button starts collapsed with aria-expanded false', () => {
    render(<FooterCollapsibleSection title="Links"><p>Content</p></FooterCollapsibleSection>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('mobile button sets aria-expanded to true on click', () => {
    render(<FooterCollapsibleSection title="Links"><p>Content</p></FooterCollapsibleSection>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles back to collapsed on second click', () => {
    render(<FooterCollapsibleSection title="Links"><p>Content</p></FooterCollapsibleSection>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});
