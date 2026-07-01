import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondaryNav from './SecondaryNav';

describe('SecondaryNav', () => {
  it('renders Dienstleistungen link', () => {
    render(<SecondaryNav />);
    expect(screen.getByRole('link', { name: 'Dienstleistungen' })).toHaveAttribute('href', '/dienstleistungen');
  });

  it('renders Über uns link', () => {
    render(<SecondaryNav />);
    expect(screen.getByRole('link', { name: 'Über uns' })).toHaveAttribute('href', '/ueber-uns');
  });

  it('renders Kontakt link', () => {
    render(<SecondaryNav />);
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/kontakt');
  });

  it('renders exactly 3 navigation links', () => {
    render(<SecondaryNav />);
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
