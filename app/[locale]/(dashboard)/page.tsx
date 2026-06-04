"use client";

import { Users, ShoppingBag, ShoppingCart, Zap } from "lucide-react";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { CategoryPerformanceChart } from "@/components/dashboard/CategoryPerformanceChart";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("dashboard");
    const { data: stats, isLoading } = useGetDashboardStatsQuery();

    const metricsData = [
        {
            title: t("metrics.totalUsers"),
            value: isLoading ? "..." : stats?.data?.totalUsers.toLocaleString() || "0",
            icon: Users,
        },
        {
            title: t("metrics.activeListings"),
            value: isLoading ? "..." : stats?.data?.activeListings.toLocaleString() || "0",
            icon: ShoppingBag,
        },
        {
            title: t("metrics.ordersInProgress"),
            value: isLoading ? "..." : stats?.data?.ordersInProgress.toLocaleString() || "0",
            icon: ShoppingCart,
        },
        {
            title: t("metrics.productBoosted"),
            value: isLoading ? "..." : stats?.data?.productBoosted.toLocaleString() || "0",
            icon: Zap,
            iconBgColor: "bg-yellow-50",
            iconColor: "text-yellow-500",
        },
    ];

    return (
        <div className="">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("title")}</h1>
                <p className="text-slate-500">{t("description")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {metricsData.map((item, index) => (
                    <MetricCard key={index} item={item} />
                ))}
            </div>

            <FinancialOverview />

            <div className="grid gap-6 lg:grid-cols-5 mt-6 mb-8">
                <RevenueChart />
                <OrdersChart />
            </div>

            <div className="grid gap-6 lg:grid-cols-5 mb-8">
                <CategoryPerformanceChart />
                <RecentActivityFeed />
            </div>
        </div>
    );
}
