import { ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useGetMyCompanyProfileQuery,
  useGetMyCompanyStatsQuery,
} from "@/services/company.service";
import CompanyStatCards from "@/components/company/CompanyStatCards";
import CompanyStatChart from "@/components/company/CompanyStatChart";

function CompanyDashboard() {
  const { data: response } = useGetMyCompanyProfileQuery();
  const company = response?.data;

  const { data: statsResponse, isFetching: isStatsFetching } =
    useGetMyCompanyStatsQuery();
  const stats = statsResponse?.data;

  const chartData = [
    { name: "Tổng việc làm", count: stats?.totalJobs ?? 0 },
    { name: "Đơn ứng tuyển", count: stats?.totalApplications ?? 0 },
    { name: "Đang tuyển", count: stats?.jobsByStatus?.PUBLISHED ?? 0 },
    { name: "Phỏng vấn", count: stats?.appsByStatus?.INTERVIEW ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="bg-muted flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl text-xl font-bold sm:h-16 sm:w-16">
          {company?.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="h-full w-full object-cover"
            />
          ) : (
            company?.name?.[0]
          )}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold sm:text-2xl">
              {company?.name ?? "Công ty của bạn"}
            </h1>
            {company?.isVerified && (
              <Badge className="border-primary/20 bg-primary/10 text-primary">
                <ShieldCheck className="mr-1 size-3" /> Đã xác minh
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground mt-0.5 text-sm">
            Trang tổng quan quản lý công ty
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Stat cards */}
        <CompanyStatCards />
        {/* Bar Chart Thống kê */}
        <CompanyStatChart isStatsFetching={isStatsFetching} data={chartData} />
      </div>
    </div>
  );
}

export default CompanyDashboard;
