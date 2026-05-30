/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  ListTodo,
  Clock,
  XCircle,
  CheckCircle2,
  Server,
  Database,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useGetSystemStatsQuery,
  useGetAdminQueuesQuery,
} from "@/services/admin.service";
import Pagination from "@/components/shared/Pagination";

const QUEUE_STATUS_OPTIONS = [
  { value: "ALL", label: "Tất cả trạng thái" },
  { value: "pending", label: "Đang chờ" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "failed", label: "Thất bại" },
];

const STATUS_BADGE = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  processing: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

const STATUS_LABEL = {
  pending: "Đang chờ",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  failed: "Thất bại",
};

function QueueStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

function formatDateTime(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function QueueTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");

  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdminQueuesQuery(
    { page, limit: 15, status },
    { pollingInterval: 30_000 },
  );

  const queues = response?.data?.data ?? [];
  const total = response?.data?.total ?? 0;
  const totalPages = response?.data?.totalPages ?? 1;

  const handleStatusChange = (val) => {
    setStatus(val);
    setPage(1);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUEUE_STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isFetching && (
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
          )}
        </div>
        <Button variant="outline" size="sm" onClick={refetch}>
          <RefreshCw className="mr-1.5 size-3.5" />
          Làm mới
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="text-muted-foreground size-5 animate-spin" />
        </div>
      ) : queues.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center text-sm">
          Không có tác vụ nào
        </p>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead className="w-36">Loại</TableHead>
                  <TableHead className="w-28">Trạng thái</TableHead>
                  <TableHead className="w-20 text-center">Ưu tiên</TableHead>
                  <TableHead>Payload</TableHead>
                  <TableHead>Thông tin</TableHead>
                  <TableHead className="w-36">Thời gian tạo</TableHead>
                  <TableHead className="w-36">Cập nhật</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queues.map((q) => {
                  let payloadPreview = "—";
                  try {
                    const obj = JSON.parse(q.payload);
                    payloadPreview =
                      JSON.stringify(obj).slice(0, 60) +
                      (JSON.stringify(obj).length > 60 ? "…" : "");
                  } catch {
                    payloadPreview = String(q.payload).slice(0, 60);
                  }

                  return (
                    <TableRow key={q.id}>
                      <TableCell className="text-muted-foreground font-mono text-xs">
                        #{q.id}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-xs">
                          {q.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <QueueStatusBadge status={q.status} />
                      </TableCell>
                      <TableCell className="text-center">
                        {q.isPriority ? (
                          <span className="text-xs font-semibold text-amber-600">
                            Cao
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Thường
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-48 truncate font-mono text-xs">
                        {payloadPreview}
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-36 truncate text-xs">
                        {q.info ?? "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDateTime(q.createdAt)}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {formatDateTime(q.updatedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Tổng{" "}
              <span className="text-foreground font-medium">
                {total.toLocaleString("vi-VN")}
              </span>{" "}
              tác vụ
            </p>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              showPageNumbers
            />
          </div>
        </>
      )}
    </div>
  );
}

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
      className: "text-amber-500",
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
    <div className="space-y-6 p-6">
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
          {queueCards.map(({ label, value, icon: Icon, className }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <Icon className={`size-4 ${className}`} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Queue data table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <ListTodo className="size-4" />
            Danh sách tác vụ trong hàng đợi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QueueTable />
        </CardContent>
      </Card>

      {/* System info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Server className="size-4" />
            Thông tin môi trường
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="bg-muted/40 flex items-center justify-between rounded-md px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">Node ENV</span>
            <span className="font-mono font-medium">
              {import.meta.env.MODE}
            </span>
          </div>
          <div className="bg-muted/40 flex items-center justify-between rounded-md px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">API URL</span>
            <span className="font-mono font-medium">
              {import.meta.env.VITE_API_URL ?? "—"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SystemManage;
