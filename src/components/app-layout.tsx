"use client";

import { useIsMobile } from '@/hooks/use-mobile';
import { AppSidebar } from '@/components/app-sidebar';
import { MobileNavbar } from '@/components/mobile-navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50/50">
        {/* Show sidebar only on desktop, using your existing Shadcn component */}
        {!isMobile && <AppSidebar />}

        {/* The main content area */}
        <SidebarInset className="flex-1 pb-20 md:pb-0">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </SidebarInset>

        {/* Show bottom navbar only on mobile, fixed to the bottom */}
        {isMobile && <MobileNavbar />}
      </div>
    </SidebarProvider>
  );
}