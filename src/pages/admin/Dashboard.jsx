import { Users, BriefcaseBusiness, FileCheck2, TrendingUp } from "lucide-react";
import { useGetAdminStatsQuery } from "@/services/admin.service";
import ChartsRow from "@/components/admin/ChartsRow";
import RecentApplicationsTable from "@/components/admin/RecentApplicationsTable";
import StatCard from "@/components/admin/StatCard";

function Dashboard() {
  const { data: statsResponse } = useGetAdminStatsQuery();
  const stats = statsResponse?.data;

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tổng quan hệ thống</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Cập nhật: {new Date().toLocaleDateString("vi-VN")}
        </p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <ChartsRow />

      {/* Recent applications */}
      <RecentApplicationsTable />
    </div>
  );
}

export default Dashboard;
