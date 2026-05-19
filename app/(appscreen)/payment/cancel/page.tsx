"use client";

import { Button } from "@/components/ui/button";
import { XCircle, Loader2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentCancelPage() {
    const [showAppStores, setShowAppStores] = useState(false);

    const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=your.app.id";
    const APP_STORE_URL = "https://apps.apple.com/app/your-app-id";

    useEffect(() => {
        setTimeout(() => {
            window.location.href = "djarna://payment-cancel";
        }, 500);

        setTimeout(() => {
            setShowAppStores(true);
        }, 1500);
    }, []);

    const userAgent = navigator.userAgent;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <XCircle className="w-12 h-12" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">Payment Cancelled</h1>
                    <p className="text-slate-500">Opening Djarna to continue...</p>
                </div>

                {showAppStores && (
                    <div className="space-y-4 pt-4">
                        <p className="text-sm text-slate-500">Don't have the app yet?</p>
                        <div className="flex flex-col gap-3">
                            {isAndroid && (
                                <Button onClick={() => window.open(PLAY_STORE_URL, "_blank")} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    Get it on Google Play
                                </Button>
                            )}
                            {isIOS && (
                                <Button onClick={() => window.open(APP_STORE_URL, "_blank")} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                    Download on App Store
                                </Button>
                            )}
                            {!isAndroid && !isIOS && (
                                <p className="text-sm text-slate-400">Please visit us on your mobile device.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}