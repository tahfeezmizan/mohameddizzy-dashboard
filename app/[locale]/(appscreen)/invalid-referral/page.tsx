"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvalidReferralPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <ShieldAlert className="w-10 h-10" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">Invalid Referral Link</h1>
                    <p className="text-slate-500">Oops! The referral link you're trying to use is either invalid or has expired.</p>
                </div>
                <Button onClick={() => router.push("/")} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
