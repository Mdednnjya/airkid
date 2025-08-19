import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/footer";
import Footer from "@/components/header";
import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({children}: {children: React.ReactNode}) {

    return (
        <div>
            <SidebarProvider>
                <AppSidebar variant="inset"/>
                <SidebarInset>
                    <main className="px-4 py-4">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}