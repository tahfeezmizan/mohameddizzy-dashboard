"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetRevenueChartQuery } from "@/redux/features/dashboard/dashboardApi";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RevenueChart() {
    const t = useTranslations("dashboard");
    const { data: revenueResponse, isLoading } = useGetRevenueChartQuery();
    const data = revenueResponse?.data || [];

    return (
        <Card className="col-span-1 lg:col-span-3 shadow-sm border-slate-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-slate-800">{t("revenueTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-62.5 w-full mt-4 flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <p className="text-sm font-medium">{t("loadingRevenue")}</p>
                        </div>
                    ) : data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={true} tickLine={true} tick={{ fontSize: 10, fill: "#64748b" }} stroke="#cbd5e1" minTickGap={10} />
                                <YAxis axisLine={true} tickLine={true} tick={{ fontSize: 12, fill: "#64748b" }} stroke="#cbd5e1" tickFormatter={(value: any) => `${Number(value).toLocaleString()}`} />
                                <Tooltip
                                    formatter={(value: any) => [`${Number(value).toLocaleString()} FCFA`, t("revenueLabel")]}
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    }}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }} activeDot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-slate-400 text-sm">{t("noDataAvailable")}</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
