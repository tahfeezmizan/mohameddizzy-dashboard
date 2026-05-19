"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Loader2 } from "lucide-react";
import DisputeDetailsModal from "./dispute-details-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetAllDisputesQuery, type TDispute } from "@/redux/features/dispute/disputeApi";

const columns = [
  "DISPUTE ID",
  "BUYER",
  "SELLER",
  "STATUS",
  "CREATED AT",
  "ACTION",
];

export default function DisputesTable({
  searchTerm,
  filter,
  page,
  setPage,
}: {
  searchTerm?: string;
  filter?: string;
  page?: number;
  setPage?: (page: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);

  const queryParams: any = {
    page: page || 1,
    limit: 20,
  };

  if (filter && filter !== "All") {
    queryParams.status = filter;
  }

  const { data, isLoading } = useGetAllDisputesQuery(queryParams);

  const disputes = data?.data || [];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-orange-50 text-orange-600";
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-600";
      case "CANCELLED":
        return "bg-slate-50 text-slate-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  const handleViewDispute = (dispute: TDispute) => {
    setSelectedDisputeId(dispute._id);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
        <div className="flex items-center justify-center min-h-50">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </Card>
    );
  }

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
            {disputes.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                  No disputes found
                </td>
              </tr>
            ) : (
              disputes.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 font-mono">
                    #{item._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{item.buyer.name}</td>
                  <td className="px-6 py-4 text-slate-700">{item.seller.name}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={`${getStatusStyle(item.status)} hover:${getStatusStyle(item.status)} font-medium`}
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      onClick={() => handleViewDispute(item)}
                      className="flex items-center gap-1.5 bg-transparent text-blue-600 font-medium hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DisputeDetailsModal
        open={open}
        setOpen={setOpen}
        disputeId={selectedDisputeId}
      />
    </Card>
  );
}
