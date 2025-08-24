import { User } from 'firebase/auth';


// Sidebar
export type SidebarMenuType = {
    [role: string]: {
        title: string,
        items: SidebarMenuItemType[]
    }[]
    
}

export type SidebarMenuItemType = {
    title: string,
    url: string,
    icon: React.ElementType;
}

// Air Quality
export type HourlyData = {
  time: string;
  weatherIcon: React.ElementType;
  chanceOfRain: string;
  aqi: number;
  humidity: string;
};

export type DailyData = {
  day: string;
  weatherIcon: React.ElementType;
  chanceOfRain: string;
  aqi: number;
  humidity: string;
};

// Auth Aspect
export type PersonalizationModalProps =  {
  user: User | null;
  onClose: () => void;
}

export type AuthContextType = {
  user: User | null;
  loading: boolean;
}

// Today Page
export type AiryRecommendation = {
  recommendation_level: string;
  summary: string;
  recommended_activity: {
    name: string;
    location_name: string;
    developmental_benefit: string;
    safety_tip: string;
  };
  current_aqi: number;
};

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

export interface Recommendation {
  recommendation_level: string;
  summary: string;
  recommended_activity: {
    name: string;
    location_name: string;
    developmental_benefit: string;
    safety_tip: string;
  };
  current_aqi: number;
}

// Profiles
export type ProfileFormData = {
  childName: string;
  childAge: string;
  healthSensitivities: string[];
  activityPreferences: string[];
};

// Forecast
export interface ForecastDay {
  day: string;
  avg: number;
  min: number | null;
  max: number | null;
}

export interface ForecastResponse {
  status: string;
  city: string;
  pollutant: string;
  run: {
    source_idx: number;
    created_at: string;
    source: string;
  };
  horizon: number;
  forecast: ForecastDay[];
}