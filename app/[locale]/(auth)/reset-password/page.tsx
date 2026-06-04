"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, KeyRound, Loader2, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";

type FormValues = {
    otp: string;
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordPage() {
    const [phone, setPhone] = useState<string | null>(null);
    const { register, handleSubmit, watch } = useForm<FormValues>();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const router = useRouter();

    const password = watch("password");

    useEffect(() => {
        const storedPhone = sessionStorage.getItem("reset_phone");
        if (!storedPhone) {
            toast.error("Session expired. Please request a new OTP.");
            router.push("/forgot-password");
        } else {
            setPhone(storedPhone);
        }
    }, [router]);

    const onSubmit = async (data: FormValues) => {
        if (!phone) return;

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await resetPassword({
                phone,
                otp: data.otp,
                newPassword: data.password,
            }).unwrap();

            if (res.success) {
                toast.success(res.message || "Password reset successful");
                sessionStorage.removeItem("reset_phone");
                router.push("/login");
            } else {
                toast.error(res.message || "Reset failed");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || err?.data?.err?.message || "Something went wrong. Please try again.");
        }
    };

    if (!phone) return null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0F172B] px-4">
            <div className="w-full max-w-100 space-y-8 bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4">
                    <Image src={logo} alt="logo" width={120} height={120} className="w-24 object-contain" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-white">Reset Password</h1>
                        <p className="text-sm text-slate-400">Enter the 6-digit OTP and your new password</p>
                        <p className="text-xs text-blue-400 mt-1">Sent to {phone}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* OTP */}
                        <div className="space-y-2">
                            <Label htmlFor="otp" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                Verification Code (OTP)
                            </Label>
                            <div className="relative group">
                                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="otp" type="text" placeholder="123456" maxLength={6} required {...register("otp")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                New Password
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="password" type="password" placeholder="••••••••" required {...register("password")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                Confirm New Password
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="confirmPassword" type="password" placeholder="••••••••" required {...register("confirmPassword")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}
                    </Button>
                </form>

                <div className="text-center">
                    <Link href="/forgot-password" className="inline-flex items-center text-xs font-medium text-blue-500 hover:text-blue-400 transition-colors">
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Resend OTP
                    </Link>
                </div>

                <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Djarna Admin</p>
            </div>
        </div>
    );
}
