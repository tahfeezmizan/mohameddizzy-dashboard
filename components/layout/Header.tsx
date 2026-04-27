"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register") {
        return null;
    }
    return (
        <header className="sticky top-0 z-30 flex shrink-0 h-16 items-center justify-between gap-2 border-b bg-white px-2 sm:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 lg:hidden" />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                <div className="flex items-center gap-3 border-l pl-6">
                    <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src="" alt="Admin user" />
                        <AvatarFallback className="bg-blue-600 text-white font-medium text-xs">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 leading-none mb-1">Admin</span>
                        <span className="text-xs text-slate-500 leading-none">Administrator</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
