"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const allUsers = [
  {
    id: "#U102",
    name: "pavona1977",
    verified: true,
    role: "Seller",
    roleStyle: "bg-blue-50 text-blue-600",
    location: "New York",
    listings: 12,
    status: "Active",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "#U103",
    name: "johnsmith",
    verified: false,
    role: "Buyer",
    roleStyle: "bg-purple-50 text-purple-600",
    location: "Paris",
    listings: 0,
    status: "Active",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "#U104",
    name: "sarahstyle",
    verified: true,
    role: "Both",
    roleStyle: "bg-indigo-50 text-indigo-600",
    location: "London",
    listings: 8,
    status: "Active",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "#U105",
    name: "mikeshop",
    verified: true,
    role: "Seller",
    roleStyle: "bg-blue-50 text-blue-600",
    location: "Berlin",
    listings: 25,
    status: "Suspended",
    statusStyle: "bg-orange-50 text-orange-600",
  },
  {
    id: "#U106",
    name: "emily_buys",
    verified: false,
    role: "Buyer",
    roleStyle: "bg-purple-50 text-purple-600",
    location: "Toronto",
    listings: 0,
    status: "Active",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "#U107",
    name: "globalstore",
    verified: true,
    role: "Seller",
    roleStyle: "bg-blue-50 text-blue-600",
    location: "Lagos",
    listings: 47,
    status: "Active",
    statusStyle: "bg-emerald-50 text-emerald-600",
  },
];

const columns = ["USER ID", "NAME", "ROLE", "LOCATION", "LISTINGS", "STATUS", "ACTION"];

type FilterType = "All" | "Sellers" | "Buyers" | "Verified";

interface UsersTableProps {
  search: string;
  filter: FilterType;
}

export default function UsersTable({ search, filter }: UsersTableProps) {
  const filtered = allUsers.filter((u) => {
    const matchesSearch =
      search === "" ||
      u.id.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Sellers" && (u.role === "Seller" || u.role === "Both")) ||
      (filter === "Buyers" && (u.role === "Buyer" || u.role === "Both")) ||
      (filter === "Verified" && u.verified);

    return matchesSearch && matchesFilter;
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
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                    {item.name}
                    {item.verified && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={`${item.roleStyle} hover:${item.roleStyle} font-medium`}
                    >
                      {item.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.location}</td>
                  <td className="px-6 py-4 text-slate-700">{item.listings}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={`${item.statusStyle} hover:${item.statusStyle} font-medium`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      <Eye className="h-4 w-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
