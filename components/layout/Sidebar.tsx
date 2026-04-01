"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import logo from "@/../public/logo.png";
import {
  DollarSign,
  LayoutDashboard,
  List,
  LogOut,
  Scale,
  Settings,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const { setOpenMobile } = useSidebar();

  return (
    <ShadcnSidebar className="text-slate-400 bg-[#0F172B]!">
      <div className="flex items-center justify-center bg-[#0F172B] py-2 pb-6">
        <Link href="/" onClick={() => setOpenMobile(false)}>
          <Image
            src={logo}
            alt="logo"
            width={500}
            height={500}
            className="w-32 object-cover"
          />
        </Link>
      </div>

      <SidebarContent className="bg-[#0F172B]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2.5">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      render={
                        <Link
                          href={item.href}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                      className={`h-12 px-3 transition-colors hover:bg-[#155DFC] text-white! ${
                        isActive ? "bg-[#155DFC]! text-white" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="size-5.5! shrink-0" />
                        <span className="truncate text-base">{item.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="shrink-0 pb-6 bg-[#0F172B]">
        <SidebarMenu className="gap-2">
          <SidebarMenuItem className="relative mx-3 px-5 py-2 transition-colors rounded-md bg-red-500">
            <SidebarMenuButton className="text-base! flex items-center text-white hover:text-white gap-2.5 p-0! bg-transparent! focus-visible:shadow-none">
              <LogOut className="size-6!" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </ShadcnSidebar>
  );
}
