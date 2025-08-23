"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LandingPageHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logo-with-text.png" 
            alt="AirKid Logo" 
            width={80} 
            height={80}
            className="rounded-full"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-md font-medium items-center">
          <Link href="#overview" className="font-bold text-gray-00 hover:text-primary">Overview</Link>
          <Link href="#features" className="font-bold text-gray-600 hover:text-primary">Features</Link>
          <Link href="#how" className="font-bold  text-gray-600 hover:text-primary">How</Link>
          <Link href="#about" className="font-bold text-gray-600 hover:text-primary">About</Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button asChild variant="default" className='bg-white text-[#0266B8] rounded-full font-bold hover:bg-grey-20 hover:shadow-md transition-all'>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild className='rounded-full font-bold  hover:shadow-md transition-all'>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}