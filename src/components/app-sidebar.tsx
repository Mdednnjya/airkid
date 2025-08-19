"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarMenuType } from "@/lib/types"
import { Home, Library, Locate, LogOutIcon } from "lucide-react"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogTrigger
 } from "./ui/dialog"
import { Button } from "./ui/button"
import { LogOut } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const roleMenu: SidebarMenuType = {
  user : [
    {
      title: "Menu",
      items: [
        {
         title: "location",
         url: "/dashboard/location",
         icon: Locate
        },
        {
         title: "Dashboard",
         url: "/dashboard/insight",
         icon: Home 
        },
      ]
    },
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentPage = usePathname();


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        Air Kid Logo <br />
      </SidebarHeader>
      <SidebarContent>
        {roleMenu.user.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={currentPage === item.url}>
                      <Link href={item.url}>
                      <item.icon/>
                      {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
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
      </SidebarFooter>
    </Sidebar>
  )
}