"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { ChevronDown, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TodayHeader() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState("");
  const [childName, setChildName] = useState("Your Child");

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    const fetchProfile = async () => {
      if (user) {
        const userProfileRef = doc(db, "user_profiles", user.uid);
        const docSnap = await getDoc(userProfileRef);
        if (docSnap.exists()) {
          setChildName(docSnap.data().childName || "Your Child");
        }
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div className="flex items-center justify-between lg:justify-center lg:space-x-20">
      <div>
        <div className="flex items-center space-x-1 lg:space-x-2 cursor-pointer">
          <h1 className="text-lg font-semibold text-gray-800 lg:text-xl">
            Malang, East Java
          </h1>
          <ChevronDown className="h-4 w-4 text-gray-600 lg:h-5 lg:w-5" />
        </div>
        <p className="text-sm text-gray-600 lg:text-base">{currentDate}</p>
      </div>
      <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
        <AvatarImage src={user?.photoURL || ""} />
        <AvatarFallback>
          <User className="h-5 w-5 lg:h-6 lg:w-6" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}