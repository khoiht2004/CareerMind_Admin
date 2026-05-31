import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PaginationControl from "@/components/shared/Pagination";
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
import {
  useGetAdminJobsQuery,
  useUpdateJobStatusMutation,
} from "@/services/admin.service";
import { JOB_STATUS_CONFIG, JOB_TYPE_LABELS } from "@/config/admin.constants";

function JobTable({ search, type, status }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetAdminJobsQuery({
    page,
    limit,
    search,
    type,
    status,
  });
  const [updateStatus, { isLoading: updating }] = useUpdateJobStatusMutation();

  const responseData = data?.data;
  const jobs = responseData?.data ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-[900px]">
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
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-muted-foreground py-10 text-center"
                >
                  Không có công việc nào
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const statusCfg = JOB_STATUS_CONFIG[job.status];
                const poster =
                  job.postedBy?.profile?.fullName ?? job.postedBy?.email ?? "—";
                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-muted-foreground text-xs">
                          {job.location}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {job.company?.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-center text-[13px]"
                      >
                        {JOB_TYPE_LABELS[job.type] ?? job.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {poster}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        defaultValue={job.status}
                        disabled={updating}
                        onValueChange={(val) =>
                          updateStatus({ id: job.id, status: val })
                        }
                      >
                        <SelectTrigger className="h-7 w-32 text-xs">
                          <Badge
                            className={`border text-xs ${statusCfg?.className}`}
                          >
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

      {/* Pagination */}
      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={totalItems}
        itemLabel="công việc"
        onPageChange={setPage}
      />
    </div>
  );
}

export default JobTable;
