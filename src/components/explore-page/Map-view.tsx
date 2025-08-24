'use client';

import { useRef, useEffect } from 'react';
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapController } from './map-controller';
import { parksData, cityAqi, MAPBOX_STYLE, MALANG_BOUNDS } from '@/lib/map-config';
import { getDistance } from '@/lib/geo-utils';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const popupsRef = useRef<Popup[]>([]);

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
        const el = document.createElement('div');
        el.className = 'w-8 h-8 bg-center bg-no-repeat cursor-pointer';
        el.style.backgroundImage = `url('/images/explore-page/park-pin.svg')`; 

        const marker = new Marker(el)
          .setLngLat([park.lng, park.lat])
          .addTo(map);

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          popupsRef.current.forEach(p => p.remove());
          popupsRef.current = [];
          
          const popup = new Popup({ offset: 35, closeButton: false })
            .setLngLat([park.lng, park.lat])
            .setHTML(`
              <div class="p-1 w-48">
                <h3 class="font-bold text-gray-800 text-base">${park.name}</h3>
                <p class="text-sm text-gray-600">City AQI: <span class="font-semibold text-green-600">${cityAqi}</span></p>
                <div id="distance-info-${park.id}" class="text-sm text-blue-600 font-semibold mt-1">Calculating distance...</div>
              </div>
            `)
            .addTo(map);
          
          popupsRef.current.push(popup);

          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const distance = getDistance(latitude, longitude, park.lat, park.lng);
            const distanceEl = document.getElementById(`distance-info-${park.id}`);
            if (distanceEl) {
              distanceEl.innerHTML = `~${distance} km from you`;
            }
          }, () => {
             const distanceEl = document.getElementById(`distance-info-${park.id}`);
             if(distanceEl) {
                distanceEl.innerHTML = `<span class="text-xs text-gray-500">Enable location to see distance.</span>`;
             }
          });
        });
      });
    });

    map.on('click', () => {
      popupsRef.current.forEach(p => p.remove());
      popupsRef.current = [];
    });
    
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative w-full h-full shadow-md">
      <div ref={mapContainerRef} className="w-full h-full" />
      <MapController mapRef={mapRef} />
    </div>
  );
}