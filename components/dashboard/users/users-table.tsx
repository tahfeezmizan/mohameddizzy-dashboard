"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState } from "react";
import UserDetailsModal from "./user-details-modal";
import { useGetAllUsersQuery } from "@/redux/features/users/userApi";
import { useTranslations } from "next-intl";

interface UsersTableProps {
    searchTerm: string;
    filter: string;
    page: number;
    setPage: (page: number) => void;
}

export default function UsersTable({ searchTerm, filter, page, setPage }: UsersTableProps) {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const t = useTranslations("users.table");
    const tCommon = useTranslations("common");

    const params: any = {
        page,
        limit: 10,
        searchTerm: searchTerm || undefined,
    };

    if (filter === "active") params.isActive = true;
    if (filter === "suspended") params.isActive = false;
    if (filter === "verified") params.verifiedBadge = true;

    const { data, isLoading, isFetching } = useGetAllUsersQuery(params);
    const users = data?.data || [];
    const meta = data?.meta;

    const handleViewUser = (id: string) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const columns = [t("userId"), t("name"), t("role"), t("phone"), t("listings"), t("status"), t("action")];

    return (
        <Card className="shadow-sm border-slate-200 overflow-hidden py-0">
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
                                <th key={col} className="px-6 py-4 text-xs tracking-wide">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        <p>{t("loading")}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                                    {t("noUsers")}
                                </td>
                            </tr>
                        ) : (
                            users.map((item) => (
                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900 uppercase text-xs">{item._id.slice(-6)}</td>
                                    <td className="px-6 py-4 text-slate-700 flex items-center gap-1.5 whitespace-nowrap">
                                        {item.name}
                                        {item.verifiedBadge && <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 font-medium uppercase text-[10px]">
                                            {item.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-slate-700">{item.phone}</td>
                                    <td className="px-6 py-4 text-slate-700 text-center">{item.publishedProductCount}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="secondary" className={`${item.isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"} font-medium`}>
                                            {item.isActive ? tCommon("active") : tCommon("suspended")}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button onClick={() => handleViewUser(item._id)} className="flex items-center gap-1.5 bg-transparent text-blue-600 font-medium hover:text-blue-700 transition-colors p-0 h-auto">
                                            <Eye className="h-4 w-4" />
                                            {tCommon("view")}
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
                    <p
                        className="text-xs text-slate-500"
                        dangerouslySetInnerHTML={{
                            __html: t("showing", {
                                from: (page - 1) * 10 + 1,
                                to: Math.min(page * 10, meta.total),
                                total: meta.total,
                            }),
                        }}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled={page === 1 || isFetching} onClick={() => setPage(page - 1)} className="h-8 w-8 p-0">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {[...Array(meta.totalPage)].map((_, i) => {
                                const p = i + 1;
                                // Simple pagination logic to show current, first, last and surrounding
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
            <UserDetailsModal open={open} setOpen={setOpen} userId={selectedUserId} />
        </Card>
    );
}
