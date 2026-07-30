"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { PropertyCoordinates } from "@/lib/property-detail";

interface PropertyLocationMapProps {
  readonly coordinates: PropertyCoordinates;
  readonly title: string;
  readonly isExact: boolean;
}

export default function PropertyLocationMap({
  coordinates,
  title,
  isExact,
}: PropertyLocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  return (
    <APIProvider apiKey={apiKey}>
      <div className="h-60 w-full overflow-hidden border border-border-l dark:border-border-d lg:h-72">
        <Map
          defaultCenter={coordinates}
          defaultZoom={isExact ? 15 : 13}
          gestureHandling="cooperative"
          disableDefaultUI
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID ?? "DEMO_MAP_ID"}
          colorScheme="FOLLOW_SYSTEM"
        >
          {isExact && (
            <AdvancedMarker position={coordinates} title={title}>
              <Pin
                background="#2e8a5a"
                borderColor="#226944"
                glyphColor="#ffffff"
              />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
