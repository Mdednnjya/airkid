"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && !user) {
    router.push("/");
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      <div className="max-w-md">
        <svg
          className="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l-1.5-1.5M12 19l1.5-1.5M12 19v-4m0-4l1.5 1.5M12 11l-1.5 1.5"
          />
        </svg>
        <h1 className="mt-8 text-4xl font-bold text-gray-800">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! It looks like this page has floated away. Let&apos;s get you back on track.
        </p>
        {user ? (
          <Button asChild className="mt-8">
            <Link href="/today">Go to My Dashboard</Link>
          </Button>
        ) : (
          <Button asChild className="mt-8">
            <Link href="/">Back to Home</Link>
          </Button>
        )}
      </div>
    </div>
  );
}