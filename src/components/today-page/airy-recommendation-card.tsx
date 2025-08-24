"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Recommendation,  } from "@/lib/types";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, AlertCircle } from "lucide-react";
import { User } from "firebase/auth";
import { cn } from "@/lib/utils";
import { fetchRecommendation } from "@/lib/api";
import { useAuth } from "../auth-provider";
import { AppSkeleton } from "../app-skeleton";

export default function AiryRecommendationCard() {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading } = useAuth();

  if (loading) {
    return <AppSkeleton />;
  }

  useEffect(() => {
    if (user) {
      const getRecommendation = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const data = await fetchRecommendation(user);
          setRecommendation(data);
        } catch (err) {
          setError("Airy is resting... could not get a recommendation.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      getRecommendation();
    } else {
       setIsLoading(false);
    }
  }, [user]);

  const getBadgeVariant = (level: string) => {
    if (level.toLowerCase().includes("unhealthy")) return "destructive";
    if (level.toLowerCase().includes("moderate")) return "secondary";
    return "default";
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Airy's Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
     return (
       <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-lg">Airy's Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-3">
           <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
           <p className="text-sm text-yellow-800">{error}</p>
        </CardContent>
       </Card>
     )
  }

  if (!recommendation) return null;

  return (
    <Card className="border-blue-200 bg-blue-50/80">
      <CardHeader>
        <CardTitle className="text-lg">Airy's Recommendation</CardTitle>
      </CardHeader>
      <CardContent 
        className={cn(
          "space-y-4 overflow-hidden transition-all duration-700 ease-in-out",
          isLoading ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        )}
      >
        <Badge variant={getBadgeVariant(recommendation.recommendation_level)} className="text-sm">
          {recommendation.recommendation_level}
        </Badge>
        <p className="text-gray-700">{recommendation.summary}</p>
        <div className="space-y-3 border-t pt-3">
          <div className="flex items-start space-x-3">
            <Heart className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Activity</h4>
              <p className="text-sm text-muted-foreground">{recommendation.recommended_activity.name}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Location</h4>
              <p className="text-sm text-muted-foreground">{recommendation.recommended_activity.location_name}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}