import { SidebarTrigger } from "@/components/ui/sidebar";
export const AppHeader = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4  
    glass">
      <SidebarTrigger />
    </header>
  );
};