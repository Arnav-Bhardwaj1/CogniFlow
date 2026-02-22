import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative z-10">
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
