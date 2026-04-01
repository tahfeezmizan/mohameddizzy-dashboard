"use client";

import { useState } from "react";
import UsersTable from "@/components/dashboard/users/users-table";
import StatsCard from "@/components/dashboard/stats-card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Search, ShieldCheck, Users, UserX } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: 6,

    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Sellers",
    value: 40,

    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    title: "Verified",
    value: 15,

    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Active",
    value: 10,

    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

type FilterType = "All" | "Sellers" | "Buyers" | "Verified";
const filters: FilterType[] = ["All", "Sellers", "Buyers", "Verified"];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          User Management
        </h1>
        <p className="text-slate-500">Manage all platform users</p>
      </div>

      {/* Filter tabs + Search */}
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
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 bg-white border-slate-200"
          />
        </div>
      </div>

      <StatsCard stats={stats} />

      <UsersTable search={search} filter={activeFilter} />

      {/* Tip banner */}
      <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex gap-3 text-sm text-emerald-800 items-start">
        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold">Tip:</span> Verified sellers gain more
          trust and higher conversions. Encourage users to complete verification
          for better marketplace experience.
        </p>
      </div>
    </div>
  );
}
