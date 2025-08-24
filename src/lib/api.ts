export interface ObservationData {
  pm25: { value: number };
  temp: { value: number };
  wind: { value: number };
  humidity: { value: number };
}

export interface CurrentObservationResponse {
  status: string;
  city: string;
  data: ObservationData;
  latest_observed_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCurrentObservation(): Promise<CurrentObservationResponse> {
  const response = await fetch(`${API_BASE_URL}/latest-observation?city=Malang%2C%20Indonesia`);

  if (!response.ok) {
    throw new Error('Failed to fetch current observation data.');
  }

  const data = await response.json();
  return data;
}