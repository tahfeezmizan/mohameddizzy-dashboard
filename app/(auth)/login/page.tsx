"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data).unwrap();
      
      if (res.success) {
        dispatch(setUser({ user: res.data.user, token: res.data.accessToken }));
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-70px)] ">
      <div className="w-full md:w-lg bg-[#FFC107]/10 p-10 rounded-2xl">
        {/* Welcome Text */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Sign In</h2>
          <p className="text-sm text-[#757575]">
            Access your premium marketplace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#424242] ml-1">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
              <Input
                type="email"
                placeholder="your@email.com"
                required
                {...register("email")}
                className="w-full pl-12 pr-4 py-6  bg-white border border-[#E0E0E0] rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:border-transparent transition-all shadow-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-[#424242] ml-1">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9E9E9E]" />
              <Input
                type="password"
                placeholder="••••••••"
                required
                {...register("password")}
                className="w-full pl-12 pr-4 py-6  bg-white border border-[#E0E0E0] rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:border-transparent transition-all shadow-none"
              />
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-5.5 text-base! bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
