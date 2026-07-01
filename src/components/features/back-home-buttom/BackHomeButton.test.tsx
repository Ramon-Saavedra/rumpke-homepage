import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackHomeButton from './BackHomeButton';

describe('BackHomeButton', () => {
  it('renders link pointing to homepage', () => {
    render(<BackHomeButton />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('renders Startseite text', () => {
    render(<BackHomeButton />);
    expect(screen.getByText('Startseite')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<BackHomeButton />);
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Zurück zur Startseite');
  });
});
