import { AirQualityCard } from "@/components/dashboard/air-quality/air-qualiy-card";
import { DailyForecastCard } from "@/components/dashboard/air-quality/daily-forecast-card";
import { HourlyForecastCard } from "@/components/dashboard/air-quality/hourly-forecast-card";
import { PollutantConditionsCard } from "@/components/dashboard/air-quality/pollutant-conditions-card";
import { Card } from "@/components/ui/card";

export default function InsightPage() {
    return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">
        Halo Arya, mari kita lihat udara di Kota Surabaya!
      </h1>

        <AirQualityCard aqi={50} concentration={14.3} />
        
        <HourlyForecastCard/>
        <DailyForecastCard/>
        <PollutantConditionsCard/>
    </div>
    )
}