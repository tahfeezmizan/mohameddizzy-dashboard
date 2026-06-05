"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const locales = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
];

export function LanguageSwitch() {
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

    return (
        <div className="flex items-center gap-2">
            {locales.map((locale) => (
                <Button key={locale.code} size="sm" onClick={() => changeLocale(locale.code)} className={`h-8 cursor-pointer px-3 font-medium transition-all duration-200 ${currentLocale === locale.code ? "bg-[#155DFC] text-white hover:bg-[#0f46c0] border-[#155DFC]" : "bg-white text-slate-700 border-slate-200 hover:border-[#155DFC] hover:text-[#155DFC]"}`}>
                    {locale.code.toUpperCase()}
                </Button>
            ))}
        </div>
    );
}
