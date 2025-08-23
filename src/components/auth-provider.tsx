"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { PersonalizationModal } from './personalization-modal';
import { LoadingSpinner } from './loading-spinner';
import { AuthContextType } from '@/lib/types';
import { AppSkeleton } from './app-skeleton';

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is authenticated, now check for profile
        setUser(firebaseUser);
        const userProfileRef = doc(db, 'user_profiles', firebaseUser.uid);
        const userProfileSnap = await getDoc(userProfileRef);

        if (!userProfileSnap.exists()) {
          // New user, show the modal
          setShowPersonalizationModal(true);
        }
      } else {
        // User is not authenticated
        setUser(null);
      }
      
      // Set loading to false only after all checks are done
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleModalClose = () => {
    setShowPersonalizationModal(false);
  };

  // While the initial auth check is running, show a loading spinner
  if (loading) {
    return <AppSkeleton />;
  }

  return (
    <AuthContext.Provider value={{ user, loading: false }}>
      {children}
      {showPersonalizationModal && <PersonalizationModal user={user} onClose={handleModalClose} />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
