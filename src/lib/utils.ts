import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth, provider, signInWithPopup } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result)
  } catch (error) {
    console.error(error);
  }
}

export async function LogOut() {
  try {
    // will perform logout here, todo
  } catch (error) {

  }
}