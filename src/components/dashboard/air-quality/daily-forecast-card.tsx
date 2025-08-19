import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DailyData } from "@/lib/types";
import { Cloud, CloudRain, Droplets, Sun } from "lucide-react";


const dailyForecastData: DailyData[] = [
    { day: 'Hari ini', weatherIcon: CloudRain, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
    { day: 'Selasa', weatherIcon: Cloud, chanceOfRain: '50%', aqi: 50, humidity: '85%' },
    { day: 'Rabu', weatherIcon: CloudRain, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
    { day: 'Kamis', weatherIcon: Cloud, chanceOfRain: '60%', aqi: 50, humidity: '85%' },
    { day: 'Jumat', weatherIcon: Sun, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
    { day: 'Sabtu', weatherIcon: Sun, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
    { day: 'Minggu', weatherIcon: Sun, chanceOfRain: '100%', aqi: 50, humidity: '85%' },
];

function getAqiColor (aqi: number) {
  if (aqi <= 50) return 'bg-green-500 text-white';
  if (aqi <= 100) return 'bg-yellow-500 text-black';
  return 'bg-red-500 text-white';
};


export function DailyForecastCard() {
  return (
    <Card className="w-[650px]">
      <CardHeader>
        <CardTitle>Prediksi udara harian</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between overflow-x-auto pb-4 gap-4">
          {dailyForecastData.map((data) => (
            <div key={data.day} className="flex flex-col items-center space-y-2 min-w-[60px]">
              <p className="text-sm font-medium">{data.day}</p>
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