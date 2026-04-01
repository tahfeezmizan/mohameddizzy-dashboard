"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Package, Clock, Truck, Eye } from "lucide-react";

const allOrders = [
  {
    id: "#O1240",
    product: "Nike Air Max Sneakers",
    buyer: "John Doe",
    seller: "pavona1977",
    amount: "3,499 FCFA",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-600",
    statusIcon: CheckCircle2,
    delivery: "Delivered",
  },
  {
    id: "#O1241",
    product: "Samsung Galaxy Earbuds",
    buyer: "Sarah Lee",
    seller: "alexmarket",
    amount: "5,200 FCFA",
    status: "Shipped",
    statusStyle: "bg-blue-50 text-blue-600",
    statusIcon: Truck,
    delivery: "In Transit",
  },
  {
    id: "#O1242",
    product: "Apple iPad Case",
    buyer: "Mike Chen",
    seller: "sarahshop",
    amount: "8,900 FCFA",
    status: "Pending",
    statusStyle: "bg-orange-50 text-orange-600",
    statusIcon: Clock,
    delivery: "Processing",
  },
  {
    id: "#O1243",
    product: "Sony Headphones",
    buyer: "Emma Davis",
    seller: "bobstyle",
    amount: "12,000 FCFA",
    status: "Delivered",
    statusStyle: "bg-purple-50 text-purple-600",
    statusIcon: Package,
    delivery: "Awaiting Confirmation",
  },
  {
    id: "#O1244",
    product: "Leather Wallet",
    buyer: "David Wilson",
    seller: "emmafashion",
    amount: "4,500 FCFA",
    status: "Shipped",
    statusStyle: "bg-blue-50 text-blue-600",
    statusIcon: Truck,
    delivery: "In Transit",
  },
  {
    id: "#O1245",
    product: "Wireless Keyboard",
    buyer: "Aisha Bello",
    seller: "techzone",
    amount: "7,800 FCFA",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-600",
    statusIcon: CheckCircle2,
    delivery: "Delivered",
  },
];

const columns = [
  "ORDER ID",
  "PRODUCT",
  "BUYER",
  "SELLER",
  "AMOUNT",
  "STATUS",
  "DELIVERY",
  "ACTION",
];

interface OrdersTableProps {
  search: string;
}

export default function OrdersTable({ search }: OrdersTableProps) {
  const filtered = allOrders.filter((o) => {
    if (search === "") return true;
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q) ||
      o.buyer.toLowerCase().includes(q) ||
      o.seller.toLowerCase().includes(q)
    );
  });

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 text-xs tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const StatusIcon = item.statusIcon;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                    <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{item.product}</td>
                    <td className="px-6 py-4 text-slate-700">{item.buyer}</td>
                    <td className="px-6 py-4 text-slate-700">{item.seller}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{item.amount}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className={`${item.statusStyle} hover:${item.statusStyle} font-medium flex items-center gap-1 w-fit`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.delivery}</td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                        <Eye className="h-4 w-4" /> View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
