// File: src/app/api/mock/recommendation/route.ts

import { NextResponse } from 'next/server';

// This is our static, hardcoded JSON data
const mockAiryRecommendation = {
  recommendation_level: "Moderate Caution",
  summary: "The air quality will be moderate for the next few hours. It's a good time for some light outdoor play!",
  recommended_activity: {
    name: "Playground Fun at Taman Trunojoyo",
    location_name: "Taman Trunojoyo",
    developmental_benefit: "Playing on the swings and slides helps improve your child's motor skills and balance.",
    safety_tip: "Since the air quality is moderate, it's best to play for no more than an hour and take breaks."
  },
  current_aqi: 55
};

// A simple utility to create a delay
const freeze = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request: Request) {
  // Simulate a 1.5 second network delay
  await freeze(1500); 
  
  return NextResponse.json(mockAiryRecommendation);
}
