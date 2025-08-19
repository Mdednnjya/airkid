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