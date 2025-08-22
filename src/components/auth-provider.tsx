"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Mock: Assuming you export 'db' from your firebase config
import { PersonalizationModal } from './personalization-modal';
import { AuthContextType } from '@/lib/types';

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Check if user profile exists in Firestore
        const userProfileRef = doc(db, 'user_profiles', firebaseUser.uid);
        const userProfileSnap = await getDoc(userProfileRef);

        if (!userProfileSnap.exists()) {
          // This is a new user, show the personalization modal
          setShowPersonalizationModal(true);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleModalClose = () => {
    setShowPersonalizationModal(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? <div>Loading...</div> : children}
      {showPersonalizationModal && <PersonalizationModal user={user} onClose={handleModalClose} />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);