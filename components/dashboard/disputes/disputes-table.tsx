"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye } from "lucide-react";
import DisputeDetailsModal from "./dispute-details-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const disputes = [
  {
    id: "#D1023",
    orderId: "#05678",
    buyer: "John Doe",
    seller: "Alex Martin",
    amount: "3,499 FCFA",
    status: "Open",
    statusStyle: "bg-red-50 text-red-600",
  },
  {
    id: "#D1024",
    orderId: "#05679",
    buyer: "Sarah Lee",
    seller: "Bob Wilson",
    amount: "5,200 FCFA",
    status: "Pending",
    statusStyle: "bg-orange-50 text-orange-600",
  },
  {
    id: "#D1025",
    orderId: "#05680",
    buyer: "Mike Chen",
    seller: "Emma Davis",
    amount: "8,900 FCFA",
    status: "Resolved",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
];

const columns = [
  "DISPUTE ID",
  "ORDER ID",
  "BUYER",
  "SELLER",
  "AMOUNT",
  "STATUS",
  "ACTION",
];

export default function DisputesTable() {
  const [open, setOpen] = useState(false);
  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {disputes.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 text-slate-500">{item.orderId}</td>
                <td className="px-6 py-4 text-slate-700">{item.buyer}</td>
                <td className="px-6 py-4 text-slate-700">{item.seller}</td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {item.amount}
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant="secondary"
                    className={`${item.statusStyle} hover:${item.statusStyle} font-medium`}
                  >
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-1.5 bg-transparent text-blue-600 font-medium hover:text-blue-700"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DisputeDetailsModal open={open} setOpen={setOpen} />
    </Card>
  );
}
