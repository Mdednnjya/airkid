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
    icon: any
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