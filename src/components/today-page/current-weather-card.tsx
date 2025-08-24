"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { CurrentObservationResponse } from '@/lib/types';
import { fetchCurrentObservation } from '@/lib/api';
import { cn } from '@/lib/utils';

const getAirQualityVisuals = (pm25: number) => {
  if (pm25 <= 50) {
    return {
      image: "/images/today-page/good-air-quality-02.svg",
      cardClass: "bg-green-50/20 border-green-100",
    };
  } else if (pm25 <= 100) {
    return {
      image: "/images/today-page/moderate-air-quality-01.svg",
      cardClass: "bg-yellow-50/20 border-yellow-100",
    };
  } else {
    return {
      image: "/images/today-page/bad-air-quality-01.svg",
      cardClass: "bg-red-50/20 border-red-100",
    };
  }
};

export default function CurrentWeatherCard() {
  const [data, setData] = useState<CurrentObservationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getObservationData = async () => {
      try {
        const result = await fetchCurrentObservation();
        setData(result);
      } catch (error) {
        console.error("Failed to load observation data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getObservationData();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 overflow-hidden shadow-md">
        <CardContent className="p-0">
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <div className="px-4 py-2 space-y-3">
            <div className="flex items-baseline space-x-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center border-t pt-3">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-10 mx-auto mb-1" />
                  <Skeleton className="h-5 w-12 mx-auto" />
                </div>
              ))}
            </div>
             <Skeleton className="h-3 w-4/5 mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 overflow-hidden shadow-md">
         <CardContent className="p-4 text-center text-muted-foreground">
            Could not load current weather data.
         </CardContent>
      </Card>
    )
  }

  const visuals = getAirQualityVisuals(data.data.pm25.value);

  return (
    <Card className={cn("overflow-hidden shadow-md transition-colors duration-500", visuals.cardClass)}>
      <CardContent className="p-0">
        <div className="relative h-[250px]">
          <Image
            src={visuals.image}
            alt="Weather illustration based on air quality"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <div className="px-4 py-2 space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-1xl font-bold text-gray-800">{Math.round(data.data.pm25.value)}</span>
            <span className="text-md font-medium text-gray-600">PM2.5</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center border-t pt-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Temp</p>
              <p className="text-sm font-medium">{Math.round(data.data.temp.value)}°C</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Wind</p>
              <p className="text-sm font-medium">{data.data.wind.value} km/h</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Humidity</p>
              <p className="text-sm font-medium">{Math.round(data.data.humidity.value)}%</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Source: BMKG | Data refreshed at: {new Date(new Date(data.latest_observed_at).getTime() + 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}