import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PollutantConditionsCard() {
  return (
    <Card className="mx-32">
      <CardHeader>
        <CardTitle>Kondisi Polutan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <p className="font-semibold">PM2.5</p>
          <span className="bg-green-700 text-white text-sm px-4 py-1 rounded-full">
            Baik
          </span>
        </div>
      </CardContent>
    </Card>
  );
}