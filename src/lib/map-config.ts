import { LngLatBoundsLike } from 'mapbox-gl';

export type ParkData = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

// Base on Google Maps real coordinates, hard code data for cost efficiency
export const parksData: ParkData[] = [
  { id: 1, name: 'Alun-Alun Tugu Malang', lat: -7.9797, lng: 112.6304 },
  { id: 2, name: 'Taman Trunojoyo', lat: -7.9765, lng: 112.6303 },
  { id: 3, name: 'Hutan Kota Malabar', lat: -7.9855, lng: 112.6225 },
];

export const cityAqi: number = 42;

export const MAPBOX_STYLE: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL;

export const MALANG_BOUNDS: LngLatBoundsLike = [
  [112.5, -8.1],
  [112.8, -7.8],
];