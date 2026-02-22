import { SidebarTrigger } from "@/components/ui/sidebar";
export const AppHeader = () => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4  
    glass">
      <SidebarTrigger className="!bg-black/10 hover:!bg-black/20 dark:!bg-white/10 dark:hover:!bg-white/20 !border-2 !border-black/20 dark:!border-white/20" />
    </header>
  );
};