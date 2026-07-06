"use client";

import { useState, useEffect } from "react";
import { useGetActivitiesQuery, ActivityType } from "@/redux/features/activity/activityApi";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";

const ACTIVITY_TYPES: { label: string; value: ActivityType | "All" }[] = [
    { label: "All Types", value: "All" },
    { label: "Login", value: "LOGIN" },
    { label: "Register", value: "REGISTER" },
    { label: "Product Create", value: "PRODUCT_CREATE" },
    { label: "Product Update", value: "PRODUCT_UPDATE" },
    { label: "Order Placed", value: "ORDER_PLACED" },
    { label: "Order Status Update", value: "ORDER_STATUS_UPDATE" },
    { label: "Payment Completed", value: "PAYMENT_COMPLETED" },
    { label: "Withdrawal Request", value: "WITHDRAWAL_REQUEST" },
    { label: "Dispute Created", value: "DISPUTE_CREATED" },
    { label: "Dispute Resolved", value: "DISPUTE_RESOLVED" },
    { label: "Dispute Cancelled", value: "DISPUTE_CANCELLED" },
    { label: "Refund Processed", value: "REFUND_PROCESSED" },
];

export default function ActivitiesPage() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const [typeFilter, setTypeFilter] = useState<string>("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const {
        data: activitiesResponse,
        isLoading,
        isFetching,
    } = useGetActivitiesQuery({
        page,
        limit: 15,
        searchTerm: debouncedSearch,
        type: typeFilter === "All" ? undefined : typeFilter,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
    });

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, typeFilter, startDate, endDate]);

    const getActivityColor = (type: ActivityType) => {
        switch (type) {
            case "PAYMENT_COMPLETED":
            case "LOGIN":
                return "bg-emerald-500";
            case "REGISTER":
            case "PRODUCT_CREATE":
                return "bg-blue-500";
            case "ORDER_PLACED":
            case "ORDER_STATUS_UPDATE":
                return "bg-amber-500";
            case "PRODUCT_UPDATE":
                return "bg-indigo-500";
            case "WITHDRAWAL_REQUEST":
            case "REFUND_PROCESSED":
                return "bg-rose-500";
            case "DISPUTE_CREATED":
            case "DISPUTE_RESOLVED":
            case "DISPUTE_CANCELLED":
                return "bg-orange-500";
            default:
                return "bg-slate-500";
        }
    };

    const getActivityBadgeVariant = (type: ActivityType) => {
        switch (type) {
            case "PAYMENT_COMPLETED":
            case "LOGIN":
                return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200";
            case "REGISTER":
            case "PRODUCT_CREATE":
                return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
            case "ORDER_PLACED":
            case "ORDER_STATUS_UPDATE":
                return "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200";
            case "PRODUCT_UPDATE":
                return "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200";
            case "WITHDRAWAL_REQUEST":
            case "REFUND_PROCESSED":
                return "bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200";
            case "DISPUTE_CREATED":
            case "DISPUTE_RESOLVED":
            case "DISPUTE_CANCELLED":
                return "bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200";
            default:
                return "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200";
        }
    };

    const formatActivityTime = (dateString: string) => {
        try {
            return formatDistanceToNow(new Date(dateString), { addSuffix: true });
        } catch {
            return "just now";
        }
    };

    const handleReset = () => {
        setSearchTerm("");
        setTypeFilter("All");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const totalPages = activitiesResponse?.meta?.totalPages || 1;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Activity Log</h1>
                    <p className="text-slate-500">Track and filter all platform system events</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleReset} className="w-fit text-slate-600 border-slate-200">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Filters
                </Button>
            </div>

            {/* Filters Section */}
            <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input placeholder="Message, Order ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-white border-slate-200" />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase ml-1 ">Type</label>
                            <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val || "All")}>
                                <SelectTrigger className="bg-white border-slate-200 w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ACTIVITY_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Start Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="pl-9 bg-white border-slate-200" />
                            </div>
                        </div>

                        {/* End Date */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase ml-1">End Date</label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="pl-9 bg-white border-slate-200" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="border-b border-slate-100 bg-white">
                    <CardTitle className="text-lg font-semibold text-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <span>System Activities</span>
                            {(isLoading || isFetching) && <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                        </div>
                        {activitiesResponse?.meta && (
                            <span className="text-sm font-normal text-slate-500">
                                Showing {activitiesResponse.data.length} of {activitiesResponse.meta.total} results
                            </span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 bg-white">
                    <div className="flex flex-col">
                        {isLoading ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="p-4 border-b border-slate-50 flex gap-4 items-start">
                                    <Skeleton className="h-2 w-2 rounded-full mt-2" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/4" />
                                    </div>
                                </div>
                            ))
                        ) : activitiesResponse?.data?.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Search className="h-6 w-6 text-slate-300" />
                                </div>
                                <h3 className="text-slate-900 font-medium">No activities found</h3>
                                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search term.</p>
                                <Button variant="link" onClick={handleReset} className="mt-2 text-blue-600">
                                    Clear all filters
                                </Button>
                            </div>
                        ) : (
                            activitiesResponse?.data?.map((activity) => (
                                <div key={activity._id} className="p-4 border-b border-slate-50 last:border-0 flex gap-4 items-start hover:bg-slate-50 transition-colors">
                                    <div className={cn("h-2 w-2 rounded-full mt-2 shrink-0", getActivityColor(activity.type))} />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <p className="text-sm font-medium text-slate-900 leading-snug">{activity.message || activity.type}</p>
                                            <Badge className={cn("text-[10px] uppercase tracking-wider font-bold py-0 h-5 border", getActivityBadgeVariant(activity.type))}>{activity.type.replace(/_/g, " ")}</Badge>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            <span className="font-semibold text-slate-700">{activity.user?.name || "System"}</span>
                                            {activity.user?.email && ` (${activity.user.email})`} • {formatActivityTime(activity.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {totalPages > 1 && (
                <Pagination className="mt-4 pb-8">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious className={cn("cursor-pointer", !activitiesResponse?.meta?.hasPrev && "pointer-events-none opacity-50")} onClick={() => setPage((p) => Math.max(1, p - 1))} />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            if (totalPages > 5) {
                                if (p !== 1 && p !== totalPages && (p < page - 1 || p > page + 1)) {
                                    if (p === page - 2 || p === page + 2)
                                        return (
                                            <PaginationItem key={p} className="text-slate-400">
                                                ...
                                            </PaginationItem>
                                        );
                                    return null;
                                }
                            }
                            return (
                                <PaginationItem key={p}>
                                    <PaginationLink className="cursor-pointer" isActive={page === p} onClick={() => setPage(p)}>
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext className={cn("cursor-pointer", !activitiesResponse?.meta?.hasNext && "pointer-events-none opacity-50")} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
