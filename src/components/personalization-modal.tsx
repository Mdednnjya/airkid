"use client";

import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { PersonalizationModalProps } from "@/lib/types";
import Image from "next/image";

export function PersonalizationModal({ user, onClose }: PersonalizationModalProps) {
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    healthSensitivities: [] as string[],
    activityPreferences: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userProfileRef = doc(db, "user_profiles", user.uid);
      await setDoc(userProfileRef, {
        email: user.email,
        ...formData,
      });
      onClose();
    } catch (error) {
      console.error("Error creating user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent
        className="sm:max-w-md overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Welcome to AirKid!</DialogTitle>
          <div className="flex justify-center my-4">
            <Image
              src="/images/onboarding-dialog.svg"
              alt="Onboarding Illustration"
              width={150}
              height={150}
              priority
            />
          </div>
          <DialogDescription>
            To give you the best recommendations, please tell us a little about your child.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child&apos;s First Name</Label>
            <Input
              id="childName"
              placeholder="e.g., Budi"
              value={formData.childName}
              onChange={(e) => setFormData((prev) => ({ ...prev, childName: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="childAge">Child&apos;s Age</Label>
            <Select
              value={formData.childAge}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, childAge: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {[4, 5, 6, 7, 8, 9].map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Health Sensitivities</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="asthma"
                  checked={formData.healthSensitivities.includes("Asthma or other respiratory sensitivities")}
                  onCheckedChange={(checked) =>
                    handleHealthSensitivityChange("Asthma or other respiratory sensitivities", checked as boolean)
                  }
                />
                <Label htmlFor="asthma" className="text-sm font-normal">
                  Asthma or other respiratory sensitivities
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allergies"
                  checked={formData.healthSensitivities.includes("Seasonal allergies")}
                  onCheckedChange={(checked) =>
                    handleHealthSensitivityChange("Seasonal allergies", checked as boolean)
                  }
                />
                <Label htmlFor="allergies" className="text-sm font-normal">
                  Seasonal allergies
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Activity Preferences</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="active"
                  checked={formData.activityPreferences.includes("Loves active & energetic play")}
                  onCheckedChange={(checked) =>
                    handleActivityPreferenceChange("Loves active & energetic play", checked as boolean)
                  }
                />
                <Label htmlFor="active" className="text-sm font-normal">
                  Loves active & energetic play
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="calm"
                  checked={formData.activityPreferences.includes("Prefers calm & creative activities")}
                  onCheckedChange={(checked) =>
                    handleActivityPreferenceChange("Prefers calm & creative activities", checked as boolean)
                  }
                />
                <Label htmlFor="calm" className="text-sm font-normal">
                  Prefers calm & creative activities
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="learning"
                  checked={formData.activityPreferences.includes("Enjoys learning & discovery")}
                  onCheckedChange={(checked) =>
                    handleActivityPreferenceChange("Enjoys learning & discovery", checked as boolean)
                  }
                />
                <Label htmlFor="learning" className="text-sm font-normal">
                  Enjoys learning & discovery
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}