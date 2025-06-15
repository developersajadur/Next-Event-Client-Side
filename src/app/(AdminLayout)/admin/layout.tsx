import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  Logo,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="h-[106px] shrink-0 items-center gap-2 transition-[width,height] ease-linear border-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 bg-[#1E3A8A] flex justify-between">
          <div className="px-4 ml-8 bg-white rounded-full">
            <SidebarTrigger className="w-8 h-8" />
          </div>
          <Logo />
        </header>

        <div className=" min-h-screen px-4 sm:px-6 lg:px-8 py-6">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
