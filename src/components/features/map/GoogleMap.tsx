'use client';

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoArrowForwardOutline } from 'react-icons/io5';

const LOCATION = { lat: 52.5224, lng: 7.3163 };
const ADDRESS = 'Römerstraße 9, 40811 Lingen';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const GoogleMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] overflow-hidden rounded-xl border border-border-l dark:border-border-d">
          <div className="flex flex-col justify-between gap-10 bg-bgSecondary-l dark:bg-bgSecondary-d p-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4">
                Unser Standort
              </p>
              <h2 className="text-2xl font-bold mb-8">
                Rumpke Immobilien
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <IoLocationOutline size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-card-text-l dark:text-card-text-d">
                    Römerstraße 9<br />40811 Lingen
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <IoCallOutline size={18} className="text-primary shrink-0" />
                  <a
                    href="tel:+4959634599970"
                    className="text-sm text-card-text-l dark:text-card-text-d hover:text-primary"
                  >
                    05963 – 45 999 70
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <IoMailOutline size={18} className="text-primary shrink-0" />
                  <a
                    href="mailto:info@rumpke-immobilien.de"
                    className="text-sm text-card-text-l dark:text-card-text-d hover:text-primary"
                  >
                    info@rumpke-immobilien.de
                  </a>
                </li>
              </ul>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              In Google Maps öffnen
              <IoArrowForwardOutline size={14} />
            </a>
          </div>

          <APIProvider apiKey={apiKey}>
            <div className="h-80 lg:h-auto min-h-105">
              <Map
                defaultCenter={LOCATION}
                defaultZoom={15}
                gestureHandling="greedy"
                disableDefaultUI
                mapTypeId="hybrid"
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? 'DEMO_MAP_ID'}
                colorScheme="FOLLOW_SYSTEM"
              >
                <AdvancedMarker
                  position={LOCATION}
                  onClick={() => window.open(MAPS_URL, '_blank', 'noopener,noreferrer')}
                  title="Rumpke Immobilien"
                >
                  <Pin background="#018063" borderColor="#014d3b" glyphColor="#ffffff" />
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;

