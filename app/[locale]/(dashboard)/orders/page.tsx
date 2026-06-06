"use client";

import { useState } from "react";
import OrdersTable from "@/components/dashboard/orders/orders-table";
import StatsCard from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { CheckCircle, CheckCircle2, Clock, Package, Search, Truck } from "lucide-react";
import { useGetOrderStatsQuery } from "@/redux/features/order/orderApi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

export default function OrdersPage() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [status, setStatus] = useState<string>("all");
    const { data: orderStats, isLoading } = useGetOrderStatsQuery();
    const t = useTranslations("orders");

    const stats = [
        {
            title: t("stats.pending"),
            value: isLoading ? "..." : orderStats?.data?.pending || 0,
            icon: Clock,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
        },
        {
            title: t("stats.shipped"),
            value: isLoading ? "..." : orderStats?.data?.shipped || 0,
            icon: Truck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: t("stats.delivered"),
            value: isLoading ? "..." : orderStats?.data?.delivered || 0,
            icon: Package,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-500",
        },
        {
            title: t("stats.completed"),
            value: isLoading ? "..." : orderStats?.data?.completed || 0,
            icon: CheckCircle,
            iconBg: "bg-green-50",
            iconColor: "text-green-500",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{t("title")}</h1>
                <p className="text-slate-500">{t("description")}</p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <Input placeholder={t("search.placeholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 bg-white border-slate-200" />
                </div>
                <div className="flex items-center gap-2">
                    <Select value={status} onValueChange={(val) => setStatus(val || "all")}>
                        <SelectTrigger className="h-11 w-40 bg-white border-slate-200">
                            <SelectValue placeholder={t("filter.allStatus")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("filter.allStatus")}</SelectItem>
                            <SelectItem value="PENDING">{t("filter.pending")}</SelectItem>
                            <SelectItem value="SHIPPED">{t("filter.shipped")}</SelectItem>
                            <SelectItem value="DELIVERED">{t("filter.delivered")}</SelectItem>
                            <SelectItem value="COMPLETED">{t("filter.completed")}</SelectItem>
                            <SelectItem value="CANCELLED">{t("filter.cancelled")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <StatsCard stats={stats} />

            <OrdersTable search={debouncedSearch} status={status === "all" ? undefined : status} />

            {/* Order flow banner */}
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
                <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <p>
                    <span className="font-semibold text-slate-800">{t("flow.title")}</span> {t("flow.message")}
                </p>
            </div>
        </div>
    );
}
