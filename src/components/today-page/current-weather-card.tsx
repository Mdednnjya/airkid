"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function CurrentWeatherCard() {
  const weatherData = {
    location: "Malang, East Java",
    date: "24 August 2025",
    aqi: 32,
    temp: "24°C",
    wind: "2.1 km/h",
    humidity: "90%",
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 overflow-hidden shadow-md">
      <CardContent className="p-0">
        <div className="relative h-75">
          <Image
            src="/images/today-page/good-air-quality-02.svg"
            alt="Weather illustration"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="px-4 py-2 space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-800">{weatherData.aqi}</span>
            <span className="text-md font-medium text-gray-600">PM2.5</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center border-t pt-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Temp</p>
              <p className="text-sm font-medium">{weatherData.temp}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Wind</p>
              <p className="text-sm font-medium">{weatherData.wind}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Humidity</p>
              <p className="text-sm font-medium">{weatherData.humidity}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Source: BMKG | Badan Meteorologi, Klimatologi dan Geofisika
          </p>
        </div>
      </CardContent>
    </Card>
  );
}