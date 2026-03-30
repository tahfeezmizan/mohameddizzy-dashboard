import { Users, ShoppingBag, ShoppingCart, TriangleAlert } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { CategoryPerformanceChart } from "@/components/dashboard/CategoryPerformanceChart";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";

export default function Home() {
  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-slate-500">
          Monitor platform activity, revenue, and performance in real-time
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Users"
          value="12,540"
          subValue="+8.2% this week"
          subValueColor="text-emerald-600"
          icon={Users}
        />
        <MetricCard
          title="Active Listings"
          value="3,210"
          subValue="+120 new today"
          subValueColor="text-emerald-600"
          icon={ShoppingBag}
        />
        <MetricCard
          title="Orders In Progress"
          value="842"
          subValue="56 awaiting delivery"
          subValueColor="text-slate-500"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Disputes Open"
          value="24"
          subValue="Needs attention"
          subValueColor="text-orange-600"
          subValueIcon={TriangleAlert}
          icon={TriangleAlert}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-500"
        />
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
