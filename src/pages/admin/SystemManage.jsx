import { ListTodo, Clock, XCircle, CheckCircle2, Server, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSystemStatsQuery } from "@/services/admin.service";

function SystemManage() {
  const { data: statsResponse } = useGetSystemStatsQuery();
  const stats = statsResponse?.data;

  const queueCards = [
    {
      label: "Tổng tác vụ",
      value: stats?.totalQueues?.toLocaleString() ?? "—",
      icon: ListTodo,
      className: "",
    },
    {
      label: "Đang chờ xử lý",
      value: stats?.pendingQueues?.toLocaleString() ?? "—",
      icon: Clock,
      className: "text-[color:var(--accent)]",
    },
    {
      label: "Đã hoàn thành",
      value: stats?.processedQueues?.toLocaleString() ?? "—",
      icon: CheckCircle2,
      className: "text-primary",
    },
    {
      label: "Thất bại",
      value: stats?.failedQueues?.toLocaleString() ?? "—",
      icon: XCircle,
      className: "text-destructive",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Thông tin và trạng thái hệ thống
        </p>
      </div>

      {/* Queue stats */}
      <div>
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold">
          <Database className="size-4" />
          Hàng đợi tác vụ (Queue)
        </h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {
            // eslint-disable-next-line no-unused-vars
            queueCards.map(({ label, value, icon: Icon, className }) => (
              <Card key={label}>
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">{label}</p>
                    <Icon className={`size-4 ${className}`} />
                  </div>
                  <p className="text-2xl font-bold">{value}</p>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>

      {/* System info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Server className="size-4" />
            Thông tin môi trường
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">Node ENV</span>
            <span className="font-mono font-medium">{import.meta.env.MODE}</span>
          </div>
          <div className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">API URL</span>
            <span className="font-mono font-medium">{import.meta.env.VITE_API_URL ?? "—"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SystemManage;
