'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const GoogleMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return null;
  }

  const rumpkeLocation = { lat: 52.6031, lng: 7.4319 };
  const address = 'Haselünner Straße 4-8, 49844 Bawinkel';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleMarkerClick = () => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="w-full pt-4">
      <div className="w-full mx-auto">
        <h2 className="text-3xl mb-4 text-center">
          Unsere Lage
        </h2>
        <div className="text-center  bg-secondary text-white dark:bg-secondary-dark py-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-l dark:text-secondary-d font-medium hover:underline"
          >
            {address}
          </a>
        </div>
        <APIProvider apiKey={apiKey}>
          <div className="w-full h-96">
            <Map
              defaultCenter={rumpkeLocation}
              defaultZoom={9}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapId="DEMO_MAP_ID"
              colorScheme="DARK"
            >
              <AdvancedMarker
                position={rumpkeLocation}
                onClick={handleMarkerClick}
                title="Rumpke Immobilien - Klicken um in Google Maps zu öffnen"
              />
            </Map>
          </div>
        </APIProvider>
      </div>
    </section>
  );
};

export default GoogleMap;
