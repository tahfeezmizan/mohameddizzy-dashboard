"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useGetCategoryPerformanceQuery } from "@/redux/features/dashboard/dashboardApi";
import { Loader2 } from "lucide-react";

export function CategoryPerformanceChart() {
    const { data: performanceResponse, isLoading } = useGetCategoryPerformanceQuery();
    const data = performanceResponse?.data || [];

    return (
        <Card className="col-span-1 lg:col-span-3 shadow-sm border-slate-200 flex flex-col">
            <CardHeader className="pb-0">
                <CardTitle className="text-base font-bold text-slate-800">Category Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 p-6">
                <div className="h-62.5 w-full flex items-center justify-center -mt-4">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <p className="text-sm font-medium">Loading performance data...</p>
                        </div>
                    ) : data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={0} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-slate-400 text-sm">No performance data available</div>
                    )}
                </div>

                <div className="mt-auto space-y-3">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3 text-slate-600 font-medium">
                                <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                {item.name}
                            </div>
                            <span className="font-bold text-slate-800">{item.value} listings</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
