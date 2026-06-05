"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const locales = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
];

export function LanguageSwitch() {
    const currentLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const changeLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
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
