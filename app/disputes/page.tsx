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
} from "lucide-react";

const stats = [
  {
    title: "Open Disputes",
    value: 1,
    icon: AlertCircle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Pending Review",
    value: 1,
    icon: Scale,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    title: "Resolved",
    value: 1,
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
];

export default function Disputes() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Disputes Center
        </h1>
        <p className="text-slate-500">Resolve buyer-seller conflicts</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by Dispute ID, Order ID, or User..."
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

      <DisputesTable />

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
