"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const data = [
  { week: "Week 1", orders: 155, completed: 155 },
  { week: "Week 2", orders: 200, completed: 200 },
  { week: "Week 3", orders: 175, completed: 175 },
  { week: "Week 4", orders: 235, completed: 235 },
];

export function OrdersChart() {
  return (
    <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-slate-800">
          Orders vs Completed Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              barGap={2}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="week"
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
                domain={[0, 260]}
                ticks={[0, 65, 130, 195, 260]}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                iconType="square"
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Bar dataKey="orders" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={20} />
              <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
