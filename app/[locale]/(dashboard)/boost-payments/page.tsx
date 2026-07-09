"use client";

import { useState } from "react";
import BoostPaymentsTable from "@/components/dashboard/boost-payments/boost-payments-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslations } from "next-intl";

export default function BoostPayments() {
    const t = useTranslations("boostPayments");
    const [status, setStatus] = useState<string>("all");
    const [type, setType] = useState<"PRODUCT" | "SHOP" | "all">("all");

    return (
        <div className="space-y-8 pb-8">
            {/* Header Title */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{t("title")}</h1>
                <p className="text-slate-500 text-sm md:text-base font-medium">{t("description")}</p>
            </div>

            {/* Filters Section */}
            <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                {/* Status Filter */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
                    <Select value={status} onValueChange={(val) => setStatus(val || "all")}>
                        <SelectTrigger className="h-10 w-44 bg-white border-slate-200 hover:bg-slate-50 transition-all font-medium text-slate-700">
                            <SelectValue placeholder={t("filters.allStatus")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                            <SelectItem value="all">{t("filters.allStatus")}</SelectItem>
                            <SelectItem value="PENDING">{t("filters.pending")}</SelectItem>
                            <SelectItem value="COMPLETED">{t("filters.completed")}</SelectItem>
                            <SelectItem value="FAILED">{t("filters.failed")}</SelectItem>
                            <SelectItem value="CANCELLED">{t("filters.cancelled")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Type Filter */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Boost Type</span>
                    <Select value={type} onValueChange={(val) => setType((val || "all") as any)}>
                        <SelectTrigger className="h-10 w-44 bg-white border-slate-200 hover:bg-slate-50 transition-all font-medium text-slate-700">
                            <SelectValue placeholder={t("filters.allTypes")} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-slate-200">
                            <SelectItem value="all">{t("filters.allTypes")}</SelectItem>
                            <SelectItem value="PRODUCT">{t("filters.product")}</SelectItem>
                            <SelectItem value="SHOP">{t("filters.shop")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Boost Payments List Table */}
            <BoostPaymentsTable 
                status={status} 
                type={type === "all" ? undefined : type} 
            />
        </div>
    );
}
