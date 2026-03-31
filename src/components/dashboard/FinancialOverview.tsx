import { TrendingUp } from "lucide-react";

const financialData = [
  {
    title: "Total Revenue (Commission)",
    value: "125,000 FCFA",
    textColor: "text-blue-600",
    valueColor: "text-blue-700",
    bgColor: "bg-[#eef2ff]",
    borderColor: "border-blue-100",
  },
  {
    title: "Available Commission",
    value: "45,000 FCFA",
    textColor: "text-emerald-600",
    valueColor: "text-emerald-700",
    bgColor: "bg-[#ecfdf5]",
    borderColor: "border-emerald-100",
  },
  {
    title: "Pending Commission (Escrow)",
    value: "80,000 FCFA",
    textColor: "text-orange-600",
    valueColor: "text-orange-700",
    bgColor: "bg-[#fff7ed]",
    borderColor: "border-orange-100",
  },
];

export function FinancialOverview() {
  return (
    <div className=" bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-bold text-slate-800">Financial Overview</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {financialData.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 ${item.bgColor} border ${item.borderColor} shadow-sm`}
          >
            <p className={`text-sm font-medium ${item.textColor} mb-2`}>
              {item.title}
            </p>
            <h3 className={`text-2xl font-bold ${item.valueColor}`}>
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
