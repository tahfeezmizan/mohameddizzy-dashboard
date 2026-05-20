"use client";

import CommissionHistoryTable from "@/components/dashboard/commission/commission-history-table";
import CommissionStats from "@/components/dashboard/commission/commission-stats";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSettingsQuery } from "@/redux/features/settings/settingsApi";
import { useGetCommissionDataQuery, useGetThisMonthStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { DollarSign, Info, Loader2 } from "lucide-react";

export default function Commission() {
    const { data: settingsData, isLoading: settingsLoading } = useGetSettingsQuery();
    const { data: commissionData, isLoading: commissionLoading } = useGetCommissionDataQuery();
    const { data: thisMonthData, isLoading: thisMonthLoading } = useGetThisMonthStatsQuery();
    const commissionRate = settingsData?.data?.payment?.commissionRate || 0;

    const isLoading = settingsLoading || commissionLoading || thisMonthLoading;

    const commissionStats = [
        {
            title: "Total Earned Commission",
            value: `${commissionData?.data.totalRevenue.toLocaleString()} FCFA`,
            description: `${commissionRate}% from all orders`,
            badge: "Total",
            bgColor: "bg-[#2f6bf8]",
            textColor: "text-blue-100",
            subTextColor: "text-blue-200",
            icon: "TrendingUp",
        },
        {
            title: "This Month Commission",
            value: `${commissionData?.data.thisMonthCommission.toLocaleString()} FCFA`,
            description: "Ready to withdraw",
            badge: "Ready",
            bgColor: "bg-[#12b362]",
            textColor: "text-emerald-100",
            subTextColor: "text-emerald-200",
            icon: "CheckCircle2",
        },
        {
            title: "Pending (Escrow)",
            value: `${commissionData?.data.pendingEscrow.toLocaleString()} FCFA`,
            description: "In dispute window",
            badge: "Waiting",
            bgColor: "bg-[#fb610c]",
            textColor: "text-orange-100",
            subTextColor: "text-orange-200",
            icon: "Clock",
        },
    ];

    const commissionHistory = [
        {
            orderId: "#O1234",
            seller: "pavona1977",
            orderValue: "3,499 FCFA",
            commission: "245 FCFA",
            date: "2026-03-23",
            status: "Pending",
            statusStyle: "bg-orange-50 text-orange-600",
        },
        {
            orderId: "#O1235",
            seller: "alexmarket",
            orderValue: "5,200 FCFA",
            commission: "364 FCFA",
            date: "2026-03-20",
            status: "Available",
            statusStyle: "bg-emerald-50 text-emerald-600",
        },
        {
            orderId: "#O1236",
            seller: "sarahshop",
            orderValue: "8,900 FCFA",
            commission: "623 FCFA",
            date: "2026-03-18",
            status: "Released",
            statusStyle: "bg-blue-50 text-blue-600",
        },
        {
            orderId: "#O1237",
            seller: "bobstyle",
            orderValue: "12,000 FCFA",
            commission: "840 FCFA",
            date: "2026-03-21",
            status: "Available",
            statusStyle: "bg-emerald-50 text-emerald-600",
        },
        {
            orderId: "#O1238",
            seller: "emmafashion",
            orderValue: "4,500 FCFA",
            commission: "315 FCFA",
            date: "2026-03-24",
            status: "Pending",
            statusStyle: "bg-orange-50 text-orange-600",
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Commission & Earnings</h1>
                <p className="text-slate-500">Track platform earnings</p>
            </div>

            <CommissionStats data={commissionStats} />

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start ">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 fill-blue-100" />
                <div>
                    <span className="font-semibold block mb-0.5">Commission Release Policy</span>
                    <p className="text-blue-700">👉 Commission becomes available after delivery confirmation + 72h dispute window. This ensures fair resolution of any potential disputes.</p>
                </div>
            </div>

            <CommissionHistoryTable data={commissionHistory} commissionRate={commissionRate} />

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Commission Rate</h2>
                        <div className="bg-slate-50/50 rounded-xl p-6 flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Rate</p>
                                <div className="text-4xl font-black text-slate-800">{commissionRate}%</div>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <DollarSign className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="text-sm">
                            <p className="text-slate-500 mb-3">Applied to all completed transactions:</p>
                            <ul className="space-y-2 text-slate-700">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    Product sales
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    Service transactions
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                    Digital goods
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">This Month</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">Total Orders</span>
                                <span className="font-bold text-slate-900 text-lg">{thisMonthData?.data.totalOrders}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">Commission Earned</span>
                                <span className="font-bold text-emerald-600 text-lg">{thisMonthData?.data.commissionEarned.toLocaleString()} FCFA</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">Average per Order</span>
                                <span className="font-bold text-orange-600 text-lg">{thisMonthData?.data.averagePerOrder} FCFA</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-600">Growth vs Last Month</span>
                                <span className="font-bold text-purple-600 text-lg">+{thisMonthData?.data.growthVsLastMonth}%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
