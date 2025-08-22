import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HourlyData } from "@/lib/types";
import { 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Droplets, 
  Cloudy,
  Sun
} from "lucide-react";

// tempData
const hourlyForecastData: HourlyData[] = [
  { time: 'Sekarang', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '12.00', weatherIcon: CloudRain, chanceOfRain: '50%', aqi: 50, humidity: '85%' },
  { time: '13.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '14.00', weatherIcon: Cloudy, chanceOfRain: '60%', aqi: 50, humidity: '85%' },
  { time: '15.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '16.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '17.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '18.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '19.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
  { time: '20.00', weatherIcon: Cloud, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
];

function getAqiColor (aqi: number) {
  if (aqi <= 50) return 'bg-green-500 text-white';
  if (aqi <= 100) return 'bg-yellow-500 text-black';
  return 'bg-red-500 text-white';
};

export function HourlyForecastCard() {
  return (
    <Card className="w-2/3">
      <CardHeader>
        <CardTitle>Prediksi udara per jam</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 overflow-x-auto pb-4 justify-center">
          {hourlyForecastData.map((data) => (
            <div key={data.time} className="flex flex-col items-center space-y-2 min-w-[60px]">
              <p className="text-sm font-medium">{data.time}</p>
              <p className="text-xs text-muted-foreground">{data.chanceOfRain}</p>
              <data.weatherIcon className="h-6 w-6 text-gray-500" />
              <div className={`px-3 py-1 text-sm rounded-full ${getAqiColor(data.aqi)}`}>
                {data.aqi}
              </div>
              <p className="text-xs text-muted-foreground">AQI</p>
              <Droplets className="h-5 w-5 text-blue-500" />
              <p className="text-xs text-muted-foreground">{data.humidity}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}