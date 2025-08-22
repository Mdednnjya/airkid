// File: src/components/app-sidebar.tsx

"use client";

import * as React from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Map, LineChart, User } from "lucide-react";
import Image from "next/image";

const navItems = [
  { href: '/today', icon: Home, label: 'Today' },
  { href: '/explore', icon: Map, label: 'Explore' },
  { href: '/forecast', icon: LineChart, label: 'Forecast' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image 
          src="/AirKid-logo-with-text.jpg" 
          alt="AirKid Logo" 
          width={120} 
          height={120}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* Todo: Decide Later */}
      {/* <SidebarFooter>
        <Dialog>
            <DialogTrigger asChild><Button variant={"outline"}> <LogOutIcon/> Logout</Button></DialogTrigger>
              <form action="">
              <DialogContent>
                
                <DialogHeader>
                  <DialogTitle>Are you sure want to Log Out?</DialogTitle>
                  <DialogDescription>You will be signed out of your account and redirect to login page.</DialogDescription>
                </DialogHeader>
                <br />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>cancel</Button>
                  </DialogClose>
                  <Button type="submit">Logout</Button>
                </DialogFooter>
            </DialogContent>
              </form>
        </Dialog>
      </SidebarFooter> */}
    </Sidebar>
  )
}
