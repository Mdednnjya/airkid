"use client";

import { useAuth } from './auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from './loading-spinner';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to sign-in
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading, router]);

  // While loading, you can show a spinner or a blank screen
  if (loading) {
    return <LoadingSpinner/>; // Or a nice loading spinner component
  }

  // If there is a user, render the children (the actual page)
  if (user) {
    return <>{children}</>;
  }

  // If no user and not loading (should be covered by useEffect, but as a fallback)
  return null;
}