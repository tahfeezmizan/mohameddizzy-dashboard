"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import DisputeDetailsModal from "./dispute-details-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useGetAllDisputesQuery, type TDispute } from "@/redux/features/dispute/disputeApi";
import { useDebounce } from "@/hooks/use-debounce";

// const columns = ["DISPUTE ID", "BUYER", "SELLER", "AMOUNT", "STATUS", "CREATED AT", "ACTION"];
const columns = ["ID LITIGE", "ACHETEUR", "VENDEUR", "MONTANT", "STATUT", "CRÉÉ LE", "ACTION"];

// const filters = ["All", "PENDING", "RESOLVED", "CANCELLED"];
const filters = ["Tous", "PENDING", "RESOLVED", "CANCELLED"];

export default function DisputesTable() {
    const [open, setOpen] = useState(false);
    const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeFilter, setActiveFilter] = useState<string>("Tous");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(searchTerm, 500);

    const queryParams: any = {
        page,
        limit: 10,
    };

    const filterToApiValue = (filter: string) => {
        if (filter === "Tous") return "All";
        return filter;
    };

    if (activeFilter && activeFilter !== "Tous") {
        queryParams.status = filterToApiValue(activeFilter);
    }

    const { data, isLoading, isFetching } = useGetAllDisputesQuery(queryParams);

    const disputes = data?.data || [];
    const meta = data?.meta;

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

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, activeFilter]);

    return (
        <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
            {/* Filters and Search */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button key={f} onClick={() => setActiveFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    {/* <Input placeholder="Search disputes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 h-9 bg-white border-slate-200" /> */}
                    <Input placeholder="Rechercher des litiges..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 h-9 bg-white border-slate-200" />
                </div>
            </div>

            <div className="overflow-x-auto relative">
                {isFetching && (
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    </div>
                )}
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
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        {/* <p className="text-slate-400">Loading disputes...</p> */}
                                        <p className="text-slate-400">Chargement des litiges...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : disputes.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                    {/* No disputes found */}
                                    Aucun litige trouvé
                                </td>
                            </tr>
                        ) : (
                            disputes.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 font-mono">#{item._id.slice(-6).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-slate-700">{item.buyer.name}</td>
                                    <td className="px-6 py-4 text-slate-700">{item.seller.name}</td>
                                    <td className="px-6 py-4 font-semibold text-slate-900">
                                        {item.payment?.totalAmount || item.order?.totalAmount ? (
                                            <>
                                                {item.payment?.totalAmount || item.order?.totalAmount} {item.payment?.currency || "FCFA"}
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className={`${getStatusStyle(item.status)} hover:${getStatusStyle(item.status)} font-medium`}>
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <Button onClick={() => handleViewDispute(item)} className="flex items-center gap-1.5 bg-transparent text-blue-600 font-medium hover:text-blue-700">
                                            <Eye className="h-4 w-4" />
                                            {/* View */}
                                            Voir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
                <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <p className="text-xs text-slate-500">
                        {/* Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(page * 10, meta.total)}</span> of <span className="font-medium">{meta.total}</span> disputes */}
                        Affichage de <span className="font-medium">{(page - 1) * 10 + 1}</span> à <span className="font-medium">{Math.min(page * 10, meta.total)}</span> sur <span className="font-medium">{meta.total}</span> litiges
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={page === 1 || isFetching} onClick={() => setPage(page - 1)} className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(meta.totalPage)].map((_, i) => {
                                const p = i + 1;
                                if (p === 1 || p === meta.totalPage || (p >= page - 1 && p <= page + 1)) {
                                    return (
                                        <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} disabled={isFetching} className={`h-8 w-8 p-0 text-xs ${page === p ? "bg-blue-600" : ""}`}>
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
                        <Button variant="outline" size="sm" disabled={page === meta.totalPage || isFetching} onClick={() => setPage(page + 1)} className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <DisputeDetailsModal open={open} setOpen={setOpen} disputeId={selectedDisputeId} />
        </Card>
    );
}
