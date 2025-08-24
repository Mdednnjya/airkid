'use client';

import { useRef, useEffect } from 'react';
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapController } from './map-controller';
import { parksData, cityAqi, MAPBOX_STYLE, MALANG_BOUNDS } from '@/lib/map-config';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MAPBOX_STYLE,
      center: [112.6304, -7.9797],
      zoom: 13,
      maxBounds: MALANG_BOUNDS,
    });

    const map = mapRef.current;

    map.on('load', () => {
      parksData.forEach(park => {
        const popupContent = `
          <div class="p-1">
            <h3 class="font-bold text-gray-800">${park.name}</h3>
            <p class="text-sm text-gray-600">City AQI: <span class="font-semibold text-green-600">${cityAqi}</span></p>
          </div>
        `;
        const popup = new Popup({ offset: 25 }).setHTML(popupContent);
        const el = document.createElement('div');
        el.style.fontSize = '24px';
        el.innerText = '🌳';

        new Marker(el)
          .setLngLat([park.lng, park.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      <MapController mapRef={mapRef} />
    </div>
  );
}