"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AiryRecommendation } from "@/lib/types";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";

export default function AiryRecommendationCard() {
  const [recommendation, setRecommendation] = useState<AiryRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const response = await fetch("/api/mock/recommendation");
      const data = await response.json();
      setRecommendation(data);
      setIsLoading(false);
    };

    fetchRecommendation();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Airy's Recommendation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (!recommendation) return null;

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">Airy's Recommendation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge className="text-sm">{recommendation.recommendation_level}</Badge>
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