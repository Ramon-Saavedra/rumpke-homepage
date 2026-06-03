Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';
import * as apiClient from '@/lib/api-client';
import { ContactSubmitError } from '@/types/contact';

jest.mock('@/lib/api-client', () => ({
  ...jest.requireActual('@/lib/api-client'),
  submitContactForm: jest.fn(),
}));

const mockSubmit = apiClient.submitContactForm as jest.Mock;

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: 'Anna' } });
  fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: 'Müller' } });
  fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'anna@example.de' } });
  fireEvent.change(screen.getByLabelText(/Ihre Nachricht/i), {
    target: { value: 'Das ist meine Testnachricht für das Formular.' },
  });
  fireEvent.click(screen.getByLabelText(/Datenschutz/i));
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all visible form fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Vorname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nachname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefonnummer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Firma/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ihre Nachricht/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Datenschutz/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nachricht senden/i })).toBeInTheDocument();
  });

  it('shows client-side validation errors when submitting empty form', async () => {
    render(<ContactForm />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
    });
    await waitFor(() => {
      expect(screen.getAllByText(/Mindestens \d+ Zeichen erforderlich/i).length).toBeGreaterThan(0);
    });
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('shows consent validation error when checkbox is unchecked', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/Vorname/i), { target: { value: 'Anna' } });
    fireEvent.change(screen.getByLabelText(/Nachname/i), { target: { value: 'Müller' } });
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: 'anna@example.de' } });
    fireEvent.change(screen.getByLabelText(/Ihre Nachricht/i), {
      target: { value: 'Das ist meine Testnachricht für das Formular.' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Bitte stimmen Sie der Datenschutzerklärung zu/i),
      ).toBeInTheDocument();
    });
  });

  it('shows server field errors returned by the backend', async () => {
    mockSubmit.mockRejectedValueOnce(
      new ContactSubmitError(400, { email: ['Ungültige E-Mail-Adresse'] }),
    );
    render(<ContactForm />);
    fillRequiredFields();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
    });
    await waitFor(() => {
      expect(screen.getByText('Ungültige E-Mail-Adresse')).toBeInTheDocument();
    });
  });

  it('shows global error banner on server error', async () => {
    mockSubmit.mockRejectedValueOnce(
      new ContactSubmitError(500, undefined, 'Serverfehler. Bitte versuchen Sie es später erneut.'),
    );
    render(<ContactForm />);
    fillRequiredFields();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
    });
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Serverfehler');
    });
  });

  it('shows success state after successful submission', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);
    render(<ContactForm />);
    fillRequiredFields();
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Nachricht senden/i }));
    });
    await waitFor(() => {
      expect(screen.getByText(/Vielen Dank/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: /Nachricht senden/i })).not.toBeInTheDocument();
  });

  it('updates character counter as user types in message field', () => {
    render(<ContactForm />);
    const textarea = screen.getByLabelText(/Ihre Nachricht/i);
    fireEvent.change(textarea, { target: { value: 'Hallo Welt' } });
    expect(screen.getByText('10/1000')).toBeInTheDocument();
  });
});
