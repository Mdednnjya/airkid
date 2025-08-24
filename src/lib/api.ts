import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { CurrentObservationResponse } from './types';
import { Recommendation } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCurrentObservation(): Promise<CurrentObservationResponse> {
  const response = await fetch(`${API_BASE_URL}/latest-observation?city=Malang%2C%20Indonesia`);
  if (!response.ok) {
    throw new Error('Failed to fetch current observation data.');
  }
  return await response.json();
}


export async function fetchRecommendation(user: User): Promise<Recommendation> {
  const token = await user.getIdToken();
  if (!token) throw new Error('Authentication token not found.');

  const userProfileRef = doc(db, 'user_profiles', user.uid);
  const userProfileSnap = await getDoc(userProfileRef);

  if (!userProfileSnap.exists()) {
    throw new Error('User profile not found.');
  }
  const userProfile = userProfileSnap.data();

  const response = await fetch(`${API_BASE_URL}/recommend-activity`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_profile: {
        childName: userProfile.childName,
        childAge: userProfile.childAge,
        healthSensitivities: userProfile.healthSensitivities,
        activityPreferences: userProfile.activityPreferences,
      },
      city: "Malang, Indonesia",
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendation.');
  }

  return await response.json();
}