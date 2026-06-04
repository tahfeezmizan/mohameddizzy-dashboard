"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { NotificationBell } from "./NotificationBell";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const locales = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
];

export function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [currentLocale, setCurrentLocale] = useState("fr");

    useEffect(() => {
        const pathSegments = pathname.split("/");
        const firstSegment = pathSegments[1];
        const localeFromPath = locales.find((l) => l.code === firstSegment);
        if (localeFromPath) {
            setCurrentLocale(localeFromPath.code);
        } else {
            const savedLocale = localStorage.getItem("locale");
            if (savedLocale && locales.find((l) => l.code === savedLocale)) {
                setCurrentLocale(savedLocale);
            }
        }
    }, [pathname]);

    const changeLocale = (newLocale: string) => {
        const pathWithoutLocale = pathname.split("/").slice(2).join("/");
        const newPath = `/${newLocale}${pathWithoutLocale ? "/" + pathWithoutLocale : ""}`;
        localStorage.setItem("locale", newLocale);
        router.push(newPath);
    };

    if (pathname.includes("/login") || pathname.includes("/register")) {
        return null;
    }
    return (
        <header className="sticky top-0 z-30 flex shrink-0 h-16 items-center justify-between gap-2 border-b bg-white px-2 sm:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 lg:hidden" />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    {locales.map((locale) => (
                        <Button key={locale.code} size="sm" onClick={() => changeLocale(locale.code)} className={`h-8 cursor-pointer px-3 font-medium transition-all duration-200 ${currentLocale === locale.code ? "bg-[#155DFC] text-white hover:bg-[#0f46c0] border-[#155DFC]" : "bg-white text-slate-700 border-slate-200 hover:border-[#155DFC] hover:text-[#155DFC]"}`}>
                            {locale.code.toUpperCase()}
                        </Button>
                    ))}
                </div>
                <NotificationBell />

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
