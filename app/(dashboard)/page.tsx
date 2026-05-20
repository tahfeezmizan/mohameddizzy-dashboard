"use client";

import { Users, ShoppingBag, ShoppingCart, Zap } from "lucide-react";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { CategoryPerformanceChart } from "@/components/dashboard/CategoryPerformanceChart";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { useGetDashboardStatsQuery } from "@/redux/features/dashboard/dashboardApi";

export default function Home() {
    const { data: stats, isLoading } = useGetDashboardStatsQuery();

    const metricsData = [
        {
            // title: "Total Users",
            title: "Utilisateurs totaux",
            value: isLoading ? "..." : stats?.data?.totalUsers.toLocaleString() || "0",
            // subValue: "+8.2% this week",
            // subValueColor: "text-emerald-600",
            icon: Users,
        },
        {
            // title: "Active Listings",
            title: "Listes actives",
            value: isLoading ? "..." : stats?.data?.activeListings.toLocaleString() || "0",
            // subValue: "+120 new today",
            // subValueColor: "text-emerald-600",
            icon: ShoppingBag,
        },
        {
            // title: "Orders In Progress",
            title: "Commandes en cours",
            value: isLoading ? "..." : stats?.data?.ordersInProgress.toLocaleString() || "0",
            // subValue: "56 awaiting delivery",
            // subValueColor: "text-slate-500",
            icon: ShoppingCart,
        },
        {
            // title: "Product Boosted",
            title: "Produits boostés",
            value: isLoading ? "..." : stats?.data?.productBoosted.toLocaleString() || "0",
            // subValue: "Active boosts",
            // subValueColor: "text-emerald-600",
            icon: Zap,
            iconBgColor: "bg-yellow-50",
            iconColor: "text-yellow-500",
        },
    ];

    return (
        <div className="">
            <div className="mb-8">
                {/* <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
                <p className="text-slate-500">Monitor platform activity, revenue, and performance in real-time</p> */}
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Vue d'ensemble</h1>
                <p className="text-slate-500">Vue d'ensemble de la plateforme</p>
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
