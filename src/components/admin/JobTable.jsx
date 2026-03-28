import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminJobsQuery, useUpdateJobStatusMutation } from "@/services/admin.service";

const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};

const JOB_STATUS_CONFIG = {
  PUBLISHED: { label: "Đang tuyển", className: "bg-green-100 text-green-700 border-green-200" },
  DRAFT: { label: "Nháp", className: "bg-gray-100 text-gray-600 border-gray-200" },
  CLOSED: { label: "Đã đóng", className: "bg-red-100 text-red-700 border-red-200" },
};

function JobTable({ search, type, status }) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isFetching } = useGetAdminJobsQuery({ page, limit, search, type, status });
  const [updateStatus, { isLoading: updating }] = useUpdateJobStatusMutation();

  const responseData = data?.data;
  const jobs = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vị trí</TableHead>
              <TableHead>Công ty</TableHead>
              <TableHead>Loại hình</TableHead>
              <TableHead>Đơn ứng tuyển</TableHead>
              <TableHead>Đăng bởi</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center">
                  <Loader2 className="mx-auto size-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground py-10 text-center">
                  Không có công việc nào
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const statusCfg = JOB_STATUS_CONFIG[job.status];
                const poster = job.postedBy?.profile?.fullName ?? job.postedBy?.email ?? "—";
                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-muted-foreground text-xs">{job.location}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{job.company}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {JOB_TYPE_LABELS[job.type] ?? job.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{job._count?.applications ?? 0}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{poster}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        defaultValue={job.status}
                        disabled={updating}
                        onValueChange={(val) => updateStatus({ id: job.id, status: val })}
                      >
                        <SelectTrigger className="h-7 w-32 text-xs">
                          <Badge className={`border text-xs ${statusCfg?.className}`}>
                            {statusCfg?.label ?? job.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PUBLISHED">Đang tuyển</SelectItem>
                          <SelectItem value="DRAFT">Nháp</SelectItem>
                          <SelectItem value="CLOSED">Đã đóng</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Trang {page} / {totalPages} — {totalItems} công việc
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Trước
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobTable;
