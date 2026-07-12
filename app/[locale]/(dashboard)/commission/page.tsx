"use client";

import { useState } from "react";
import CommissionHistoryTable from "@/components/dashboard/commission/commission-history-table";
import CommissionStats from "@/components/dashboard/commission/commission-stats";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetSettingsQuery } from "@/redux/features/settings/settingsApi";
import { useGetCommissionDataQuery, useGetThisMonthStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { DollarSign, Info, Loader2 } from "lucide-react";
import { TPaymentStatus } from "@/redux/features/payment/paymentApi";
import { useTranslations } from "next-intl";

export default function Commission() {
    const { data: settingsData, isLoading: settingsLoading } = useGetSettingsQuery();
    const { data: commissionData, isLoading: commissionLoading } = useGetCommissionDataQuery();
    const { data: thisMonthData, isLoading: thisMonthLoading } = useGetThisMonthStatsQuery();
    const [status, setStatus] = useState<TPaymentStatus | "all">("all");
    const commissionRate = settingsData?.data?.payment?.commissionRate || 0;
    const t = useTranslations("commission");

    const isLoading = settingsLoading || commissionLoading || thisMonthLoading;

    const commissionStats = [
        {
            title: t("stats.totalEarnedCommission"),
            value: `${(commissionData?.data.totalCommission || 0).toLocaleString()} CFA`,
            description: t("stats.fromAllOrders", { rate: commissionRate }),
            badge: t("stats.total"),
            bgColor: "bg-[#2f6bf8]",
            textColor: "text-blue-100",
            subTextColor: "text-blue-200",
            icon: "TrendingUp",
        },
        {
            title: t("stats.thisMonthCommission"),
            value: `${(commissionData?.data.thisMonthCommission || 0).toLocaleString()} CFA`,
            description: t("stats.readyToWithdraw"),
            badge: t("stats.ready"),
            bgColor: "bg-[#12b362]",
            textColor: "text-emerald-100",
            subTextColor: "text-emerald-200",
            icon: "CheckCircle2",
        },
        {
            title: t("stats.pendingEscrow"),
            value: `${(commissionData?.data.pendingEscrow || 0).toLocaleString()} CFA`,
            description: t("stats.inDisputeWindow"),
            badge: t("stats.waiting"),
            bgColor: "bg-[#fb610c]",
            textColor: "text-orange-100",
            subTextColor: "text-orange-200",
            icon: "Clock",
        },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("title")}</h1>
                <p className="text-slate-500">{t("description")}</p>
            </div>

            <CommissionStats data={commissionStats} />

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start ">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 fill-blue-100" />
                <div>
                    <span className="font-semibold block mb-0.5">{t("policy.title")}</span>
                    <p className="text-blue-700">{t("policy.message")}</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Select value={status} onValueChange={(val) => setStatus(val as TPaymentStatus | "all")}>
                    <SelectTrigger className="h-11 w-40 bg-white border-slate-200">
                        <SelectValue placeholder={t("filter.allStatus")} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">{t("filter.allStatus")}</SelectItem>
                        <SelectItem value="PENDING">{t("filter.pending")}</SelectItem>
                        <SelectItem value="COMPLETED">{t("filter.completed")}</SelectItem>
                        <SelectItem value="FAILED">{t("filter.failed")}</SelectItem>
                        <SelectItem value="REFUNDED">{t("filter.refunded")}</SelectItem>
                        <SelectItem value="CANCELLED">{t("filter.cancelled")}</SelectItem>
                        <SelectItem value="DISPUTED">{t("filter.disputed")}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <CommissionHistoryTable commissionRate={commissionRate} status={status === "all" ? undefined : status} />

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">{t("rate.title")}</h2>
                        <div className="bg-slate-50/50 rounded-xl p-6 flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{t("rate.currentRate")}</p>
                                <div className="text-4xl font-black text-slate-800">{commissionRate}%</div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <DollarSign className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="text-sm">
                            <p className="text-slate-500 mb-3">{t("rate.appliedTo")}</p>
                            <ul className="space-y-2 text-slate-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    {t("rate.productSales")}
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    {t("rate.serviceTransactions")}
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    {t("rate.digitalGoods")}
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">{t("thisMonth.title")}</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">{t("thisMonth.totalOrders")}</span>
                                <span className="font-bold text-slate-900 text-lg">{thisMonthData?.data.totalOrders}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">{t("thisMonth.commissionEarned")}</span>
                                <span className="font-bold text-emerald-600 text-lg">{thisMonthData?.data.commissionEarned.toLocaleString()} CFA</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">{t("thisMonth.averagePerOrder")}</span>
                                <span className="font-bold text-orange-600 text-lg">{thisMonthData?.data.averagePerOrder} CFA</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">{t("thisMonth.growthVsLastMonth")}</span>
                                <span className="font-bold text-purple-600 text-lg">+{thisMonthData?.data.growthVsLastMonth}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
