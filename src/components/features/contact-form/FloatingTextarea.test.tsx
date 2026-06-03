import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createRef } from 'react';
import FloatingTextarea from './FloatingTextarea';

describe('FloatingTextarea', () => {
  it('renders the label with correct text', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" />);
    expect(screen.getByText('Nachricht')).toBeInTheDocument();
  });

  it('associates label with textarea via htmlFor and id', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" />);
    expect(screen.getByLabelText(/Nachricht/i)).toBeInTheDocument();
  });

  it('applies resize-none to the textarea', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" />);
    expect(screen.getByLabelText(/Nachricht/i)).toHaveClass('resize-none');
  });

  it('shows asterisk when required', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" required />);
    const asterisk = screen.getByText('*', { selector: 'span[aria-hidden]' });
    expect(asterisk).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows error message when error prop is provided', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" error="Zu kurz" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Zu kurz');
  });

  it('sets aria-invalid to true when error is present', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" error="Zu kurz" />);
    expect(screen.getByLabelText(/Nachricht/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-invalid to false when no error', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" />);
    expect(screen.getByLabelText(/Nachricht/i)).toHaveAttribute('aria-invalid', 'false');
  });

  it('shows character counter in format current/max', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" charCount={{ current: 42, max: 1000 }} />);
    expect(screen.getByText('42/1000')).toBeInTheDocument();
  });

  it('does not show counter when charCount is not provided', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" />);
    expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument();
  });

  it('sets aria-live polite on character counter', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" charCount={{ current: 10, max: 1000 }} />);
    const counter = screen.getByText('10/1000');
    expect(counter).toHaveAttribute('aria-live', 'polite');
  });

  it('includes counter id in aria-describedby', () => {
    render(<FloatingTextarea id="test-area" label="Nachricht" charCount={{ current: 10, max: 1000 }} />);
    expect(screen.getByLabelText(/Nachricht/i)).toHaveAttribute(
      'aria-describedby',
      'test-area-count',
    );
  });

  it('includes both error id and counter id in aria-describedby when both provided', () => {
    render(
      <FloatingTextarea
        id="test-area"
        label="Nachricht"
        error="Zu kurz"
        charCount={{ current: 5, max: 1000 }}
      />,
    );
    const textarea = screen.getByLabelText(/Nachricht/i);
    expect(textarea.getAttribute('aria-describedby')).toContain('test-area-error');
    expect(textarea.getAttribute('aria-describedby')).toContain('test-area-count');
  });

  it('forwards ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<FloatingTextarea id="test-area" label="Nachricht" ref={ref} />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('TEXTAREA');
  });
});
