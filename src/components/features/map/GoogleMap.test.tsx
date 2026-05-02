import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleMap from './GoogleMap';


jest.mock('@vis.gl/react-google-maps', () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="api-provider">{children}</div>
  ),
  Map: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="google-map">{children}</div>
  ),
  AdvancedMarker: ({
    children,
    onClick,
    title,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    title?: string;
  }) => (
    <div data-testid="advanced-marker" onClick={onClick} aria-label={title}>
      {children}
    </div>
  ),
  Pin: () => <div data-testid="pin" />,
}));


const ADDRESS = 'Römerstraße 9, 40811 Lingen';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

function setApiKey(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  } else {
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = value;
  }
}


describe('GoogleMap', () => {
  afterEach(() => {
    setApiKey(undefined);
    jest.restoreAllMocks();
  });


  describe('when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set', () => {
    it('renders nothing', () => {
      setApiKey(undefined);
      const { container } = render(<GoogleMap />);
      expect(container).toBeEmptyDOMElement();
    });
  });


  describe('when an API key is present', () => {
    beforeEach(() => setApiKey('TEST_KEY'));

    it('renders the section element', () => {
      render(<GoogleMap />);
      expect(document.querySelector('section')).toBeInTheDocument();
    });

    it('renders the company name heading', () => {
      render(<GoogleMap />);
      expect(screen.getByRole('heading', { name: /rumpke immobilien/i })).toBeInTheDocument();
    });

    it('renders the "Unser Standort" label', () => {
      render(<GoogleMap />);
      expect(screen.getByText(/unser standort/i)).toBeInTheDocument();
    });

    it('renders the street address', () => {
      render(<GoogleMap />);
      expect(screen.getByText(/römerstraße 9/i)).toBeInTheDocument();
    });

    it('renders a telephone link with correct href', () => {
      render(<GoogleMap />);
      const tel = screen.getByRole('link', { name: /\+49/ });
      expect(tel).toHaveAttribute('href', expect.stringContaining('tel:'));
    });

    it('renders an email link with correct href', () => {
      render(<GoogleMap />);
      const mail = screen.getByRole('link', { name: /info@rumpke-immobilien\.de/i });
      expect(mail).toHaveAttribute('href', 'mailto:info@rumpke-immobilien.de');
    });

    it('renders the "In Google Maps öffnen" link with the correct URL', () => {
      render(<GoogleMap />);
      const link = screen.getByRole('link', { name: /in google maps öffnen/i });
      expect(link).toHaveAttribute('href', MAPS_URL);
    });

    it('opens the Maps link in a new tab', () => {
      render(<GoogleMap />);
      const link = screen.getByRole('link', { name: /in google maps öffnen/i });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });


    it('renders the APIProvider', () => {
      render(<GoogleMap />);
      expect(screen.getByTestId('api-provider')).toBeInTheDocument();
    });

    it('renders the Map component', () => {
      render(<GoogleMap />);
      expect(screen.getByTestId('google-map')).toBeInTheDocument();
    });

    it('renders the AdvancedMarker', () => {
      render(<GoogleMap />);
      expect(screen.getByTestId('advanced-marker')).toBeInTheDocument();
    });

    it('renders the Pin inside the marker', () => {
      render(<GoogleMap />);
      expect(screen.getByTestId('pin')).toBeInTheDocument();
    });


    it('opens Google Maps in a new tab when the marker is clicked', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
      render(<GoogleMap />);
      fireEvent.click(screen.getByTestId('advanced-marker'));
      expect(openSpy).toHaveBeenCalledWith(MAPS_URL, '_blank', 'noopener,noreferrer');
    });
  });
});
