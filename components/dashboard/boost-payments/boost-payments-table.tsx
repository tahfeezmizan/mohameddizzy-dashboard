"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ChevronLeft, ChevronRight, Eye, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useGetAllBoostPaymentsQuery, TBoostPayment } from "@/redux/features/boostPayment/boostPaymentApi";
import { useTranslations } from "next-intl";
import BoostPaymentsDetails from "./boost-payments-details";

const statusStyles: Record<string, string> = {
    PENDING: "bg-orange-50 text-orange-600 border-orange-200/50 hover:bg-orange-50",
    COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-200/50 hover:bg-emerald-50",
    FAILED: "bg-red-50 text-red-600 border-red-200/50 hover:bg-red-50",
    REFUNDED: "bg-purple-50 text-purple-600 border-purple-200/50 hover:bg-purple-50",
    CANCELLED: "bg-slate-50 text-slate-600 border-slate-200/50 hover:bg-slate-50",
};

interface BoostPaymentsTableProps {
    status?: string;
    type?: "PRODUCT" | "SHOP" | "all";
}

export default function BoostPaymentsTable({ status, type }: BoostPaymentsTableProps) {
    const [page, setPage] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<TBoostPayment | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const limit = 10;
    const t = useTranslations("boostPayments.table");

    useEffect(() => {
        setPage(1);
    }, [status, type]);

    const queryParams = {
        page,
        limit,
        status: status === "all" ? undefined : status,
        type: !type || type === "all" ? undefined : (type as "PRODUCT" | "SHOP"),
    };

    const { data: paymentsResponse, isLoading } = useGetAllBoostPaymentsQuery(queryParams);

    const payments = paymentsResponse?.data || [];
    const meta = paymentsResponse?.meta;

    const columns = [
        t("id"),
        t("user"),
        t("type"),
        t("pack"),
        t("amount"),
        t("status"),
        t("date"),
        t("actions")
    ];

    const getImageUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://djarna.apponislam.top";
        return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const handleViewDetails = (payment: TBoostPayment) => {
        setSelectedPayment(payment);
        setIsDetailsOpen(true);
    };

    return (
        <>
            <Card className="shadow-sm border-slate-200 overflow-hidden py-0 gap-0 bg-white">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-800">{t("title")}</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                {columns.map((col, idx) => (
                                    <th key={idx} className="px-6 py-4 uppercase text-xs tracking-wider font-semibold">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center gap-2 text-slate-500 font-medium">
                                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                                            {t("loading")}
                                        </div>
                                    </td>
                                </tr>
                            ) : payments.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        {t("noData")}
                                    </td>
                                </tr>
                            ) : (
                                payments.map((item: TBoostPayment) => {
                                    const statusStyle = statusStyles[item.status] || "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-50";
                                    return (
                                        <tr key={item._id} className="hover:bg-slate-50/40 transition-colors">
                                            {/* Transaction ID */}
                                            <td className="px-6 py-4 font-semibold text-slate-800 font-mono text-xs max-w-[120px] truncate" title={item._id}>
                                                #{item._id.slice(-6).toUpperCase()}
                                            </td>

                                            {/* User Info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8 border border-slate-100 shadow-sm">
                                                        <AvatarImage src={getImageUrl(item.userId?.photo)} alt={item.userId?.name} />
                                                        <AvatarFallback className="bg-blue-50 text-blue-600 text-xs font-bold">
                                                            {item.userId?.name?.slice(0, 2).toUpperCase() || "US"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-800 leading-tight">{item.userId?.name}</span>
                                                        <span className="text-xs text-slate-400 truncate max-w-[150px]">{item.userId?.email}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Boost Type */}
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className="capitalize text-xs font-semibold px-2 py-0.5 select-none bg-blue-50/30 border-blue-100 text-blue-700">
                                                    {item.type?.toLowerCase()}
                                                </Badge>
                                            </td>

                                            {/* Boost Pack */}
                                            <td className="px-6 py-4 text-slate-700 font-medium">
                                                {item.boostPackId?.name || "-"}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4 font-bold text-slate-800">
                                                {item.amount?.toLocaleString()} {item.currency}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <Badge variant="outline" className={`${statusStyle} border font-semibold whitespace-nowrap text-[11px] px-2.5 py-0.5`}>
                                                    {item.status}
                                                </Badge>
                                            </td>

                                            {/* Paid At */}
                                            <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                                                {item.paidAt ? new Date(item.paidAt).toLocaleDateString() : new Date(item.createdAt).toLocaleDateString()}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => handleViewDetails(item)}
                                                    className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {meta && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <p className="text-sm text-slate-500 text-center sm:text-left">
                            {t("pagination.showing", {
                                from: (page - 1) * limit + 1,
                                to: Math.min(page * limit, meta.total),
                                total: meta.total,
                            })}
                        </p>
                        {meta.totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" disabled={!meta.hasPrev} onClick={() => setPage((p) => p - 1)} className="h-8 w-8 border-slate-200">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    {[...Array(meta.totalPages)].map((_, i) => {
                                        const p = i + 1;
                                        if (p === 1 || p === meta.totalPages || (p >= page - 1 && p <= page + 1)) {
                                            return (
                                                <Button 
                                                    key={p} 
                                                    variant={page === p ? "default" : "outline"} 
                                                    size="sm" 
                                                    onClick={() => setPage(p)} 
                                                    disabled={isLoading} 
                                                    className={`h-8 w-8 p-0 text-xs font-semibold ${page === p ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm border-blue-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                                                >
                                                    {p}
                                                </Button>
                                            );
                                        } else if (p === page - 2 || p === page + 2) {
                                            return (
                                                <span key={p} className="text-slate-400 px-1 select-none">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <Button variant="outline" size="icon" disabled={!meta.hasNext} onClick={() => setPage((p) => p + 1)} className="h-8 w-8 border-slate-200">
                                    <ChevronRight className="h-4 w-4 text-slate-600" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* Details Modal */}
            <BoostPaymentsDetails 
                open={isDetailsOpen} 
                setOpen={setIsDetailsOpen} 
                payment={selectedPayment} 
            />
        </>
    );
}
