"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Clock, Truck, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import OrderDetailsModal from "./order-details-modal";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useTranslations } from "next-intl";

interface OrdersTableProps {
    search: string;
    status?: string;
}

const statusStyles: Record<string, string> = {
    PENDING: "bg-orange-50 text-orange-600",
    SHIPPED: "bg-blue-50 text-blue-600",
    DELIVERED: "bg-purple-50 text-purple-600",
    COMPLETED: "bg-emerald-50 text-emerald-600",
    CANCELLED: "bg-red-50 text-red-600",
};

const statusIcons: Record<string, any> = {
    PENDING: Clock,
    SHIPPED: Truck,
    DELIVERED: Package,
    COMPLETED: CheckCircle2,
    CANCELLED: Package,
};

export default function OrdersTable({ search, status }: OrdersTableProps) {
    const [open, setOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;
    const t = useTranslations("orders.table");

    const { data: ordersData, isLoading } = useGetAllOrdersQuery({
        page,
        limit,
        status,
        searchTerm: search || undefined,
    });

    const orders = ordersData?.data || [];
    const meta = ordersData?.meta;

    const handleViewDetails = (id: string) => {
        setSelectedOrderId(id);
        setOpen(true);
    };

    const columns = [t("columns.orderId"), t("columns.product"), t("columns.buyer"), t("columns.seller"), t("columns.amount"), t("columns.status"), t("columns.delivery"), t("columns.action")];

    const filtered = orders;

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
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-10 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-500">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        {t("loading")}
                                    </div>
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                                    {t("noData")}
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item) => {
                                const StatusIcon = statusIcons[item.status] || Package;
                                const statusStyle = statusStyles[item.status] || "bg-slate-50 text-slate-600";
                                return (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">#{item._id.slice(-5).toUpperCase()}</td>
                                        <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{item.product.title}</td>
                                        <td className="px-6 py-4 text-slate-700">{item.buyer.name}</td>
                                        <td className="px-6 py-4 text-slate-700">{item.seller.name}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{item.totalAmount.toLocaleString()} FCFA</td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className={`${statusStyle} hover:${statusStyle} font-medium flex items-center gap-1 w-fit`}>
                                                <StatusIcon className="h-3.5 w-3.5" />
                                                {item.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 whitespace-nowrap">{item.deliveryMethod || "N/A"}</td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item._id)} className="flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 transition-colors">
                                                <Eye className="h-4 w-4" />
                                                {t("view")}
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
            {meta && meta.totalPage > 1 && (
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                        {t.rich("pagination.showing", {
                            from: (page - 1) * limit + 1,
                            to: Math.min(page * limit, meta.total),
                            total: meta.total,
                            strong: (children) => <span className="font-semibold text-slate-900">{children}</span>,
                        })}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4 text-slate-600" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(meta.totalPage)].map((_, i) => (
                                <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" onClick={() => setPage(i + 1)} className={`h-8 w-8 p-0 ${page === i + 1 ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button variant="outline" size="icon" disabled={page === meta.totalPage} onClick={() => setPage((p) => p + 1)} className="h-8 w-8">
                            <ChevronRight className="h-4 w-4 text-slate-600" />
                        </Button>
                    </div>
                </div>
            )}

            <OrderDetailsModal open={open} setOpen={setOpen} id={selectedOrderId} />
        </Card>
    );
}
