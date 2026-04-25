import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function CommissionHistoryTable({ data, commissionRate }: any) {
  const columns = [
    "Order ID",
    "Seller",
    "Order Value",
    "Commission (" + commissionRate + "%)",
    "Date",
    "Status",
  ];

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden py-0 gap-0">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">Commission History</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* Header */}
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 uppercase text-xs tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {data.map((item: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-800">
                  {item.orderId}
                </td>
                <td className="px-6 py-4 text-slate-600">{item.seller}</td>
                <td className="px-6 py-4 text-slate-700">{item.orderValue}</td>
                <td className="px-6 py-4 font-bold text-emerald-600">
                  {item.commission}
                </td>
                <td className="px-6 py-4 text-slate-500">{item.date}</td>
                <td className="px-6 py-4">
                  <Badge
                    className={`${item.statusStyle} hover:${item.statusStyle} border-0 font-medium whitespace-nowrap`}
                  >
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
