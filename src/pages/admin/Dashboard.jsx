import {
  Users,
  BriefcaseBusiness,
  FileCheck2,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAdminStatsQuery,
  useGetApplicationTrendQuery,
  useGetJobsByTypeQuery,
  useGetRecentApplicationsQuery,
} from "@/services/admin.service";

const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};

const APPLICATION_STATUS_CONFIG = {
  PENDING: {
    icon: Clock,
    className: "bg-gray-100 text-gray-600 border-gray-200",
    label: "Chờ xét duyệt",
  },
  REVIEWING: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Đang xem xét",
  },
  INTERVIEW: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200",
    label: "Phỏng vấn",
  },
  ACCEPTED: {
    icon: CheckCircle2,
    className: "bg-blue-100 text-blue-700 border-blue-200",
    label: "Đã nhận",
  },
  REJECTED: {
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200",
    label: "Từ chối",
  },
};

// eslint-disable-next-line no-unused-vars
function StatCard({ title, value, icon: Icon, desc }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">{title}</p>
          <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
            <Icon className="size-4" />
          </div>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="inline-flex items-center text-xs font-medium text-green-600">
            <ArrowUpRight className="size-3.5" />
          </span>
          <span className="text-muted-foreground text-xs">{desc}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function Dashboard() {
  const { data: statsResponse } = useGetAdminStatsQuery();
  const { data: trendDataResponse } = useGetApplicationTrendQuery();
  const { data: jobsByTypeResponse } = useGetJobsByTypeQuery();
  const { data: recentAppsResponse } = useGetRecentApplicationsQuery();

  const stats = statsResponse?.data;
  const trendData = trendDataResponse?.data || [];
  const jobsByType = jobsByTypeResponse?.data || [];
  const recentApps = recentAppsResponse?.data || [];

  const statCards = [
    {
      title: "Tổng người dùng",
      value: stats?.totalUsers?.toLocaleString() ?? "—",
      icon: Users,
      desc: "Tổng số tài khoản",
    },
    {
      title: "Việc làm đang tuyển",
      value: stats?.activeJobs?.toLocaleString() ?? "—",
      icon: BriefcaseBusiness,
      desc: "Đang ở trạng thái PUBLISHED",
    },
    {
      title: "Đơn ứng tuyển",
      value: stats?.totalApplications?.toLocaleString() ?? "—",
      icon: FileCheck2,
      desc: "Tổng số đơn",
    },
    {
      title: "Tổng việc làm",
      value: stats?.totalJobs?.toLocaleString() ?? "—",
      icon: TrendingUp,
      desc: "Tất cả trạng thái",
    },
  ];

  const chartTrendData = trendData?.map((d) => ({
    date: d.date,
    "Đơn ứng tuyển": d.applications,
  }));

  const chartJobsData = jobsByType?.map((d) => ({
    type: JOB_TYPE_LABELS[d.type] ?? d.type,
    "Số lượng": d.count,
  }));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tổng quan hệ thống</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Cập nhật: {new Date().toLocaleDateString("vi-VN")}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {statCards.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Applications trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Đơn ứng tuyển 7 ngày gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartTrendData.length === 0 ? (
              <div className="flex h-[220px] items-center justify-center">
                <Loader2 className="text-muted-foreground size-5 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartTrendData}>
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

        {/* Jobs by type */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Việc làm theo loại hình
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartJobsData.length === 0 ? (
              <div className="flex h-[220px] items-center justify-center">
                <Loader2 className="text-muted-foreground size-5 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartJobsData} layout="vertical">
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
      </div>

      {/* Recent applications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">
            Đơn ứng tuyển gần đây
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ứng viên</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Ngày nộp</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApps.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-muted-foreground py-8 text-center"
                  >
                    Chưa có đơn ứng tuyển nào
                  </TableCell>
                </TableRow>
              ) : (
                recentApps?.map((app) => {
                  const cfg = APPLICATION_STATUS_CONFIG[app.status];
                  const Icon = cfg?.icon;
                  const candidateName =
                    app.user?.profile?.fullName ?? app.user?.email ?? "—";
                  return (
                    <TableRow key={app.id}>
                      <TableCell className="text-sm font-medium">
                        {candidateName}
                      </TableCell>
                      <TableCell className="text-sm">
                        {app.job?.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {app.job?.company}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`gap-1 border text-xs ${cfg?.className}`}
                        >
                          {Icon && <Icon className="size-3" />}
                          {cfg?.label ?? app.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
