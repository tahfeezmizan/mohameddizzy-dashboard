"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Smartphone, Globe } from "lucide-react";
import { useEffect, useState, use } from "react";
import { useValidateReferralCodeQuery } from "@/redux/features/auth/authApi";
import { useTranslations } from "next-intl";

export default function ReferralPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = use(params);
    const [showAppStores, setShowAppStores] = useState(false);
    const t = useTranslations("appscreen");

    const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=your.app.id";
    const APP_STORE_URL = "https://apps.apple.com/app/your-app-id";

    const { data, isLoading, error } = useValidateReferralCodeQuery(code);

    useEffect(() => {
        if (data?.data?.valid) {
            setTimeout(() => {
                window.location.href = `djarna://signup?referralCode=${code}`;
            }, 500);

            setTimeout(() => {
                setShowAppStores(true);
            }, 1500);
        }
    }, [data, code]);

    const userAgent = navigator.userAgent;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !data?.data?.valid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <Globe className="w-10 h-10" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-slate-900">{t("referral.invalidTitle")}</h1>
                        <p className="text-slate-500">{t("referral.invalidDescription")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Smartphone className="w-12 h-12" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">{t("referral.opening")}</h1>
                    <p className="text-slate-500">{data?.data?.referrerName ? t("referral.invitedBy", { name: data.data.referrerName }) : t("referral.invitedGeneral")}</p>
                </div>

                {showAppStores && (
                    <div className="space-y-4 pt-4">
                        <p className="text-sm text-slate-500">{t("payment.noApp")}</p>
                        <div className="flex flex-col gap-3">
                            {isAndroid && (
                                <Button onClick={() => window.open(PLAY_STORE_URL, "_blank")} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                    {t("payment.getGooglePlay")}
                                </Button>
                            )}
                            {isIOS && (
                                <Button onClick={() => window.open(APP_STORE_URL, "_blank")} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                    {t("payment.downloadAppStore")}
                                </Button>
                            )}
                            {!isAndroid && !isIOS && <p className="text-sm text-slate-400">{t("payment.mobileOnly")}</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
