"use client";

import StatsCard from "@/components/dashboard/stats-card";
import UsersTable from "@/components/dashboard/users/users-table";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetUserStatsQuery } from "@/redux/features/users/userApi";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const t = useTranslations("users");

    const { data: statsData, isLoading: isStatsLoading } = useGetUserStatsQuery();
    const stats = [
        {
            title: t("stats.totalUsers"),
            value: isStatsLoading ? "..." : statsData?.data?.totalUsers || 0,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: t("stats.activeUsers"),
            value: isStatsLoading ? "..." : statsData?.data?.activeUsers || 0,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            title: t("stats.suspended"),
            value: isStatsLoading ? "..." : statsData?.data?.suspendedUsers || 0,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            title: t("stats.verified"),
            value: isStatsLoading ? "..." : statsData?.data?.verifiedUsers || 0,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
        },
    ];

    const filters = ["all", "active", "suspended", "verified"];

    // Reset page when filters or search change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, activeFilter]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">{t("title")}</h1>
                <p className="text-slate-500">{t("description")}</p>
            </div>

            {/* Filter tabs + Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                            {t(`filters.${f}`)}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder={t("search.placeholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 bg-white border-slate-200" />
                </div>
            </div>

            <StatsCard stats={stats} />

            <UsersTable searchTerm={debouncedSearch} filter={activeFilter} page={page} setPage={setPage} />

            {/* Tip banner */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex gap-3 text-sm text-emerald-800 items-start">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                    <span className="font-semibold">{t("tip.title")}</span> {t("tip.message")}
                </p>
            </div>
        </div>
    );
}
