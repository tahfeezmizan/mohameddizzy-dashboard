"use client";

import { useState } from "react";
import OrdersTable from "@/components/dashboard/orders/orders-table";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Clock,
  Filter,
  Package,
  Search,
  Truck,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: 6,
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "In Transit",
    value: 2,
    icon: Truck,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-500",
  },
  {
    title: "Pending",
    value: 1,
    icon: Clock,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">
          Orders Management
        </h1>
        <p className="text-slate-500">Track and manage all platform orders</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by Order ID, Buyer, Seller, or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-11 px-3 border-slate-200 bg-white"
          >
            <Filter className="h-4 w-4 text-slate-500" />
          </Button>
          <div className="h-11 w-24 rounded-md border border-slate-200 bg-white" />
        </div>
      </div>

      <StatsCard stats={stats} />

      <OrdersTable search={search} />

      {/* Order flow banner */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 text-sm text-blue-800 items-start">
        <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-semibold text-slate-800">Order Flow:</span>{" "}
          Pending → Shipped → Delivered → Completed (after 72h dispute window)
        </p>
      </div>
    </div>
  );
}
