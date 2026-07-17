"use client";

import ReportsTable from "@/components/dashboard/reports/reports-table";
import { Card, CardContent } from "@/components/ui/card";
import { Flag, AlertCircle, Clock, CheckCircle2, Package, Users, Loader2 } from "lucide-react";
import { useGetReportStatsQuery } from "@/redux/features/report/reportApi";
import { useTranslations } from "next-intl";

export default function ReportsPage() {
    const { data: statsResponse, isLoading: isStatsLoading } = useGetReportStatsQuery();
    const t = useTranslations("reports");

    const statsData = statsResponse?.data;

    const stats = [
        {
            title: t("stats.totalReports"),
            value: isStatsLoading ? "..." : statsData?.total ?? 0,
            icon: Flag,
            iconBg: "bg-blue-50/70 border border-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: t("stats.open"),
            value: isStatsLoading ? "..." : statsData?.status?.open ?? 0,
            icon: AlertCircle,
            iconBg: "bg-red-50/70 border border-red-100",
            iconColor: "text-red-600",
        },
        {
            title: t("stats.inReview"),
            value: isStatsLoading ? "..." : statsData?.status?.inReview ?? 0,
            icon: Clock,
            iconBg: "bg-orange-50/70 border border-orange-100",
            iconColor: "text-orange-600",
        },
        {
            title: t("stats.resolved"),
            value: isStatsLoading ? "..." : statsData?.status?.resolved ?? 0,
            icon: CheckCircle2,
            iconBg: "bg-emerald-50/70 border border-emerald-100",
            iconColor: "text-emerald-600",
        },
        {
            title: t("stats.listing"),
            value: isStatsLoading ? "..." : statsData?.type?.listing ?? 0,
            icon: Package,
            iconBg: "bg-purple-50/70 border border-purple-100",
            iconColor: "text-purple-600",
        },
        {
            title: t("stats.user"),
            value: isStatsLoading ? "..." : statsData?.type?.user ?? 0,
            icon: Users,
            iconBg: "bg-sky-50/70 border border-sky-100",
            iconColor: "text-sky-600",
        },
    ];

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {t("title")}
                </h1>
                <p className="text-slate-500 text-sm md:text-base font-medium">
                    {t("description")}
                </p>
            </div>

            {/* Statistics Widgets Grid */}
            {isStatsLoading ? (
                <div className="flex items-center justify-center min-h-24 bg-white border rounded-xl shadow-sm">
                    <div className="flex items-center gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        <span className="text-slate-400 font-medium text-sm">
                            {t("modal.loading")}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Card key={index} className="shadow-sm border-slate-200 py-0 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}>
                                        <Icon className={`h-5 w-5 ${item.iconColor}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">
                                            {item.title}
                                        </p>
                                        <h3 className="text-xl font-bold text-slate-900 leading-tight mt-0.5">
                                            {item.value}
                                        </h3>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Reports List Table */}
            <ReportsTable />
        </div>
    );
}
