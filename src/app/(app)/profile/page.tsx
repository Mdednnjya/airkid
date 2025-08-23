"use client";

import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutUser();
    router.push('/'); 
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
      <p className="mt-2 text-gray-600">
        Manage your personalization settings and account details.
      </p>
      <Button 
        variant="destructive" 
        className="mt-8" 
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </div>
  );
}