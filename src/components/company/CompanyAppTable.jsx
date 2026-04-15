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
import { useGetMyCompanyApplicationsQuery } from "@/services/company.service";
import { COMPANY_APP_STATUS_CONFIG } from "@/config/company.constants";

function CompanyAppTable({ status }) {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetMyCompanyApplicationsQuery({ page, limit, status });

  const responseData = data?.data;
  const applications = responseData?.applications ?? [];
  const totalPages = responseData?.totalPages ?? 1;
  const totalItems = responseData?.total ?? 0;

  return (
    <div className="space-y-3">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ứng viên</TableHead>
              <TableHead>Vị trí ứng tuyển</TableHead>
              <TableHead>Ngày nộp</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ghi chú</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                  Không có đơn ứng tuyển nào
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => {
                const cfg = COMPANY_APP_STATUS_CONFIG[app.status];
                const name = app.user?.profile?.fullName ?? app.user?.email ?? "—";
                return (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-muted flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold">
                          {app.user?.profile?.avatarUrl
                            ? <img src={app.user.profile.avatarUrl} alt={name} className="h-full w-full object-cover" />
                            : name[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{name}</p>
                          <p className="text-muted-foreground text-xs">{app.user?.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {app.job?.title ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge className={`border text-xs ${cfg?.className}`}>
                        {cfg?.label ?? app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-48 truncate text-xs">
                      {app.note ?? "—"}
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
        itemLabel="đơn ứng tuyển"
        onPageChange={setPage}
      />
    </div>
  );
}

export default CompanyAppTable;
