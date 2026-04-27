"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetDashboardChartQuery } from "@/redux/features/dashboard/dashboardApi";
import { Loader2 } from "lucide-react";

export function OrdersChart() {
    const { data: chartDataResponse, isLoading } = useGetDashboardChartQuery();
    const data = chartDataResponse?.data || [];

    return (
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-slate-800">Orders vs Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-62.5 w-full mt-4 flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <p className="text-sm font-medium">Loading chart data...</p>
                        </div>
                    ) : data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={2}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="week" axisLine={true} tickLine={true} tick={{ fontSize: 12, fill: "#64748b" }} stroke="#cbd5e1" />
                                <YAxis axisLine={true} tickLine={true} tick={{ fontSize: 12, fill: "#64748b" }} stroke="#cbd5e1" />
                                <Tooltip
                                    cursor={{ fill: "transparent" }}
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    }}
                                />
                                <Legend iconType="square" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                                <Bar dataKey="orders" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={20} name="Total Orders" />
                                <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} barSize={20} name="Completed Orders" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-slate-400 text-sm">No chart data available</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
