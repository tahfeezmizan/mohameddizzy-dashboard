"use client";

import StatsCard from "@/components/dashboard/stats-card";
import UsersTable from "@/components/dashboard/users/users-table";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetUserStatsQuery } from "@/redux/features/users/userApi";
import { useDebounce } from "@/hooks/use-debounce";

export default function UsersPage() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [page, setPage] = useState(1);

    const { data: statsData, isLoading: isStatsLoading } = useGetUserStatsQuery();
    const stats = [
        {
            // title: "Total Users",
            title: "Total des Utilisateurs",
            value: isStatsLoading ? "..." : statsData?.data?.totalUsers || 0,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            // title: "Active Users",
            title: "Utilisateurs Actifs",
            value: isStatsLoading ? "..." : statsData?.data?.activeUsers || 0,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
        },
        {
            // title: "Suspended",
            title: "Suspendus",
            value: isStatsLoading ? "..." : statsData?.data?.suspendedUsers || 0,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            // title: "Verified",
            title: "Vérifiés",
            value: isStatsLoading ? "..." : statsData?.data?.verifiedUsers || 0,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
        },
    ];

    const filters = ["All", "Active", "Suspended", "Verified"];

    // Reset page when filters or search change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, activeFilter]);

    return (
        <div className="space-y-6">
            <div>
                {/* <h1 className="text-3xl font-bold text-slate-900 mb-1">User Management</h1> */}
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Gestion des Utilisateurs</h1>
                {/* <p className="text-slate-500">Manage all platform users</p> */}
                <p className="text-slate-500">Gérer tous les utilisateurs de la plateforme</p>
            </div>

            {/* Filter tabs + Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    {/* <Input placeholder="Search by name, email, or phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 bg-white border-slate-200" /> */}
                    <Input placeholder="Rechercher par nom, e-mail ou téléphone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-10 bg-white border-slate-200" />
                </div>
            </div>

            <StatsCard stats={stats} />

            <UsersTable searchTerm={debouncedSearch} filter={activeFilter} page={page} setPage={setPage} />

            {/* Tip banner */}
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex gap-3 text-sm text-emerald-800 items-start">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                    {/* <span className="font-semibold">Tip:</span> Verified sellers gain more trust and higher conversions. Encourage users to complete verification for better marketplace experience. */}
                    <span className="font-semibold">Astuce :</span> Les vendeurs vérifiés gagnent plus de confiance et de taux de conversion. Encouragez les utilisateurs à terminer la vérification pour une meilleure expérience de marché.
                </p>
            </div>
        </div>
    );
}
