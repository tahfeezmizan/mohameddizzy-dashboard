"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mar 1", revenue: 8000 },
  { date: "Mar 5", revenue: 12000 },
  { date: "Mar 10", revenue: 15000 },
  { date: "Mar 15", revenue: 18000 },
  { date: "Mar 20", revenue: 22000 },
  { date: "Mar 25", revenue: 25000 },
];

export function RevenueChart() {
  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-slate-800">
          Revenue Trend (Last 30 days)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="date"
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: "#64748b" }}
                stroke="#cbd5e1"
              />
              <YAxis
                axisLine={true}
                tickLine={true}
                tick={{ fontSize: 12, fill: "#64748b" }}
                stroke="#cbd5e1"
                domain={[0, 26000]}
                ticks={[0, 6500, 13000, 19500, 26000]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="linear"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4, fill: "#fff", stroke: "#3b82f6", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
