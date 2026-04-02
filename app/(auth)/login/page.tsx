"use client";

import SocialLogin from "@/components/shared/social-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function page() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
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
                {...register("password")}
                className="w-full pl-12 pr-4 py-6  bg-white border border-[#E0E0E0] rounded-lg focus-visible:ring-2 focus-visible:ring-blue-600/50 focus-visible:border-transparent transition-all shadow-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right">
            <Link
              href={"/"}
              className="font-semibold text-primary font-public-sans cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div> */}

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full px-6 py-5.5 text-base! bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        {/* <div className="w-full flex items-center my-8">
          <div className="flex-1 h-px bg-[#EEEEEE]"></div>
          <span className="px-4 text-[10px] font-medium text-[#9E9E9E] uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-[#EEEEEE]"></div>
        </div> */}

        {/* Social Login */}
        {/* <SocialLogin />

        
        <div className="text-sm text-center mt-6">
          <span className="text-[#0A0A0A]">Don't have an account? </span>
          <Link
            href="/register"
            className="text-base font-semibold text-primary font-public-sans cursor-pointer hover:underline"
          >
            Create an account
          </Link>
        </div> */}
      </div>
    </div>
  );
}
