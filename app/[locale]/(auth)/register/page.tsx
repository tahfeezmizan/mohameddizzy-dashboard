"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Phone, User, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useLocale } from "@/hooks/useLocale";
import { useTranslations } from "next-intl";
import { LanguageSwitch } from "@/components/shared/LanguageSwitch";

type FormValues = {
    name: string;
    phone: string;
    password: string;
};

export default function RegisterPage() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { getPath } = useLocale();
    const t = useTranslations("auth.register");

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0F172B] px-4 relative">
            {/* Language Switch - Top Right */}
            <div className="absolute top-6 right-6">
                <LanguageSwitch />
            </div>

            <div className="w-full max-w-100 space-y-8 bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4">
                    <Image src={logo} alt="logo" width={120} height={120} className="w-24 object-contain" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-white">{t("title")}</h1>
                        <p className="text-sm text-slate-400">{t("description")}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                {t("fullName")}
                            </Label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="name" type="text" placeholder="Admin User" required {...register("name")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                {t("phoneNumber")}
                            </Label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="phone" type="tel" placeholder="+8801100000000" required {...register("phone")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                {t("password")}
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="password" type="password" placeholder="••••••••" required {...register("password")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                        {t("createAccountButton")}
                    </Button>
                </form>

                <div className="text-center text-xs">
                    <span className="text-slate-500">{t("alreadyHaveAccount")}</span>
                    <Link href={getPath("/login")} className="font-bold text-blue-500 hover:text-blue-400 transition-colors">
                        {t("signIn")}
                    </Link>
                </div>

                <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Djarna Admin</p>
            </div>
        </div>
    );
}
