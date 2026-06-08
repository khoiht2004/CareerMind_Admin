/* eslint-disable no-unused-vars */
import { BriefcaseBusiness, FileText, Users, TrendingUp } from "lucide-react";
import { useGetMyCompanyStatsQuery } from "@/services/company.service";
import StatItem from "./StatItem";

function CompanyStatCards() {
  const { data: response } = useGetMyCompanyStatsQuery();
  const stats = response?.data;

  return (
    <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col">
      <StatItem
        icon={BriefcaseBusiness}
        label="Tổng việc làm"
        value={stats?.totalJobs?.toLocaleString()}
        sub={`Đang tuyển: ${stats?.jobsByStatus?.PUBLISHED ?? 0}`}
      />
      <StatItem
        icon={FileText}
        label="Đơn ứng tuyển"
        value={stats?.totalApplications?.toLocaleString()}
        sub={`Chờ xét duyệt: ${stats?.appsByStatus?.PENDING ?? 0}`}
      />
      <StatItem
        icon={TrendingUp}
        label="Đang tuyển"
        value={stats?.jobsByStatus?.PUBLISHED?.toLocaleString() ?? 0}
        sub="Trạng thái PUBLISHED"
      />
      <StatItem
        icon={Users}
        label="Phỏng vấn"
        value={stats?.appsByStatus?.INTERVIEW?.toLocaleString() ?? 0}
        sub="Đơn đang phỏng vấn"
      />
    </div>
  );
}

export default CompanyStatCards;
