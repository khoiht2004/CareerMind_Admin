import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRecentApplicationsQuery } from "@/services/admin.service";
import { APPLICATION_STATUS_CONFIG } from "@/config/admin.constants";
import { ROWS_PER_PAGE_OPTIONS } from "@/config/constants";

function RecentApplicationsTable() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const limit = Number(rowsPerPage);

  const { data: recentAppsResponse } = useGetRecentApplicationsQuery({
    limit,
  });
  const allApps = recentAppsResponse?.data ?? [];

  const pagedApps = allApps.slice((page - 1) * limit, page * limit);

  const handleRowsChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
  };

  return (
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
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedApps.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-8 text-center"
                >
                  Chưa có đơn ứng tuyển nào
                </TableCell>
              </TableRow>
            ) : (
              pagedApps.map((app) => {
                const cfg = APPLICATION_STATUS_CONFIG[app.status];
                const Icon = cfg?.icon;
                const candidateName =
                  app.user?.profile?.fullName ?? app.user?.email ?? "—";
                return (
                  <TableRow key={app.id}>
                    <TableCell className="text-sm font-medium">
                      {candidateName}
                    </TableCell>
                    <TableCell className="text-sm">{app.job?.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {app.job?.company?.name ?? "—"}
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
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer gap-2">
                            <Pencil className="size-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer gap-2">
                            <Trash2 className="size-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <Field orientation="horizontal" className="w-fit">
            <FieldLabel htmlFor="select-rows-per-page">
              Rows per page
            </FieldLabel>
            <Select value={rowsPerPage} onValueChange={handleRowsChange}>
              <SelectTrigger className="w-20" id="select-rows-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectGroup>
                  {ROWS_PER_PAGE_OPTIONS.map((page) => (
                    <SelectItem key={page} value={page}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentApplicationsTable;
