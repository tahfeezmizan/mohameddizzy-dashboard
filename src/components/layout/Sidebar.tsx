"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Scale,
  DollarSign,
  List,
  Users,
  ShoppingCart,
  Settings,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Boost Packs", href: "/boost-packs", icon: Zap },
  { name: "Disputes", href: "/disputes", icon: Scale },
  { name: "Commission", href: "/commission", icon: DollarSign },
  { name: "Categories", href: "/categories", icon: List },
  { name: "Users", href: "/users", icon: Users },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <ShadcnSidebar className="border-r border-[#1e293b] bg-[#0f172a]! text-slate-400">
      <SidebarHeader className="h-16 border-b border-[#1e293b] bg-[#0f172a]! flex items-center justify-center px-6">
        <Link href="/" className="flex w-full items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase truncate">
            Djarna
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className="hover:bg-[#1e293b] hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white h-10 px-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
