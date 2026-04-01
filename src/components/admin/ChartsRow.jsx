import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  useGetApplicationTrendQuery,
  useGetJobsByTypeQuery,
} from "@/services/admin.service";
import { JOB_TYPE_LABELS, PERIODS } from "@/config/admin.constants";

function ApplicationTrendChart({ days, onDaysChange }) {
  const { data: trendDataResponse, isFetching } = useGetApplicationTrendQuery({
    days,
  });
  const trendData = trendDataResponse?.data ?? [];

  const chartData = trendData.map((d) => ({
    date: d.date,
    "Đơn ứng tuyển": d.applications,
  }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-sm font-semibold">Đơn ứng tuyển</CardTitle>
          <div className="flex gap-1 rounded-lg border p-0.5">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => onDaysChange(p.value)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  days === p.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching || chartData.length === 0 ? (
          <div className="flex h-[220px] items-center justify-center">
            <Loader2 className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--foreground))"
                    stopOpacity={0.15}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--foreground))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="Đơn ứng tuyển"
                stroke="hsl(var(--foreground))"
                strokeWidth={2}
                fill="url(#grad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

function JobsByTypeChart() {
  const { data: jobsByTypeResponse } = useGetJobsByTypeQuery();
  const jobsByType = jobsByTypeResponse?.data ?? [];

  const chartData = jobsByType.map((d) => ({
    type: JOB_TYPE_LABELS[d.type] ?? d.type,
    "Số lượng": d.count,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Việc làm theo loại hình
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[220px] items-center justify-center">
            <Loader2 className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="type"
                type="category"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={75}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar
                dataKey="Số lượng"
                fill="hsl(var(--foreground))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

function ChartsRow() {
  const [days, setDays] = useState(7);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ApplicationTrendChart days={days} onDaysChange={setDays} />
      <JobsByTypeChart />
    </div>
  );
}

export default ChartsRow;
