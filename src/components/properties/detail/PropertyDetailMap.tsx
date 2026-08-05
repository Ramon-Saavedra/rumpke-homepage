"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { PropertyCoordinates } from "@/lib/property-detail";
import {
  resolveTileUrl,
  isValidCoordinate,
  buildGoogleMapsUrl,
} from "@/lib/map-tiles";

const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapAttribution() {
  return (
    <p className="mt-1 text-xs text-card-text-l dark:text-card-text-d">
      &copy;{" "}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        OpenStreetMap
      </a>{" "}
      contributors
    </p>
  );
}

interface PropertyDetailMapProps {
  readonly coordinates: PropertyCoordinates;
  readonly title: string;
  readonly isExact: boolean;
}

function buildSafePopup(title: string, googleMapsUrl: string): HTMLElement {
  const container = document.createElement("div");

  const bold = document.createElement("b");
  bold.textContent = title;
  container.appendChild(bold);

  container.appendChild(document.createElement("br"));

  const link = document.createElement("a");
  link.href = googleMapsUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Auf Google Maps anzeigen";
  link.style.color = "#018063";
  link.style.fontSize = "0.875rem";
  link.style.fontWeight = "500";
  container.appendChild(link);

  return container;
}

export default function PropertyDetailMap({
  coordinates,
  title,
  isExact,
}: PropertyDetailMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [tileError, setTileError] = useState(false);

  const tileUrl = resolveTileUrl();
  const googleMapsUrl = buildGoogleMapsUrl(coordinates.lat, coordinates.lng);

  const handleTileError = useCallback(() => {
    setTileError(true);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        attributionControl: false,
        zoomControl: true,
      }).setView([coordinates.lat, coordinates.lng], isExact ? 15 : 13);

      L.tileLayer(tileUrl, {
        maxZoom: 19,
      })
        .on("tileerror", handleTileError)
        .addTo(mapInstanceRef.current);
    }

    markerRef.current?.remove();

    if (isExact) {
      const marker = L.marker([coordinates.lat, coordinates.lng], {
        icon: DefaultIcon,
      }).bindPopup(buildSafePopup(title, googleMapsUrl));
      marker.addTo(mapInstanceRef.current);
      markerRef.current = marker;
    }

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [
    coordinates.lat,
    coordinates.lng,
    googleMapsUrl,
    handleTileError,
    isExact,
    tileUrl,
    title,
  ]);

  if (!isValidCoordinate(coordinates.lat, coordinates.lng)) {
    return null;
  }

  return (
    <div>
      <div
        ref={mapRef}
        role="region"
        aria-label="Kartenansicht der Immobilie"
        className="h-60 w-full overflow-hidden rounded-lg border border-border-l dark:border-border-d lg:h-72"
      />
      {tileError && (
        <p className="mt-1 text-sm text-error">
          Karte derzeit nicht verfügbar.{" "}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Auf Google Maps anzeigen
          </a>
        </p>
      )}
      <MapAttribution />
    </div>
  );
}
