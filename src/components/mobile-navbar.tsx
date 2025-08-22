"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, LineChart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItemsMobile = [
  { href: '/today', icon: Home, label: 'Today' },
  { href: '/explore', icon: Map, label: 'Explore' },
  { href: '/forecast', icon: LineChart, label: 'Forecast' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-50">
      {navItemsMobile.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 w-full pt-2 pb-1",
            pathname === item.href ? "text-primary" : "text-gray-500"
          )}
        >
          <item.icon size={24} />
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
