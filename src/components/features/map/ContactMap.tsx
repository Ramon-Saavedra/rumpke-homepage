"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { LeafletEvent } from "leaflet";


const DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const position: [number, number] = [52.6130, 7.4895];

export default function ContactMap() {
  const mapRef = useRef<any>(null);

  useEffect(() => {

    const interval = setInterval(() => {
      document.querySelectorAll('.leaflet-control-attribution, .leaflet-control-logo, .leaflet-control-container a[href*="leaflet"]').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
    }, 100);

    setTimeout(() => {
      if (mapRef.current && mapRef.current.invalidateSize) {
        mapRef.current.invalidateSize();
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full rounded overflow-hidden shadow-lg dark:shadow-[0_4px_32px_0_rgba(0,0,0,0.7)] bg-white/70 dark:bg-bg-d/70">
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: 300, height: "100%", width: "100%", maxHeight: 480 }}
        attributionControl={false}

        whenReady={() => {
          const map = mapRef.current;
          if (map) {
            setTimeout(() => {
              map.invalidateSize();
            }, 300);
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="space-y-1">
              <div>Rumpke Immobilien</div>
              <div>Haselünner Straße 4-8</div>
              <div>49844 Bawinkel</div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=52.6130,7.4895"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline text-xs block mt-1"
              >
                Route in Google Maps öffnen
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
