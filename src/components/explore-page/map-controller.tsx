'use client';

import { useState, useCallback, MutableRefObject } from 'react';
import { Map, Marker } from 'mapbox-gl';
import { Button } from '@/components/ui/button';

type MapControllerProps = {
  mapRef: MutableRefObject<Map | null>;
};

export function MapController({ mapRef }: MapControllerProps) {
  const [userMarker, setUserMarker] = useState<Marker | null>(null);

  const handleCenterMeClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapRef.current;
        if (!map) return;

        map.flyTo({ center: [longitude, latitude], zoom: 14 });

        if (userMarker) {
          userMarker.remove();
        }

        const el = document.createElement('div');
        el.className = "w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg";
        const newMarker = new Marker(el).setLngLat([longitude, latitude]).addTo(map);
        setUserMarker(newMarker);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not get your location. Please enable location services.");
      }
    );
  }, [mapRef, userMarker]);

  return (
    <div className="absolute top-4 left-4">
      <Button onClick={handleCenterMeClick}>Center Me</Button>
    </div>
  );
}