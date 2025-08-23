"use client";

import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PersonalizationModalProps } from '@/lib/types';

export function PersonalizationModal({ user, onClose }: PersonalizationModalProps) {
  const [childName, setChildName] = useState('');
  // Todo: Add other form fields here (age, sensitivities, etc.)

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const userProfileRef = doc(db, 'user_profiles', user.uid);
      await setDoc(userProfileRef, {
        email: user.email,
        childName: childName,
        // Todo: Save other form data
      });
      onClose(); 
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to KidAir! Tell us a little more.</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="childName">Child&apos;s Name</Label>
            <Input id="childName" value={childName} onChange={(e) => setChildName(e.target.value)} />
          </div>
          {/* Todo: Add other form fields */}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save and Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}