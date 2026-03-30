import { TrendingUp } from "lucide-react";

export function FinancialOverview() {
  return (
    <div className="mt-8 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-bold text-slate-800">Financial Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Revenue */}
        <div className="rounded-xl p-6 bg-[#eef2ff] border border-blue-100 shadow-sm">
          <p className="text-sm font-medium text-blue-600 mb-2">Total Revenue (Commission)</p>
          <h3 className="text-2xl font-bold text-blue-700">125,000 FCFA</h3>
        </div>

        {/* Available Commission */}
        <div className="rounded-xl p-6 bg-[#ecfdf5] border border-emerald-100 shadow-sm">
          <p className="text-sm font-medium text-emerald-600 mb-2">Available Commission</p>
          <h3 className="text-2xl font-bold text-emerald-700">45,000 FCFA</h3>
        </div>

        {/* Pending Commission */}
        <div className="rounded-xl p-6 bg-[#fff7ed] border border-orange-100 shadow-sm">
          <p className="text-sm font-medium text-orange-600 mb-2">Pending Commission (Escrow)</p>
          <h3 className="text-2xl font-bold text-orange-700">80,000 FCFA</h3>
        </div>
      </div>
    </div>
  );
}
