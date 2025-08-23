// File: src/components/app-sidebar.tsx

"use client";

import * as React from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Map, LineChart, User, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

const navItems = [
  { href: '/today', icon: Home, label: 'Today' },
  { href: '/explore', icon: Map, label: 'Explore' },
  { href: '/forecast', icon: LineChart, label: 'Forecast' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const handleLogout = async () => {
      await signOutUser();
      router.push('/'); 
    };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Image 
          src="/images/logo-with-text.png" 
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
                  <DialogTitle>Confirm Logout</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to log out? You will be signed out and redirected to the login page.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button type="submit" variant={"destructive"} onClick={handleLogout}>Log Out</Button>
                </DialogFooter>
              </DialogContent>
              </form>
        </Dialog>
      </SidebarFooter> */}
    </Sidebar>
  )
}
