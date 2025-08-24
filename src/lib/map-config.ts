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
  { id: 4, name: 'Taman Rekreasi Kota Malang', lat: -7.9812, lng: 112.6305 },
  { id: 5, name: 'Taman Kunang-Kunang', lat: -7.9503, lng: 112.6146 },
  { id: 6, name: 'Taman Merbabu', lat: -7.9785, lng: 112.6251 },
  { id: 7, name: 'Taman Slamet', lat: -7.9780, lng: 112.6240 },
  { id: 8, name: 'Taman Singha Merjosari', lat: -7.9228, lng: 112.5988 },
  { id: 9, name: 'Taman Mojolangu', lat: -7.9176, lng: 112.6372 },
  { id: 10, name: 'Taman Terapi Sengkaling', lat: -7.9056, lng: 112.5893 },
  { id: 11, name: 'Taman Wisata Wendit', lat: -7.9364, lng: 112.6961 },
  { id: 12, name: 'Taman Bentoel Trunojoyo', lat: -7.9763, lng: 112.6301 },
  { id: 13, name: 'Taman Cerdas Tlogomas', lat: -7.9220, lng: 112.6035 },
  { id: 14, name: 'Taman Pendidikan Air Sumber Sirah', lat: -8.0172, lng: 112.6089 },
  { id: 15, name: 'Eco Green Park (Batu)', lat: -7.8826, lng: 112.5206 },
];



export const MAPBOX_STYLE: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL;

export const MALANG_BOUNDS: LngLatBoundsLike = [
  [112.5, -8.1],
  [112.8, -7.8],
];