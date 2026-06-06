"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useGetAllPaymentsQuery, TPayment, TPaymentStatus } from "@/redux/features/payment/paymentApi";
import { useTranslations } from "next-intl";

const statusStyles: Record<string, string> = {
    PENDING: "bg-orange-50 text-orange-600",
    COMPLETED: "bg-emerald-50 text-emerald-600",
    FAILED: "bg-red-50 text-red-600",
    REFUNDED: "bg-purple-50 text-purple-600",
    CANCELLED: "bg-slate-50 text-slate-600",
    DISPUTED: "bg-amber-50 text-amber-600",
};

interface CommissionHistoryTableProps {
    commissionRate: number;
    status?: TPaymentStatus;
}

export default function CommissionHistoryTable({ commissionRate, status }: CommissionHistoryTableProps) {
    const [page, setPage] = useState(1);
    const limit = 10;
    const t = useTranslations("commission.history");

    const { data: paymentsData, isLoading } = useGetAllPaymentsQuery({
        page,
        limit,
        status,
    });

    const payments = paymentsData?.data || [];
    const meta = paymentsData?.meta;

    const columns = [t("columns.orderId"), t("columns.seller"), t("columns.orderValue"), t("columns.commission", { rate: commissionRate }), t("columns.date"), t("columns.status")];

    return (
        <Card className="shadow-sm border-slate-200 overflow-hidden py-0 gap-0">
            <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">{t("title")}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="px-6 py-4 uppercase text-xs tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        {t("loading")}
                                    </div>
                                </td>
                            </tr>
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                    {t("noData")}
                                </td>
                            </tr>
                        ) : (
                            payments.map((item: TPayment) => {
                                const statusStyle = statusStyles[item.status] || "bg-slate-50 text-slate-600";
                                return (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-slate-800">#{item._id.slice(-5).toUpperCase()}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.sellerId.name}</td>
                                        <td className="px-6 py-4 text-slate-700">{item.productPrice.toLocaleString()} FCFA</td>
                                        <td className="px-6 py-4 font-bold text-emerald-600">{item.siteFee.toLocaleString()} FCFA</td>
                                        <td className="px-6 py-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <Badge className={`${statusStyle} hover:${statusStyle} border-0 font-medium whitespace-nowrap`}>{item.status}</Badge>
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
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <p
                        className="text-sm text-slate-500"
                        dangerouslySetInnerHTML={{
                            __html: t("pagination.showing")
                                .replace("<from>", `<span className="font-semibold text-slate-900">${(page - 1) * limit + 1}</span>`)
                                .replace("<to>", `<span className="font-semibold text-slate-900">${Math.min(page * limit, meta.total)}</span>`)
                                .replace("<total>", `<span className="font-semibold text-slate-900">${meta.total}</span>`),
                        }}
                    />
                    {meta.totalPage > 1 && (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="h-8 w-8">
                                <ChevronLeft className="h-4 w-4 text-slate-600" />
                            </Button>
                            <div className="flex items-center gap-1">
                                {[...Array(meta.totalPage)].map((_, i) => {
                                    const p = i + 1;
                                    if (p === 1 || p === meta.totalPage || (p >= page - 1 && p <= page + 1)) {
                                        return (
                                            <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} disabled={isLoading} className={`h-8 w-8 p-0 text-xs ${page === p ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                                                {p}
                                            </Button>
                                        );
                                    } else if (p === page - 2 || p === page + 2) {
                                        return (
                                            <span key={p} className="text-slate-400 px-1">
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                            <Button variant="outline" size="icon" disabled={page === meta.totalPage} onClick={() => setPage((p) => p + 1)} className="h-8 w-8">
                                <ChevronRight className="h-4 w-4 text-slate-600" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}
