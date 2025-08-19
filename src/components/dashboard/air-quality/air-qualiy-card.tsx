import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AirQualityCard({ aqi, concentration }: { aqi: number, concentration: number }) {
  return (
    <Card className="flex justify-center">
      <CardContent>
        <div className="bg-[#67C3F3] text-white p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="text-sm">Sedang</p>
            <p className="text-4xl font-bold">{aqi}</p>
          </div>
          <div className="text-right">
            <span>🌬️</span> 
            <p>{concentration} μg/m³</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}