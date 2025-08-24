import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth, provider, signInWithPopup } from "./firebase";
import { signOut } from "firebase/auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
}