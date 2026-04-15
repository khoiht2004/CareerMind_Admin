import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PaginationControl from "@/components/shared/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyCompanyJobsQuery } from "@/services/company.service";
import { COMPANY_JOB_STATUS_CONFIG, COMPANY_JOB_TYPE_LABELS } from "@/config/company.constants";

function CompanyJobTable({ search, status }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetMyCompanyJobsQuery({ page, limit, search, status });

  const responseData = data?.data;
  const jobs = responseData?.jobs ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vị trí</TableHead>
              <TableHead>Loại hình</TableHead>
              <TableHead>Đăng bởi</TableHead>
              <TableHead className="text-center">Đơn ứng tuyển</TableHead>
              <TableHead>Hạn nộp</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Trạng thái</TableHead>
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
                <TableCell colSpan={7} className="text-muted-foreground py-10 text-center">
                  Không có việc làm nào
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const statusCfg = COMPANY_JOB_STATUS_CONFIG[job.status];
                const poster = job.postedBy?.profile?.fullName ?? job.postedBy?.email ?? "—";
                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-muted-foreground text-xs">{job.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {COMPANY_JOB_TYPE_LABELS[job.type] ?? job.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{poster}</TableCell>
                    <TableCell className="text-center text-sm">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {job.deadline ? new Date(job.deadline).toLocaleDateString("vi-VN") : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge className={`border text-xs ${statusCfg?.className}`}>
                        {statusCfg?.label ?? job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControl
        page={page}
        totalPages={totalPages}
        total={totalItems}
        itemLabel="việc làm"
        onPageChange={setPage}
      />
    </div>
  );
}

export default CompanyJobTable;
