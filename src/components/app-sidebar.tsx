"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  CreditCardIcon,
  JoystickIcon,
  KeyIcon,
  Loader2Icon,
  LogOutIcon,
  StarIcon,
  FolderOpenIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";

const menuItems = [
  {
    title: "Workflows",
    url: "/workflows",
    icon: FolderOpenIcon,
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: KeyIcon,
  },
  {
    title: "Executions",
    url: "/executions",
    icon: JoystickIcon,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [navigatingUrl, setNavigatingUrl] = useState<string | null>(null);
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();

  useEffect(() => {
    setNavigatingUrl(null);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton asChild className="gap-x-4 h-12 px-4 bg-white/[0.04] border-b border-white/[0.06]">
          <Link href="/" prefetch>
            <Image src="/logos/logo.svg" alt="CogniFlow" width={32} height={32} />
            <span className="text-sm font-bold text-white tracking-wide">CogniFlow</span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((menuItem) => (
                <SidebarMenuItem key={menuItem.title}>
                  <SidebarMenuButton
                    tooltip={menuItem.title}
                    isActive={menuItem.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(menuItem.url)
                    }
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link
                      href={menuItem.url}
                      prefetch
                      onClick={() => {
                        if (pathname !== menuItem.url) {
                          setNavigatingUrl(menuItem.url);
                        }
                      }}
                    >
                      {navigatingUrl === menuItem.url ? (
                        <Loader2Icon className="size-4 animate-spin" />
                      ) : (
                        <menuItem.icon className="size-4" />
                      )}
                      <span>{menuItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                asChild
                className="gap-x-4 h-10 px-4"
                onClick={() => authClient.checkout({ slug: "CogniFlow-Pro" })}
              >
                <Link href="/" prefetch>
                  <StarIcon className="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>)}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={hasActiveSubscription ? "View Billing" : "Upgrade to Pro"}
              asChild
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.customer.portal()}
            >
              <Link href="/" prefetch>
                <CreditCardIcon className="h-4 w-4" />
                <span>Billing Portal</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-4 cursor-pointer"
              disabled={isSigningOut}
              onClick={async () => {
                setIsSigningOut(true);
                await authClient.signOut();
                queryClient.clear();
                router.refresh();
                router.push("/");
              }}
            >
              {isSigningOut ? (
                <><Loader2Icon className="h-4 w-4 animate-spin" /><span>Signing out...</span></>
              ) : (
                <><LogOutIcon className="h-4 w-4" /><span>Sign Out</span></>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
