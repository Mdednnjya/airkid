export type SidebarMenuType = {
    [role: string]: {
        title: string,
        items: SidebarMenuItemType[]
    }[]
    
}

export type SidebarMenuItemType = {
    title: string,
    url: string,
    icon: any
}
