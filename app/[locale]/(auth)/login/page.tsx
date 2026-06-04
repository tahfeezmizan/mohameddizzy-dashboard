"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

type FormValues = {
    phone: string;
    password: string;
};

export default function LoginPage() {
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            phone: "+8801100000000",
            password: "123456",
        },
    });
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { getPath } = useLocale();

    const onSubmit = async (data: FormValues) => {
        try {
            const res = await login(data).unwrap();

            if (res.success) {
                dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
                toast.success("Login successful");
                router.push(getPath("/"));
            } else {
                toast.error(res.message || "Login failed");
            }
        } catch (err: any) {
            toast.error(err?.data?.message || err?.data?.err?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0F172B] px-4">
            <div className="w-full max-w-100 space-y-8 bg-white/5 p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4">
                    <Image src={logo} alt="logo" width={120} height={120} className="w-24 object-contain" />
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-white">Admin Login</h1>
                        <p className="text-sm text-slate-400">Access your dashboard</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* Phone */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                Phone Number
                            </Label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="phone" type="tel" placeholder="+8801100000000" required {...register("phone")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-medium text-slate-400 uppercase tracking-wider ml-1">
                                Password
                            </Label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <Input id="password" type="password" placeholder="••••••••" required {...register("password")} className="h-12 pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all rounded-xl shadow-none" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link href={getPath("/forgot-password")} className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
                    </Button>
                </form>

                <p className="text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} Djarna Admin</p>
            </div>
        </div>
    );
}
