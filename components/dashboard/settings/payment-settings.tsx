"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/lib/settings-header-section";
import { CircleAlert, DollarSign } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

interface PaymentSettingsProps {
    data: {
        commissionRate: number;
        escrowDuration: number;
    };
    onChange: (val: Partial<{ commissionRate: number; escrowDuration: number }>) => void;
}

export default function PaymentSettings({ data, onChange }: PaymentSettingsProps) {
    const t = useTranslations("settings.payment");
    return (
        <Card className="shadow-sm border-slate-200 py-0">
            <CardContent className="p-6">
                <SectionHeader icon={<DollarSign className="h-4.5 w-4.5" />} title={t("title")} iconBg="bg-blue-50" iconColor="text-blue-500" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Commission Rate */}
                    <div>
                        <p className="text-sm font-medium text-slate-600 mb-3">{t("commissionRate")}</p>
                        <div className="flex items-center gap-4">
                            <input id="commission-rate" type="range" min={1} max={50} value={data.commissionRate} onChange={(e) => onChange({ commissionRate: Number(e.target.value) })} className="flex-1 accent-blue-600 h-2 rounded-full cursor-pointer" />
                            <span className="text-2xl font-bold text-blue-600 w-14 text-right">{data.commissionRate}%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{t("commissionDescription")}</p>
                    </div>

                    {/* Escrow Duration */}
                    <div>
                        <p className="text-sm font-medium text-slate-600 mb-3">{t("escrowDuration")}</p>
                        <div className="flex items-center gap-4">
                            <input id="escrow-duration" type="range" min={12} max={168} step={12} value={data.escrowDuration} onChange={(e) => onChange({ escrowDuration: Number(e.target.value) })} className="flex-1 accent-blue-600 h-2 rounded-full cursor-pointer" />
                            <span className="text-2xl font-bold text-blue-600 w-14 text-right">{data.escrowDuration}h</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{t("escrowDescription")}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
