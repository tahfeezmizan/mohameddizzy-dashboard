"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eye, Loader2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useGetAllReportsQuery, type TReport } from "@/redux/features/report/reportApi";
import { useDebounce } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";
import ReportDetailsModal from "./report-details-modal";

export default function ReportsTable() {
    const [open, setOpen] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeStatusFilter, setActiveStatusFilter] = useState<string>("all");
    const [activeTypeFilter, setActiveTypeFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const t = useTranslations("reports.table");

    const queryParams: any = {
        page,
        limit: 10,
    };

    if (debouncedSearch) {
        queryParams.searchTerm = debouncedSearch;
    }

    if (activeStatusFilter && activeStatusFilter !== "all") {
        queryParams.status = activeStatusFilter.toUpperCase();
    }

    if (activeTypeFilter && activeTypeFilter !== "all") {
        queryParams.type = activeTypeFilter.toUpperCase();
    }

    const { data, isLoading, isFetching } = useGetAllReportsQuery(queryParams);

    const reports = data?.data || [];
    const meta = data?.meta;

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "OPEN":
                return "bg-red-50 text-red-600 border border-red-100";
            case "IN_REVIEW":
                return "bg-orange-50 text-orange-600 border border-orange-100";
            case "RESOLVED":
                return "bg-emerald-50 text-emerald-600 border border-emerald-100";
            default:
                return "bg-slate-50 text-slate-600 border border-slate-100";
        }
    };

    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case "LISTING":
                return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100";
            case "USER":
                return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-100";
        }
    };

    const handleViewReport = (report: TReport) => {
        setSelectedReportId(report._id);
        setOpen(true);
    };

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, activeStatusFilter, activeTypeFilter]);

    const getImageUrl = (path?: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    const columns = [t("columns.reportId"), t("columns.type"), t("columns.reporter"), t("columns.target"), t("columns.reason"), t("columns.status"), t("columns.createdAt"), t("columns.action")];

    const statusFilters = ["all", "open", "in_review", "resolved"];
    const typeFilters = ["all", "listing", "user"];

    return (
        <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
            {/* Filters and Search */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
                    {/* Status Filters */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {statusFilters.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveStatusFilter(f)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${activeStatusFilter === f ? "bg-blue-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                                {t(`filters.${f}`)}
                            </button>
                        ))}
                    </div>

                    {/* Divider for desktops */}
                    <div className="hidden sm:block h-6 w-px bg-slate-200" />

                    {/* Type Filters */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                        {typeFilters.map((tf) => (
                            <button
                                key={tf}
                                onClick={() => setActiveTypeFilter(tf)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${activeTypeFilter === tf ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                            >
                                {t(`types.${tf}`)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input placeholder={t("searchPlaceholder")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 h-9 bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-blue-500" />
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
                                <td colSpan={8} className="px-6 py-12 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        <p className="text-slate-400">{t("loading")}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : reports.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                                    {t("noData")}
                                </td>
                            </tr>
                        ) : (
                            reports.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                    {/* Report ID */}
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{item.reportId || `#${item._id.slice(-6).toUpperCase()}`}</td>

                                    {/* Type */}
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className={`${getTypeBadgeStyle(item.type)} font-medium`}>
                                            {item.type}
                                        </Badge>
                                    </td>

                                    {/* Reporter */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2.5">
                                            <Avatar className="h-8 w-8 border border-slate-100">
                                                <AvatarImage src={getImageUrl(item.reporter.photo)} alt={item.reporter.name} />
                                                <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xs">{item.reporter.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900">{item.reporter.name}</span>
                                                <span className="text-xs text-slate-400 font-mono truncate max-w-35">{item.reporter.email || item.reporter.phone}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Reported Target */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            {item.type === "LISTING" && item.reportedItem ? (
                                                <>
                                                    <span className="font-semibold text-slate-800 line-clamp-1">{item.reportedItem.title}</span>
                                                    <span className="text-xs text-slate-500">
                                                        {t("reportedTargetInfo.listingOwner")}: {item.reportedUser.name}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="font-semibold text-slate-800">{item.reportedUser.name}</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Reason */}
                                    <td className="px-6 py-4 text-slate-700 max-w-50 truncate">{item.reason}</td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className={`${getStatusStyle(item.status)} font-medium`}>
                                            {item.status}
                                        </Badge>
                                    </td>

                                    {/* Created At */}
                                    <td className="px-6 py-4 text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</td>

                                    {/* Action */}
                                    <td className="px-6 py-4">
                                        <Button onClick={() => handleViewReport(item)} className="flex items-center gap-1.5 bg-transparent border-none text-blue-600 font-medium hover:text-blue-700 hover:bg-transparent cursor-pointer p-0">
                                            <Eye className="h-4 w-4" />
                                            {t("view")}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
                    <p
                        className="text-xs text-slate-500 text-center sm:text-left"
                        dangerouslySetInnerHTML={{
                            __html: t("pagination.showing")
                                .replace("<from>", `<span class="font-medium">${(page - 1) * 10 + 1}</span>`)
                                .replace("<to>", `<span class="font-medium">${Math.min(page * 10, meta.total)}</span>`)
                                .replace("<total>", `<span class="font-medium">${meta.total}</span>`),
                        }}
                    />

                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <Button variant="outline" size="sm" disabled={!meta.hasPrev || isFetching} onClick={() => setPage(page - 1)} className="h-8 w-8 p-0 cursor-pointer">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 flex-wrap justify-center">
                            {[...Array(meta.totalPages)].map((_, i) => {
                                const p = i + 1;
                                if (p === 1 || p === meta.totalPages || (p >= page - 1 && p <= page + 1)) {
                                    return (
                                        <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} disabled={isFetching} className={`h-8 w-8 p-0 text-xs cursor-pointer ${page === p ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
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
                        <Button variant="outline" size="sm" disabled={!meta.hasNext || isFetching} onClick={() => setPage(page + 1)} className="h-8 w-8 p-0 cursor-pointer">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <ReportDetailsModal open={open} setOpen={setOpen} reportId={selectedReportId} />
        </Card>
    );
}
