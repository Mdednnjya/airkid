import TodayHeader from "@/components/today-page/today-header";
import CurrentWeatherCard from "@/components/today-page/current-weather-card";
import AiryRecommendationCard from "@/components/today-page/airy-recommendation-card";
import DidYouKnow from "@/components/today-page/did-you-know";
import { AppSidebar } from "@/components/app-sidebar";

export default function TodayPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:grid lg:grid-cols-12">
        <div className="hidden lg:block lg:col-span-3">
          <AppSidebar />
        </div>

        <div className="col-span-12 lg:col-span-9 px-4 py-6 lg:px-8">
          <div className="space-y-6">
            <TodayHeader />
            <CurrentWeatherCard />
            <AiryRecommendationCard />
            <DidYouKnow />
          </div>
        </div>
      </div>
    </div>
  );
}