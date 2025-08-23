// File: src/app/(app)/profile/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { signOutUser } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { ProfileFormData } from "@/lib/types";
import { ProfilePageSkeleton } from "@/components/profile-page-skeleton";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    childName: "",
    childAge: "",
    healthSensitivities: [],
    activityPreferences: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        setIsLoading(true);
        const userProfileRef = doc(db, 'user_profiles', user.uid);
        const docSnap = await getDoc(userProfileRef);
        if (docSnap.exists()) {
          // Set form data with existing profile
          const profileData = docSnap.data();
          setFormData({
            childName: profileData.childName || "",
            childAge: profileData.childAge || "",
            healthSensitivities: profileData.healthSensitivities || [],
            activityPreferences: profileData.activityPreferences || [],
          });
        }
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleHealthSensitivityChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      healthSensitivities: checked
        ? [...prev.healthSensitivities, value]
        : prev.healthSensitivities.filter((item) => item !== value),
    }));
  };

  const handleActivityPreferenceChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      activityPreferences: checked
        ? [...prev.activityPreferences, value]
        : prev.activityPreferences.filter((item) => item !== value),
    }));
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const userProfileRef = doc(db, 'user_profiles', user.uid);
      await setDoc(userProfileRef, { ...formData, email: user.email }, { merge: true });
      toast.success("Profile Updated", {
        description: "Your personalization settings have been saved.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error", {
        description: "Could not update your profile. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogOut = async () => {
    await signOutUser();
    router.push('/');
  };
  
  if (isLoading) {
    return <ProfilePageSkeleton/>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-muted-foreground">Manage your personalization settings and account details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personalization Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childName">Child's First Name</Label>
                <Input
                  id="childName"
                  placeholder="e.g., Budi"
                  value={formData.childName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, childName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="childAge">Child's Age</Label>
                <Select
                  value={formData.childAge}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, childAge: value }))}
                >
                  <SelectTrigger><SelectValue placeholder="Select age" /></SelectTrigger>
                  <SelectContent>
                    {[4, 5, 6, 7, 8, 9].map((age) => (
                      <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Health Sensitivities</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asthma" checked={formData.healthSensitivities.includes("Asthma")} onCheckedChange={(checked) => handleHealthSensitivityChange("Asthma", checked as boolean)} />
                    <Label htmlFor="asthma" className="text-sm font-normal">Asthma</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allergies" checked={formData.healthSensitivities.includes("Allergies")} onCheckedChange={(checked) => handleHealthSensitivityChange("Allergies", checked as boolean)} />
                    <Label htmlFor="allergies" className="text-sm font-normal">Allergies</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Activity Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="active" checked={formData.activityPreferences.includes("Active")} onCheckedChange={(checked) => handleActivityPreferenceChange("Active", checked as boolean)} />
                    <Label htmlFor="active" className="text-sm font-normal">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="calm" checked={formData.activityPreferences.includes("Calm")} onCheckedChange={(checked) => handleActivityPreferenceChange("Calm", checked as boolean)} />
                    <Label htmlFor="calm" className="text-sm font-normal">Calm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="learning" checked={formData.activityPreferences.includes("Learning")} onCheckedChange={(checked) => handleActivityPreferenceChange("Learning", checked as boolean)} />
                    <Label htmlFor="learning" className="text-sm font-normal">Learning</Label>
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdateProfile} className="w-full" disabled={isUpdating}>
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm break-words">{user?.email}</p>
                </div>
              </div>
              <Button onClick={handleLogOut} variant="destructive" className="w-full">Log Out</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
