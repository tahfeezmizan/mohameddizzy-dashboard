"use client";

import DisputesTable from "@/components/dashboard/disputes/disputes-table";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  Lock,
  Scale,
  Search,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useGetDisputeStatsQuery } from "@/redux/features/dispute/disputeApi";
import { useDebounce } from "@/hooks/use-debounce";

export default function Disputes() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const { data: statsData, isLoading: isStatsLoading } = useGetDisputeStatsQuery();

  const stats = [
    {
      title: "Total Disputes",
      value: isStatsLoading ? "..." : statsData?.data?.total || 0,
      icon: Scale,
      iconBg: "bg-slate-50",
      iconColor: "text-slate-500",
    },
    {
      title: "Pending Disputes",
      value: isStatsLoading ? "..." : statsData?.data?.pending || 0,
      icon: AlertCircle,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Resolved",
      value: isStatsLoading ? "..." : statsData?.data?.resolved || 0,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
  ];

  const filters = ["All", "PENDING", "RESOLVED", "CANCELLED"];

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeFilter]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Disputes Center
        </h1>
        <p className="text-slate-500">Resolve buyer-seller conflicts</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search disputes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-white border-slate-200"
          />
        </div>
      </div>

      {isStatsLoading ? (
        <div className="flex items-center justify-center min-h-20">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <StatsCard stats={stats} />
      )}

      <DisputesTable
        searchTerm={debouncedSearch}
        filter={activeFilter}
        page={page}
        setPage={setPage}
      />

      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
        <Lock className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800">Secure:</span> Funds
          are held securely in escrow until delivery is confirmed. Commission is
          released after dispute window closes.
        </p>
      </div>
    </div>
  );
}
